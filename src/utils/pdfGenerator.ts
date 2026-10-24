import { jsPDF } from "jspdf";

export interface RFQPDFData {
  refNo: string;
  date: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  gstin?: string;
  city?: string;
  productLine: string;
  quantity?: string;
  totalEst?: number;
  notes?: string;
  filesCount?: number;
  cartItems?: Array<{
    brand: string;
    partNo: string;
    name: string;
    qty: number;
    unit: string;
    price: number;
  }>;
}

// Convert image url to base64 or fallback to canvas-drawn logo
async function getLogoDataUrl(): Promise<string | null> {
  try {
    return await new Promise<string>((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth || 300;
          canvas.height = img.naturalHeight || 80;
          const ctx = canvas.getContext("2d");
          if (!ctx) return resolve(drawFallbackLogo());
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL("image/png"));
        } catch {
          resolve(drawFallbackLogo());
        }
      };
      img.onerror = () => resolve(drawFallbackLogo());
      img.src = "/images/siddhi-kabel-lockup.png";
    });
  } catch {
    return drawFallbackLogo();
  }
}

function drawFallbackLogo(): string {
  const canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 90;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  // White background
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 400, 90);

  // Red accent box
  ctx.fillStyle = "#B91C1C";
  ctx.fillRect(8, 12, 66, 66);

  // Lightning bolt symbol inside box
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(45, 18);
  ctx.lineTo(26, 46);
  ctx.lineTo(40, 46);
  ctx.lineTo(35, 72);
  ctx.lineTo(54, 42);
  ctx.lineTo(41, 42);
  ctx.closePath();
  ctx.fill();

  // "Siddhi Kabel" text
  ctx.fillStyle = "#991B1B";
  ctx.font = "bold 32px sans-serif";
  ctx.fillText("Siddhi Kabel", 86, 44);

  // Subtitle
  ctx.fillStyle = "#475569";
  ctx.font = "bold 13px sans-serif";
  ctx.fillText("CORPORATION PRIVATE LIMITED", 88, 66);

  return canvas.toDataURL("image/png");
}

export async function generateRFQPDF(data: RFQPDFData): Promise<void> {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2; // 182mm

  // 1. Top Header Banner — Luxurious Deep Maroon & Burgundy
  doc.setFillColor(59, 14, 28); // #183B9E Deep Maroon
  doc.rect(0, 0, pageWidth, 42, "F");

  // Accent Line under header
  doc.setFillColor(190, 18, 60); // #BE123C Rose Maroon
  doc.rect(0, 42, pageWidth, 1.8, "F");

  // Embed Logo Image
  const logoData = await getLogoDataUrl();
  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", margin, 7, 52, 14);
    } catch {
      // Fallback text if addImage fails
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("SIDDHI KABEL", margin, 15);
    }
  }

  // Company Name Header (Only Company Name, Authorized, Emails, Phone)
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("SIDDHI KABEL CORPORATION PRIVATE LIMITED", 74, 13);

  // Authorized Status
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(254, 205, 211); // Rose 200
  doc.text("OFFICIAL AUTHORIZED DISTRIBUTOR & CHANNEL PARTNER", 74, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(226, 232, 240);
  doc.text("LAPP Kabel Germany · EATON Moeller · PARTEX Sweden · MENNEKES", 74, 26);

  // Emails and Phone
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.8);
  doc.text("Phone: +91 96200 00947 / +91 80 2221 4455", 74, 33);
  doc.text("Email: sales@siddhikabel.com | enquiry@siddhikabel.com", 74, 38);

  // 2. Document Title Ribbon
  let y = 49;
  doc.setFillColor(254, 242, 242); // Light maroon tint (#FEF2F2)
  doc.rect(margin, y, contentWidth, 16, "F");
  doc.setDrawColor(225, 29, 72); // Rose 600 border
  doc.setLineWidth(0.4);
  doc.rect(margin, y, contentWidth, 16, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(136, 19, 55); // Rose 900
  doc.text("OFFICIAL B2B COMMERCIAL QUOTATION REQUEST (RFQ)", margin + 4, y + 6.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `Ref No: ${data.refNo}  |  Date: ${data.date}  |  Bangalore Engineering Sales Desk`,
    margin + 4,
    y + 12
  );

  // Status Badge on right of ribbon
  doc.setFillColor(159, 18, 57);
  doc.roundedRect(pageWidth - margin - 40, y + 3.5, 36, 9, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text("OFFICIALLY LOGGED", pageWidth - margin - 22, y + 9.2, { align: "center" });

  // 3. Procurement Client & Delivery Details Grid
  y = 70;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, "F");
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 38, 2, 2, "S");

  // Grid Header
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(margin, y, contentWidth, 7, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("BUYER & PROJECT SITE REGISTRATION", margin + 4, y + 5);

  // Client Info Fields (2 columns)
  const col1X = margin + 4;
  const col2X = margin + contentWidth / 2 + 4;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);

  // Row 1
  doc.setTextColor(100, 116, 139);
  doc.text("Company Name:", col1X, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.company || "N/A", col1X + 32, y + 14);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Corporate Email:", col2X, y + 14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.email || "N/A", col2X + 30, y + 14);

  // Row 2
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Contact Officer:", col1X, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.contact || "N/A", col1X + 32, y + 21);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Phone / WhatsApp:", col2X, y + 21);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.phone || "N/A", col2X + 30, y + 21);

  // Row 3
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Buyer GSTIN:", col1X, y + 28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.gstin || "Direct Commercial / N/A", col1X + 32, y + 28);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Delivery Site City:", col2X, y + 28);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.city || "Bangalore Hub", col2X + 30, y + 28);

  // Row 4
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Product Line:", col1X, y + 35);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(136, 19, 55);
  const pLine = data.productLine.length > 40 ? data.productLine.substring(0, 38) + "..." : data.productLine;
  doc.text(pLine, col1X + 32, y + 35);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text("Estimated Qty:", col2X, y + 35);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(data.quantity || "Per BOM", col2X + 30, y + 35);

  // 4. Cart Items Table (if any)
  y = 114;
  if (data.cartItems && data.cartItems.length > 0) {
    doc.setFillColor(59, 14, 28);
    doc.rect(margin, y, contentWidth, 7, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text("#", margin + 3, y + 5);
    doc.text("Brand & Part Number", margin + 10, y + 5);
    doc.text("Product Description", margin + 60, y + 5);
    doc.text("Quantity", margin + 125, y + 5);
    doc.text("Unit Rate", margin + 145, y + 5);
    doc.text("Total (INR)", margin + 165, y + 5);

    y += 7;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);

    data.cartItems.forEach((item, index) => {
      if (y > 230) {
        doc.addPage();
        y = 20;
      }
      const bg = index % 2 === 0 ? 255 : 248;
      doc.setFillColor(bg, bg, bg);
      doc.rect(margin, y, contentWidth, 9, "F");
      doc.setDrawColor(226, 232, 240);
      doc.line(margin, y + 9, pageWidth - margin, y + 9);

      doc.setTextColor(100, 116, 139);
      doc.text(String(index + 1), margin + 3, y + 6);

      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(`${item.brand.split(" ")[0]} · ${item.partNo}`, margin + 10, y + 6);

      doc.setFont("helvetica", "normal");
      const cName = item.name.length > 36 ? item.name.substring(0, 34) + "..." : item.name;
      doc.text(cName, margin + 60, y + 6);

      doc.text(`${item.qty} ${item.unit}`, margin + 125, y + 6);
      doc.text(`₹${item.price.toLocaleString("en-IN")}`, margin + 145, y + 6);

      const total = item.price * item.qty;
      doc.setFont("helvetica", "bold");
      doc.text(`₹${total.toLocaleString("en-IN")}`, margin + 165, y + 6);

      y += 9;
    });

    if (data.totalEst) {
      y += 3;
      doc.setFillColor(254, 242, 242);
      doc.roundedRect(pageWidth - margin - 70, y, 70, 10, 1.5, 1.5, "F");
      doc.setDrawColor(225, 29, 72);
      doc.roundedRect(pageWidth - margin - 70, y, 70, 10, 1.5, 1.5, "S");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(136, 19, 55);
      doc.text("Estimated Total (Inc. GST):", pageWidth - margin - 66, y + 6.5);
      doc.text(`₹${data.totalEst.toLocaleString("en-IN")}`, pageWidth - margin - 4, y + 6.5, { align: "right" });
      y += 14;
    }
  }

  // 5. Technical Specifications / Bill of Materials (BOM) Notes
  if (y > 220) {
    doc.addPage();
    y = 20;
  }

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, "F");
  doc.roundedRect(margin, y, contentWidth, 30, 2, 2, "S");

  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, 7, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text("PROJECT BILL OF MATERIALS (BOM) & SPECIAL TECHNICAL SCHEDULE", margin + 4, y + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);

  const cleanNotes = data.notes && data.notes.trim() ? data.notes.trim() : "Standard OEM drum lengths and manufacturer test certificates requested. Refer to attached BOM documentation.";
  const splitNotes = doc.splitTextToSize(cleanNotes, contentWidth - 8);
  doc.text(splitNotes.slice(0, 4), margin + 4, y + 12);

  // 6. Official Stamp & Authorized Signatory Block
  y += 35;
  if (y > 240) {
    doc.addPage();
    y = 20;
  }

  // Left side: Commercial Terms
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text("Official Commercial Terms & Guarantee:", margin, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.8);
  doc.setTextColor(100, 116, 139);
  doc.text("• 100% Genuine OEM factory supply with batch test certificates & manufacturer warranty.", margin, y + 4.5);
  doc.text("• Formal GST proforma with 18% ITC pass-through will be issued to your corporate email.", margin, y + 8.5);
  doc.text("• Priority dispatch scheduled from Bangalore Central Stocking Warehouse.", margin, y + 12.5);

  // Right side: Authorized Signature Box
  const sigX = pageWidth - margin - 60;
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(sigX, y - 2, 60, 24, 2, 2, "S");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(6.8);
  doc.setTextColor(136, 19, 55);
  doc.text("SIDDHI KABEL CORPORATION PVT LTD", sigX + 30, y + 3, { align: "center" });

  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("[ Commercial Sales Desk ]", sigX + 30, y + 11, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(148, 163, 184);
  doc.text("Authorized Quotation Officer", sigX + 30, y + 18, { align: "center" });

  // 7. Page Footer
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, pageHeight - 12, pageWidth - margin, pageHeight - 12);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text("Siddhi Kabel Corporation Private Limited", margin, pageHeight - 7);

  doc.setFont("helvetica", "normal");
  doc.text("Official Authorized Distributor · Phone: +91 96200 00947 · sales@siddhikabel.com", pageWidth / 2, pageHeight - 7, { align: "center" });

  doc.text("Confidential RFQ", pageWidth - margin, pageHeight - 7, { align: "right" });

  // Trigger download
  doc.save(`${data.refNo}-Official-RFQ.pdf`);
}
