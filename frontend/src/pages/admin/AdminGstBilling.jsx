import React, { useState, useEffect, useRef } from 'react';
import Seo from '../../components/Seo';
import { getToken } from '../../data/api';
import {
  GstBillingIcon,
  PrinterIcon,
  DownloadIcon,
  WhatsAppIcon,
  CloseIcon,
  SearchIcon,
  CalendarIcon,
  RupeeIcon,
  PlusIcon,
  TrashIcon,
  RefreshIcon,
  SaveIcon,
  EyeIcon,
  SettingsIcon,
  StoreIcon
} from '../../components/admin/AdminIcons';

const BASE_URL = import.meta.env.VITE_API_URL || '';

function formatINR(amount) {
  const num = Number(amount || 0);
  return num.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return String(dateStr);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  } catch {
    return String(dateStr);
  }
}

function numberToWordsINR(amount) {
  const num = Math.round(Number(amount || 0));
  if (num === 0) return 'Rupees Zero Only';

  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function convertTwoDigits(n) {
    if (n === 0) return '';
    if (n < 10) return units[n];
    if (n < 20) return teens[n - 10];
    const unit = n % 10;
    return tens[Math.floor(n / 10)] + (unit !== 0 ? ' ' + units[unit] : '');
  }

  function convertThreeDigits(n) {
    const hundred = Math.floor(n / 100);
    const remainder = n % 100;
    let res = '';
    if (hundred > 0) {
      res += units[hundred] + ' Hundred';
      if (remainder > 0) res += ' ';
    }
    if (remainder > 0) {
      res += convertTwoDigits(remainder);
    }
    return res;
  }

  let crore = Math.floor(num / 10000000);
  let remAfterCrore = num % 10000000;
  let lakh = Math.floor(remAfterCrore / 100000);
  let remAfterLakh = remAfterCrore % 100000;
  let thousand = Math.floor(remAfterLakh / 1000);
  let remainder = remAfterLakh % 1000;

  let words = '';
  if (crore > 0) words += convertThreeDigits(crore) + ' Crore ';
  if (lakh > 0) words += convertThreeDigits(lakh) + ' Lakh ';
  if (thousand > 0) words += convertThreeDigits(thousand) + ' Thousand ';
  if (remainder > 0) words += convertThreeDigits(remainder) + ' ';

  return 'Rupees ' + words.trim() + ' Only';
}

export default function AdminGstBilling() {
  const [activeTab, setActiveTab] = useState('new'); // 'new' | 'history' | 'settings'

  // Settings State
  const [settings, setSettings] = useState({
    store_name: 'RAVICHANDRA HANDLOOMS',
    store_gstin: '37AYPPR2420N1ZU',
    store_pan: 'AYPPR2420N',
    store_cell: '9493049274, 8317551337',
    store_tagline: 'Hand Loom Pure Lace SILK SAREES Manufacturers',
    store_address: 'Door No. 11/412, Janardhan Complex, Thogata Street,\nDHARMAVARAM-515 671. Sree Satya SaiDist. (A.P.)',
    bank_name: 'Indian Bank',
    bank_account_no: '7653499335',
    bank_ifsc: 'IDIB000D083',
    invoice_prefix: 'RCH-GST-',
    default_hsn: '5007',
    default_sgst_rate: 2.5,
    default_cgst_rate: 2.5,
    default_igst_rate: 5.0,
    terms: [
      '1. This is to certify that we have valid registration under GST & all above informations are true and correct.',
      '2. Our Goods are claimless & Goods once sold cannot be taken back.',
      '3. Our responsibility ceases after handover the goods to transporter.',
      '4. Subject to Dharmavaram jurisdiction.'
    ]
  });

  // Invoice Form State
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporter, setTransporter] = useState('');
  const [reverseCharge, setReverseCharge] = useState('No');
  const [agentName, setAgentName] = useState('');

  // Receiver (Billed To) State
  const [receiverName, setReceiverName] = useState('');
  const [receiverGstin, setReceiverGstin] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverState, setReceiverState] = useState('Andhra Pradesh (37)');
  const [receiverAddress, setReceiverAddress] = useState('');

  // Line items
  const [items, setItems] = useState([
    { id: 1, hsn_code: '5007', description: 'Pure Silk Dharmavaram Wedding Pattu Sarees', qty: 1, rate: 8500, amount: 8500 }
  ]);

  // Tax State
  const [taxType, setTaxType] = useState('INTRA_STATE'); // 'INTRA_STATE' (CGST+SGST) | 'INTER_STATE' (IGST) | 'CUSTOM'
  const [sgstRate, setSgstRate] = useState(2.5);
  const [cgstRate, setCgstRate] = useState(2.5);
  const [igstRate, setIgstRate] = useState(5.0);

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [paymentRef, setPaymentRef] = useState('');
  const [notes, setNotes] = useState('');

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [previewBill, setPreviewBill] = useState(null);
  const printRef = useRef(null);

  // History State
  const [historyList, setHistoryList] = useState([]);
  const [historyStats, setHistoryStats] = useState({
    total_invoices: 0,
    total_taxable: 0,
    total_sgst: 0,
    total_cgst: 0,
    total_igst: 0,
    total_amount: 0,
  });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [filterPreset, setFilterPreset] = useState('all'); // 'all' | 'today' | 'yesterday' | 'week' | 'month' | 'custom'
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  // Product catalog for quick-pick
  const [catalog, setCatalog] = useState([]);

  // Load Settings, Next Invoice Number & Catalog on Mount
  useEffect(() => {
    loadSettings();
    loadNextInvoiceNumber();
    loadCatalog();
  }, []);

  // Reload history when switching to history tab or filters change
  useEffect(() => {
    if (activeTab === 'history') {
      loadHistory();
    }
  }, [activeTab, filterPreset, customFrom, customTo, historySearch]);

  async function loadSettings() {
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/api/admin/gst-bills/settings`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) {
          setSettings(data.settings);
          setSgstRate(data.settings.default_sgst_rate || 2.5);
          setCgstRate(data.settings.default_cgst_rate || 2.5);
          setIgstRate(data.settings.default_igst_rate || 5.0);
        }
      }
    } catch (err) {
      console.warn('Failed to load GST settings:', err);
    }
  }

  async function saveSettings(e) {
    if (e) e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/api/admin/gst-bills/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      setFeedback({ type: 'success', text: 'GST Settings & CMS configuration saved successfully!' });
    } catch (err) {
      setFeedback({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  }

  async function loadNextInvoiceNumber() {
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/api/admin/gst-bills/next-number`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        if (data.nextInvoiceNumber) {
          setInvoiceNumber(data.nextInvoiceNumber);
        }
      }
    } catch (err) {
      console.warn('Failed to load next invoice number:', err);
    }
  }

  async function loadCatalog() {
    try {
      const res = await fetch(`${BASE_URL}/api/products?limit=100`);
      if (res.ok) {
        const data = await res.json();
        setCatalog(data.products || data || []);
      }
    } catch (err) {
      console.warn('Failed to load product catalog:', err);
    }
  }

  // Calculations
  const taxableAmount = Math.round(items.reduce((sum, it) => sum + (Number(it.amount) || 0), 0) * 100) / 100;

  let activeSgstRate = 0;
  let activeCgstRate = 0;
  let activeIgstRate = 0;
  let sgstAmount = 0;
  let cgstAmount = 0;
  let igstAmount = 0;

  if (taxType === 'INTRA_STATE') {
    activeSgstRate = Number(sgstRate) || 0;
    activeCgstRate = Number(cgstRate) || 0;
    sgstAmount = Math.round((taxableAmount * (activeSgstRate / 100)) * 100) / 100;
    cgstAmount = Math.round((taxableAmount * (activeCgstRate / 100)) * 100) / 100;
  } else if (taxType === 'INTER_STATE') {
    activeIgstRate = Number(igstRate) || 0;
    igstAmount = Math.round((taxableAmount * (activeIgstRate / 100)) * 100) / 100;
  } else {
    activeSgstRate = Number(sgstRate) || 0;
    activeCgstRate = Number(cgstRate) || 0;
    activeIgstRate = Number(igstRate) || 0;
    sgstAmount = Math.round((taxableAmount * (activeSgstRate / 100)) * 100) / 100;
    cgstAmount = Math.round((taxableAmount * (activeCgstRate / 100)) * 100) / 100;
    igstAmount = Math.round((taxableAmount * (activeIgstRate / 100)) * 100) / 100;
  }

  const rawTotal = taxableAmount + sgstAmount + cgstAmount + igstAmount;
  const roundedTotal = Math.round(rawTotal);
  const roundOff = Math.round((roundedTotal - rawTotal) * 100) / 100;
  const totalAmount = roundedTotal;
  const amountInWords = numberToWordsINR(totalAmount);

  // Line item modifiers
  function addItemRow() {
    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        hsn_code: settings.default_hsn || '5007',
        description: '',
        qty: 1,
        rate: 0,
        amount: 0,
      },
    ]);
  }

  function removeItemRow(idx) {
    if (items.length <= 1) return;
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function updateItemRow(idx, field, value) {
    setItems((prev) => {
      const copy = [...prev];
      const row = { ...copy[idx], [field]: value };
      const qty = Math.max(1, parseFloat(row.qty) || 1);
      const rate = Math.max(0, parseFloat(row.rate) || 0);
      row.amount = Math.round(qty * rate * 100) / 100;
      copy[idx] = row;
      return copy;
    });
  }

  function quickPickProduct(idx, product) {
    if (!product) return;
    setItems((prev) => {
      const copy = [...prev];
      copy[idx] = {
        ...copy[idx],
        description: product.name,
        rate: product.price || 0,
        amount: Math.round((copy[idx].qty || 1) * (product.price || 0) * 100) / 100,
        hsn_code: product.hsn_code || settings.default_hsn || '5007',
      };
      return copy;
    });
  }

  function resetForm() {
    loadNextInvoiceNumber();
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setVehicleNo('');
    setTransporter('');
    setReverseCharge('No');
    setAgentName('');
    setReceiverName('');
    setReceiverGstin('');
    setReceiverPhone('');
    setReceiverAddress('');
    setItems([
      { id: Date.now(), hsn_code: settings.default_hsn || '5007', description: '', qty: 1, rate: 0, amount: 0 }
    ]);
    setTaxType('INTRA_STATE');
    setPaymentMethod('Bank Transfer');
    setPaymentRef('');
    setNotes('');
    setFeedback(null);
  }

  // Create & Save GST Invoice
  async function handleSubmitInvoice(autoPrint = false) {
    setFeedback(null);
    if (!receiverName.trim()) {
      setFeedback({ type: 'error', text: 'Please provide Receiver (Customer) Name.' });
      return;
    }

    const validItems = items.filter((it) => it.description && it.description.trim());
    if (validItems.length === 0) {
      setFeedback({ type: 'error', text: 'Please add at least one valid item with a description.' });
      return;
    }

    setSubmitting(true);
    try {
      const token = getToken();
      const payload = {
        invoice_number: invoiceNumber,
        invoice_date: invoiceDate,
        vehicle_no: vehicleNo,
        transporter,
        reverse_charge: reverseCharge,
        agent_name: agentName,
        receiver_name: receiverName,
        receiver_gstin: receiverGstin,
        receiver_phone: receiverPhone,
        receiver_state: receiverState,
        receiver_address: receiverAddress,
        items: validItems,
        tax_type: taxType,
        sgst_rate: activeSgstRate,
        cgst_rate: activeCgstRate,
        igst_rate: activeIgstRate,
        bank_name: settings.bank_name,
        bank_account_no: settings.bank_account_no,
        bank_ifsc: settings.bank_ifsc,
        terms: settings.terms,
        store_name: settings.store_name,
        store_gstin: settings.store_gstin,
        store_pan: settings.store_pan,
        store_cell: settings.store_cell,
        store_tagline: settings.store_tagline,
        store_address: settings.store_address,
        payment_method: paymentMethod,
        payment_ref: paymentRef,
        notes,
      };

      const res = await fetch(`${BASE_URL}/api/admin/gst-bills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save GST invoice');
      }

      setFeedback({
        type: 'success',
        text: `GST Invoice #${data.bill.invoice_number} saved successfully!`,
      });

      if (autoPrint) {
        setPreviewBill(data.bill);
        setTimeout(() => {
          printBillDirect(data.bill);
        }, 350);
      }

      resetForm();
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Error creating invoice' });
    } finally {
      setSubmitting(false);
    }
  }

  // Load History
  async function loadHistory() {
    setHistoryLoading(true);
    try {
      const token = getToken();
      const params = new URLSearchParams();

      if (historySearch.trim()) params.append('search', historySearch.trim());

      // Date preset calculations
      const now = new Date();
      if (filterPreset === 'today') {
        const todayStr = now.toISOString().split('T')[0];
        params.append('from', todayStr);
        params.append('to', todayStr);
      } else if (filterPreset === 'yesterday') {
        const y = new Date(now);
        y.setDate(y.getDate() - 1);
        const yStr = y.toISOString().split('T')[0];
        params.append('from', yStr);
        params.append('to', yStr);
      } else if (filterPreset === 'week') {
        const w = new Date(now);
        w.setDate(w.getDate() - 7);
        params.append('from', w.toISOString().split('T')[0]);
        params.append('to', now.toISOString().split('T')[0]);
      } else if (filterPreset === 'month') {
        const m = new Date(now.getFullYear(), now.getMonth(), 1);
        params.append('from', m.toISOString().split('T')[0]);
        params.append('to', now.toISOString().split('T')[0]);
      } else if (filterPreset === 'custom') {
        if (customFrom) params.append('from', customFrom);
        if (customTo) params.append('to', customTo);
      }

      const res = await fetch(`${BASE_URL}/api/admin/gst-bills?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        const data = await res.json();
        setHistoryList(data.bills || []);
        if (data.stats) setHistoryStats(data.stats);
      }
    } catch (err) {
      console.warn('Failed to load history:', err);
    } finally {
      setHistoryLoading(false);
    }
  }

  // Delete invoice
  async function deleteInvoice(id) {
    if (!window.confirm('Are you sure you want to delete this GST invoice permanently?')) return;
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/api/admin/gst-bills/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (res.ok) {
        loadHistory();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Delete failed');
    }
  }

  // Vector PDF download
  async function downloadBillPdf(bill) {
    if (!bill) return;
    const invoiceId = bill.id || bill.invoice_number;
    const filename = `GST_Invoice_${bill.invoice_number}.pdf`;
    const token = getToken();

    try {
      const url = `${BASE_URL}/api/admin/gst-bills/${invoiceId}/pdf${token ? `?token=${token}` : ''}`;
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
    } catch (err) {
      console.warn('Direct blob download failed, falling back:', err);
    }

    const publicUrl = `${BASE_URL}/api/gst-bills/public/${bill.invoice_number}/pdf`;
    window.open(publicUrl, '_blank');
  }

  // WhatsApp share
  function openWhatsAppBill(bill) {
    if (!bill) return;
    const phone = bill.receiver_phone || '';
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please provide a valid 10-digit mobile number to send WhatsApp bill.');
      return;
    }
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const origin = (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
      ? window.location.origin
      : (BASE_URL && !BASE_URL.includes('localhost') ? BASE_URL : window.location.origin);
    const pdfUrl = `${origin}/api/gst-bills/public/${bill.invoice_number}/pdf?inline=1`;

    const message =
      `*${bill.store_name || 'RAVICHANDRA HANDLOOMS'} — DHARMAVARAM*\n` +
      `*GST Tax Invoice (Bill No: ${bill.invoice_number})*\n\n` +
      `Dear *${bill.receiver_name}*,\n` +
      `Thank you for your valued order! Please find your official GST Tax Invoice below:\n\n` +
      `📄 *View / Download GST Invoice PDF:*\n${pdfUrl}\n\n` +
      `Taxable Value: *₹${formatINR(bill.taxable_amount)}*\n` +
      `Total Payable: *₹${formatINR(bill.total_amount)}*\n` +
      `Payment Mode: *${bill.payment_method || 'Bank Transfer'}*\n\n` +
      `Thank you for patronizing authentic Dharmavaram silk handlooms!`;

    const waUrl = `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  }

  // Direct Browser Printing (A4 driver)
  function printBillDirect(bill) {
    const sheetEl = document.getElementById('printable-gst-bill-sheet');
    if (!sheetEl) {
      window.print();
      return;
    }

    try {
      let iframe = document.getElementById('gst-print-iframe-target');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'gst-print-iframe-target';
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
            <title>GST_Invoice_${bill.invoice_number}</title>
            <style>
              @page {
                size: 210mm 297mm;
                margin: 6mm 8mm;
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
                color: #000000;
              }
              .gst-bill-outer-border {
                border: 2px solid #000000;
                padding: 3px;
                background: #ffffff;
                width: 194mm;
                max-width: 194mm;
                margin: 0 auto;
              }
              .gst-bill-inner-border {
                border: 1px solid #000000;
                padding: 4px;
                background: #ffffff;
                position: relative;
              }
              .gst-header-grid {
                display: flex;
                gap: 8px;
                align-items: stretch;
                margin-bottom: 4px;
              }
              .deity-box {
                width: 78px;
                flex-shrink: 0;
                border: 1px solid #000000;
                padding: 1px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #ffffff;
              }
              .deity-img {
                width: 100%;
                height: 110px;
                object-fit: cover;
                display: block;
              }
              .header-center-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                text-align: center;
              }
              .header-top-row {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
              }
              .gstin-pan-box {
                text-align: left;
                font-size: 10.5px;
                font-weight: 800;
                line-height: 1.3;
              }
              .gst-invoice-badge {
                border: 1px solid #000000;
                padding: 2px 10px;
                font-size: 11px;
                font-weight: 800;
                letter-spacing: 0.05em;
                background: #ffffff;
              }
              .cell-numbers-box {
                text-align: right;
                font-size: 9.5px;
                font-weight: 800;
                line-height: 1.3;
              }
              .brand-title-blue {
                font-size: 24px;
                font-weight: 900;
                color: #0b35b8;
                letter-spacing: 0.06em;
                margin: 2px 0;
                line-height: 1.1;
                text-transform: uppercase;
              }
              .tagline-box-frame {
                border: 1px solid #000000;
                padding: 2px 8px;
                font-size: 9.5px;
                font-style: italic;
                font-weight: 700;
                margin: 0 auto;
                width: fit-content;
                max-width: 90%;
              }
              .store-address-text {
                font-size: 9px;
                line-height: 1.35;
                margin-top: 2px;
                color: #000000;
              }
              .dharmavaram-blue {
                color: #0b35b8;
                font-weight: 800;
              }
              .particulars-table,
              .receiver-table,
              .goods-table,
              .bottom-split-table {
                width: 100%;
                border-collapse: collapse;
              }
              .particulars-table td {
                border: 1px solid #000000;
                padding: 3px 6px;
                font-size: 9.5px;
                width: 50%;
              }
              .receiver-header-bar {
                background: #eaeaea;
                border: 1px solid #000000;
                font-size: 10px;
                font-weight: 800;
                padding: 3px 8px;
                text-align: left;
              }
              .receiver-table td {
                border: 1px solid #000000;
                padding: 3px 6px;
                font-size: 9.5px;
              }
              .goods-table th {
                background: #eaeaea;
                border: 1px solid #000000;
                font-size: 9.5px;
                font-weight: 800;
                padding: 4px 5px;
                text-align: left;
              }
              .goods-table td {
                border: 1px solid #000000;
                padding: 3px 5px;
                font-size: 9px;
                height: 18px;
              }
              .goods-table-wrapper {
                position: relative;
              }
              .watermark-overlay {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 155px;
                height: 160px;
                opacity: 0.14;
                pointer-events: none;
                z-index: 1;
              }
              .bottom-container {
                display: flex;
                border: 1px solid #000000;
                margin-top: -1px;
              }
              .bottom-left-box {
                width: 57%;
                border-right: 1px solid #000000;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .bottom-right-box {
                width: 43%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .section-gray-bar {
                background: #eaeaea;
                border-bottom: 1px solid #000000;
                font-size: 9.5px;
                font-weight: 800;
                padding: 3px 6px;
              }
              .bank-info-content {
                padding: 4px 6px;
                font-size: 9.5px;
                line-height: 1.4;
              }
              .amount-in-rupees-row {
                font-size: 8.5px;
                margin-top: 2px;
                color: #222222;
              }
              .terms-content {
                padding: 3px 6px;
                font-size: 7.2px;
                line-height: 1.35;
                color: #000000;
              }
              .customer-sig-row {
                padding: 6px;
                text-align: center;
                font-size: 9px;
                font-weight: 800;
              }
              .totals-calc-table {
                width: 100%;
                border-collapse: collapse;
              }
              .totals-calc-table td {
                border-bottom: 1px solid #000000;
                padding: 3px 6px;
                font-size: 9.5px;
              }
              .totals-calc-table td:last-child {
                text-align: right;
                font-weight: 700;
              }
              .grand-total-highlight {
                font-weight: 800 !important;
                font-size: 10.5px !important;
                background: #f7f7f7;
              }
              .for-store-sig-box {
                padding: 6px;
                text-align: center;
                font-size: 9.5px;
              }
              .for-store-brand {
                color: #0b35b8;
                font-weight: 800;
                font-size: 10px;
                text-transform: uppercase;
              }
              .sig-final-text {
                margin-top: 14px;
                font-weight: 800;
              }
              .text-center { text-align: center; }
              .text-right { text-align: right; }
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
      console.warn('Iframe print error fallback:', e);
      window.print();
    }
  }

  // Active object for preview modal
  const activeBillData = previewBill || {
    invoice_number: invoiceNumber || 'RCH-GST-2026-0001',
    invoice_date: invoiceDate,
    vehicle_no: vehicleNo,
    transporter,
    reverse_charge: reverseCharge,
    agent_name: agentName,
    receiver_name: receiverName || 'Sample Receiver Customer',
    receiver_gstin: receiverGstin,
    receiver_phone: receiverPhone,
    receiver_state: receiverState,
    receiver_address: receiverAddress,
    items,
    taxable_amount: taxableAmount,
    tax_type: taxType,
    sgst_rate: activeSgstRate,
    sgst_amount: sgstAmount,
    cgst_rate: activeCgstRate,
    cgst_amount: cgstAmount,
    igst_rate: activeIgstRate,
    igst_amount: igstAmount,
    round_off: roundOff,
    total_amount: totalAmount,
    amount_in_words: amountInWords,
    bank_name: settings.bank_name,
    bank_account_no: settings.bank_account_no,
    bank_ifsc: settings.bank_ifsc,
    terms: settings.terms,
    store_name: settings.store_name,
    store_gstin: settings.store_gstin,
    store_pan: settings.store_pan,
    store_cell: settings.store_cell,
    store_tagline: settings.store_tagline,
    store_address: settings.store_address,
    payment_method: paymentMethod,
    payment_ref: paymentRef,
  };

  return (
    <div className="gst-billing-page">
      <Seo title="GST Billing — Official Tax Invoices | Admin" path="/admin/gst-billing" noindex />

      {/* Top Banner Navigation */}
      <div className="gst-topbar screen-only">
        <div className="topbar-left">
          <div className="gst-title-badge">
            <GstBillingIcon width={20} height={20} />
            <h1>GST Billing &amp; Tax Invoices</h1>
          </div>
          <p className="gst-subtitle">
            Create, manage &amp; print official GST invoices matching showroom stationery standard with HSN &amp; tax breakdowns.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="gst-tab-pills">
          <button
            type="button"
            className={`tab-pill-btn ${activeTab === 'new' ? 'active' : ''}`}
            onClick={() => setActiveTab('new')}
          >
            <PlusIcon width={14} height={14} />
            <span>New GST Bill</span>
          </button>

          <button
            type="button"
            className={`tab-pill-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <CalendarIcon width={14} height={14} />
            <span>GST Bill History</span>
            {historyStats.total_invoices > 0 && (
              <span className="count-pill">{historyStats.total_invoices}</span>
            )}
          </button>

          <button
            type="button"
            className={`tab-pill-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <SettingsIcon width={14} height={14} />
            <span>Store &amp; GST CMS</span>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
      {feedback && (
        <div className={`feedback-alert ${feedback.type} screen-only`}>
          <span>{feedback.text}</span>
          <button type="button" onClick={() => setFeedback(null)} className="btn-close-alert">
            <CloseIcon width={14} height={14} />
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: CREATE NEW GST INVOICE                                            */}
      {/* ========================================================================= */}
      {activeTab === 'new' && (
        <div className="gst-create-layout screen-only">
          <div className="form-card main-invoice-form">
            <div className="card-header-bar">
              <h2>Invoice Particulars &amp; Transporter Details</h2>
              <div className="header-meta-actions">
                <button
                  type="button"
                  className="btn-text-action"
                  onClick={loadNextInvoiceNumber}
                  title="Generate next sequential number"
                >
                  <RefreshIcon width={13} height={13} />
                  <span>Next No</span>
                </button>
              </div>
            </div>

            {/* Row 1: Invoice No, Date, Vehicle No, Transporter, Reverse Charge */}
            <div className="form-grid-3">
              <div className="form-field">
                <label>Invoice Number *</label>
                <input
                  type="text"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  placeholder="e.g. RCH-GST-2026-0001"
                  required
                />
              </div>

              <div className="form-field">
                <label>Invoice Date *</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label>Reverse Charge</label>
                <select
                  value={reverseCharge}
                  onChange={(e) => setReverseCharge(e.target.value)}
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>

              <div className="form-field">
                <label>Vehicle No (Transport)</label>
                <input
                  type="text"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value)}
                  placeholder="e.g. AP 02 AX 1234"
                />
              </div>

              <div className="form-field">
                <label>Transporter Name / Courier</label>
                <input
                  type="text"
                  value={transporter}
                  onChange={(e) => setTransporter(e.target.value)}
                  placeholder="e.g. Navata / VRL / By Hand"
                />
              </div>

              <div className="form-field">
                <label>Agent Name / Broker</label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Suresh Kumar"
                />
              </div>
            </div>

            {/* Receiver (Billed To) Block */}
            <div className="card-sub-header">
              <h3>Details of Receiver (Billed To)</h3>
            </div>

            <div className="form-grid-3">
              <div className="form-field">
                <label>Receiver / Customer Name *</label>
                <input
                  type="text"
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="e.g. Sri Sai Ram Silks & Sarees"
                  required
                />
              </div>

              <div className="form-field">
                <label>Receiver GSTIN (Optional)</label>
                <input
                  type="text"
                  value={receiverGstin}
                  onChange={(e) => setReceiverGstin(e.target.value.toUpperCase())}
                  placeholder="15-digit GSTIN e.g. 36ABCDE1234F1Z5"
                  maxLength={15}
                />
              </div>

              <div className="form-field">
                <label>Receiver Mobile / Phone</label>
                <input
                  type="text"
                  value={receiverPhone}
                  onChange={(e) => setReceiverPhone(e.target.value)}
                  placeholder="e.g. 9848022338"
                />
              </div>

              <div className="form-field span-2">
                <label>Billing &amp; Delivery Address</label>
                <input
                  type="text"
                  value={receiverAddress}
                  onChange={(e) => setReceiverAddress(e.target.value)}
                  placeholder="Shop No, Street, Landmark, City & PIN code"
                />
              </div>

              <div className="form-field">
                <label>Place of Supply (State &amp; Code)</label>
                <input
                  type="text"
                  value={receiverState}
                  onChange={(e) => setReceiverState(e.target.value)}
                  placeholder="e.g. Andhra Pradesh (37)"
                />
              </div>
            </div>

            {/* Goods Items Table */}
            <div className="card-sub-header flex-between">
              <h3>Goods Line Items (HSN &amp; Silk Sarees)</h3>
              <button type="button" className="btn-add-item" onClick={addItemRow}>
                <PlusIcon width={13} height={13} />
                <span>Add Row</span>
              </button>
            </div>

            <div className="table-responsive">
              <table className="gst-items-form-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px' }}>#</th>
                    <th style={{ width: '100px' }}>HSN Code</th>
                    <th>Description of Goods</th>
                    <th style={{ width: '90px' }}>Qty</th>
                    <th style={{ width: '130px' }}>Rate (₹)</th>
                    <th style={{ width: '140px' }}>Amount (₹)</th>
                    <th style={{ width: '50px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row, idx) => (
                    <tr key={row.id || idx}>
                      <td className="text-center">{idx + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={row.hsn_code}
                          onChange={(e) => updateItemRow(idx, 'hsn_code', e.target.value)}
                          placeholder="5007"
                          className="table-input"
                        />
                      </td>
                      <td>
                        <div className="desc-cell-wrap">
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) => updateItemRow(idx, 'description', e.target.value)}
                            placeholder="e.g. Pure Silk Dharmavaram Wedding Pattu Sarees"
                            className="table-input"
                          />
                          {catalog.length > 0 && (
                            <select
                              className="catalog-quick-dropdown"
                              onChange={(e) => {
                                const prod = catalog.find((p) => String(p.id) === e.target.value);
                                quickPickProduct(idx, prod);
                                e.target.value = '';
                              }}
                              defaultValue=""
                              title="Pick saree from existing store inventory"
                            >
                              <option value="" disabled>Catalog ▾</option>
                              {catalog.slice(0, 30).map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name} (₹{p.price})
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="1"
                          value={row.qty}
                          onChange={(e) => updateItemRow(idx, 'qty', e.target.value)}
                          className="table-input text-center"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={row.rate}
                          onChange={(e) => updateItemRow(idx, 'rate', e.target.value)}
                          className="table-input text-right"
                        />
                      </td>
                      <td className="text-right font-bold">
                        ₹{formatINR(row.amount)}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn-trash-row"
                          onClick={() => removeItemRow(idx)}
                          disabled={items.length <= 1}
                          title="Remove line"
                        >
                          <TrashIcon width={14} height={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tax & Summary Calculation Block */}
            <div className="gst-summary-split">
              {/* Left: Tax Mode Selector & Payment */}
              <div className="tax-config-panel">
                <h4>Tax Structure &amp; GST Type</h4>
                <div className="tax-type-selector">
                  <label className={`tax-radio-card ${taxType === 'INTRA_STATE' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="taxType"
                      value="INTRA_STATE"
                      checked={taxType === 'INTRA_STATE'}
                      onChange={() => setTaxType('INTRA_STATE')}
                    />
                    <div className="radio-text">
                      <strong>Intra-State (Within A.P.)</strong>
                      <span>SGST 2.5% + CGST 2.5% (Total 5%)</span>
                    </div>
                  </label>

                  <label className={`tax-radio-card ${taxType === 'INTER_STATE' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="taxType"
                      value="INTER_STATE"
                      checked={taxType === 'INTER_STATE'}
                      onChange={() => setTaxType('INTER_STATE')}
                    />
                    <div className="radio-text">
                      <strong>Inter-State (Outside A.P.)</strong>
                      <span>Integrated Tax (IGST @ 5.0%)</span>
                    </div>
                  </label>

                  <label className={`tax-radio-card ${taxType === 'CUSTOM' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="taxType"
                      value="CUSTOM"
                      checked={taxType === 'CUSTOM'}
                      onChange={() => setTaxType('CUSTOM')}
                    />
                    <div className="radio-text">
                      <strong>Custom / Exempt</strong>
                      <span>Enter custom tax percentages</span>
                    </div>
                  </label>
                </div>

                {taxType === 'CUSTOM' && (
                  <div className="custom-tax-rates-grid">
                    <div className="form-field">
                      <label>SGST Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={sgstRate}
                        onChange={(e) => setSgstRate(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>CGST Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={cgstRate}
                        onChange={(e) => setCgstRate(e.target.value)}
                      />
                    </div>
                    <div className="form-field">
                      <label>IGST Rate (%)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={igstRate}
                        onChange={(e) => setIgstRate(e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="payment-options-grid">
                  <div className="form-field">
                    <label>Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="Bank Transfer">Bank Transfer (NEFT/RTGS/IMPS)</option>
                      <option value="UPI">UPI / QR Code</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Payment Ref / UTR / Cheque No</label>
                    <input
                      type="text"
                      value={paymentRef}
                      onChange={(e) => setPaymentRef(e.target.value)}
                      placeholder="e.g. UTR12345678"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Totals Box */}
              <div className="invoice-totals-card">
                <h4>Invoice Summary</h4>
                <div className="totals-row">
                  <span>Taxable Amount</span>
                  <strong>₹{formatINR(taxableAmount)}</strong>
                </div>

                {taxType === 'INTRA_STATE' && (
                  <>
                    <div className="totals-row">
                      <span>Add : SGST @ {activeSgstRate}%</span>
                      <span>₹{formatINR(sgstAmount)}</span>
                    </div>
                    <div className="totals-row">
                      <span>Add : CGST @ {activeCgstRate}%</span>
                      <span>₹{formatINR(cgstAmount)}</span>
                    </div>
                  </>
                )}

                {taxType === 'INTER_STATE' && (
                  <div className="totals-row">
                    <span>Add : IGST @ {activeIgstRate}%</span>
                    <span>₹{formatINR(igstAmount)}</span>
                  </div>
                )}

                {taxType === 'CUSTOM' && (
                  <>
                    {activeSgstRate > 0 && (
                      <div className="totals-row">
                        <span>Add : SGST @ {activeSgstRate}%</span>
                        <span>₹{formatINR(sgstAmount)}</span>
                      </div>
                    )}
                    {activeCgstRate > 0 && (
                      <div className="totals-row">
                        <span>Add : CGST @ {activeCgstRate}%</span>
                        <span>₹{formatINR(cgstAmount)}</span>
                      </div>
                    )}
                    {activeIgstRate > 0 && (
                      <div className="totals-row">
                        <span>Add : IGST @ {activeIgstRate}%</span>
                        <span>₹{formatINR(igstAmount)}</span>
                      </div>
                    )}
                  </>
                )}

                {roundOff !== 0 && (
                  <div className="totals-row round-off">
                    <span>Round Off</span>
                    <span>{roundOff > 0 ? `+₹${roundOff.toFixed(2)}` : `-₹${Math.abs(roundOff).toFixed(2)}`}</span>
                  </div>
                )}

                <div className="grand-total-highlight-row">
                  <span>TOTAL AMOUNT</span>
                  <strong>₹{formatINR(totalAmount)}</strong>
                </div>

                <div className="amount-words-preview">
                  <small>Amount in Words:</small>
                  <p>{amountInWords}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="form-actions-footer">
              <button
                type="button"
                className="btn-secondary"
                onClick={resetForm}
                disabled={submitting}
              >
                Reset
              </button>

              <button
                type="button"
                className="btn-preview-modal"
                onClick={() => setPreviewBill(activeBillData)}
              >
                <EyeIcon width={15} height={15} />
                <span>Preview Invoice</span>
              </button>

              <button
                type="button"
                className="btn-save"
                onClick={() => handleSubmitInvoice(false)}
                disabled={submitting}
              >
                <SaveIcon width={15} height={15} />
                <span>{submitting ? 'Saving...' : 'Save GST Bill'}</span>
              </button>

              <button
                type="button"
                className="btn-save-print"
                onClick={() => handleSubmitInvoice(true)}
                disabled={submitting}
              >
                <PrinterIcon width={15} height={15} />
                <span>Save &amp; Print (A4)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SEPARATE GST BILL HISTORY                                         */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="gst-history-layout screen-only">
          {/* Revenue & Tax Analytics Cards */}
          <div className="history-stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total GST Invoices</span>
              <strong className="stat-value">{historyStats.total_invoices || 0}</strong>
              <span className="stat-desc">Bills generated</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">Total Taxable Value</span>
              <strong className="stat-value">₹{formatINR(historyStats.total_taxable)}</strong>
              <span className="stat-desc">Net saree sales</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">SGST + CGST Collected</span>
              <strong className="stat-value">₹{formatINR(Number(historyStats.total_sgst) + Number(historyStats.total_cgst))}</strong>
              <span className="stat-desc">Intra-state tax</span>
            </div>

            <div className="stat-card">
              <span className="stat-label">IGST Collected</span>
              <strong className="stat-value">₹{formatINR(historyStats.total_igst)}</strong>
              <span className="stat-desc">Inter-state tax</span>
            </div>

            <div className="stat-card highlight">
              <span className="stat-label">Total Invoice Value</span>
              <strong className="stat-value">₹{formatINR(historyStats.total_amount)}</strong>
              <span className="stat-desc">Gross GST turnover</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="history-filter-bar">
            {/* Search */}
            <div className="search-field-wrap">
              <SearchIcon width={15} height={15} />
              <input
                type="text"
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search Invoice No, Receiver Name, GSTIN, Phone, Vehicle..."
              />
            </div>

            {/* Preset Pills */}
            <div className="filter-preset-pills">
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'all' ? 'active' : ''}`}
                onClick={() => setFilterPreset('all')}
              >
                All Time
              </button>
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'today' ? 'active' : ''}`}
                onClick={() => setFilterPreset('today')}
              >
                Today
              </button>
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'yesterday' ? 'active' : ''}`}
                onClick={() => setFilterPreset('yesterday')}
              >
                Yesterday
              </button>
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'week' ? 'active' : ''}`}
                onClick={() => setFilterPreset('week')}
              >
                This Week
              </button>
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'month' ? 'active' : ''}`}
                onClick={() => setFilterPreset('month')}
              >
                This Month
              </button>
              <button
                type="button"
                className={`preset-btn ${filterPreset === 'custom' ? 'active' : ''}`}
                onClick={() => setFilterPreset('custom')}
              >
                Custom Date
              </button>
            </div>

            {/* Custom Dates */}
            {filterPreset === 'custom' && (
              <div className="custom-dates-wrap">
                <input
                  type="date"
                  value={customFrom}
                  onChange={(e) => setCustomFrom(e.target.value)}
                  title="From date"
                />
                <span>to</span>
                <input
                  type="date"
                  value={customTo}
                  onChange={(e) => setCustomTo(e.target.value)}
                  title="To date"
                />
              </div>
            )}
          </div>

          {/* History Data Table */}
          <div className="history-table-card">
            {historyLoading ? (
              <div className="table-loader">Loading GST invoices...</div>
            ) : historyList.length === 0 ? (
              <div className="table-empty-state">
                <p>No GST invoices found matching the current search &amp; date filters.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="gst-history-table">
                  <thead>
                    <tr>
                      <th>Invoice No</th>
                      <th>Date</th>
                      <th>Receiver (Billed To)</th>
                      <th>Receiver GSTIN</th>
                      <th>Items</th>
                      <th className="text-right">Taxable (₹)</th>
                      <th className="text-right">Total GST (₹)</th>
                      <th className="text-right">Grand Total (₹)</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyList.map((bill) => {
                      const totalGst = Number(bill.sgst_amount || 0) + Number(bill.cgst_amount || 0) + Number(bill.igst_amount || 0);
                      const itemsCount = Array.isArray(bill.items) ? bill.items.length : 0;
                      return (
                        <tr key={bill.id}>
                          <td>
                            <strong className="invoice-num-badge">{bill.invoice_number}</strong>
                          </td>
                          <td>{formatDate(bill.invoice_date)}</td>
                          <td>
                            <div className="receiver-cell">
                              <strong>{bill.receiver_name}</strong>
                              {bill.receiver_phone && <small>+91 {bill.receiver_phone}</small>}
                            </div>
                          </td>
                          <td>
                            <span className="gstin-code-tag">{bill.receiver_gstin || 'Unregistered'}</span>
                          </td>
                          <td>{itemsCount} {itemsCount === 1 ? 'saree' : 'sarees'}</td>
                          <td className="text-right font-medium">₹{formatINR(bill.taxable_amount)}</td>
                          <td className="text-right font-medium text-tax">₹{formatINR(totalGst)}</td>
                          <td className="text-right font-bold text-total">₹{formatINR(bill.total_amount)}</td>
                          <td>
                            <div className="table-actions-cell">
                              <button
                                type="button"
                                className="action-btn view"
                                onClick={() => setPreviewBill(bill)}
                                title="View & Print Invoice"
                              >
                                <EyeIcon width={14} height={14} />
                              </button>

                              <button
                                type="button"
                                className="action-btn print"
                                onClick={() => printBillDirect(bill)}
                                title="Direct Print A4"
                              >
                                <PrinterIcon width={14} height={14} />
                              </button>

                              <button
                                type="button"
                                className="action-btn pdf"
                                onClick={() => downloadBillPdf(bill)}
                                title="Download Vector PDF"
                              >
                                <DownloadIcon width={14} height={14} />
                              </button>

                              {bill.receiver_phone && (
                                <button
                                  type="button"
                                  className="action-btn wa"
                                  onClick={() => openWhatsAppBill(bill)}
                                  title="Send PDF Invoice on WhatsApp"
                                >
                                  <WhatsAppIcon width={14} height={14} />
                                </button>
                              )}

                              <button
                                type="button"
                                className="action-btn delete"
                                onClick={() => deleteInvoice(bill.id)}
                                title="Delete Invoice"
                              >
                                <TrashIcon width={14} height={14} />
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
      {/* TAB 3: STORE & GST CMS SETTINGS                                           */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <div className="gst-settings-layout screen-only">
          <form className="form-card settings-card" onSubmit={saveSettings}>
            <div className="card-header-bar">
              <h2>GST Bill Header &amp; CMS Store Configuration</h2>
              <span className="cms-badge">Live Store Branding</span>
            </div>

            <p className="card-desc">
              All details configured here appear automatically in the printed GST Tax Invoice header, bank box, terms, and server-generated PDF.
            </p>

            <div className="form-grid-3">
              <div className="form-field span-2">
                <label>Showroom / Business Name (Royal Blue Header)</label>
                <input
                  type="text"
                  value={settings.store_name}
                  onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                  placeholder="e.g. RAVICHANDRA HANDLOOMS"
                  required
                />
              </div>

              <div className="form-field">
                <label>GSTIN Number *</label>
                <input
                  type="text"
                  value={settings.store_gstin}
                  onChange={(e) => setSettings({ ...settings, store_gstin: e.target.value.toUpperCase() })}
                  placeholder="e.g. 37AYPPR2420N1ZU"
                  maxLength={15}
                  required
                />
              </div>

              <div className="form-field">
                <label>Permanent Account No (PAN)</label>
                <input
                  type="text"
                  value={settings.store_pan}
                  onChange={(e) => setSettings({ ...settings, store_pan: e.target.value.toUpperCase() })}
                  placeholder="e.g. AYPPR2420N"
                  maxLength={10}
                />
              </div>

              <div className="form-field span-2">
                <label>Contact Mobile Numbers (Top Right)</label>
                <input
                  type="text"
                  value={settings.store_cell}
                  onChange={(e) => setSettings({ ...settings, store_cell: e.target.value })}
                  placeholder="e.g. 9493049274, 8317551337"
                />
              </div>

              <div className="form-field span-3">
                <label>Tagline / Manufacturers Outlined Box</label>
                <input
                  type="text"
                  value={settings.store_tagline}
                  onChange={(e) => setSettings({ ...settings, store_tagline: e.target.value })}
                  placeholder="e.g. Hand Loom Pure Lace SILK SAREES Manufacturers"
                />
              </div>

              <div className="form-field span-3">
                <label>Showroom &amp; Works Address</label>
                <textarea
                  rows={2}
                  value={settings.store_address}
                  onChange={(e) => setSettings({ ...settings, store_address: e.target.value })}
                  placeholder="Door No. 11/412, Janardhan Complex, Thogata Street, DHARMAVARAM-515 671. Sree Satya SaiDist. (A.P.)"
                />
              </div>
            </div>

            <div className="card-sub-header">
              <h3>Bank Account &amp; Settlement Details</h3>
            </div>

            <div className="form-grid-3">
              <div className="form-field">
                <label>Bank Name</label>
                <input
                  type="text"
                  value={settings.bank_name}
                  onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                  placeholder="Indian Bank"
                />
              </div>

              <div className="form-field">
                <label>Account Number</label>
                <input
                  type="text"
                  value={settings.bank_account_no}
                  onChange={(e) => setSettings({ ...settings, bank_account_no: e.target.value })}
                  placeholder="7653499335"
                />
              </div>

              <div className="form-field">
                <label>IFS Code</label>
                <input
                  type="text"
                  value={settings.bank_ifsc}
                  onChange={(e) => setSettings({ ...settings, bank_ifsc: e.target.value.toUpperCase() })}
                  placeholder="IDIB000D083"
                />
              </div>
            </div>

            <div className="card-sub-header">
              <h3>Invoice Prefix &amp; Default HSN</h3>
            </div>

            <div className="form-grid-3">
              <div className="form-field">
                <label>Invoice Number Prefix</label>
                <input
                  type="text"
                  value={settings.invoice_prefix}
                  onChange={(e) => setSettings({ ...settings, invoice_prefix: e.target.value })}
                  placeholder="RCH-GST-"
                />
              </div>

              <div className="form-field">
                <label>Default Silk HSN Code</label>
                <input
                  type="text"
                  value={settings.default_hsn}
                  onChange={(e) => setSettings({ ...settings, default_hsn: e.target.value })}
                  placeholder="5007"
                />
              </div>

              <div className="form-field">
                <label>Default GST Rate (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={settings.default_igst_rate}
                  onChange={(e) => {
                    const rate = parseFloat(e.target.value) || 5;
                    setSettings({
                      ...settings,
                      default_igst_rate: rate,
                      default_sgst_rate: rate / 2,
                      default_cgst_rate: rate / 2,
                    });
                  }}
                  placeholder="5"
                />
              </div>
            </div>

            <div className="form-actions-footer">
              <button type="submit" className="btn-save" disabled={submitting}>
                <SaveIcon width={15} height={15} />
                <span>{submitting ? 'Saving...' : 'Save GST Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HIGH-FIDELITY PRINTABLE BILL MODAL (EXACT SAME AS GIVEN PHOTO)           */}
      {/* ========================================================================= */}
      {previewBill && (
        <div className="bill-modal-backdrop">
          <div className="bill-modal-window">
            {/* Modal Screen-Only Control Bar */}
            <div className="bill-modal-screen-bar screen-only">
              <div className="modal-title-left">
                <strong>{activeBillData.store_name || 'RAVICHANDRA HANDLOOMS'} — GST Invoice</strong>
                <span>#{activeBillData.invoice_number}</span>
                <span className="format-badge-a4">A4 Standard Format</span>
              </div>

              <div className="modal-actions-right">
                <button
                  type="button"
                  className="btn-print-action"
                  onClick={() => printBillDirect(activeBillData)}
                  title="Print directly to connected A4 printer"
                >
                  <PrinterIcon width={14} height={14} />
                  <span>Print Invoice (A4)</span>
                </button>

                <button
                  type="button"
                  className="btn-pdf-action"
                  onClick={() => downloadBillPdf(activeBillData)}
                  title="Download bill in vector PDF format"
                >
                  <DownloadIcon width={14} height={14} />
                  <span>Download PDF</span>
                </button>

                {activeBillData.receiver_phone && (
                  <button
                    type="button"
                    className="btn-wa-action"
                    onClick={() => openWhatsAppBill(activeBillData)}
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
              <div id="printable-gst-bill-sheet" className="gst-bill-outer-border">
                <div className="gst-bill-inner-border">
                  {/* 1. Header Grid: Deity Photo Left + Center Details */}
                  <div className="gst-header-grid">
                    <div className="deity-box">
                      <img
                        src="/images/gst-deity.png"
                        alt="Lord Venkateswara"
                        className="deity-img"
                      />
                    </div>

                    <div className="header-center-info">
                      <div className="header-top-row">
                        <div className="gstin-pan-box">
                          <div>GSTIN : {activeBillData.store_gstin || '37AYPPR2420N1ZU'}</div>
                          <div>PAN : {activeBillData.store_pan || 'AYPPR2420N'}</div>
                        </div>

                        <div className="gst-invoice-badge">
                          GST INVOICE
                        </div>

                        <div className="cell-numbers-box">
                          <div>Cell : 9493049274</div>
                          <div>8317551337</div>
                        </div>
                      </div>

                      <h1 className="brand-title-blue">
                        {activeBillData.store_name || 'RAVICHANDRA HANDLOOMS'}
                      </h1>

                      <div className="tagline-box-frame">
                        {activeBillData.store_tagline || 'Hand Loom Pure Lace SILK SAREES Manufacturers'}
                      </div>

                      <div className="store-address-text">
                        <div>Door No. 11/412, Janardhan Complex, Thogata Street,</div>
                        <div>
                          <span className="dharmavaram-blue">DHARMAVARAM-515 671.</span> Sree Satya SaiDist. (A.P.)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Invoice Particulars Grid (6 Cells) */}
                  <table className="particulars-table">
                    <tbody>
                      <tr>
                        <td><strong>Invoice No :</strong> {activeBillData.invoice_number}</td>
                        <td><strong>Invoice Date :</strong> {formatDate(activeBillData.invoice_date)}</td>
                      </tr>
                      <tr>
                        <td><strong>Vehicle No :</strong> {activeBillData.vehicle_no || ''}</td>
                        <td><strong>Transporter :</strong> {activeBillData.transporter || ''}</td>
                      </tr>
                      <tr>
                        <td><strong>Reverse Charge :</strong> {activeBillData.reverse_charge || 'No'}</td>
                        <td><strong>Agent Name :</strong> {activeBillData.agent_name || ''}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* 3. Details of Receiver (Billed To) */}
                  <div className="receiver-header-bar">
                    Details of Receiver (Billed To)
                  </div>
                  <table className="receiver-table">
                    <tbody>
                      <tr>
                        <td><strong>Name :</strong> <strong>{activeBillData.receiver_name}</strong></td>
                      </tr>
                      <tr>
                        <td><strong>GSTIN :</strong> {activeBillData.receiver_gstin || ''}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Address :</strong> {[
                            activeBillData.receiver_address,
                            activeBillData.receiver_state ? `State: ${activeBillData.receiver_state}` : '',
                            activeBillData.receiver_phone ? `Phone: ${activeBillData.receiver_phone}` : ''
                          ].filter(Boolean).join(', ')}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* 4. Goods Table with Goddess Lakshmi Watermark */}
                  <div className="goods-table-wrapper">
                    <img
                      src="/images/gst-watermark.png"
                      alt="Lakshmi Watermark"
                      className="watermark-overlay"
                    />

                    <table className="goods-table">
                      <thead>
                        <tr>
                          <th style={{ width: '40px' }} className="text-center">S.No.</th>
                          <th style={{ width: '70px' }}>HSN Code</th>
                          <th>Description of Goods</th>
                          <th style={{ width: '50px' }} className="text-center">Qty</th>
                          <th style={{ width: '75px' }} className="text-right">Rate</th>
                          <th style={{ width: '95px' }} className="text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: 13 }).map((_, idx) => {
                          const it = activeBillData.items && activeBillData.items[idx];
                          return (
                            <tr key={idx}>
                              <td className="text-center">{it ? idx + 1 : ''}</td>
                              <td>{it ? it.hsn_code || '5007' : ''}</td>
                              <td>{it ? it.description : ''}</td>
                              <td className="text-center">{it ? it.qty : ''}</td>
                              <td className="text-right">{it ? formatINR(it.rate) : ''}</td>
                              <td className="text-right font-medium">{it ? formatINR(it.amount) : ''}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* 5. Bottom Split Container: Left (Bank & Terms) + Right (Totals & Signature) */}
                  <div className="bottom-container">
                    {/* Left Column */}
                    <div className="bottom-left-box">
                      <div>
                        <div className="section-gray-bar">BANK DETAILS</div>
                        <div className="bank-info-content">
                          <div><strong>Indian Bank A/c No. : {activeBillData.bank_account_no || '7653499335'}</strong></div>
                          <div><strong>IFS Code : {activeBillData.bank_ifsc || 'IDIB000D083'}</strong></div>
                          <div className="amount-in-rupees-row">
                            <strong>Amount In Rupees :</strong> {activeBillData.amount_in_words || numberToWordsINR(activeBillData.total_amount)}
                          </div>
                        </div>

                        <div className="section-gray-bar">TERMS &amp; CONDITIONS</div>
                        <div className="terms-content">
                          {(Array.isArray(activeBillData.terms) && activeBillData.terms.length > 0 ? activeBillData.terms : settings.terms).map((t, idx) => (
                            <div key={idx}>{t}</div>
                          ))}
                        </div>
                      </div>

                      <div className="customer-sig-row">
                        Customer's Signature.
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="bottom-right-box">
                      <div>
                        <div className="section-gray-bar text-center">TOTAL</div>
                        <table className="totals-calc-table">
                          <tbody>
                            <tr>
                              <td><strong>Taxable Amount</strong></td>
                              <td>₹{formatINR(activeBillData.taxable_amount)}</td>
                            </tr>
                            <tr>
                              <td>Add : SGST @ {activeBillData.sgst_rate || 2.5}%</td>
                              <td>₹{formatINR(activeBillData.sgst_amount || 0)}</td>
                            </tr>
                            <tr>
                              <td>Add : CGST @ {activeBillData.cgst_rate || 2.5}%</td>
                              <td>₹{formatINR(activeBillData.cgst_amount || 0)}</td>
                            </tr>
                            <tr>
                              <td>Add : IGST @ {activeBillData.igst_rate || 0}%</td>
                              <td>₹{formatINR(activeBillData.igst_amount || 0)}</td>
                            </tr>
                            <tr className="grand-total-highlight">
                              <td><strong>TOTAL AMOUNT</strong></td>
                              <td>₹{formatINR(activeBillData.total_amount)}</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className="for-store-sig-box">
                          <div>
                            For : <span className="for-store-brand">{activeBillData.store_name || 'RAVICHANDRA HANDLOOMS'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="customer-sig-row sig-final-text">
                        Signature.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STYLESHEET                                                               */}
      {/* ========================================================================= */}
      <style>{`
        .gst-billing-page {
          padding-bottom: 40px;
        }

        .gst-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          padding: 16px 24px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .gst-title-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #0b35b8;
        }

        .gst-title-badge h1 {
          font-size: 20px;
          font-weight: 800;
          color: #111827;
          margin: 0;
        }

        .gst-subtitle {
          margin: 4px 0 0 0;
          font-size: 12.5px;
          color: #6b7280;
        }

        .gst-tab-pills {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f3f4f6;
          padding: 4px;
          border-radius: 8px;
        }

        .tab-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #4b5563;
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .tab-pill-btn:hover {
          color: #111827;
        }

        .tab-pill-btn.active {
          background: #0b35b8;
          color: #ffffff;
          box-shadow: 0 1px 3px rgba(11, 53, 184, 0.3);
        }

        .count-pill {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          font-size: 11px;
          padding: 1px 6px;
          border-radius: 10px;
        }

        .feedback-alert {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          border-radius: 8px;
          margin-bottom: 18px;
          font-size: 13.5px;
          font-weight: 600;
        }

        .feedback-alert.success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .feedback-alert.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .btn-close-alert {
          background: transparent;
          border: none;
          color: currentColor;
          cursor: pointer;
          padding: 2px;
        }

        /* Form Card Styling */
        .form-card {
          background: #ffffff;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .card-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 14px;
          margin-bottom: 18px;
        }

        .card-header-bar h2 {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }

        .card-sub-header {
          border-bottom: 1px solid #f3f4f6;
          padding-bottom: 8px;
          margin: 22px 0 14px;
        }

        .card-sub-header.flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-sub-header h3 {
          font-size: 14px;
          font-weight: 700;
          color: #374151;
          margin: 0;
        }

        .form-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .form-field.span-2 {
          grid-column: span 2;
        }

        .form-field.span-3 {
          grid-column: span 3;
        }

        .form-field label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 5px;
        }

        .form-field input,
        .form-field select,
        .form-field textarea {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          padding: 7px 11px;
          font-size: 13px;
          color: #111827;
          outline: none;
          transition: border-color 0.15s;
          background: #ffffff;
          box-sizing: border-box;
        }

        .form-field input:focus,
        .form-field select:focus,
        .form-field textarea:focus {
          border-color: #0b35b8;
          box-shadow: 0 0 0 2px rgba(11, 53, 184, 0.15);
        }

        /* Items Table */
        .gst-items-form-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 8px;
        }

        .gst-items-form-table th {
          background: #f8fafc;
          border-bottom: 2px solid #e2e8f0;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          text-align: left;
        }

        .gst-items-form-table td {
          border-bottom: 1px solid #f1f5f9;
          padding: 8px 10px;
          font-size: 13px;
        }

        .table-input {
          width: 100%;
          border: 1px solid #cbd5e1;
          border-radius: 5px;
          padding: 6px 8px;
          font-size: 12.5px;
          outline: none;
        }

        .table-input:focus {
          border-color: #0b35b8;
        }

        .desc-cell-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .catalog-quick-dropdown {
          border: 1px solid #cbd5e1;
          background: #f8fafc;
          border-radius: 5px;
          padding: 5px 8px;
          font-size: 11px;
          color: #475569;
          cursor: pointer;
        }

        .btn-add-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #0b35b8;
          color: #ffffff;
          border: none;
          padding: 5px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-trash-row {
          background: transparent;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 4px;
        }

        /* Tax & Summary Split */
        .gst-summary-split {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 20px;
          margin-top: 24px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 18px;
        }

        .tax-config-panel h4,
        .invoice-totals-card h4 {
          font-size: 13.5px;
          font-weight: 700;
          color: #111827;
          margin: 0 0 12px;
        }

        .tax-type-selector {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .tax-radio-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 7px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .tax-radio-card.active {
          border-color: #0b35b8;
          background: #eff6ff;
        }

        .radio-text strong {
          display: block;
          font-size: 12.5px;
          color: #111827;
        }

        .radio-text span {
          display: block;
          font-size: 11px;
          color: #6b7280;
        }

        .payment-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 14px;
        }

        .invoice-totals-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 14px 16px;
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
          font-size: 13px;
          color: #4b5563;
        }

        .totals-row.round-off {
          color: #9333ea;
          font-size: 12px;
        }

        .grand-total-highlight-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px solid #0b35b8;
          border-bottom: 2px solid #0b35b8;
          padding: 10px 0;
          margin-top: 8px;
          color: #0b35b8;
        }

        .grand-total-highlight-row strong {
          font-size: 20px;
          font-weight: 800;
        }

        .amount-words-preview {
          margin-top: 10px;
          font-size: 11px;
          color: #6b7280;
          background: #f8fafc;
          padding: 6px 8px;
          border-radius: 5px;
        }

        .amount-words-preview p {
          margin: 2px 0 0 0;
          color: #1e293b;
          font-weight: 600;
        }

        .form-actions-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 24px;
          border-top: 1px solid #f3f4f6;
          padding-top: 16px;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-preview-modal {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0ea5e9;
          color: #ffffff;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-save {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #10b981;
          color: #ffffff;
          border: none;
          padding: 8px 18px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
        }

        .btn-save-print {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0b35b8;
          color: #ffffff;
          border: none;
          padding: 8px 20px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
        }

        /* History Layout */
        .history-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .stat-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 14px;
        }

        .stat-card.highlight {
          background: #eff6ff;
          border-color: #bfdbfe;
        }

        .stat-label {
          display: block;
          font-size: 11.5px;
          color: #6b7280;
          font-weight: 600;
        }

        .stat-value {
          display: block;
          font-size: 18px;
          font-weight: 800;
          color: #111827;
          margin: 4px 0 2px;
        }

        .stat-card.highlight .stat-value {
          color: #0b35b8;
        }

        .stat-desc {
          font-size: 11px;
          color: #9ca3af;
        }

        .history-filter-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 14px;
        }

        .search-field-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 6px 10px;
          color: #6b7280;
        }

        .search-field-wrap input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 13px;
          outline: none;
          color: #111827;
        }

        .filter-preset-pills {
          display: flex;
          gap: 4px;
        }

        .preset-btn {
          background: #f3f4f6;
          border: none;
          font-size: 12px;
          font-weight: 600;
          color: #4b5563;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .preset-btn.active {
          background: #0b35b8;
          color: #ffffff;
        }

        .custom-dates-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
        }

        .custom-dates-wrap input {
          border: 1px solid #d1d5db;
          border-radius: 5px;
          padding: 4px 6px;
          font-size: 11.5px;
        }

        .history-table-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          overflow: hidden;
        }

        .gst-history-table {
          width: 100%;
          border-collapse: collapse;
        }

        .gst-history-table th {
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 10px 12px;
          font-size: 12px;
          font-weight: 700;
          color: #475569;
          text-align: left;
        }

        .gst-history-table td {
          border-bottom: 1px solid #f1f5f9;
          padding: 10px 12px;
          font-size: 13px;
        }

        .invoice-num-badge {
          color: #0b35b8;
          font-family: monospace;
          font-size: 12.5px;
        }

        .gstin-code-tag {
          font-size: 11px;
          background: #f1f5f9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }

        .receiver-cell strong {
          display: block;
          color: #111827;
        }

        .receiver-cell small {
          color: #6b7280;
        }

        .text-tax {
          color: #d97706;
        }

        .text-total {
          color: #0b35b8;
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .action-btn {
          width: 28px;
          height: 28px;
          border-radius: 5px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
        }

        .action-btn.view { background: #0ea5e9; }
        .action-btn.print { background: #0b35b8; }
        .action-btn.pdf { background: #d97706; }
        .action-btn.wa { background: #25D366; }
        .action-btn.delete { background: #ef4444; }

        /* Modal Styles */
        .bill-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .bill-modal-window {
          background: #2b2b2b;
          border-radius: 10px;
          width: 95%;
          max-width: 960px;
          height: 92vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          overflow: hidden;
        }

        .bill-modal-screen-bar {
          background: #1e1e1e;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title-left {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #ffffff;
        }

        .modal-title-left strong {
          color: #ffffff;
          font-size: 14px;
        }

        .format-badge-a4 {
          background: #0b35b8;
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .modal-actions-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-print-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #0b35b8;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-pdf-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #d97706;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-wa-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #25D366;
          color: #ffffff;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-close-modal {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: #ffffff;
          border-radius: 5px;
          padding: 5px;
          cursor: pointer;
          display: flex;
        }

        .bill-sheet-container {
          flex: 1;
          overflow-y: auto;
          background: #64748b;
          padding: 24px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
        }

        /* PRINTABLE SHEET STYLES MATCHING THE GIVEN PHOTO */
        .gst-bill-outer-border {
          border: 2px solid #000000;
          padding: 3px;
          background: #ffffff;
          color: #000000;
          width: 100%;
          max-width: 760px;
          margin: 0 auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        .gst-bill-inner-border {
          border: 1px solid #000000;
          padding: 4px;
          background: #ffffff;
          position: relative;
        }

        .gst-header-grid {
          display: flex;
          gap: 10px;
          align-items: stretch;
          margin-bottom: 4px;
        }

        .deity-box {
          width: 82px;
          flex-shrink: 0;
          border: 1px solid #000000;
          padding: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
        }

        .deity-img {
          width: 100%;
          height: 115px;
          object-fit: cover;
          display: block;
        }

        .header-center-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: center;
        }

        .header-top-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .gstin-pan-box {
          text-align: left;
          font-size: 10px;
          font-weight: 800;
          line-height: 1.3;
        }

        .gst-invoice-badge {
          border: 1px solid #000000;
          padding: 2px 10px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.05em;
          background: #ffffff;
        }

        .cell-numbers-box {
          text-align: right;
          font-size: 9.5px;
          font-weight: 800;
          line-height: 1.3;
        }

        .brand-title-blue {
          font-size: 24px;
          font-weight: 900;
          color: #0b35b8;
          letter-spacing: 0.06em;
          margin: 2px 0;
          line-height: 1.1;
          text-transform: uppercase;
        }

        .tagline-box-frame {
          border: 1px solid #000000;
          padding: 2px 8px;
          font-size: 9.5px;
          font-style: italic;
          font-weight: 700;
          margin: 0 auto;
          width: fit-content;
          max-width: 90%;
        }

        .store-address-text {
          font-size: 9px;
          line-height: 1.35;
          margin-top: 2px;
          color: #000000;
        }

        .dharmavaram-blue {
          color: #0b35b8;
          font-weight: 800;
        }

        .particulars-table,
        .receiver-table,
        .goods-table,
        .bottom-split-table {
          width: 100%;
          border-collapse: collapse;
        }

        .particulars-table td {
          border: 1px solid #000000;
          padding: 3px 6px;
          font-size: 9.5px;
          width: 50%;
        }

        .receiver-header-bar {
          background: #eaeaea;
          border: 1px solid #000000;
          font-size: 10px;
          font-weight: 800;
          padding: 3px 8px;
          text-align: left;
        }

        .receiver-table td {
          border: 1px solid #000000;
          padding: 3px 6px;
          font-size: 9.5px;
        }

        .goods-table th {
          background: #eaeaea;
          border: 1px solid #000000;
          font-size: 9.5px;
          font-weight: 800;
          padding: 4px 5px;
          text-align: left;
        }

        .goods-table td {
          border: 1px solid #000000;
          padding: 3px 5px;
          font-size: 9px;
          height: 19px;
        }

        .goods-table-wrapper {
          position: relative;
        }

        .watermark-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 165px;
          height: 170px;
          opacity: 0.14;
          pointer-events: none;
          z-index: 1;
        }

        .bottom-container {
          display: flex;
          border: 1px solid #000000;
          margin-top: -1px;
        }

        .bottom-left-box {
          width: 57%;
          border-right: 1px solid #000000;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .bottom-right-box {
          width: 43%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .section-gray-bar {
          background: #eaeaea;
          border-bottom: 1px solid #000000;
          font-size: 9.5px;
          font-weight: 800;
          padding: 3px 6px;
        }

        .bank-info-content {
          padding: 4px 6px;
          font-size: 9.5px;
          line-height: 1.4;
        }

        .amount-in-rupees-row {
          font-size: 8.5px;
          margin-top: 2px;
          color: #222222;
        }

        .terms-content {
          padding: 3px 6px;
          font-size: 7.2px;
          line-height: 1.35;
          color: #000000;
        }

        .customer-sig-row {
          padding: 6px;
          text-align: center;
          font-size: 9px;
          font-weight: 800;
        }

        .totals-calc-table {
          width: 100%;
          border-collapse: collapse;
        }

        .totals-calc-table td {
          border-bottom: 1px solid #000000;
          padding: 3px 6px;
          font-size: 9.5px;
        }

        .totals-calc-table td:last-child {
          text-align: right;
          font-weight: 700;
        }

        .grand-total-highlight {
          font-weight: 800 !important;
          font-size: 10.5px !important;
          background: #f7f7f7;
        }

        .for-store-sig-box {
          padding: 6px;
          text-align: center;
          font-size: 9.5px;
        }

        .for-store-brand {
          color: #0b35b8;
          font-weight: 800;
          font-size: 10px;
          text-transform: uppercase;
        }

        .sig-final-text {
          margin-top: 14px;
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .gst-topbar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          .form-grid-3,
          .history-stats-grid {
            grid-template-columns: 1fr;
          }
          .gst-summary-split {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
