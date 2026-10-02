import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, '..', '..', 'assets', 'logo-invoice.png');

const MAROON = '#581e15';
const INK = '#220D0A';
const INK_LIGHT = '#6E5D57';
const RULE = '#E4DDD4';
const BG_ALT = '#FAF6F1';

const DEFAULT_STORE = {
  name: 'Ravichandra Textiles',
  legalName: 'Ravichandra Textiles & Handlooms',
  addressLines: [
    '10-28, Kpt street, near Punjab National Bank',
    'Dharmavaram 515671, Andhra Pradesh, India',
  ],
  phone: process.env.STORE_PHONE || process.env.RAVICHANDRA_PHONE || '+91 83175 51337',
  email: process.env.STORE_EMAIL || process.env.RAVICHANDRA_EMAIL || 'ravichandratextiles39@gmail.com',
  state: 'Andhra Pradesh',
  stateCode: '37',
  gstin: '37AAAAA0000A1Z5',
  hsnCode: '5007',
};

function formatINR(amount) {
  return '\u20B9' + Number(amount || 0).toLocaleString('en-IN');
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function numberToWordsINR(amount) {
  const num = Math.round(Number(amount) || 0);
  if (num === 0) return 'Rupees Zero Only';
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertLessThanOneThousand(n) {
    let str = '';
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + ' Hundred ';
      n %= 100;
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    }
    if (n > 0) {
      str += ones[n] + ' ';
    }
    return str.trim();
  }

  let crore = Math.floor(num / 10000000);
  let rem = num % 10000000;
  let lakh = Math.floor(rem / 100000);
  rem %= 100000;
  let thousand = Math.floor(rem / 1000);
  rem %= 1000;
  let hundred = rem;

  let words = '';
  if (crore > 0) words += convertLessThanOneThousand(crore) + ' Crore ';
  if (lakh > 0) words += convertLessThanOneThousand(lakh) + ' Lakh ';
  if (thousand > 0) words += convertLessThanOneThousand(thousand) + ' Thousand ';
  if (hundred > 0) words += convertLessThanOneThousand(hundred) + ' ';

  return 'Rupees ' + words.trim() + ' Only';
}

const STATUS_LABEL = {
  created: 'Payment Pending',
  paid: 'Paid',
  paid_oversold: 'Paid',
  cancelled: 'Cancelled',
  failed: 'Payment Failed',
};

// Renders a full, GST-compliant Tax Invoice directly onto the response stream
export function renderInvoice(res, { order, items, customer, gstSettings, contactInfo }) {
  const doc = new PDFDocument({ size: 'A4', margin: 45 });
  doc.pipe(res);

  const gstConfig = {
    enabled: gstSettings?.enabled !== false,
    rate: Number(gstSettings?.rate ?? 5),
    type: gstSettings?.type || 'inclusive',
    gstin: gstSettings?.gstin || DEFAULT_STORE.gstin,
    legalName: gstSettings?.legalName || DEFAULT_STORE.legalName,
    state: gstSettings?.state || DEFAULT_STORE.state,
    stateCode: gstSettings?.stateCode || DEFAULT_STORE.stateCode,
    hsnCode: gstSettings?.hsnCode || DEFAULT_STORE.hsnCode,
  };

  const storePhone = contactInfo?.phone || DEFAULT_STORE.phone;
  const storeEmail = contactInfo?.email || DEFAULT_STORE.email;
  const storeAddressLines = contactInfo?.address
    ? [contactInfo.address]
    : DEFAULT_STORE.addressLines;

  // Header Left: Store details + GSTIN
  try {
    doc.image(LOGO_PATH, 45, 42, { width: 34 });
  } catch {
    /* fallback if missing */
  }

  const headerLeftX = 86;
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(14).text(gstConfig.legalName, headerLeftX, 42);
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(8.5);
  let y = 58;
  for (const line of storeAddressLines) {
    doc.text(line, headerLeftX, y, { width: 250 });
    y += 11;
  }
  doc.text(`Phone: ${storePhone}  \u00B7  Email: ${storeEmail}`, headerLeftX, y);
  y += 12;

  if (gstConfig.enabled && gstConfig.gstin) {
    doc.font('Helvetica-Bold').fillColor(MAROON).text(`GSTIN: `, headerLeftX, y, { continued: true });
    doc.font('Helvetica-Bold').fillColor(INK).text(gstConfig.gstin, { continued: true });
    doc.font('Helvetica').fillColor(INK_LIGHT).text(`  \u00B7  State: ${gstConfig.state} (${gstConfig.stateCode})`);
    y += 13;
  }

  // Header Right: Invoice Title & Meta
  const isGst = gstConfig.enabled;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(isGst ? 18 : 20).text(isGst ? 'TAX INVOICE' : 'INVOICE', 0, 42, { align: 'right' });
  if (isGst) {
    doc.font('Helvetica').fontSize(8).fillColor(INK_LIGHT).text('(Original for Recipient)', 0, 62, { align: 'right' });
  }

  const invoiceNumber = order.order_number || `SK${order.id}`;
  const placeOfSupply = order.address_state || gstConfig.state;

  const metaRight = [
    ['Invoice #', invoiceNumber],
    ['Invoice Date', formatDate(order.paid_at || order.created_at)],
    ['Place of Supply', placeOfSupply],
    ['Payment Status', STATUS_LABEL[order.status] || order.status],
  ];

  if (isGst) {
    metaRight.push(['Reverse Charge', 'No']);
  }

  let metaY = isGst ? 74 : 66;
  doc.fontSize(8.5);
  for (const [label, value] of metaRight) {
    doc.font('Helvetica').fillColor(INK_LIGHT).text(label, 320, metaY, { width: 100, align: 'right' });
    doc.font('Helvetica-Bold').fillColor(INK).text(value, 430, metaY, { width: 120, align: 'right' });
    metaY += 13;
  }

  const dividerY = Math.max(y, metaY) + 8;
  doc.moveTo(45, dividerY).lineTo(550, dividerY).strokeColor(RULE).lineWidth(1).stroke();

  // ---------- Bill To / Buyer & Order Info ----------
  let blockY = dividerY + 10;
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(9).text('BILLED TO / BUYER DETAILS', 45, blockY);
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(9).text('ORDER & PAYMENT DETAILS', 320, blockY);

  blockY += 14;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(10.5).text(order.address_name || customer?.name || 'Valued Customer', 45, blockY);

  doc.font('Helvetica').fontSize(8.5).fillColor(INK_LIGHT);
  let addrY = blockY + 14;
  if (order.address_line1) { doc.text(order.address_line1, 45, addrY, { width: 250 }); addrY += 11; }
  if (order.address_line2) { doc.text(order.address_line2, 45, addrY, { width: 250 }); addrY += 11; }
  const cityLine = [order.address_city, order.address_state, order.address_pincode].filter(Boolean).join(', ');
  if (cityLine) { doc.text(cityLine, 45, addrY, { width: 250 }); addrY += 11; }
  if (order.address_mobile) { doc.text(`Mobile: ${order.address_mobile}`, 45, addrY, { width: 250 }); addrY += 11; }
  if (customer?.email) { doc.text(`Email: ${customer.email}`, 45, addrY, { width: 250 }); addrY += 11; }
  if (placeOfSupply) { doc.text(`State / Place of Supply: ${placeOfSupply}`, 45, addrY, { width: 250 }); addrY += 11; }

  // Right block: payment & fulfillment info
  let payY = blockY;
  const payInfo = [
    ['Order Ref', `#${order.id}`],
    ['Payment Method', 'Online (Razorpay / UPI / Cards)'],
    ['Razorpay Payment ID', order.razorpay_payment_id || '—'],
    ['Fulfillment Mode', order.awb_code ? `${order.courier_name || 'Courier'}: ${order.awb_code}` : 'Standard Insured Logistics'],
  ];
  for (const [k, v] of payInfo) {
    doc.font('Helvetica').fillColor(INK_LIGHT).text(k, 320, payY, { width: 105, align: 'right' });
    doc.font('Helvetica-Bold').fillColor(INK).text(v, 435, payY, { width: 115, align: 'right' });
    payY += 13;
  }

  // ---------- Line Items Table ----------
  const tableTop = Math.max(addrY, payY) + 14;
  const col = {
    sno: 45,
    item: 70,
    hsn: 285,
    qty: 345,
    price: 390,
    total: 470,
  };

  doc.rect(45, tableTop, 505, 20).fill(MAROON);
  doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(8.5);
  doc.text('#', col.sno + 6, tableTop + 6);
  doc.text('ITEM DESCRIPTION', col.item, tableTop + 6);
  doc.text('HSN/SAC', col.hsn, tableTop + 6, { width: 50, align: 'center' });
  doc.text('QTY', col.qty, tableTop + 6, { width: 35, align: 'right' });
  doc.text('RATE', col.price, tableTop + 6, { width: 65, align: 'right' });
  doc.text('AMOUNT', col.total, tableTop + 6, { width: 70, align: 'right' });

  let rowY = tableTop + 20;
  doc.font('Helvetica').fontSize(9);

  items.forEach((item, i) => {
    const rowHeight = item.variant_name ? 28 : 22;
    if (i % 2 === 1) doc.rect(45, rowY, 505, rowHeight).fill(BG_ALT);
    doc.fillColor(INK_LIGHT).text(String(i + 1), col.sno + 6, rowY + 6);

    doc.fillColor(INK).font('Helvetica-Bold').text(item.product_name, col.item, rowY + 6, { width: 210 });
    if (item.variant_name) {
      doc.font('Helvetica').fontSize(7.5).fillColor(INK_LIGHT).text(`Color: ${item.variant_name}`, col.item, rowY + 17);
      doc.fontSize(9);
    }

    doc.font('Helvetica').fillColor(INK_LIGHT).text(item.hsn || gstConfig.hsnCode, col.hsn, rowY + 6, { width: 50, align: 'center' });
    doc.fillColor(INK).text(String(item.qty), col.qty, rowY + 6, { width: 35, align: 'right' });
    doc.text(formatINR(item.price), col.price, rowY + 6, { width: 65, align: 'right' });
    doc.text(formatINR(item.price * item.qty), col.total, rowY + 6, { width: 70, align: 'right' });

    rowY += rowHeight;
  });

  doc.moveTo(45, rowY).lineTo(550, rowY).strokeColor(RULE).lineWidth(1).stroke();
  rowY += 10;

  // ---------- GST & Totals Computation ----------
  const subtotal = Number(order.subtotal || 0);
  const discount = Number(order.discount || 0);
  const shippingFee = Number(order.shipping_fee || 0);
  const netMerchandise = Math.max(0, subtotal - discount);
  const effectiveGstRate = isGst ? (order.gst_rate != null ? Number(order.gst_rate) : gstConfig.rate) : 0;
  const gstType = order.gst_type || gstConfig.type;

  let taxAmount = 0;
  let taxableValue = netMerchandise;
  if (isGst && effectiveGstRate > 0) {
    if (order.tax_amount != null && Number(order.tax_amount) > 0) {
      taxAmount = Number(order.tax_amount);
      taxableValue = gstType === 'inclusive' ? Math.max(0, netMerchandise - taxAmount) : netMerchandise;
    } else if (gstType === 'inclusive') {
      taxableValue = Math.round(netMerchandise / (1 + effectiveGstRate / 100));
      taxAmount = Math.max(0, netMerchandise - taxableValue);
    } else {
      taxableValue = netMerchandise;
      taxAmount = Math.round(taxableValue * (effectiveGstRate / 100));
    }
  }

  const finalPayable = gstType === 'exclusive'
    ? (taxableValue + taxAmount + shippingFee)
    : (netMerchandise + shippingFee);

  // Check interstate vs intrastate
  const custState = (order.address_state || '').trim().toLowerCase();
  const storeState = gstConfig.state.trim().toLowerCase();
  const isIntrastate = isGst && (custState === storeState || !custState);

  const cgstAmount = isIntrastate ? Math.round(taxAmount / 2) : 0;
  const sgstAmount = isIntrastate ? (taxAmount - cgstAmount) : 0;
  const igstAmount = !isIntrastate ? taxAmount : 0;

  // Left side: Amount in Words + Notes
  const leftBottomY = rowY;
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MAROON).text('Amount Chargeable (in words):', 45, leftBottomY);
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(INK).text(numberToWordsINR(finalPayable), 45, leftBottomY + 12, { width: 250 });

  if (isGst) {
    doc.font('Helvetica').fontSize(8).fillColor(INK_LIGHT).text(
      gstType === 'inclusive'
        ? `* Note: Retail prices shown on the store are inclusive of GST @ ${effectiveGstRate}%.`
        : `* Note: GST @ ${effectiveGstRate}% has been added as applicable on merchandise.`,
      45, leftBottomY + 36, { width: 250 }
    );
  }

  // Right side: Totals Breakdown Table
  const totalsRows = [];
  totalsRows.push(['Gross Merchandise Value', formatINR(subtotal)]);
  if (discount > 0) {
    totalsRows.push([`Coupon Discount${order.coupon_code ? ` (${order.coupon_code})` : ''}`, `-${formatINR(discount)}`]);
  }
  if (isGst && effectiveGstRate > 0) {
    totalsRows.push(['Taxable Value', formatINR(taxableValue)]);
    if (isIntrastate) {
      totalsRows.push([`CGST (${effectiveGstRate / 2}%)`, formatINR(cgstAmount)]);
      totalsRows.push([`SGST (${effectiveGstRate / 2}%)`, formatINR(sgstAmount)]);
    } else {
      totalsRows.push([`IGST (${effectiveGstRate}%)`, formatINR(igstAmount)]);
    }
  }
  totalsRows.push(['Shipping & Handling Charges', shippingFee > 0 ? formatINR(shippingFee) : 'FREE']);

  let totalsY = rowY;
  doc.font('Helvetica').fontSize(8.5);
  for (const [label, val] of totalsRows) {
    doc.fillColor(INK_LIGHT).text(label, 300, totalsY, { width: 155, align: 'right' });
    doc.fillColor(INK).text(val, 465, totalsY, { width: 85, align: 'right' });
    totalsY += 13;
  }

  totalsY += 4;
  doc.rect(300, totalsY, 250, 24).fill('#FAF6F1');
  doc.font('Helvetica-Bold').fontSize(10.5).fillColor(MAROON);
  doc.text('Total Amount Paid', 310, totalsY + 7, { width: 120 });
  doc.text(formatINR(finalPayable), 430, totalsY + 7, { width: 110, align: 'right' });

  // Signatory & Legal Box
  const signY = Math.max(leftBottomY + 65, totalsY + 35);
  doc.moveTo(45, signY).lineTo(550, signY).strokeColor(RULE).lineWidth(0.75).stroke();

  doc.font('Helvetica').fontSize(7.5).fillColor(INK_LIGHT).text(
    'Declaration: We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct.',
    45, signY + 10, { width: 300 }
  );

  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(MAROON).text(
    `For ${gstConfig.legalName}`,
    370, signY + 10, { width: 175, align: 'right' }
  );
  doc.font('Helvetica').fontSize(8).fillColor(INK_LIGHT).text(
    'Authorized Signatory',
    370, signY + 38, { width: 175, align: 'right' }
  );

  // Bottom Footer
  doc.font('Helvetica').fontSize(8).fillColor(INK_LIGHT).text(
    `Handcrafted in Dharmavaram  \u00B7  ${gstConfig.legalName}  \u00B7  Support: ${storePhone}  \u00B7  ${storeEmail}`,
    45, 770, { width: 505, align: 'center' }
  );

  doc.end();
}
