// Shiprocket Logistics API Client
// Handles authentication, courier serviceability, adhoc order creation,
// AWB assignment, tracking, and cancellation with graceful fallback.

const BASE_URL = 'https://apiv2.shiprocket.in/v2/open';

let cachedToken = null;
let tokenExpiresAt = null;

export async function getShiprocketToken() {
  const email = process.env.SHIPROCKET_EMAIL;
  const password = process.env.SHIPROCKET_PASSWORD;

  if (!email || !password) {
    return null;
  }

  // Token is valid for 10 days, refresh if older than 9 days
  if (cachedToken && tokenExpiresAt && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('[shiprocket] login failed:', res.status, errText);
      return null;
    }

    const data = await res.json();
    if (data.token) {
      cachedToken = data.token;
      // 9 days in ms
      tokenExpiresAt = Date.now() + 9 * 24 * 60 * 60 * 1000;
      return cachedToken;
    }
  } catch (err) {
    console.warn('[shiprocket] network error during login:', err.message);
  }

  return null;
}

export async function checkServiceability({
  pickupPincode,
  deliveryPincode,
  weightGrams = 500,
  lengthCm = 30,
  widthCm = 20,
  heightCm = 5,
  isCod = false,
}) {
  const token = await getShiprocketToken();
  const weightKg = Math.max(0.1, (Number(weightGrams) || 500) / 1000);

  if (!token) {
    return {
      serviceable: true,
      fallback: true,
      rate: 100,
      etd: '4-6 business days',
      courierName: 'Standard Surface Express',
      courierCompanyId: null,
      couriers: [
        {
          courier_name: 'Standard Surface Express',
          rate: 100,
          etd: '4-6 business days',
          courier_company_id: null,
        },
      ],
    };
  }

  try {
    const params = new URLSearchParams({
      pickup_postcode: pickupPincode,
      delivery_postcode: deliveryPincode,
      weight: String(weightKg),
      cod: isCod ? '1' : '0',
      length: String(lengthCm || 30),
      breadth: String(widthCm || 20),
      height: String(heightCm || 5),
    });

    const res = await fetch(`${BASE_URL}/courier/serviceability/?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    const availableCouriers = data?.data?.available_courier_companies || [];

    if (!availableCouriers.length) {
      return {
        serviceable: false,
        error: 'Delivery not available to this pincode with current couriers.',
        couriers: [],
      };
    }

    // Sort by rate ascending to offer the most economical reliable option
    const sorted = [...availableCouriers].sort((a, b) => Number(a.rate) - Number(b.rate));
    const recommended = sorted[0];

    return {
      serviceable: true,
      fallback: false,
      rate: Math.ceil(Number(recommended.rate)),
      etd: recommended.etd || '4-6 business days',
      courierName: recommended.courier_name,
      courierCompanyId: recommended.courier_company_id,
      couriers: sorted.map((c) => ({
        courier_name: c.courier_name,
        rate: Math.ceil(Number(c.rate)),
        etd: c.etd,
        courier_company_id: c.courier_company_id,
        rating: c.rating,
      })),
    };
  } catch (err) {
    console.error('[shiprocket] serviceability error:', err.message);
    return {
      serviceable: true,
      fallback: true,
      rate: 100,
      etd: '4-6 business days',
      couriers: [],
    };
  }
}

export async function getShiprocketPickupLocations() {
  const token = await getShiprocketToken();
  if (!token) return [];

  try {
    const res = await fetch(`${BASE_URL}/settings/company/pickup`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data?.data?.shipping_address || [];
  } catch (err) {
    console.error('[shiprocket] failed to fetch pickup locations:', err.message);
    return [];
  }
}

export async function createShiprocketOrder({
  orderId,
  orderNumber,
  orderDate,
  pickupLocation,
  customer,
  address,
  items,
  totalAmount,
  totalWeightGrams,
  lengthCm = 30,
  widthCm = 20,
  heightCm = 5,
}) {
  const token = await getShiprocketToken();
  if (!token) {
    console.warn('[shiprocket] token missing, skipping external Shiprocket order creation.');
    return {
      shiprocketOrderId: `SIM-${Date.now()}`,
      shipmentId: `SIM-SHIP-${Date.now()}`,
      awbCode: null,
      courierName: null,
      simulated: true,
    };
  }

  const weightKg = Math.max(0.1, (Number(totalWeightGrams) || 500) / 1000);
  const formattedDate = (orderDate ? new Date(orderDate) : new Date())
    .toISOString()
    .replace('T', ' ')
    .slice(0, 16);

  const payload = {
    order_id: String(orderNumber || orderId),
    order_date: formattedDate,
    pickup_location: pickupLocation || 'Primary Warehouse',
    billing_customer_name: address.name || customer.name || 'Valued Customer',
    billing_last_name: '',
    billing_address: address.line1,
    billing_address_2: address.line2 || '',
    billing_city: address.city,
    billing_pincode: address.pincode,
    billing_state: address.state,
    billing_country: address.country || 'India',
    billing_email: customer.email || 'customer@srikalasilks.com',
    billing_phone: address.mobile || customer.mobile || '9999999999',
    shipping_is_billing: true,
    order_items: items.map((item) => ({
      name: item.name || 'Silk Saree',
      sku: item.sku || `SKU-${item.id}`,
      units: Number(item.qty) || 1,
      selling_price: Number(item.price) || 0,
      discount: 0,
      tax: 0,
      hsn: 5007, // Silk fabric HSN
    })),
    payment_method: 'Prepaid',
    sub_total: Number(totalAmount),
    length: lengthCm || 30,
    breadth: widthCm || 20,
    height: heightCm || 5,
    weight: weightKg,
  };

  try {
    const res = await fetch(`${BASE_URL}/orders/create/adhoc`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.order_id) {
      console.error('[shiprocket] order creation error:', data);
      throw new Error(data.message || 'Shiprocket order creation failed');
    }

    return {
      shiprocketOrderId: data.order_id,
      shipmentId: data.shipment_id,
      awbCode: data.awb_code || null,
      courierName: data.courier_name || null,
      simulated: false,
    };
  } catch (err) {
    console.error('[shiprocket] order creation failed:', err.message);
    throw err;
  }
}

export async function assignShiprocketAWB(shipmentId, courierCompanyId = null) {
  const token = await getShiprocketToken();
  if (!token) return null;

  try {
    const body = { shipment_id: shipmentId };
    if (courierCompanyId) body.courier_id = courierCompanyId;

    const res = await fetch(`${BASE_URL}/courier/assign/awb`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data?.response?.data?.awb_code) {
      return {
        awbCode: data.response.data.awb_code,
        courierName: data.response.data.courier_name,
        courierCompanyId: data.response.data.courier_company_id,
      };
    }
  } catch (err) {
    console.error('[shiprocket] AWB assignment failed:', err.message);
  }
  return null;
}

export async function trackShiprocketAWB(awbCode) {
  const token = await getShiprocketToken();
  if (!token || !awbCode) return null;

  try {
    const res = await fetch(`${BASE_URL}/courier/track/awb/${awbCode}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const tracking = data?.tracking_data;
    if (tracking) {
      return {
        trackStatus: tracking.track_status,
        shipmentStatus: tracking.shipment_status,
        etd: tracking.etd,
        currentLocation: tracking.current_location,
        scans: tracking.shipment_track_activities || [],
      };
    }
  } catch (err) {
    console.error('[shiprocket] tracking lookup failed:', err.message);
  }
  return null;
}

export async function cancelShiprocketOrder(shiprocketOrderIds = []) {
  const token = await getShiprocketToken();
  if (!token || !shiprocketOrderIds.length) return false;

  try {
    const res = await fetch(`${BASE_URL}/orders/cancel`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: shiprocketOrderIds }),
    });
    const data = await res.json();
    return data.status_code === 200;
  } catch (err) {
    console.error('[shiprocket] order cancellation failed:', err.message);
    return false;
  }
}
