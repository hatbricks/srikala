import { useState, useEffect, useRef } from 'react';
import { api, getToken, BASE_URL } from '../../data/api';
import Seo from '../../components/Seo';
import {
  BillingIcon,
  CloseIcon,
  RefreshIcon,
  OrdersIcon,
  PrinterIcon,
  WhatsAppIcon,
  TrashIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
  PhoneIcon,
  CalendarIcon,
  RupeeIcon,
  DownloadIcon,
} from '../../components/admin/AdminIcons';

function formatINR(val) {
  return '₹' + Number(val || 0).toLocaleString('en-IN');
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function formatDateTime(d) {
  if (!d) return '—';
  return new Date(d).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Convert amount in INR to formal Words
function numberToWordsINR(amount) {
  const num = Math.round(Number(amount) || 0);
  if (num === 0) return 'Rupees Zero Only';
  const ones = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertGroup(n) {
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
  if (crore > 0) words += convertGroup(crore) + ' Crore ';
  if (lakh > 0) words += convertGroup(lakh) + ' Lakh ';
  if (thousand > 0) words += convertGroup(thousand) + ' Thousand ';
  if (hundred > 0) words += convertGroup(hundred) + ' ';

  return 'Rupees ' + words.trim() + ' Only';
}

const DEFAULT_TERMS = `• 100% Authentic Dharmavaram Handloom Pure Silk Guarantee.
• Handloom silk sarees must be dry cleaned only.
• Goods once sold can be exchanged within 7 days in original condition with this bill.
• Thank you for visiting Ravichandra Textiles!`;

export default function AdminStoreBilling() {
  const [activeTab, setActiveTab] = useState('generate'); // 'generate' | 'history'

  // Catalog products for quick select autocomplete
  const [catalogProducts, setCatalogProducts] = useState([]);

  // Form State for generating new bill
  const [form, setForm] = useState({
    bill_number: '',
    bill_date: new Date().toISOString().split('T')[0],
    customer_name: '',
    customer_phone: '',
    customer_city: '',
    customer_address: '',
    payment_method: 'Cash',
    payment_ref: '',
    split_cash_amount: 0,
    split_upi_amount: 0,
    notes: DEFAULT_TERMS,
    discount: 0,
    round_off: 0,
  });

  const [items, setItems] = useState([
    { name: '', color: '', qty: 1, rate: '', discount: 0, amount: 0 }
  ]);

  // History State
  const [bills, setBills] = useState([]);
  const [stats, setStats] = useState({
    totalBills: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    todayBills: 0,
    monthRevenue: 0,
    monthBills: 0,
  });
  const [search, setSearch] = useState('');
  const [filterDate, setFilterDate] = useState('ALL'); // 'ALL' | 'TODAY' | 'YESTERDAY' | 'WEEK' | 'MONTH' | 'CUSTOM'
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [filterPayment, setFilterPayment] = useState('ALL');
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success'|'error', text: '' }

  // Modal State for viewing/printing bill
  const [previewBill, setPreviewBill] = useState(null);
  const printRef = useRef(null);

  // Load next bill number & catalog on mount
  useEffect(() => {
    loadNextBillNumber();
    loadCatalog();
  }, []);

  // Reload history when switching to history tab or changing filters
  useEffect(() => {
    if (activeTab === 'history') {
      loadHistory();
    }
  }, [activeTab, filterDate, filterPayment, customDateFrom, customDateTo]);

  async function loadNextBillNumber() {
    try {
      const res = await api.getNextStoreBillNumber();
      if (res?.nextBillNumber) {
        setForm((prev) => ({ ...prev, bill_number: res.nextBillNumber }));
      }
    } catch {
      const y = new Date().getFullYear();
      setForm((prev) => ({ ...prev, bill_number: `RCT-SB-${y}-0001` }));
    }
  }

  async function loadCatalog() {
    try {
      const res = await api.getAllProductsAdmin();
      if (Array.isArray(res)) {
        setCatalogProducts(res);
      } else if (Array.isArray(res?.products)) {
        setCatalogProducts(res.products);
      }
    } catch (e) {
      console.warn('Failed to load products catalog for autocomplete:', e);
    }
  }

  async function loadHistory() {
    setLoadingHistory(true);
    try {
      const params = {};
      if (search.trim()) params.search = search.trim();
      if (filterPayment !== 'ALL') params.paymentMethod = filterPayment;

      const now = new Date();
      const formatYMD = (d) => {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
      };

      const todayStr = formatYMD(now);

      if (filterDate === 'TODAY') {
        params.from = todayStr;
        params.to = todayStr;
      } else if (filterDate === 'YESTERDAY') {
        const yest = new Date(now);
        yest.setDate(yest.getDate() - 1);
        const yestStr = formatYMD(yest);
        params.from = yestStr;
        params.to = yestStr;
      } else if (filterDate === 'WEEK') {
        const weekStart = new Date(now);
        weekStart.setDate(weekStart.getDate() - 6);
        params.from = formatYMD(weekStart);
        params.to = todayStr;
      } else if (filterDate === 'MONTH') {
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        params.from = formatYMD(firstDay);
        params.to = todayStr;
      } else if (filterDate === 'CUSTOM') {
        if (customDateFrom) params.from = customDateFrom;
        if (customDateTo) params.to = customDateTo;
      }

      const res = await api.getStoreBills(params);
      if (res) {
        setBills(res.bills || []);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to load store bills.' });
    } finally {
      setLoadingHistory(false);
    }
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    loadHistory();
  }

  // Item row operations
  function updateItem(index, field, value) {
    setItems((prev) => {
      const next = [...prev];
      let val = value;
      if (field === 'qty') {
        val = String(value).replace(/[^0-9]/g, '');
      } else if (field === 'rate' || field === 'discount') {
        val = String(value).replace(/[^0-9.]/g, '');
        const parts = val.split('.');
        if (parts.length > 2) {
          val = parts[0] + '.' + parts.slice(1).join('');
        }
      }

      const item = { ...next[index], [field]: val };

      // If user typed/selected a saree name matching a catalog product and rate is empty, auto-fill rate
      if (field === 'name' && (!item.rate || Number(item.rate) === 0)) {
        const matched = catalogProducts.find(
          (p) => p.name?.trim().toLowerCase() === String(val).trim().toLowerCase()
        );
        if (matched) {
          if (matched.price) item.rate = String(matched.price);
          if (!item.color) {
            const vColor = matched.variants?.[0]?.colorName || matched.variants?.[0]?.color_name;
            if (vColor) item.color = vColor;
          }
        }
      }

      const qty = Math.max(1, parseFloat(item.qty) || 1);
      const rate = Math.max(0, parseFloat(item.rate) || 0);
      const disc = Math.max(0, parseFloat(item.discount) || 0);
      item.amount = Math.max(0, Math.round(qty * rate - disc));

      next[index] = item;
      return next;
    });
  }

  function addItemRow() {
    setItems((prev) => [
      ...prev,
      { name: '', color: '', qty: 1, rate: '', discount: 0, amount: 0 }
    ]);
  }

  function addCatalogItem(prod) {
    if (!prod) return;
    const rate = Number(prod.price) || 0;
    const color = prod.variants?.[0]?.colorName || prod.variants?.[0]?.color_name || 'Traditional Pure Silk';
    setItems((prev) => [
      ...prev,
      {
        name: prod.name || '',
        color: color,
        qty: 1,
        rate: rate ? String(rate) : '',
        discount: 0,
        amount: rate || 0,
      }
    ]);
  }

  function removeItemRow(index) {
    if (items.length <= 1) {
      setItems([{ name: '', color: '', qty: 1, rate: '', discount: 0, amount: 0 }]);
      return;
    }
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  // Calculations
  const subtotal = items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0);
  const overallDiscount = Math.max(0, Number(form.discount || 0));
  const netBeforeRound = Math.max(0, subtotal - overallDiscount);
  const grandTotal = Math.round(netBeforeRound);
  const roundOff = Number((grandTotal - netBeforeRound).toFixed(2));
  const amountWords = numberToWordsINR(grandTotal);

  function resetForm() {
    setForm({
      bill_number: '',
      bill_date: new Date().toISOString().split('T')[0],
      customer_name: '',
      customer_phone: '',
      customer_city: '',
      customer_address: '',
      payment_method: 'Cash',
      payment_ref: '',
      split_cash_amount: 0,
      split_upi_amount: 0,
      notes: DEFAULT_TERMS,
      discount: 0,
      round_off: 0,
    });
    setItems([{ name: '', color: '', qty: 1, rate: '', discount: 0, amount: 0 }]);
    loadNextBillNumber();
    setFeedback(null);
  }

  async function handleSaveBill(autoPrint = false) {
    if (!form.customer_name.trim()) {
      setFeedback({ type: 'error', text: 'Please enter customer name.' });
      return;
    }

    const validItems = items.filter((it) => it.name.trim() && Number(it.rate) > 0);
    if (validItems.length === 0) {
      setFeedback({ type: 'error', text: 'Please add at least one item with a valid price.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const payload = {
      bill_number: form.bill_number,
      bill_date: form.bill_date,
      customer_name: form.customer_name.trim(),
      customer_phone: form.customer_phone.trim(),
      customer_city: form.customer_city.trim(),
      customer_address: form.customer_address.trim(),
      items: validItems,
      subtotal,
      discount: overallDiscount,
      round_off: roundOff,
      total_amount: grandTotal,
      payment_method: form.payment_method,
      payment_ref: form.payment_ref.trim(),
      split_cash_amount: Number(form.split_cash_amount || 0),
      split_upi_amount: Number(form.split_upi_amount || 0),
      notes: form.notes,
    };

    try {
      const res = await api.createStoreBill(payload);
      const savedBill = res.bill;
      setFeedback({
        type: 'success',
        text: `Bill ${savedBill.bill_number} saved successfully!`,
      });

      if (autoPrint) {
        setPreviewBill(savedBill);
        setTimeout(() => {
          printBillDirect(savedBill);
        }, 350);
      }

      resetForm();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to save store bill.' });
    } finally {
      setSubmitting(false);
    }
  }

  function handleDirectPreview() {
    if (!form.customer_name.trim()) {
      setFeedback({ type: 'error', text: 'Please enter customer name to preview bill.' });
      return;
    }
    const validItems = items.filter((it) => it.name.trim());
    const mockBill = {
      id: 'PREVIEW',
      bill_number: form.bill_number || 'RCT-SB-DRAFT',
      bill_date: form.bill_date,
      customer_name: form.customer_name,
      customer_phone: form.customer_phone,
      customer_city: form.customer_city,
      customer_address: form.customer_address,
      items: validItems.length > 0 ? validItems : [{ name: 'Sample Dharmavaram Silk Saree', qty: 1, rate: 5000, amount: 5000 }],
      subtotal: subtotal || 5000,
      discount: overallDiscount,
      round_off: roundOff,
      total_amount: grandTotal || 5000,
      payment_method: form.payment_method,
      payment_ref: form.payment_ref,
      split_cash_amount: Number(form.split_cash_amount || 0),
      split_upi_amount: Number(form.split_upi_amount || 0),
      notes: form.notes,
      created_at: new Date().toISOString(),
    };
    setPreviewBill(mockBill);
  }

  async function handleDeleteBill(id, billNum) {
    if (!window.confirm(`Delete Store Bill ${billNum}?`)) {
      return;
    }
    try {
      await api.deleteStoreBill(id);
      setFeedback({ type: 'success', text: `Bill ${billNum} deleted.` });
      loadHistory();
    } catch (err) {
      alert(err.message || 'Failed to delete bill.');
    }
  }

  async function downloadBillPdf(bill, size = 'A4') {
    if (!bill) return;
    const billId = bill.id || bill.bill_number;
    const filename = `Ravichandra_Textiles_And_Handlooms_Bill_${bill.bill_number}.pdf`;
    const token = getToken();

    // 1. Primary: fetch binary stream with auth header and trigger direct browser blob download
    try {
      const url = `${BASE_URL}/api/admin/store-bills/${billId}/pdf?size=${size}${token ? `&token=${token}` : ''}`;
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => window.URL.revokeObjectURL(blobUrl), 2000);
        return;
      }
    } catch (e) {
      console.warn('[store-billing] Blob fetch failed, falling back to direct public download:', e);
    }

    // 2. Secondary fallback: direct public link (no auth required)
    const fallbackUrl = `${BASE_URL}/api/store-bills/${bill.bill_number}/pdf?size=${size}`;
    window.open(fallbackUrl, '_blank');
  }

  function openWhatsAppBill(bill) {
    if (!bill.customer_phone) {
      alert('No customer phone number available for this bill.');
      return;
    }

    const cleanPhone = bill.customer_phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please provide a valid 10-digit mobile number to send WhatsApp bill.');
      return;
    }
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    // Direct public PDF bill URL
    const origin = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
      ? window.location.origin
      : (BASE_URL && !BASE_URL.includes('localhost') ? BASE_URL : window.location.origin);
    const pdfUrl = `${origin}/api/store-bills/${bill.bill_number}/pdf?size=A4&inline=1`;

    const isSplit = String(bill.payment_method || '').toLowerCase().includes('split') ||
      (Number(bill.split_cash_amount || 0) > 0 && Number(bill.split_upi_amount || 0) > 0);
    const payModeText = isSplit
      ? `Split Payment (Cash: ₹${formatINR(bill.split_cash_amount)} + UPI: ₹${formatINR(bill.split_upi_amount)})`
      : (bill.payment_method || 'Cash');

    const message =
      `*RAVICHANDRA TEXTILES AND HANDLOOMS — DHARMAVARAM*\n` +
      `*Authentic Pure Silk Handlooms & Royal Bridal Pattu*\n\n` +
      `Dear *${bill.customer_name}*,\n` +
      `Here is your official store bill PDF (Bill No: *${bill.bill_number}*):\n\n` +
      `📄 *View / Download Bill PDF:*\n${pdfUrl}\n\n` +
      `Total Payable: *${formatINR(bill.total_amount)}*\n` +
      `Payment Mode: *${payModeText}*\n\n` +
      `Thank you for shopping at Ravichandra Textiles and Handlooms, Dharmavaram!`;

    const waUrl = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  }

  function printBillDirect(bill) {
    const sheetEl = document.getElementById('printable-bill-sheet');
    if (!sheetEl) {
      window.print();
      return;
    }

    try {
      let iframe = document.getElementById('print-iframe-target');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'print-iframe-target';
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        document.body.appendChild(iframe);
      }

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Bill_${bill.bill_number}</title>
            <style>
              @page {
                size: 210mm 297mm;
                margin: 8mm;
              }
              * {
                box-sizing: border-box;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              body, html {
                margin: 0;
                padding: 0;
                background: #ffffff;
                width: 100%;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                color: #1e1e1e;
              }
              .bill-sheet {
                width: 194mm;
                max-width: 194mm;
                margin: 0 auto;
                background: #ffffff;
                border: 1px solid #d5cbbf;
                padding: 16px 20px;
              }
              .sheet-ornament-header {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-bottom: 6px;
              }
              .ornament-line {
                flex: 1;
                height: 1px;
                background: #b87d2b;
              }
              .ornament-gem {
                color: #b87d2b;
                font-size: 11px;
              }
              .sheet-brand-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
                padding-bottom: 8px;
                margin-bottom: 6px;
                border-bottom: 2px solid #581e15;
              }
              .sheet-logo-wrap {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 3px;
              }
              .sheet-emblem-img {
                height: 38px !important;
                max-width: 42px !important;
                width: auto !important;
                object-fit: contain !important;
                display: block !important;
              }
              .sheet-brand-title {
                margin: 0;
                font-size: 15.5px;
                font-weight: 800;
                color: #581e15;
                letter-spacing: 0.04em;
                line-height: 1.15;
                text-transform: uppercase;
              }
              .sheet-store-tagline {
                font-size: 8px;
                font-weight: 700;
                color: #8c5d1e;
                margin: 2px 0 0 0;
                line-height: 1.25;
              }
              .sheet-store-address {
                font-size: 7.8px;
                color: #333333;
                margin: 3px 0 0 0;
                line-height: 1.35;
              }
              .sheet-store-contact {
                font-size: 7.4px;
                color: #555555;
                margin: 2px 0 0 0;
                line-height: 1.35;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
              }
              .contact-separator {
                color: #b87d2b;
              }
              .sheet-meta-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
                margin: 8px 0;
                align-items: stretch;
              }
              .sheet-meta-box {
                background: #faf7f2;
                border: 1px solid #e4ddd4;
                border-radius: 4px;
                padding: 6px 10px;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                box-sizing: border-box;
                height: 100%;
                min-height: 68px;
              }
              .meta-box-label {
                font-size: 8px;
                font-weight: 700;
                color: #8c5d1e;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 3px;
                border-bottom: 1px solid #ebd9c8;
                padding-bottom: 2px;
              }
              .customer-print-name {
                font-size: 11.5px;
                font-weight: 700;
                color: #2c1810;
                margin: 0 0 2px;
                line-height: 1.25;
              }
              .customer-print-detail {
                font-size: 9px;
                color: #444444;
                margin: 0 0 2px;
                line-height: 1.3;
              }
              .meta-info-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 9px;
                line-height: 1.3;
              }
              .meta-info-table td {
                padding: 1px 0;
                color: #444444;
              }
              .print-bill-no {
                font-weight: 800;
                color: #581e15;
                font-size: 11px;
              }
              .print-pay-mode {
                font-weight: 700;
                color: #2e7d32;
              }
              .sheet-items-section {
                margin: 8px 0 0;
              }
              .sheet-items-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
              }
              .sheet-items-table th {
                background: #581e15;
                color: #ffffff;
                padding: 6px 8px;
                font-size: 9px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.03em;
              }
              .sheet-items-table td {
                padding: 6px 8px;
                border-bottom: 1px solid #e4ddd4;
                color: #222222;
              }
              .sheet-items-table tbody tr:nth-child(even) {
                background: #faf7f2;
              }
              .sheet-summary-grid {
                display: grid;
                grid-template-columns: 1fr 230px;
                gap: 12px;
                margin: 8px 0 0;
              }
              .amount-words-box {
                background: #fdfaf5;
                border: 1px dashed #cbbdae;
                border-radius: 4px;
                padding: 6px 8px;
                margin-bottom: 6px;
              }
              .words-title {
                font-size: 8px;
                font-weight: 700;
                color: #8c5d1e;
                text-transform: uppercase;
                display: block;
                margin-bottom: 2px;
              }
              .words-text {
                font-size: 10.5px;
                color: #581e15;
                line-height: 1.35;
                font-weight: 700;
              }
              .sheet-terms-box {
                font-size: 8.5px;
                color: #555555;
                line-height: 1.4;
              }
              .terms-title {
                font-weight: 700;
                color: #333333;
                display: block;
                margin-bottom: 2px;
              }
              .terms-text {
                margin: 0;
                white-space: pre-line;
              }
              .sheet-totals-table {
                width: 100%;
                border-collapse: collapse;
                font-size: 10px;
              }
              .sheet-totals-table td {
                padding: 3px 4px;
                color: #333333;
              }
              .sheet-totals-table td:last-child {
                text-align: right;
                font-weight: 600;
              }
              .grand-total-row td {
                border-top: 2px solid #581e15;
                border-bottom: 2px solid #581e15;
                padding: 6px 4px;
                background: #fdf2ea;
                color: #581e15;
              }
              .grand-total-val {
                font-size: 14px;
                font-weight: 800;
                color: #581e15;
              }
              .sheet-footer {
                display: flex;
                align-items: flex-end;
                justify-content: space-between;
                padding-top: 14px;
                margin-top: 10px;
                border-top: 1px solid #e4ddd4;
              }
              .sheet-sig-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 140px;
                font-size: 8.5px;
                color: #555555;
                text-align: center;
              }
              .sig-line {
                width: 110px;
                height: 1px;
                border-top: 1px dashed #666666;
                margin-bottom: 4px;
              }
              .store-sig strong {
                color: #581e15;
                font-size: 9px;
              }
              .sheet-seal-badge {
                text-align: center;
              }
              .purity-seal {
                display: inline-block;
                border: 1px solid #b87d2b;
                background: #fbf7f2;
                color: #8c5d1e;
                font-size: 7.5px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 999px;
              }
              .thank-you-note {
                font-size: 8px;
                color: #777777;
                margin: 3px 0 0;
                font-style: italic;
              }
            </style>
          </head>
          <body>
            ${sheetEl.outerHTML}
          </body>
        </html>
      `;

      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }, 300);
    } catch (e) {
      console.warn('Iframe printing fallback to window.print():', e);
      window.print();
    }
  }

  return (
    <div className="store-billing-page">
      <Seo title="Store Billing — Ravichandra Textiles Admin" path="/admin/billing" noindex />

      {/* Screen-Only Clean Header */}
      <div className="billing-topbar screen-only">
        <div className="topbar-left">
          <div className="billing-title-badge">
            <BillingIcon width={18} height={18} />
            <h1>Store Billing</h1>
            <span className="nongst-tag">Non-GST Cash Memo</span>
          </div>
          <p className="billing-subtitle">
            Counter billing and customer receipts for Dharmavaram flagship store.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="billing-nav-pills">
          <button
            type="button"
            className={`pill-btn ${activeTab === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveTab('generate')}
          >
            <PlusIcon width={14} height={14} />
            <span>New Bill</span>
          </button>
          <button
            type="button"
            className={`pill-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <OrdersIcon width={14} height={14} />
            <span>Bills History</span>
            {stats.totalBills > 0 && <span className="pill-count">{stats.totalBills}</span>}
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`billing-alert screen-only alert-${feedback.type}`}>
          <span>{feedback.text}</span>
          <button type="button" onClick={() => setFeedback(null)} className="alert-close">
            <CloseIcon width={12} height={12} />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: STREAMLINED SIMPLE STORE BILLING */}
      {/* ========================================================================= */}
      {activeTab === 'generate' && (
        <div className="billing-container screen-only">
          {/* Card 1: Fast Customer & Bill Info Row */}
          <div className="card-box customer-bill-box">
            <div className="fields-grid-top">
              <label className="input-group">
                <span className="input-title">
                  <UserIcon width={13} height={13} />
                  <span>Customer Name <span className="req">*</span></span>
                </span>
                <input
                  type="text"
                  required
                  placeholder="Enter customer name"
                  value={form.customer_name}
                  onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
                />
              </label>

              <label className="input-group">
                <span className="input-title">
                  <PhoneIcon width={13} height={13} />
                  <span>Phone / WhatsApp</span>
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 98480 12345"
                  value={form.customer_phone}
                  onChange={(e) => setForm({ ...form, customer_phone: e.target.value })}
                />
              </label>

              <label className="input-group">
                <span className="input-title">
                  <span>City / Town</span>
                </span>
                <input
                  type="text"
                  placeholder="e.g. Dharmavaram / Bengaluru"
                  value={form.customer_city}
                  onChange={(e) => setForm({ ...form, customer_city: e.target.value })}
                />
              </label>

              <label className="input-group">
                <span className="input-title">
                  <span>Bill No</span>
                </span>
                <div className="input-row-action">
                  <input
                    type="text"
                    value={form.bill_number}
                    onChange={(e) => setForm({ ...form, bill_number: e.target.value })}
                    placeholder="RCT-SB-2026-0001"
                  />
                  <button
                    type="button"
                    className="btn-tiny-refresh"
                    onClick={loadNextBillNumber}
                    title="Next sequential number"
                  >
                    <RefreshIcon width={12} height={12} />
                  </button>
                </div>
              </label>

              <label className="input-group">
                <span className="input-title">
                  <CalendarIcon width={13} height={13} />
                  <span>Bill Date</span>
                </span>
                <input
                  type="date"
                  value={form.bill_date}
                  onChange={(e) => setForm({ ...form, bill_date: e.target.value })}
                />
              </label>

              <label className="input-group">
                <span className="input-title">
                  <span>Payment Mode</span>
                </span>
                <select
                  value={form.payment_method}
                  onChange={(e) => {
                    const nextMode = e.target.value;
                    if (nextMode === 'Split') {
                      const half = Math.floor(grandTotal / 2);
                      const rem = Math.max(0, grandTotal - half);
                      setForm({
                        ...form,
                        payment_method: nextMode,
                        split_cash_amount: form.split_cash_amount || half,
                        split_upi_amount: form.split_upi_amount || rem
                      });
                    } else {
                      setForm({ ...form, payment_method: nextMode });
                    }
                  }}
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI (GPay / PhonePe)</option>
                  <option value="Card">Card (POS)</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Split">Split (Cash + UPI)</option>
                </select>
              </label>
            </div>

            {form.payment_method === 'Split' && (
              <div className="split-pay-panel" style={{
                background: '#fdf9f4',
                border: '1px solid #ebd9c8',
                borderRadius: '8px',
                padding: '12px 16px',
                marginTop: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#581e15' }}>
                      ⚡ Split Payment Distribution
                    </span>
                    <span style={{ fontSize: '11px', background: '#ebd9c8', color: '#581e15', padding: '2px 8px', borderRadius: '10px', fontWeight: 700 }}>
                      Total to Settle: ₹{formatINR(grandTotal)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const half = Math.floor(grandTotal / 2);
                      const rem = Math.max(0, grandTotal - half);
                      setForm({ ...form, split_cash_amount: half, split_upi_amount: rem });
                    }}
                    style={{
                      background: '#581e15',
                      color: '#ffffff',
                      border: 'none',
                      padding: '5px 12px',
                      borderRadius: '5px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Quick 50 / 50 Split (₹{formatINR(Math.floor(grandTotal / 2))} each)
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
                  <label className="input-group" style={{ marginBottom: 0 }}>
                    <span className="input-title">💵 Cash Portion (₹)</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 2500"
                      value={form.split_cash_amount === 0 ? '' : form.split_cash_amount}
                      onChange={(e) => {
                        const val = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
                        const autoUpi = typeof val === 'number' ? Math.max(0, grandTotal - val) : form.split_upi_amount;
                        setForm({ ...form, split_cash_amount: val, split_upi_amount: autoUpi });
                      }}
                      style={{ fontWeight: 700, color: '#1a1a1a' }}
                    />
                  </label>

                  <label className="input-group" style={{ marginBottom: 0 }}>
                    <span className="input-title">📱 UPI / Online Portion (₹)</span>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="e.g. 2500"
                      value={form.split_upi_amount === 0 ? '' : form.split_upi_amount}
                      onChange={(e) => {
                        const val = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value) || 0);
                        setForm({ ...form, split_upi_amount: val });
                      }}
                      style={{ fontWeight: 700, color: '#1a1a1a' }}
                    />
                  </label>

                  <label className="input-group" style={{ marginBottom: 0 }}>
                    <span className="input-title">UPI Ref / UTR No (Optional)</span>
                    <input
                      type="text"
                      placeholder="e.g. 48392019"
                      value={form.payment_ref || ''}
                      onChange={(e) => setForm({ ...form, payment_ref: e.target.value })}
                    />
                  </label>
                </div>

                <div style={{ marginTop: '10px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px dashed #ebd9c8', paddingTop: '8px' }}>
                  <span>
                    Cash: <strong>₹{formatINR(Number(form.split_cash_amount || 0))}</strong> + UPI: <strong>₹{formatINR(Number(form.split_upi_amount || 0))}</strong> = <strong>₹{formatINR(Number(form.split_cash_amount || 0) + Number(form.split_upi_amount || 0))}</strong>
                  </span>
                  {Math.abs((Number(form.split_cash_amount || 0) + Number(form.split_upi_amount || 0)) - grandTotal) < 0.01 ? (
                    <span style={{ color: '#2e7d32', fontWeight: 800 }}>✓ Settled: Exactly matches Total (₹{formatINR(grandTotal)})</span>
                  ) : (
                    <span style={{ color: '#c2410c', fontWeight: 700 }}>
                      ⚠️ Difference: ₹{formatINR(Math.abs(grandTotal - (Number(form.split_cash_amount || 0) + Number(form.split_upi_amount || 0))))} {grandTotal > (Number(form.split_cash_amount || 0) + Number(form.split_upi_amount || 0)) ? 'remaining' : 'over'}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Card 2: Items Table (Full Width & Clean with Manual Entry & Web Products) */}
          <div className="card-box items-table-card">
            <div className="items-card-head">
              <div className="items-head-left">
                <span className="items-heading">Saree Particulars &amp; Items</span>
                <span className="items-subheading">Type saree name &amp; price directly into the table cells below</span>
              </div>
              <div className="items-head-actions">
                <button type="button" className="btn-add-manual" onClick={addItemRow}>
                  <PlusIcon width={13} height={13} />
                  <span>+ Add Saree Item</span>
                </button>
                {catalogProducts.length > 0 && (
                  <select
                    className="select-add-catalog-head"
                    onChange={(e) => {
                      if (e.target.value) {
                        const p = catalogProducts.find((x) => String(x.id) === String(e.target.value));
                        if (p) addCatalogItem(p);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>+ Pick from Web Catalog ▾</option>
                    {catalogProducts.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (₹{Number(p.price).toLocaleString('en-IN')})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div className="table-responsive">
              <table className="store-items-table">
                <thead>
                  <tr>
                    <th style={{ width: '4%' }}>#</th>
                    <th style={{ width: '40%' }}>Saree Particulars / Name (Type Directly)</th>
                    <th style={{ width: '18%' }}>Color / Design</th>
                    <th style={{ width: '8%', textAlign: 'center' }}>Qty</th>
                    <th style={{ width: '14%', textAlign: 'right' }}>Rate / Price (₹)</th>
                    <th style={{ width: '8%', textAlign: 'right' }}>Disc (₹)</th>
                    <th style={{ width: '14%', textAlign: 'right' }}>Amount (₹)</th>
                    <th style={{ width: '4%', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="cell-num">{idx + 1}</td>
                      <td>
                        <input
                          type="text"
                          placeholder="Type saree name (e.g. Dharmavaram Pure Silk Saree)"
                          value={it.name}
                          onChange={(e) => updateItem(idx, 'name', e.target.value)}
                          list="saree-catalog-list"
                          autoComplete="off"
                          required
                          className="input-saree-name"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="e.g. Royal Red / Zari"
                          value={it.color}
                          onChange={(e) => updateItem(idx, 'color', e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <input
                          type="text"
                          inputMode="numeric"
                          style={{ textAlign: 'center' }}
                          value={it.qty}
                          onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                          placeholder="1"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          inputMode="decimal"
                          style={{ textAlign: 'right' }}
                          placeholder="0"
                          value={it.rate}
                          onChange={(e) => updateItem(idx, 'rate', e.target.value)}
                          required
                          className="input-manual-price"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          inputMode="decimal"
                          style={{ textAlign: 'right' }}
                          placeholder="0"
                          value={it.discount}
                          onChange={(e) => updateItem(idx, 'discount', e.target.value)}
                        />
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <span className="row-total-val">{formatINR(it.amount)}</span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button
                          type="button"
                          className="btn-delete-row"
                          onClick={() => removeItemRow(idx)}
                          title="Remove item"
                        >
                          <TrashIcon width={13} height={13} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {catalogProducts.length > 0 && (
                <datalist id="saree-catalog-list">
                  {catalogProducts.map((p) => (
                    <option key={p.id} value={p.name}>
                      ₹{Number(p.price).toLocaleString('en-IN')}
                    </option>
                  ))}
                </datalist>
              )}
            </div>

            <div className="table-actions-bottom">
              <button type="button" className="btn-add-item-ghost" onClick={addItemRow}>
                <PlusIcon width={13} height={13} />
                <span>+ Add Saree Item</span>
              </button>
            </div>
          </div>

          {/* Card 3: Bottom Calculation & Actions */}
          <div className="billing-footer-grid">
            <div className="card-box terms-box">
              <label className="input-group">
                <span className="input-title">Store Terms &amp; Conditions / Customer Note</span>
                <textarea
                  rows="3"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                />
              </label>
              <div className="words-summary-tag">
                <span className="words-sub-title">Total in Words:</span>
                <p className="words-content">{amountWords}</p>
              </div>
            </div>

            <div className="card-box totals-summary-card">
              <div className="totals-table">
                <div className="totals-line">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'}):</span>
                  <strong>{formatINR(subtotal)}</strong>
                </div>

                <div className="totals-line">
                  <span>Special Discount (₹):</span>
                  <input
                    type="number"
                    min="0"
                    className="calc-discount-input"
                    value={form.discount}
                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                  />
                </div>

                {roundOff !== 0 && (
                  <div className="totals-line">
                    <span>Round Off:</span>
                    <span>{roundOff > 0 ? `+${formatINR(roundOff)}` : formatINR(roundOff)}</span>
                  </div>
                )}

                <div className="totals-divider" />

                <div className="totals-grand-row">
                  <div>
                    <span className="grand-title">Net Payable</span>
                    <small className="grand-subtitle">Non-GST Retail Total</small>
                  </div>
                  <strong className="grand-number">{formatINR(grandTotal)}</strong>
                </div>
              </div>

              <div className="button-group-actions">
                <button
                  type="button"
                  className="btn-primary-print"
                  disabled={submitting}
                  onClick={() => handleSaveBill(true)}
                  title="Print bill directly to connected printer and store in database"
                >
                  <PrinterIcon width={16} height={16} />
                  <span>{submitting ? 'Printing & Storing…' : 'Print Bill'}</span>
                </button>

                <div className="button-sub-row">
                  <button
                    type="button"
                    className="btn-subtle"
                    onClick={handleDirectPreview}
                  >
                    <span>Preview Bill</span>
                  </button>
                  <button
                    type="button"
                    className="btn-reset-link"
                    onClick={resetForm}
                  >
                    <span>Clear Form</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STORE BILLS HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="billing-history-view screen-only">
          {/* Stat Cards with clean SVG icons */}
          <div className="history-kpis-grid">
            <div className="kpi-box">
              <div className="kpi-icon-wrap icon-maroon">
                <RupeeIcon width={18} height={18} />
              </div>
              <div className="kpi-content">
                <span className="kpi-heading">Total Store Sales</span>
                <strong className="kpi-figure">{formatINR(stats.totalRevenue)}</strong>
                <span className="kpi-meta">All-time store revenue</span>
              </div>
            </div>

            <div className="kpi-box">
              <div className="kpi-icon-wrap icon-gold">
                <BillingIcon width={18} height={18} />
              </div>
              <div className="kpi-content">
                <span className="kpi-heading">Number of Payments</span>
                <strong className="kpi-figure">{stats.totalBills}</strong>
                <span className="kpi-meta">Total bills generated</span>
              </div>
            </div>

            <div className="kpi-box">
              <div className="kpi-icon-wrap icon-emerald">
                <CalendarIcon width={18} height={18} />
              </div>
              <div className="kpi-content">
                <span className="kpi-heading">Overall Month Total</span>
                <strong className="kpi-figure">{formatINR(stats.monthRevenue)}</strong>
                <span className="kpi-meta">{stats.monthBills} bills this month</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="history-search-card">
            <form onSubmit={handleSearchSubmit} className="search-form-wrap">
              <div className="search-input-field">
                <SearchIcon width={15} height={15} />
                <input
                  type="text"
                  placeholder="Search by customer name, phone, bill no, or city…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button type="submit" className="btn-search-submit">Search</button>
              {search && (
                <button
                  type="button"
                  className="btn-search-clear"
                  onClick={() => { setSearch(''); loadHistory(); }}
                >
                  Clear
                </button>
              )}
            </form>

            <div className="filter-controls">
              <div className="select-wrap">
                <span>Date:</span>
                <select value={filterDate} onChange={(e) => setFilterDate(e.target.value)}>
                  <option value="ALL">All Time</option>
                  <option value="TODAY">Today</option>
                  <option value="YESTERDAY">Yesterday</option>
                  <option value="WEEK">This Week (Last 7 Days)</option>
                  <option value="MONTH">This Month</option>
                  <option value="CUSTOM">Custom Date Selection…</option>
                </select>
              </div>

              {filterDate === 'CUSTOM' && (
                <div className="custom-date-inputs">
                  <div className="date-input-wrap">
                    <span>From:</span>
                    <input
                      type="date"
                      value={customDateFrom}
                      onChange={(e) => setCustomDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="date-input-wrap">
                    <span>To:</span>
                    <input
                      type="date"
                      value={customDateTo}
                      onChange={(e) => setCustomDateTo(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <div className="select-wrap">
                <span>Payment:</span>
                <select value={filterPayment} onChange={(e) => setFilterPayment(e.target.value)}>
                  <option value="ALL">All Methods</option>
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Split">Split</option>
                </select>
              </div>

              <button
                type="button"
                className="btn-refresh-history"
                onClick={loadHistory}
                title="Refresh bills list"
              >
                <RefreshIcon width={13} height={13} />
              </button>
            </div>
          </div>

          {/* Active Filter & Summary Banner */}
          <div className="history-summary-bar">
            <span className="summary-text">
              Showing <strong>{bills.length}</strong> {bills.length === 1 ? 'bill' : 'bills'}
              {bills.length > 0 && (
                <> &bull; Filtered Total: <strong>{formatINR(bills.reduce((sum, b) => sum + Number(b.total_amount || 0), 0))}</strong></>
              )}
            </span>
            {(filterDate !== 'ALL' || filterPayment !== 'ALL' || search || customDateFrom || customDateTo) && (
              <button
                type="button"
                className="btn-clear-all-filters"
                onClick={() => {
                  setFilterDate('ALL');
                  setFilterPayment('ALL');
                  setSearch('');
                  setCustomDateFrom('');
                  setCustomDateTo('');
                }}
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* Table Card */}
          <div className="history-data-card">
            {loadingHistory ? (
              <div className="empty-state">
                <p>Loading store bills…</p>
              </div>
            ) : bills.length === 0 ? (
              <div className="empty-state">
                <p>No store bills found.</p>
                <button
                  type="button"
                  className="btn-create-first"
                  onClick={() => setActiveTab('generate')}
                >
                  <PlusIcon width={13} height={13} />
                  <span>Generate New Bill</span>
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="history-table">
                  <thead>
                    <tr>
                      <th>Bill No</th>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Items Purchased</th>
                      <th>Payment</th>
                      <th style={{ textAlign: 'right' }}>Total Amount</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills.map((b) => {
                      const itms = Array.isArray(b.items) ? b.items : [];
                      return (
                        <tr key={b.id}>
                          <td>
                            <button
                              type="button"
                              className="btn-bill-tag"
                              onClick={() => setPreviewBill(b)}
                              title="Click to view/print bill"
                            >
                              {b.bill_number}
                            </button>
                          </td>
                          <td className="cell-date">{formatDate(b.bill_date)}</td>
                          <td>
                            <div className="cust-info">
                              <strong>{b.customer_name}</strong>
                              {b.customer_phone && <span className="cust-phone">{b.customer_phone}</span>}
                              {b.customer_city && <span className="cust-city">{b.customer_city}</span>}
                            </div>
                          </td>
                          <td>
                            <div className="items-cell">
                              <span className="items-badge">{itms.length} {itms.length === 1 ? 'item' : 'items'}</span>
                              <span className="items-names">
                                {itms.map((i) => i.name).filter(Boolean).slice(0, 2).join(', ')}
                                {itms.length > 2 ? ` +${itms.length - 2} more` : ''}
                              </span>
                            </div>
                          </td>
                          <td>
                            {String(b.payment_method || '').toLowerCase().includes('split') || (Number(b.split_cash_amount || 0) > 0 && Number(b.split_upi_amount || 0) > 0) ? (
                              <div>
                                <span className="pay-pill pill-split" style={{ background: '#581e15', color: '#ffffff', fontWeight: 700 }}>
                                  Split (Cash + UPI)
                                </span>
                                <div style={{ fontSize: '11px', color: '#581e15', fontWeight: 600, marginTop: '2px' }}>
                                  💵 ₹{formatINR(b.split_cash_amount)} + 📱 ₹{formatINR(b.split_upi_amount)}
                                </div>
                              </div>
                            ) : (
                              <span className={`pay-pill pill-${(b.payment_method || 'cash').toLowerCase()}`}>
                                {b.payment_method || 'Cash'}
                              </span>
                            )}
                            {b.payment_ref && <span className="pay-ref">Ref: {b.payment_ref}</span>}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <strong className="cell-grand-total">{formatINR(b.total_amount)}</strong>
                          </td>
                          <td>
                            <div className="actions-cell">
                              <button
                                type="button"
                                className="action-btn"
                                onClick={() => setPreviewBill(b)}
                                title="Print Bill"
                              >
                                <PrinterIcon width={13} height={13} />
                                <span>Print</span>
                              </button>
                              {b.customer_phone && (
                                <button
                                  type="button"
                                  className="action-btn action-btn-wa"
                                  onClick={() => openWhatsAppBill(b)}
                                  title="Send to WhatsApp"
                                >
                                  <WhatsAppIcon width={13} height={13} />
                                  <span>WhatsApp</span>
                                </button>
                              )}
                              <button
                                type="button"
                                className="action-btn action-btn-del"
                                onClick={() => handleDeleteBill(b.id, b.bill_number)}
                                title="Delete Bill"
                              >
                                <TrashIcon width={13} height={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ROYAL PRINTABLE BILL MODAL (Without Emojis, Official Logo, Clean Typography) */}
      {/* ========================================================================= */}
      {previewBill && (
        <div className="bill-modal-backdrop">
          <div className="bill-modal-window">
            {/* Modal Screen-Only Control Bar */}
            <div className="bill-modal-screen-bar screen-only">
              <div className="modal-title-left">
                <strong>Ravichandra Textiles and Handlooms — Store Bill</strong>
                <span>#{previewBill.bill_number}</span>
                <span className="format-badge-a4">A4 Print Standard</span>
              </div>

              <div className="modal-actions-right">
                <button
                  type="button"
                  className="btn-print-action"
                  onClick={() => printBillDirect(previewBill)}
                  title="Print directly to connected A4 printer"
                >
                  <PrinterIcon width={14} height={14} />
                  <span>Print Bill (A4)</span>
                </button>

                <button
                  type="button"
                  className="btn-pdf-action"
                  onClick={() => downloadBillPdf(previewBill)}
                  title="Download bill in vector PDF format"
                >
                  <DownloadIcon width={14} height={14} />
                  <span>Download PDF</span>
                </button>

                {previewBill.customer_phone && (
                  <button
                    type="button"
                    className="btn-wa-action"
                    onClick={() => openWhatsAppBill(previewBill)}
                    title="Send PDF bill link and message to customer on WhatsApp"
                  >
                    <WhatsAppIcon width={14} height={14} />
                    <span>Send via WhatsApp</span>
                  </button>
                )}

                <button
                  type="button"
                  className="btn-close-modal"
                  onClick={() => setPreviewBill(null)}
                  title="Close preview"
                >
                  <CloseIcon width={16} height={16} />
                </button>
              </div>
            </div>

            {/* Printable Document Sheet Container */}
            <div className="bill-sheet-container" ref={printRef}>
              <div
                id="printable-bill-sheet"
                className="bill-sheet sheet-size-a4"
              >
                {/* Traditional Ornament Line */}
                <div className="sheet-ornament-header">
                  <div className="ornament-line" />
                  <span className="ornament-gem">❖</span>
                  <div className="ornament-line" />
                </div>

                {/* Brand Header — Middle Top Logo, Centered Brand & Showroom Details */}
                <header className="sheet-brand-header centered-brand-header">
                  <div className="sheet-logo-wrap">
                    <img
                      src="/images/ravichandra-emblem.png"
                      alt="Ravichandra Textiles and Handlooms"
                      className="sheet-emblem-img"
                    />
                  </div>
                  <h2 className="sheet-brand-title">RAVICHANDRA TEXTILES AND HANDLOOMS</h2>
                  <p className="sheet-store-tagline">
                    Authentic Dharmavaram Pure Silk Handlooms &amp; Royal Bridal Pattu
                  </p>
                  <p className="sheet-store-address">
                    10-28, Kpt street, near Punjab National Bank, Dharmavaram, Andhra Pradesh - 515671
                  </p>
                  <p className="sheet-store-contact">
                    <span><strong>Phone:</strong> +91 83175 51337</span>
                    <span className="contact-separator">•</span>
                    <span><strong>Email:</strong> ravichandratextiles39@gmail.com</span>
                  </p>
                </header>

                {/* Details Meta Block */}
                <section className="sheet-meta-grid">
                  <div className="sheet-meta-box">
                    <div className="meta-box-label">Billed To (Customer Details)</div>
                    <h4 className="customer-print-name">{previewBill.customer_name}</h4>
                    {previewBill.customer_phone && (
                      <p className="customer-print-detail"><strong>Phone / Mobile:</strong> +91 {previewBill.customer_phone}</p>
                    )}
                    {previewBill.customer_city && (
                      <p className="customer-print-detail"><strong>City / Town:</strong> {previewBill.customer_city}</p>
                    )}
                    {previewBill.customer_address && (
                      <p className="customer-print-detail"><strong>Address:</strong> {previewBill.customer_address}</p>
                    )}
                  </div>

                  <div className="sheet-meta-box">
                    <div className="meta-box-label">Bill Particulars</div>
                    <table className="meta-info-table">
                      <tbody>
                        <tr>
                          <td><strong>Bill No:</strong></td>
                          <td><span className="print-bill-no">{previewBill.bill_number}</span></td>
                        </tr>
                        <tr>
                          <td><strong>Date &amp; Time:</strong></td>
                          <td>{previewBill.created_at ? formatDateTime(previewBill.created_at) : formatDate(previewBill.bill_date)}</td>
                        </tr>
                        {String(previewBill.payment_method || '').toLowerCase().includes('split') || (Number(previewBill.split_cash_amount || 0) > 0 && Number(previewBill.split_upi_amount || 0) > 0) ? (
                          <>
                            <tr>
                              <td><strong>Payment Mode:</strong></td>
                              <td><span className="print-pay-mode" style={{ color: '#581e15' }}>Split (Cash + UPI)</span></td>
                            </tr>
                            <tr>
                              <td><strong>Paid by Cash:</strong></td>
                              <td><strong>₹{formatINR(previewBill.split_cash_amount)}</strong></td>
                            </tr>
                            <tr>
                              <td><strong>Paid by UPI:</strong></td>
                              <td><strong>₹{formatINR(previewBill.split_upi_amount)}</strong>{previewBill.payment_ref ? ` (${previewBill.payment_ref})` : ''}</td>
                            </tr>
                          </>
                        ) : (
                          <>
                            <tr>
                              <td><strong>Payment Mode:</strong></td>
                              <td><span className="print-pay-mode">{previewBill.payment_method || 'Cash'}</span></td>
                            </tr>
                            {previewBill.payment_ref && (
                              <tr>
                                <td><strong>Pay Ref / UTR:</strong></td>
                                <td>{previewBill.payment_ref}</td>
                              </tr>
                            )}
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Items Table */}
                <section className="sheet-items-section">
                  <table className="sheet-items-table">
                    <thead>
                      <tr>
                        <th style={{ width: '6%' }}>S.No</th>
                        <th style={{ width: '44%' }}>Saree Particulars &amp; Description</th>
                        <th style={{ width: '18%' }}>Color / Design</th>
                        <th style={{ width: '8%', textAlign: 'center' }}>Qty</th>
                        <th style={{ width: '12%', textAlign: 'right' }}>Rate (₹)</th>
                        <th style={{ width: '12%', textAlign: 'right' }}>Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(Array.isArray(previewBill.items) ? previewBill.items : []).map((it, idx) => (
                        <tr key={idx}>
                          <td style={{ textAlign: 'center' }}>{idx + 1}</td>
                          <td>
                            <strong>{it.name}</strong>
                          </td>
                          <td>{it.color || 'Traditional Pure Silk'}</td>
                          <td style={{ textAlign: 'center' }}>{it.qty || 1}</td>
                          <td style={{ textAlign: 'right' }}>{Number(it.rate || 0).toLocaleString('en-IN')}</td>
                          <td style={{ textAlign: 'right' }}><strong>{Number(it.amount || 0).toLocaleString('en-IN')}</strong></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>

                {/* Totals & Summary Block (Seamlessly directly under items table) */}
                <section className="sheet-summary-grid">
                  <div className="sheet-words-column">
                    <div className="amount-words-box">
                      <span className="words-title">Amount Chargeable in Words:</span>
                      <strong className="words-text">{numberToWordsINR(previewBill.total_amount)}</strong>
                    </div>

                    <div className="sheet-terms-box">
                      <span className="terms-title">Terms &amp; Store Conditions:</span>
                      <p className="terms-text">{previewBill.notes || DEFAULT_TERMS}</p>
                    </div>
                  </div>

                  <div className="sheet-totals-column">
                    <table className="sheet-totals-table">
                      <tbody>
                        <tr>
                          <td>Subtotal:</td>
                          <td>{formatINR(previewBill.subtotal)}</td>
                        </tr>
                        {Number(previewBill.discount || 0) > 0 && (
                          <tr className="totals-disc-row">
                            <td>Special Discount:</td>
                            <td>- {formatINR(previewBill.discount)}</td>
                          </tr>
                        )}
                        {Number(previewBill.round_off || 0) !== 0 && (
                          <tr>
                            <td>Round Off:</td>
                            <td>{previewBill.round_off > 0 ? `+${formatINR(previewBill.round_off)}` : formatINR(previewBill.round_off)}</td>
                          </tr>
                        )}
                        <tr className="grand-total-row">
                          <td>
                            <strong>TOTAL PAYABLE:</strong>
                          </td>
                          <td>
                            <strong className="grand-total-val">{formatINR(previewBill.total_amount)}</strong>
                          </td>
                        </tr>
                        {(String(previewBill.payment_method || '').toLowerCase().includes('split') || (Number(previewBill.split_cash_amount || 0) > 0 && Number(previewBill.split_upi_amount || 0) > 0)) && (
                          <>
                            <tr style={{ background: '#fdf8f4', color: '#581e15', fontSize: '9px', fontWeight: 700 }}>
                              <td>Paid by Cash:</td>
                              <td style={{ textAlign: 'right' }}>₹{formatINR(previewBill.split_cash_amount)}</td>
                            </tr>
                            <tr style={{ background: '#fdf8f4', color: '#581e15', fontSize: '9px', fontWeight: 700 }}>
                              <td>Paid by UPI:</td>
                              <td style={{ textAlign: 'right' }}>₹{formatINR(previewBill.split_upi_amount)}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Footer Signatures */}
                <footer className="sheet-footer">
                  <div className="sheet-sig-box customer-sig">
                    <div className="sig-line" />
                    <span>Customer Signature</span>
                  </div>

                  <div className="sheet-seal-badge">
                    <div className="purity-seal">
                      <span>CERTIFIED DHARMAVARAM HANDLOOM SILK</span>
                    </div>
                    <p className="thank-you-note">Thank you for patronizing authentic Indian handlooms!</p>
                  </div>

                  <div className="sheet-sig-box store-sig">
                    <div className="sig-line" />
                    <strong>For RAVICHANDRA TEXTILES AND HANDLOOMS</strong>
                    <span>Authorized Signatory</span>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CLEAN, ELEGANT CSS (NO EMOJIS, COMPACT & INTUITIVE) */}
      {/* ========================================================================= */}
      <style>{`
        .store-billing-page {
          padding-bottom: 40px;
          min-width: 0;
          color: var(--ink-900);
        }

        /* Top Header */
        .billing-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .billing-title-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .billing-title-badge h1 {
          font-size: 24px;
          font-weight: 700;
          color: var(--ink-900);
          margin: 0;
        }

        .nongst-tag {
          font-size: 11px;
          font-weight: 600;
          color: #8c5d1e;
          background: #fdf5ea;
          border: 1px solid rgba(184, 125, 43, 0.25);
          padding: 2px 8px;
          border-radius: 999px;
        }

        .billing-subtitle {
          font-size: 13px;
          color: var(--ink-500);
          margin: 4px 0 0;
        }

        .billing-nav-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          padding: 4px;
          border-radius: 8px;
        }

        .pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 6px;
          border: none;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink-600);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .pill-btn:hover {
          color: var(--ink-900);
          background: var(--stone-100);
        }

        .pill-btn.active {
          background: #581e15;
          color: #ffffff;
        }

        .pill-count {
          background: rgba(255, 255, 255, 0.22);
          color: #ffffff;
          padding: 1px 6px;
          border-radius: 999px;
          font-size: 11px;
        }

        .pill-btn:not(.active) .pill-count {
          background: var(--stone-200);
          color: var(--ink-700);
        }

        .billing-alert {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          border-radius: 6px;
          font-size: 13px;
          margin-bottom: 16px;
        }

        .alert-success {
          background: #e8f5e9;
          border: 1px solid #c8e6c9;
          color: #2e7d32;
        }

        .alert-error {
          background: #ffebee;
          border: 1px solid #ffcdd2;
          color: #c62828;
        }

        .alert-close {
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 2px;
        }

        /* Generic Card Box */
        .card-box {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 18px 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .billing-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Card 1: Fast Customer & Bill Top Grid */
        .customer-bill-box {
          padding: 16px 20px;
        }

        .fields-grid-top {
          display: grid;
          grid-template-columns: 1.4fr 1.1fr 1fr 1fr 0.9fr 1fr;
          gap: 14px;
          align-items: flex-end;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-width: 0;
        }

        .input-title {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: var(--ink-700);
        }

        .input-title svg {
          color: var(--ink-400);
        }

        .req { color: #b91c1c; }

        .input-group input,
        .input-group select,
        .input-group textarea {
          font-size: 13px;
          padding: 7px 10px;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          background: #ffffff;
          color: var(--ink-900);
          font-family: inherit;
          box-sizing: border-box;
          width: 100%;
        }

        .input-group input:focus,
        .input-group select:focus,
        .input-group textarea:focus {
          outline: none;
          border-color: #581e15;
          box-shadow: 0 0 0 2px rgba(88, 30, 21, 0.1);
        }

        .input-row-action {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .btn-tiny-refresh {
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 7px 8px;
          cursor: pointer;
          color: var(--ink-600);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-tiny-refresh:hover {
          background: var(--stone-200);
          color: var(--ink-900);
        }

        /* Card 2: Full Width Table */
        .items-table-card {
          padding: 16px 20px;
        }

        .items-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .items-head-left {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .items-heading {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink-900);
        }

        .items-subheading {
          font-size: 11px;
          color: var(--ink-500);
        }

        .items-head-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn-add-manual {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #581e15;
          color: #ffffff;
          border: none;
          padding: 6px 13px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .btn-add-manual:hover {
          background: #41140d;
        }

        .select-add-catalog-head {
          font-size: 12px;
          font-weight: 600;
          color: #8c5d1e;
          background: #fdfaf5;
          border: 1px solid rgba(184, 125, 43, 0.4);
          padding: 6px 10px;
          border-radius: 6px;
          cursor: pointer;
        }

        .select-add-catalog-head:hover {
          border-color: #8c5d1e;
        }

        .btn-add-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #581e15;
          color: #ffffff;
          border: none;
          padding: 6px 13px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .btn-add-item:hover {
          background: #41140d;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .store-items-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
        }

        .store-items-table th {
          background: var(--stone-50);
          color: var(--ink-600);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          padding: 8px 10px;
          border-bottom: 1px solid var(--stone-200);
        }

        .store-items-table td {
          padding: 8px 6px;
          border-bottom: 1px solid var(--stone-100);
          vertical-align: middle;
        }

        .cell-num {
          color: #8c5d1e;
          font-weight: 700;
          text-align: center;
        }

        .store-items-table input {
          font-size: 13px;
          padding: 8px 10px;
          border: 1.5px solid #d1d5db;
          border-radius: 6px;
          width: 100%;
          box-sizing: border-box;
          background: #ffffff;
          color: #111827;
          font-family: inherit;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .store-items-table input:focus {
          outline: none;
          border-color: #581e15;
          box-shadow: 0 0 0 3px rgba(88, 30, 21, 0.12);
          background: #ffffff;
        }

        .input-saree-name {
          font-weight: 600;
          color: #111827;
          letter-spacing: 0.01em;
        }

        .input-manual-price {
          font-weight: 700 !important;
          color: #581e15 !important;
          font-size: 13.5px !important;
        }

        .row-total-val {
          font-size: 13.5px;
          font-weight: 700;
          color: #581e15;
        }

        .btn-delete-row {
          background: none;
          border: none;
          color: var(--ink-400);
          cursor: pointer;
          padding: 5px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-delete-row:hover {
          color: #b91c1c;
          background: #ffebee;
        }

        .table-actions-bottom {
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .btn-add-item-ghost {
          background: transparent;
          border: 1px dashed var(--stone-300);
          color: #581e15;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.15s ease;
        }

        .btn-add-item-ghost:hover {
          background: var(--stone-50);
          border-color: #581e15;
        }

        .btn-catalog-ghost {
          border-color: rgba(184, 125, 43, 0.45);
          color: #8c5d1e;
        }

        .btn-catalog-ghost:hover {
          background: #fdf8f0;
          border-color: #8c5d1e;
        }

        /* Card 3: Bottom Calculation & Actions Grid */
        .billing-footer-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 16px;
          align-items: flex-start;
        }

        .terms-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .words-summary-tag {
          background: var(--stone-50);
          border: 1px solid var(--stone-200);
          border-radius: 6px;
          padding: 9px 12px;
        }

        .words-sub-title {
          font-size: 10.5px;
          font-weight: 700;
          color: #8c5d1e;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }

        .words-content {
          font-size: 12.5px;
          font-weight: 600;
          color: #2c1810;
          margin: 0;
        }

        .totals-summary-card {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .totals-table {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .totals-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
          color: var(--ink-700);
        }

        .calc-discount-input {
          width: 80px;
          text-align: right;
          font-size: 12.5px;
          padding: 3px 6px;
          border: 1px solid var(--stone-300);
          border-radius: 4px;
        }

        .totals-divider {
          height: 1px;
          background: var(--stone-200);
          margin: 4px 0;
        }

        .totals-grand-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          background: #fdf5ea;
          border: 1px solid rgba(184, 125, 43, 0.25);
          padding: 10px 12px;
          border-radius: 6px;
        }

        .grand-title {
          font-size: 13px;
          font-weight: 700;
          color: #581e15;
          display: block;
        }

        .grand-subtitle {
          font-size: 10px;
          color: var(--ink-500);
        }

        .grand-number {
          font-size: 20px;
          font-weight: 800;
          color: #581e15;
        }

        .button-group-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--stone-100);
        }

        .btn-primary-print {
          width: 100%;
          padding: 10px 14px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #581e15;
          color: #ffffff;
          border: 1px solid #581e15;
          box-shadow: 0 2px 6px rgba(88, 30, 21, 0.2);
          transition: background 0.15s ease;
        }

        .btn-primary-print:hover:not(:disabled) {
          background: #41140d;
        }

        .button-sub-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr 0.8fr;
          gap: 6px;
        }

        .btn-subtle {
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          background: var(--stone-100);
          color: var(--ink-800);
          border: 1px solid var(--stone-300);
        }

        .btn-subtle:hover {
          background: var(--stone-200);
        }

        .btn-reset-link {
          background: none;
          border: none;
          color: var(--ink-500);
          font-size: 11.5px;
          cursor: pointer;
          text-align: center;
        }

        .btn-reset-link:hover {
          color: #b91c1c;
          text-decoration: underline;
        }

        /* ======================== TAB 2 HISTORY ======================== */
        .billing-history-view {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .history-kpis-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 14px;
        }

        .kpi-box {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .kpi-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .icon-maroon { background: #fdf2ea; color: #581e15; }
        .icon-gold { background: #fef7e6; color: #8c5d1e; }
        .icon-emerald { background: #e8f5e9; color: #2e7d32; }
        .icon-blue { background: #e3f2fd; color: #1565c0; }

        .kpi-content {
          display: flex;
          flex-direction: column;
        }

        .kpi-heading {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-500);
          text-transform: uppercase;
        }

        .kpi-figure {
          font-size: 17px;
          font-weight: 800;
          color: var(--ink-900);
        }

        .kpi-meta {
          font-size: 11px;
          color: var(--ink-400);
        }

        .history-search-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          padding: 10px 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          flex-wrap: wrap;
        }

        .search-form-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          min-width: 260px;
        }

        .search-input-field {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 0 10px;
          background: #ffffff;
        }

        .search-input-field svg {
          color: var(--ink-400);
        }

        .search-input-field input {
          width: 100%;
          border: none;
          font-size: 12.5px;
          padding: 7px 0;
          outline: none;
        }

        .btn-search-submit {
          background: #581e15;
          color: #ffffff;
          border: none;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-search-clear {
          background: var(--stone-100);
          border: 1px solid var(--stone-300);
          padding: 7px 10px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }

        .filter-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .select-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--ink-600);
        }

        .select-wrap select {
          font-size: 12px;
          padding: 5px 8px;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          background: #ffffff;
        }

        .custom-date-inputs {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .date-input-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          color: var(--ink-600);
          background: #faf7f2;
          border: 1px solid var(--stone-300);
          border-radius: 6px;
          padding: 3px 8px;
        }

        .date-input-wrap input {
          border: none;
          background: transparent;
          font-size: 12px;
          color: #111827;
          outline: none;
          font-family: inherit;
        }

        .history-summary-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 9px 14px;
          background: #faf7f2;
          border: 1px solid #ebd9c8;
          border-radius: 6px;
          font-size: 12.5px;
          color: #581e15;
        }

        .history-summary-bar strong {
          color: #581e15;
          font-weight: 700;
        }

        .btn-clear-all-filters {
          background: none;
          border: none;
          color: #8c5d1e;
          font-size: 11.5px;
          font-weight: 600;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        .btn-clear-all-filters:hover {
          color: #581e15;
        }

        .btn-refresh-history {
          background: var(--stone-100);
          border: 1px solid var(--stone-200);
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          color: var(--ink-600);
          display: flex;
          align-items: center;
        }

        .history-data-card {
          background: var(--paper);
          border: 1px solid var(--stone-200);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }

        .empty-state {
          padding: 36px 20px;
          text-align: center;
          color: var(--ink-500);
          font-size: 13.5px;
        }

        .btn-create-first {
          margin-top: 10px;
          background: #581e15;
          color: #ffffff;
          border: none;
          padding: 7px 14px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .history-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          text-align: left;
        }

        .history-table th {
          background: var(--stone-50);
          padding: 9px 12px;
          font-size: 11px;
          font-weight: 700;
          color: var(--ink-600);
          text-transform: uppercase;
          letter-spacing: 0.03em;
          border-bottom: 1px solid var(--stone-200);
        }

        .history-table td {
          padding: 10px 12px;
          border-bottom: 1px solid var(--stone-100);
          vertical-align: middle;
        }

        .history-table tr:hover {
          background: var(--stone-50);
        }

        .btn-bill-tag {
          background: #fdf2ea;
          color: #581e15;
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 11.5px;
          font-weight: 700;
          border: 1px solid rgba(88, 30, 21, 0.2);
          cursor: pointer;
        }

        .btn-bill-tag:hover {
          text-decoration: underline;
        }

        .cell-date {
          color: var(--ink-600);
          font-size: 12px;
          white-space: nowrap;
        }

        .cust-info {
          display: flex;
          flex-direction: column;
        }

        .cust-phone {
          font-size: 11px;
          color: var(--ink-500);
        }

        .cust-city {
          font-size: 11px;
          color: var(--ink-400);
        }

        .items-cell {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .items-badge {
          font-size: 11px;
          font-weight: 600;
          color: var(--ink-700);
        }

        .items-names {
          font-size: 11px;
          color: var(--ink-400);
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .pay-pill {
          font-size: 10.5px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
          display: inline-block;
        }

        .pill-cash { background: #e8f5e9; color: #2e7d32; }
        .pill-upi { background: #f3e5f5; color: #7b1fa2; }
        .pill-card { background: #e3f2fd; color: #1565c0; }
        .pill-bank { background: #fff3e0; color: #e65100; }

        .pay-ref {
          display: block;
          font-size: 10px;
          color: var(--ink-400);
          margin-top: 2px;
        }

        .cell-grand-total {
          font-size: 14px;
          color: #581e15;
          font-weight: 800;
        }

        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 4px 8px;
          border-radius: 5px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid var(--stone-200);
          background: #ffffff;
          color: var(--ink-700);
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          background: #581e15;
          color: #ffffff;
          border-color: #581e15;
        }

        .action-btn-wa {
          color: #25D366;
          border-color: rgba(37, 211, 102, 0.4);
        }

        .action-btn-wa:hover {
          background: #25D366 !important;
          color: #ffffff !important;
          border-color: #25D366 !important;
        }

        .action-btn-del {
          color: #b91c1c;
          padding: 4px 6px;
        }

        .action-btn-del:hover {
          background: #ffebee !important;
          border-color: #ffcdd2 !important;
          color: #c62828 !important;
        }

        /* ======================== MODAL STYLING ======================== */
        .bill-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(0, 0, 0, 0.65);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .bill-modal-window {
          background: #ffffff;
          border-radius: 10px;
          width: 100%;
          max-width: 1000px;
          max-height: 94vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .bill-modal-screen-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 18px;
          background: #2c1810;
          color: #ffffff;
          flex-shrink: 0;
          gap: 12px;
          flex-wrap: wrap;
        }

        .modal-title-left {
          display: flex;
          flex-direction: column;
        }

        .modal-title-left strong {
          font-size: 13.5px;
          color: #fbdfa2;
        }

        .modal-title-left span {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.7);
        }

        .format-badge-a4 {
          background: rgba(184, 125, 43, 0.25);
          color: #fce2b8;
          border: 1px solid rgba(184, 125, 43, 0.4);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 4px;
          margin-top: 2px;
          display: inline-block;
          width: fit-content;
        }

        .modal-actions-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-print-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #581e15;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-print-action:hover {
          background: #41140d;
        }

        .btn-pdf-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #b87d2b;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-pdf-action:hover {
          background: #9c661d;
        }

        .btn-wa-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #25D366;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-wa-action:hover {
          background: #1eb956;
        }

        .btn-close-modal {
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: #ffffff;
          padding: 5px;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bill-sheet-container {
          flex: 1;
          overflow-y: auto;
          background: #736b65;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        /* ======================== PRINTABLE SHEET (A4 STANDARD) ======================== */
        .bill-sheet {
          background: #ffffff;
          color: #1e1e1e;
          width: 100%;
          max-width: 760px;
          height: auto;
          min-height: auto;
          box-sizing: border-box;
          box-shadow: 0 4px 24px rgba(0,0,0,0.18);
          border: 1px solid #d5cbbf;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          padding: 18px 22px;
          margin: 0 auto;
        }

        .sheet-ornament-header {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .ornament-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, #b87d2b, transparent);
        }

        .ornament-gem {
          color: #b87d2b;
          font-size: 11px;
        }

        /* Centered Brand Header: Middle Top Logo, Centered Store Details */
        .sheet-brand-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 10px;
          margin-bottom: 8px;
          border-bottom: 2px solid #581e15;
        }

        .sheet-logo-wrap {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 4px;
        }

        .sheet-emblem-img {
          height: 42px;
          width: auto;
          max-width: 44px;
          object-fit: contain;
          display: block;
        }

        .sheet-brand-title {
          font-size: 17.5px;
          font-weight: 800;
          color: #581e15;
          letter-spacing: 0.04em;
          margin: 0;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .sheet-store-tagline {
          font-size: 8.8px;
          font-weight: 700;
          color: #8c5d1e;
          margin: 2px 0 0 0;
          line-height: 1.25;
        }

        .sheet-store-address {
          font-size: 8.5px;
          color: #333333;
          margin: 3px 0 0 0;
          line-height: 1.35;
        }

        .sheet-store-contact {
          font-size: 8px;
          color: #555555;
          margin: 2px 0 0 0;
          line-height: 1.35;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .contact-separator {
          color: #b87d2b;
        }

        .sheet-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin: 8px 0;
          align-items: stretch;
        }

        .sheet-meta-box {
          background: #faf7f2;
          border: 1px solid #e4ddd4;
          border-radius: 5px;
          padding: 6px 10px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          box-sizing: border-box;
          height: 100%;
          min-height: 68px;
        }

        .meta-box-label {
          font-size: 8.5px;
          font-weight: 700;
          color: #8c5d1e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 3px;
          border-bottom: 1px solid #ebd9c8;
          padding-bottom: 2px;
        }

        .customer-print-name {
          font-size: 12px;
          font-weight: 700;
          color: #2c1810;
          margin: 0 0 2px;
          line-height: 1.25;
        }

        .customer-print-detail {
          font-size: 9.5px;
          color: #444444;
          margin: 0 0 2px;
          line-height: 1.3;
        }

        .meta-info-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 9.5px;
          line-height: 1.3;
        }

        .meta-info-table td {
          padding: 1.5px 0;
          color: #444444;
        }

        .print-bill-no {
          font-weight: 800;
          color: #581e15;
          font-size: 11.5px;
        }

        .print-pay-mode {
          font-weight: 700;
          color: #2e7d32;
        }

        .sheet-items-section {
          margin: 6px 0 0;
        }

        .sheet-items-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .sheet-items-table th {
          background: #581e15;
          color: #ffffff;
          padding: 6px 8px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .sheet-items-table td {
          padding: 5px 8px;
          border-bottom: 1px solid #e4ddd4;
          color: #222222;
        }

        .sheet-items-table tbody tr:nth-child(even) {
          background: #faf7f2;
        }

        .sheet-summary-grid {
          display: grid;
          grid-template-columns: 1fr 270px;
          gap: 10px;
          margin: 8px 0 0;
        }

        .amount-words-box {
          background: #fdfaf5;
          border: 1px dashed #cbbdae;
          border-radius: 5px;
          padding: 6px 8px;
          margin-bottom: 4px;
        }

        .words-title {
          font-size: 8.5px;
          font-weight: 700;
          color: #8c5d1e;
          text-transform: uppercase;
          display: block;
          margin-bottom: 2px;
        }

        .words-text {
          font-size: 11px;
          color: #581e15;
          line-height: 1.3;
          font-weight: 700;
        }

        .sheet-terms-box {
          font-size: 9px;
          color: #555555;
          line-height: 1.35;
        }

        .terms-title {
          font-weight: 700;
          color: #333333;
          display: block;
          margin-bottom: 2px;
        }

        .terms-text {
          margin: 0;
          white-space: pre-line;
        }

        .sheet-totals-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .sheet-totals-table td {
          padding: 2.5px 4px;
          color: #333333;
        }

        .sheet-totals-table td:last-child {
          text-align: right;
          font-weight: 600;
        }

        .totals-disc-row td {
          color: #2e7d32;
        }

        .grand-total-row td {
          border-top: 2px solid #581e15;
          border-bottom: 2px solid #581e15;
          padding: 5px 6px;
          background: #fdf2ea;
          color: #581e15;
        }

        .grand-total-val {
          font-size: 15px;
          font-weight: 800;
          color: #581e15;
        }

        .sheet-footer {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding-top: 12px;
          margin-top: 8px;
          border-top: 1px solid #e4ddd4;
        }

        .sheet-sig-box {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 170px;
          font-size: 9.5px;
          color: #555555;
          text-align: center;
        }

        .sig-line {
          width: 130px;
          height: 1px;
          border-top: 1px dashed #666666;
          margin-bottom: 4px;
        }

        .store-sig strong {
          color: #581e15;
          font-size: 10px;
        }

        .sheet-seal-badge {
          text-align: center;
        }

        .purity-seal {
          display: inline-block;
          border: 1px solid #b87d2b;
          background: #fbf7f2;
          color: #8c5d1e;
          font-size: 8px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 999px;
          letter-spacing: 0.04em;
        }

        .thank-you-note {
          font-size: 9px;
          color: #777777;
          margin: 2px 0 0;
          font-style: italic;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .fields-grid-top {
            grid-template-columns: 1fr 1fr 1fr;
          }
          .billing-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .fields-grid-top {
            grid-template-columns: 1fr;
          }
          .sheet-brand-header {
            text-align: center;
          }
          .sheet-meta-grid, .sheet-summary-grid {
            grid-template-columns: 1fr;
          }
          .button-sub-row {
            grid-template-columns: 1fr;
          }
        }

        /* ======================== PRINT MEDIA QUERIES ======================== */
        @media print {
          .screen-only,
          .admin-sidebar,
          .admin-header,
          .admin-mobile-quicknav,
          .billing-topbar,
          .billing-alert,
          .billing-nav-pills,
          .billing-container,
          .billing-history-view,
          .bill-modal-screen-bar {
            display: none !important;
          }

          body, html {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            overflow: visible !important;
          }

          .store-billing-page {
            padding: 0 !important;
          }

          .admin-shell, .admin-main, .admin-main-container {
            display: block !important;
            height: auto !important;
            overflow: visible !important;
            padding: 0 !important;
            margin: 0 !important;
          }

          .bill-modal-backdrop {
            position: static !important;
            background: none !important;
            padding: 0 !important;
            display: block !important;
          }

          .bill-modal-window {
            box-shadow: none !important;
            border: none !important;
            max-width: 100% !important;
            max-height: none !important;
            overflow: visible !important;
          }

          .bill-sheet-container {
            background: none !important;
            padding: 0 !important;
            display: block !important;
          }

          .bill-sheet {
            box-shadow: none !important;
            border: 1px solid #d5cbbf !important;
            max-width: 100% !important;
            padding: 10mm 14mm !important;
            margin: 0 auto !important;
            page-break-after: avoid !important;
          }

          .sheet-emblem-img,
          .sheet-logo-img {
            height: 36px !important;
            max-width: 40px !important;
            width: auto !important;
            object-fit: contain !important;
            display: block !important;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          @page {
            size: auto;
            margin: 8mm;
          }
        }
      `}</style>
    </div>
  );
}
