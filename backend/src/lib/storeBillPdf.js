import PDFDocument from 'pdfkit';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EMBLEM_PATH = path.join(__dirname, '..', '..', 'assets', 'emblem.png');
const LOGO_HORIZONTAL = path.join(__dirname, '..', '..', 'assets', 'logo-horizontal.png');
const LOGO_INVOICE = path.join(__dirname, '..', '..', 'assets', 'logo-invoice.png');

const MAROON = '#581e15';
const GOLD = '#8c5d1e';
const INK = '#220D0A';
const INK_LIGHT = '#555555';
const RULE = '#E4DDD4';
const BG_ALT = '#FAF7F2';

const STORE_INFO = {
  name: 'Ravichandra Textiles',
  tagline: 'Authentic Dharmavaram Pure Silk Handlooms & Royal Bridal Pattu',
  address: '10-28, Kpt street, near Punjab National Bank, Dharmavaram, Andhra Pradesh - 515671',
  phone: '+91 83175 51337',
  email: 'ravichandratextiles39@gmail.com',
};

function formatINR(amount) {
  return 'Rs. ' + Number(amount || 0).toLocaleString('en-IN');
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatTime(d) {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
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

/**
 * Generates and pipes a pristine, print-ready Store Bill PDF directly onto `res`.
 * Supports both 'A3' (large showroom format) and 'A4' (compact counter format).
 */
export function renderStoreBillPDF(res, bill, requestedSize = 'A3') {
  const isA3 = String(requestedSize).toUpperCase() === 'A3';
  const pageSize = isA3 ? 'A3' : 'A4';
  
  // Page margins & dimensions:
  // A4: 595.28 x 841.89 pt
  // A3: 841.89 x 1190.55 pt
  const margin = isA3 ? 50 : 36;
  const pageWidth = isA3 ? 841.89 : 595.28;
  const contentWidth = pageWidth - (margin * 2);

  const doc = new PDFDocument({
    size: pageSize,
    margin,
    info: {
      Title: `Store Bill ${bill.bill_number} — Ravichandra Textiles`,
      Author: 'Ravichandra Textiles',
      Subject: 'Store Bill & Cash Memo',
    },
  });

  doc.pipe(res);

  // Outer decorative border
  doc.rect(margin - 8, margin - 8, contentWidth + 16, (isA3 ? 1190.55 : 841.89) - (margin * 2) + 16)
     .lineWidth(1)
     .strokeColor(GOLD)
     .stroke();

  let curY = margin + 10;

  // 1. Top Decorative Ornament
  doc.moveTo(margin + 40, curY)
     .lineTo(margin + (contentWidth / 2) - 20, curY)
     .lineWidth(0.8)
     .strokeColor(GOLD)
     .stroke();

  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 11 : 9).text('*', margin + (contentWidth / 2) - 4, curY - (isA3 ? 6 : 5));

  doc.moveTo(margin + (contentWidth / 2) + 20, curY)
     .lineTo(margin + contentWidth - 40, curY)
     .lineWidth(0.8)
     .strokeColor(GOLD)
     .stroke();

  curY += isA3 ? 12 : 9;

  // 2. Header: Left-side Shop Branding & Right-side Showroom Address
  const emblemWidth = isA3 ? 42 : 32;
  const leftColWidth = contentWidth * 0.58;
  const rightColWidth = contentWidth * 0.40;
  const rightColX = margin + contentWidth - rightColWidth;

  // Left: Sacred Temple Emblem + Brand Title & Subtitle
  try {
    doc.image(EMBLEM_PATH, margin, curY, { width: emblemWidth });
  } catch {
    try {
      doc.image(LOGO_INVOICE, margin, curY, { width: emblemWidth });
    } catch {
      // fallback if image cannot be read
    }
  }

  const leftTextX = margin + emblemWidth + (isA3 ? 12 : 9);
  const leftTextWidth = leftColWidth - emblemWidth - 12;

  // Brand Title: Bold Royal Maroon
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 19 : 15)
     .text(STORE_INFO.name.toUpperCase(), leftTextX, curY + (isA3 ? 2 : 1), { width: leftTextWidth });

  // Store Tagline
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 9 : 7.2)
     .text(STORE_INFO.tagline, leftTextX, curY + (isA3 ? 23 : 18), { width: leftTextWidth });

  // Subtitle badge
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 8 : 6.5)
     .text('NON-GST STORE CASH MEMO  *  HANDLOOM SILK SHOWROOM', leftTextX, curY + (isA3 ? 36 : 28), { width: leftTextWidth });

  // Right: Showroom & Store Address
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 8.5 : 7)
     .text('SHOWROOM & STORE ADDRESS', rightColX, curY + 1, { width: rightColWidth, align: 'right' });

  doc.fillColor(INK).font('Helvetica').fontSize(isA3 ? 8.5 : 7)
     .text(STORE_INFO.address, rightColX, curY + (isA3 ? 13 : 11), { width: rightColWidth, align: 'right' });

  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 8 : 6.5)
     .text(`Phone: ${STORE_INFO.phone}  |  Email: ${STORE_INFO.email}`, rightColX, curY + (isA3 ? 36 : 30), { width: rightColWidth, align: 'right' });

  // Spacing before separator line
  curY += isA3 ? 54 : 45;

  // Maroon Separator Line
  doc.moveTo(margin, curY).lineTo(margin + contentWidth, curY).lineWidth(1.8).strokeColor(MAROON).stroke();
  curY += isA3 ? 10 : 8;

  // 3. Customer & Bill Particulars Box
  const boxHeight = isA3 ? 92 : 78;
  const colWidth = (contentWidth - 14) / 2;

  // Left Box: Billed To
  const leftBoxX = margin;
  doc.rect(leftBoxX, curY, colWidth, boxHeight).fillAndStroke(BG_ALT, RULE);

  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 9.5 : 7.5)
     .text('BILLED TO (CUSTOMER DETAILS)', leftBoxX + 12, curY + 8);

  doc.moveTo(leftBoxX + 12, curY + 20)
     .lineTo(leftBoxX + colWidth - 12, curY + 20)
     .lineWidth(0.5)
     .strokeColor(RULE)
     .stroke();

  doc.fillColor(INK).font('Helvetica-Bold').fontSize(isA3 ? 13 : 10.5)
     .text(bill.customer_name || 'Valued Customer', leftBoxX + 12, curY + 25);

  let custDetailY = curY + (isA3 ? 43 : 39);
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10 : 8);

  if (bill.customer_phone) {
    doc.text(`Phone / Mobile: +91 ${bill.customer_phone}`, leftBoxX + 12, custDetailY);
    custDetailY += isA3 ? 13 : 11;
  }
  if (bill.customer_city) {
    doc.text(`City / Town: ${bill.customer_city}`, leftBoxX + 12, custDetailY);
    custDetailY += isA3 ? 13 : 11;
  }
  if (bill.customer_address) {
    doc.text(`Address: ${bill.customer_address}`, leftBoxX + 12, custDetailY, { width: colWidth - 24, lineBreak: false });
  }

  // Right Box: Bill Particulars
  const rightBoxX = margin + colWidth + 14;
  doc.rect(rightBoxX, curY, colWidth, boxHeight).fillAndStroke(BG_ALT, RULE);

  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 9.5 : 7.5)
     .text('BILL PARTICULARS', rightBoxX + 12, curY + 8);

  doc.moveTo(rightBoxX + 12, curY + 20)
     .lineTo(rightBoxX + colWidth - 12, curY + 20)
     .lineWidth(0.5)
     .strokeColor(RULE)
     .stroke();

  const particulars = [
    ['Bill No:', bill.bill_number, true],
    ['Bill Date:', formatDate(bill.bill_date), false],
    ['Bill Time:', bill.created_at ? formatTime(bill.created_at) : '—', false],
    ['Payment Mode:', bill.payment_method || 'Cash', true],
  ];

  let partY = curY + 25;
  for (const [lbl, val, bold] of particulars) {
    doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(lbl, rightBoxX + 12, partY);

    if (bold && lbl === 'Bill No:') {
      doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 11 : 9)
         .text(String(val), rightBoxX + 110, partY);
    } else if (bold && lbl === 'Payment Mode:') {
      doc.fillColor('#2e7d32').font('Helvetica-Bold').fontSize(isA3 ? 10 : 8)
         .text(String(val), rightBoxX + 110, partY);
    } else {
      doc.fillColor(INK).font('Helvetica').fontSize(isA3 ? 10 : 8)
         .text(String(val), rightBoxX + 110, partY);
    }
    partY += isA3 ? 14 : 11.5;
  }

  curY += boxHeight + (isA3 ? 16 : 12);

  // 4. Items Table
  // Columns: S.No (6%), Description (48%), Color (18%), Qty (8%), Rate (10%), Amount (10%)
  const colWidths = {
    sno: Math.round(contentWidth * 0.06),
    desc: Math.round(contentWidth * 0.46),
    color: Math.round(contentWidth * 0.20),
    qty: Math.round(contentWidth * 0.08),
    rate: Math.round(contentWidth * 0.10),
    amount: contentWidth - (Math.round(contentWidth * 0.06) + Math.round(contentWidth * 0.46) + Math.round(contentWidth * 0.20) + Math.round(contentWidth * 0.08) + Math.round(contentWidth * 0.10)),
  };

  const tableHeaderHeight = isA3 ? 24 : 20;

  // Table Header Background
  doc.rect(margin, curY, contentWidth, tableHeaderHeight).fill(MAROON);

  doc.fillColor('#ffffff').font('Helvetica-Bold').fontSize(isA3 ? 10 : 8);
  let hX = margin;
  doc.text('S.NO', hX, curY + (isA3 ? 7 : 5), { width: colWidths.sno, align: 'center' });
  hX += colWidths.sno;
  doc.text('SAREE PARTICULAR / DESCRIPTION', hX + 6, curY + (isA3 ? 7 : 5), { width: colWidths.desc - 12 });
  hX += colWidths.desc;
  doc.text('COLOR / DESIGN', hX + 6, curY + (isA3 ? 7 : 5), { width: colWidths.color - 12 });
  hX += colWidths.color;
  doc.text('QTY', hX, curY + (isA3 ? 7 : 5), { width: colWidths.qty, align: 'center' });
  hX += colWidths.qty;
  doc.text('RATE (Rs)', hX, curY + (isA3 ? 7 : 5), { width: colWidths.rate - 6, align: 'right' });
  hX += colWidths.rate;
  doc.text('AMOUNT (Rs)', hX, curY + (isA3 ? 7 : 5), { width: colWidths.amount - 6, align: 'right' });

  curY += tableHeaderHeight;

  // Table Rows (Directly followed by summary — NO gaps!)
  const items = Array.isArray(bill.items) ? bill.items : [];
  const rowHeight = isA3 ? 24 : 20;

  items.forEach((it, idx) => {
    const isEven = idx % 2 === 1;
    if (isEven) {
      doc.rect(margin, curY, contentWidth, rowHeight).fill(BG_ALT);
    }

    doc.moveTo(margin, curY + rowHeight).lineTo(margin + contentWidth, curY + rowHeight).lineWidth(0.5).strokeColor(RULE).stroke();

    let rX = margin;
    doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(String(idx + 1), rX, curY + (isA3 ? 6 : 5), { width: colWidths.sno, align: 'center' });
    rX += colWidths.sno;

    doc.fillColor(INK).font('Helvetica-Bold').fontSize(isA3 ? 10.5 : 8.5)
       .text(it.name || 'Pure Silk Saree', rX + 6, curY + (isA3 ? 6 : 5), { width: colWidths.desc - 12, lineBreak: false });
    rX += colWidths.desc;

    doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(it.color || 'Traditional Pure Silk', rX + 6, curY + (isA3 ? 6 : 5), { width: colWidths.color - 12, lineBreak: false });
    rX += colWidths.color;

    doc.fillColor(INK).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(String(it.qty || 1), rX, curY + (isA3 ? 6 : 5), { width: colWidths.qty, align: 'center' });
    rX += colWidths.qty;

    doc.fillColor(INK).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(Number(it.rate || 0).toLocaleString('en-IN'), rX, curY + (isA3 ? 6 : 5), { width: colWidths.rate - 6, align: 'right' });
    rX += colWidths.rate;

    doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 10.5 : 8.5)
       .text(Number(it.amount || 0).toLocaleString('en-IN'), rX, curY + (isA3 ? 6 : 5), { width: colWidths.amount - 6, align: 'right' });

    curY += rowHeight;
  });

  curY += isA3 ? 16 : 12;

  // 5. Summary & Totals Block (Flows seamlessly immediately after items)
  const sumLeftWidth = Math.round(contentWidth * 0.60);
  const sumRightWidth = contentWidth - sumLeftWidth - 14;

  const summaryTopY = curY;

  // Left Column: Amount in Words + Terms
  const leftX = margin;
  doc.rect(leftX, summaryTopY, sumLeftWidth, isA3 ? 46 : 38).fillAndStroke('#fdfaf5', RULE);
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 9 : 7)
     .text('AMOUNT CHARGEABLE IN WORDS:', leftX + 10, summaryTopY + 7);
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 11 : 8.5)
     .text(numberToWordsINR(bill.total_amount), leftX + 10, summaryTopY + (isA3 ? 22 : 18), { width: sumLeftWidth - 20 });

  const termsY = summaryTopY + (isA3 ? 54 : 44);
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(isA3 ? 9.5 : 7.5)
     .text('Terms & Store Conditions:', leftX, termsY);

  const defaultTerms = [
    '* 100% Authentic Dharmavaram Handloom Pure Silk Guarantee.',
    '* Handloom silk sarees must be dry cleaned only.',
    '* Goods once sold can be exchanged within 7 days in original condition with this bill.',
    '* Thank you for visiting Ravichandra Textiles!',
  ];

  let tY = termsY + (isA3 ? 14 : 11);
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 9 : 7);
  for (const t of defaultTerms) {
    doc.text(t, leftX, tY);
    tY += isA3 ? 12 : 9.5;
  }

  // Right Column: Calculation Totals Table
  const rightX = margin + sumLeftWidth + 14;
  let totalsY = summaryTopY;

  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10.5 : 8.5)
     .text('Subtotal:', rightX, totalsY);
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(isA3 ? 10.5 : 8.5)
     .text(formatINR(bill.subtotal), rightX, totalsY, { width: sumRightWidth, align: 'right' });
  totalsY += isA3 ? 16 : 13;

  if (Number(bill.discount || 0) > 0) {
    doc.fillColor('#2e7d32').font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text('Special Discount:', rightX, totalsY);
    doc.fillColor('#2e7d32').font('Helvetica-Bold').fontSize(isA3 ? 10 : 8)
       .text(`- ${formatINR(bill.discount)}`, rightX, totalsY, { width: sumRightWidth, align: 'right' });
    totalsY += isA3 ? 16 : 13;
  }

  if (Number(bill.round_off || 0) !== 0) {
    doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text('Round Off:', rightX, totalsY);
    doc.fillColor(INK).font('Helvetica').fontSize(isA3 ? 10 : 8)
       .text(bill.round_off > 0 ? `+${formatINR(bill.round_off)}` : formatINR(bill.round_off), rightX, totalsY, { width: sumRightWidth, align: 'right' });
    totalsY += isA3 ? 16 : 13;
  }

  // Grand Total Banner
  const gtHeight = isA3 ? 34 : 28;
  doc.rect(rightX, totalsY, sumRightWidth, gtHeight).fillAndStroke('#fdf2ea', MAROON);

  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 12 : 9.5)
     .text('TOTAL PAYABLE:', rightX + 8, totalsY + (isA3 ? 10 : 8));

  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 16 : 13)
     .text(formatINR(bill.total_amount), rightX, totalsY + (isA3 ? 8 : 7), { width: sumRightWidth - 8, align: 'right' });

  curY = Math.max(tY, totalsY + gtHeight) + (isA3 ? 30 : 20);

  // 6. Signatures & Authenticity Seal Footer
  doc.moveTo(margin, curY).lineTo(margin + contentWidth, curY).lineWidth(0.5).strokeColor(RULE).stroke();
  curY += isA3 ? 14 : 10;

  // Customer Signature
  const sigWidth = isA3 ? 150 : 130;
  const sigLineY = curY + (isA3 ? 34 : 26);
  doc.moveTo(margin + 10, sigLineY).lineTo(margin + 10 + sigWidth, sigLineY).lineWidth(0.8).strokeColor(INK_LIGHT).stroke();
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 9 : 7.5)
     .text('Customer Signature', margin + 10, sigLineY + 6, { width: sigWidth, align: 'center' });

  // Center Purity Seal Badge
  const sealWidth = isA3 ? 240 : 200;
  const sealX = margin + (contentWidth - sealWidth) / 2;
  const sealY = curY + (isA3 ? 8 : 6);
  const sealH = isA3 ? 20 : 16;
  doc.rect(sealX, sealY, sealWidth, sealH).fillAndStroke('#fbf7f2', GOLD);
  doc.fillColor(GOLD).font('Helvetica-Bold').fontSize(isA3 ? 8.5 : 7)
     .text('CERTIFIED DHARMAVARAM HANDLOOM SILK', sealX, sealY + (isA3 ? 5.5 : 4.5), { width: sealWidth, align: 'center' });
  doc.fillColor(INK_LIGHT).font('Helvetica-Oblique').fontSize(isA3 ? 8 : 6.5)
     .text('Thank you for patronizing authentic Indian handlooms!', sealX, sealY + sealH + 6, { width: sealWidth, align: 'center' });

  // Authorized Signatory
  const authX = margin + contentWidth - sigWidth - 10;
  doc.fillColor(MAROON).font('Helvetica-Bold').fontSize(isA3 ? 9.5 : 8)
     .text('For RAVICHANDRA TEXTILES', authX, curY + (isA3 ? 14 : 10), { width: sigWidth, align: 'center' });
  doc.moveTo(authX, sigLineY).lineTo(authX + sigWidth, sigLineY).lineWidth(0.8).strokeColor(INK_LIGHT).stroke();
  doc.fillColor(INK_LIGHT).font('Helvetica').fontSize(isA3 ? 9 : 7.5)
     .text('Authorized Signatory', authX, sigLineY + 6, { width: sigWidth, align: 'center' });

  doc.end();
}
