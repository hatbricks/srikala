import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Assets
const DEITY_PATH = path.join(__dirname, '..', 'assets', 'gst-deity.png');
const WATERMARK_PATH = path.join(__dirname, '..', 'assets', 'gst-watermark.png');

// Colors matching website's royal silk palette
const BLACK = '#1a1a1a';
const INK_DARK = '#2c1810';
const MAROON = '#581e15';
const GOLD = '#b87d2b';
const HEADER_BG = '#f7f2ea';
const HIGHLIGHT_BG = '#fdf7f0';
const BORDER_COLOR = '#2c1810';

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

export function numberToWordsINR(amount) {
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

/**
 * Renders a pristine A4 GST Tax Invoice PDF strictly matching the user photo.
 */
export function renderGstBillPDF(res, bill) {
  const margin = 26;
  const pageWidth = 595.28; // Standard A4 pt
  const pageHeight = 841.89; // Standard A4 pt
  const contentWidth = pageWidth - (margin * 2);

  const doc = new PDFDocument({
    size: 'A4',
    margin,
    info: {
      Title: `GST Invoice ${bill.invoice_number} — ${bill.store_name || 'Ravichandra Handlooms'}`,
      Author: bill.store_name || 'Ravichandra Handlooms',
      Subject: 'GST Tax Invoice',
    },
  });

  doc.pipe(res);

  // Outer Double Border
  const outerX = margin - 6;
  const outerY = margin - 6;
  const outerW = contentWidth + 12;
  const outerH = pageHeight - (margin * 2) + 12;

  doc.rect(outerX, outerY, outerW, outerH).lineWidth(1.4).strokeColor(BLACK).stroke();
  doc.rect(outerX + 3, outerY + 3, outerW - 6, outerH - 6).lineWidth(0.8).strokeColor(BLACK).stroke();

  let curY = margin + 2;

  // 1. TOP HEADER SECTION
  const headerHeight = 114;
  const deityWidth = 76;
  const deityHeight = 110;

  // Deity Photo Box (Left)
  try {
    doc.image(DEITY_PATH, margin + 2, curY + 2, { width: deityWidth, height: deityHeight });
  } catch (e) {
    // fallback border
  }
  doc.rect(margin + 2, curY + 2, deityWidth, deityHeight).lineWidth(0.8).strokeColor(BLACK).stroke();

  // Right Header Area
  const rightX = margin + deityWidth + 10;
  const rightW = contentWidth - deityWidth - 10;

  // Row 1: GSTIN, GST INVOICE badge, Cell numbers
  const storeGstin = bill.store_gstin || '37AYPPR2420N1ZU';
  const storePan = bill.store_pan || 'AYPPR2420N';
  const storeCell = bill.store_cell || '9493049274\n8317551337';
  const storeName = bill.store_name || 'RAVICHANDRA HANDLOOMS';
  const storeTagline = bill.store_tagline || 'Hand Loom Pure Lace SILK SAREES Manufacturers';
  const storeAddress = bill.store_address || '# 10/28, K.P.T. Street, DHARMAVARAM-515671. Sri Sathyasai Dist. A.P.';

  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(9.5)
     .text(`GSTIN : ${storeGstin}`, rightX, curY + 2);
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(9)
     .text(`PAN : ${storePan}`, rightX, curY + 14);

  // Middle Badge: [ GST INVOICE ]
  const badgeW = 100;
  const badgeH = 16;
  const badgeX = rightX + (rightW - badgeW) / 2;
  doc.rect(badgeX, curY + 2, badgeW, badgeH).lineWidth(1).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(9.5)
     .text('GST INVOICE', badgeX, curY + 6, { width: badgeW, align: 'center' });

  // Right Cell Numbers
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5)
     .text(`Cell : 9493049274`, rightX, curY + 2, { width: rightW, align: 'right' });
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5)
     .text(`8317551337`, rightX, curY + 13, { width: rightW, align: 'right' });

  // Main Brand Name (Bold Royal Maroon, Big)
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(22)
     .text(storeName.toUpperCase(), rightX, curY + 28, { width: rightW, align: 'center', characterSpacing: 0.5 });

  // Tagline In Outlined Box
  const tagBoxW = 270;
  const tagBoxH = 16;
  const tagBoxX = rightX + (rightW - tagBoxW) / 2;
  const tagBoxY = curY + 57;
  doc.rect(tagBoxX, tagBoxY, tagBoxW, tagBoxH).lineWidth(0.8).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Oblique').fontSize(8.8)
     .text(storeTagline, tagBoxX, tagBoxY + 4, { width: tagBoxW, align: 'center' });

  // Address
  const addrText = bill.store_address || '# 10/28, K.P.T. Street, DHARMAVARAM-515671. Sri Sathyasai Dist. A.P.';
  if (addrText.includes('DHARMAVARAM')) {
    const parts = addrText.split('DHARMAVARAM');
    doc.fillColor(BLACK).font('Helvetica').fontSize(8.5)
       .text(parts[0].trim(), rightX, curY + 77, { width: rightW, align: 'center' });
    doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(8.8)
       .text('DHARMAVARAM' + (parts[1] || ''), rightX, curY + 89, { width: rightW, align: 'center' });
  } else {
    doc.fillColor(BLACK).font('Helvetica').fontSize(8.5)
       .text(addrText, rightX, curY + 80, { width: rightW, align: 'center' });
  }

  curY += headerHeight + 5;

  // Horizontal divider
  doc.rect(margin, curY, contentWidth, 0.8).fillColor(BLACK).fill();
  curY += 1;

  // 2. INVOICE PARTICULARS 2-COLUMN GRID (3 ROWS)
  const partRowH = 15;
  const halfW = contentWidth / 2;

  const partRows = [
    { leftLabel: 'Invoice No :', leftVal: bill.invoice_number, rightLabel: 'Invoice Date :', rightVal: formatDate(bill.invoice_date) },
    { leftLabel: 'Vehicle No :', leftVal: bill.vehicle_no || '', rightLabel: 'Transporter :', rightVal: bill.transporter || '' },
    { leftLabel: 'Reverse Charge :', leftVal: bill.reverse_charge || 'No', rightLabel: 'Agent Name :', rightVal: bill.agent_name || '' }
  ];

  partRows.forEach((r, idx) => {
    const y = curY + (idx * partRowH);
    // Draw cells
    doc.rect(margin, y, halfW, partRowH).lineWidth(0.6).strokeColor(BLACK).stroke();
    doc.rect(margin + halfW, y, halfW, partRowH).lineWidth(0.6).strokeColor(BLACK).stroke();

    // Left cell text
    doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text(r.leftLabel, margin + 4, y + 4);
    doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(r.leftVal, margin + 74, y + 4);

    // Right cell text
    doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text(r.rightLabel, margin + halfW + 4, y + 4);
    doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(r.rightVal, margin + halfW + 74, y + 4);
  });

  curY += partRows.length * partRowH;

  // 3. DETAILS OF RECEIVER (BILLED TO)
  const recvHeaderH = 14;
  doc.rect(margin, curY, contentWidth, recvHeaderH).fillColor(HEADER_BG).fill();
  doc.rect(margin, curY, contentWidth, recvHeaderH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.8)
     .text('Details of Receiver (Billed To)', margin + 20, curY + 3);
  curY += recvHeaderH;

  const recvRowH = 14;
  // Row: Name
  doc.rect(margin, curY, contentWidth, recvRowH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('Name :', margin + 4, curY + 3.5);
  doc.fillColor(INK_DARK).font('Helvetica-Bold').fontSize(8.5).text(bill.receiver_name || '', margin + 50, curY + 3.5);
  curY += recvRowH;

  // Row: GSTIN
  doc.rect(margin, curY, contentWidth, recvRowH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('GSTIN :', margin + 4, curY + 3.5);
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(bill.receiver_gstin || '', margin + 50, curY + 3.5);
  curY += recvRowH;

  // Row: Address
  const addrHeight = 22;
  doc.rect(margin, curY, contentWidth, addrHeight).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('Address :', margin + 4, curY + 4);
  const fullAddr = [bill.receiver_address, bill.receiver_state ? `State: ${bill.receiver_state}` : '', bill.receiver_phone ? `Phone: ${bill.receiver_phone}` : ''].filter(Boolean).join(', ');
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.2).text(fullAddr, margin + 50, curY + 4, { width: contentWidth - 55 });
  curY += addrHeight;

  // 4. GOODS ITEMS TABLE
  const colWidths = {
    sno: 36,
    hsn: 62,
    desc: 228,
    qty: 44,
    rate: 65,
    amount: 100.28
  };

  const tableHeaderH = 15;
  doc.rect(margin, curY, contentWidth, tableHeaderH).fillColor(HEADER_BG).fill();
  doc.rect(margin, curY, contentWidth, tableHeaderH).lineWidth(0.8).strokeColor(BLACK).stroke();

  // Draw header column lines
  let colX = margin;
  const colKeys = ['sno', 'hsn', 'desc', 'qty', 'rate', 'amount'];
  const colTitles = ['S.No.', 'HSN Code', 'Description of Goods', 'Qty', 'Rate', 'Amount'];

  colKeys.forEach((k, i) => {
    const w = colWidths[k];
    doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5);
    const align = k === 'qty' ? 'center' : (k === 'rate' || k === 'amount' ? 'right' : (k === 'sno' ? 'center' : 'left'));
    const tX = align === 'right' ? colX : (align === 'center' ? colX : colX + 4);
    const tW = align === 'right' ? w - 4 : w;
    doc.text(colTitles[i], tX, curY + 3.5, { width: tW, align });
    if (i > 0) {
      doc.moveTo(colX, curY).lineTo(colX, curY + tableHeaderH).lineWidth(0.6).strokeColor(BLACK).stroke();
    }
    colX += w;
  });

  curY += tableHeaderH;

  // Watermark Area in Goods Table
  const tableTopY = curY;
  const tableRowsCount = 13;
  const rowH = 15;
  const totalTableHeight = tableRowsCount * rowH;

  // Draw Goddess Lakshmi watermark in center of table
  try {
    const wmWidth = 140;
    const wmHeight = 145;
    const wmX = margin + (contentWidth - wmWidth) / 2;
    const wmY = tableTopY + (totalTableHeight - wmHeight) / 2;
    doc.image(WATERMARK_PATH, wmX, wmY, { width: wmWidth, height: wmHeight });
  } catch (e) {
    // optional watermark
  }

  // Draw item rows and empty grid lines
  let rawItems = bill.items;
  if (typeof rawItems === 'string') {
    try { rawItems = JSON.parse(rawItems); } catch { rawItems = []; }
  }
  const items = Array.isArray(rawItems) ? rawItems : [];
  for (let i = 0; i < tableRowsCount; i++) {
    const rowY = tableTopY + (i * rowH);
    const it = items[i];

    // Horizontal line
    doc.rect(margin, rowY, contentWidth, rowH).lineWidth(0.5).strokeColor(BLACK).stroke();

    if (it) {
      doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.2);
      // S.No
      doc.text(String(i + 1), margin, rowY + 3.5, { width: colWidths.sno, align: 'center' });
      // HSN
      doc.text(it.hsn_code || it.hsn || '5007', margin + colWidths.sno + 4, rowY + 3.5, { width: colWidths.hsn - 8 });
      // Description
      doc.text(it.description || it.name || 'Pure Silk Sarees', margin + colWidths.sno + colWidths.hsn + 4, rowY + 3.5, { width: colWidths.desc - 8, ellipsis: true });
      // Qty
      doc.text(String(it.qty || 1), margin + colWidths.sno + colWidths.hsn + colWidths.desc, rowY + 3.5, { width: colWidths.qty, align: 'center' });
      // Rate
      doc.text(formatINR(it.rate), margin + colWidths.sno + colWidths.hsn + colWidths.desc + colWidths.qty, rowY + 3.5, { width: colWidths.rate - 4, align: 'right' });
      // Amount
      doc.text(formatINR(it.amount), margin + colWidths.sno + colWidths.hsn + colWidths.desc + colWidths.qty + colWidths.rate, rowY + 3.5, { width: colWidths.amount - 4, align: 'right' });
    }
  }

  // Draw vertical dividers across entire table body
  let vX = margin;
  colKeys.forEach((k, i) => {
    if (i > 0) {
      doc.moveTo(vX, tableTopY).lineTo(vX, tableTopY + totalTableHeight).lineWidth(0.6).strokeColor(BLACK).stroke();
    }
    vX += colWidths[k];
  });

  curY += totalTableHeight;

  // 5. BOTTOM SECTION: LEFT (BANK & TERMS) + RIGHT (TOTALS & SIGNATURE)
  const leftColW = 300;
  const rightColW = contentWidth - leftColW;
  const bottomStartY = curY;

  // Vertical line separating left and right bottom
  const bottomTotalH = 145;
  doc.rect(margin, bottomStartY, contentWidth, bottomTotalH).lineWidth(0.8).strokeColor(BLACK).stroke();
  doc.moveTo(margin + leftColW, bottomStartY).lineTo(margin + leftColW, bottomStartY + bottomTotalH).lineWidth(0.8).strokeColor(BLACK).stroke();

  // LEFT COLUMN:
  let bLeftY = bottomStartY;
  // Bank Details Header
  const bHeaderH = 14;
  doc.rect(margin, bLeftY, leftColW, bHeaderH).fillColor(HEADER_BG).fill();
  doc.rect(margin, bLeftY, leftColW, bHeaderH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('BANK DETAILS', margin + 8, bLeftY + 3);
  bLeftY += bHeaderH;

  // Bank Info
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5)
     .text(`Indian Bank A/c No. : ${bill.bank_account_no || '7653499335'}`, margin + 6, bLeftY + 4);
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5)
     .text(`IFS Code : ${bill.bank_ifsc || 'IDIB000D083'}`, margin + 6, bLeftY + 16);

  // Amount In Rupees dotted line
  const amtWords = bill.amount_in_words || numberToWordsINR(bill.total_amount);
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(7.8)
     .text(`Amount In Rupees : `, margin + 6, bLeftY + 28);
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(7.6)
     .text(amtWords, margin + 82, bLeftY + 28, { width: leftColW - 88 });
  bLeftY += 46;

  // Terms & Conditions Header
  doc.rect(margin, bLeftY, leftColW, bHeaderH).fillColor(HEADER_BG).fill();
  doc.rect(margin, bLeftY, leftColW, bHeaderH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('TERMS & CONDITIONS', margin + 8, bLeftY + 3);
  bLeftY += bHeaderH;

  // Terms bullet points
  const defaultTerms = [
    '1. This is to certify that we have valid registration under GST & all above informations are true and correct.',
    '2. Our Goods are claimless & Goods once sold cannot be taken back.',
    '3. Our responsibility ceases after handover the goods to transporter.',
    '4. Subject to Dharmavaram jurisdiction.'
  ];
  const termsList = Array.isArray(bill.terms) && bill.terms.length > 0 ? bill.terms : defaultTerms;

  doc.fillColor(BLACK).font('Helvetica').fontSize(6.8);
  termsList.forEach((t) => {
    const th = doc.heightOfString(t, { width: leftColW - 12 });
    doc.text(t, margin + 6, bLeftY + 2, { width: leftColW - 12 });
    bLeftY += th + 2;
  });

  // Customer's Signature
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8)
     .text("Customer's Signature.", margin + 120, bottomStartY + bottomTotalH - 12);

  // RIGHT COLUMN:
  let bRightY = bottomStartY;
  const rightColX = margin + leftColW;

  // TOTAL Header
  doc.rect(rightColX, bRightY, rightColW, bHeaderH).fillColor(HEADER_BG).fill();
  doc.rect(rightColX, bRightY, rightColW, bHeaderH).lineWidth(0.6).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('TOTAL', rightColX, bRightY + 3, { width: rightColW, align: 'center' });
  bRightY += bHeaderH;

  const totalRowH = 15;
  const labelW = 120;
  const valW = rightColW - labelW;

  // Taxable Amount
  doc.rect(rightColX, bRightY, rightColW, totalRowH).lineWidth(0.5).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text('Taxable Amount', rightColX + 8, bRightY + 4);
  doc.fillColor(INK_DARK).font('Helvetica-Bold').fontSize(8.5).text(formatINR(bill.taxable_amount), rightColX + labelW, bRightY + 4, { width: valW - 8, align: 'right' });
  bRightY += totalRowH;

  // Add: SGST
  doc.rect(rightColX, bRightY, rightColW, totalRowH).lineWidth(0.5).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text(`Add : SGST @ ${bill.sgst_rate || 2.5}%`, rightColX + 8, bRightY + 4);
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(formatINR(bill.sgst_amount), rightColX + labelW, bRightY + 4, { width: valW - 8, align: 'right' });
  bRightY += totalRowH;

  // Add: CGST
  doc.rect(rightColX, bRightY, rightColW, totalRowH).lineWidth(0.5).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text(`Add : CGST @ ${bill.cgst_rate || 2.5}%`, rightColX + 8, bRightY + 4);
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(formatINR(bill.cgst_amount), rightColX + labelW, bRightY + 4, { width: valW - 8, align: 'right' });
  bRightY += totalRowH;

  // Add: IGST
  doc.rect(rightColX, bRightY, rightColW, totalRowH).lineWidth(0.5).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5).text(`Add : IGST @ ${bill.igst_rate || 0}%`, rightColX + 8, bRightY + 4);
  doc.fillColor(INK_DARK).font('Helvetica').fontSize(8.5).text(formatINR(bill.igst_amount), rightColX + labelW, bRightY + 4, { width: valW - 8, align: 'right' });
  bRightY += totalRowH;

  // TOTAL AMOUNT (Double bordered/highlighted in royal silk cream)
  const gtRowH = 18;
  doc.rect(rightColX, bRightY, rightColW, gtRowH).fillColor(HIGHLIGHT_BG).fill();
  doc.rect(rightColX, bRightY, rightColW, gtRowH).lineWidth(0.8).strokeColor(BLACK).stroke();
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(9.5).text('TOTAL AMOUNT', rightColX + 8, bRightY + 5);
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(10).text(formatINR(bill.total_amount), rightColX + labelW, bRightY + 4.5, { width: valW - 8, align: 'right' });
  bRightY += gtRowH;

  // For : RAVICHANDRA HANDLOOMS (in Bold Royal Maroon)
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8.5)
     .text('For  : ', rightColX + 16, bRightY + 8);
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(9)
     .text(storeName.toUpperCase(), rightColX + 46, bRightY + 7.5);

  // Signature
  doc.fillColor(BLACK).font('Helvetica-Bold').fontSize(8)
     .text('Signature.', rightColX + (rightColW / 2) - 15, bottomStartY + bottomTotalH - 12);

  doc.end();
}
