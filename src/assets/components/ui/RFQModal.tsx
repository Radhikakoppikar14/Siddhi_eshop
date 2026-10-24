import React, { useEffect, useState } from "react";
import { X, FileText, Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { useToast } from "../../../context/ToastContext";
import { useAuth } from "../../../context/AuthContext";
import { isValidEmail, isValidPhone } from "../../../utils/validation";

interface RFQModalProps {
  product: string;
  onClose: () => void;
}

const inputBase =
  "w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs font-sans font-medium outline-none bg-slate-50/50 text-slate-900";
const labelBase =
  "text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1";

export const RFQModal: React.FC<RFQModalProps> = ({ product, onClose }) => {
  const { showToast } = useToast();
  const { currentUser, addOffer } = useAuth();

  const [companyName, setCompanyName] = useState(
    currentUser?.companyName ?? "",
  );
  const [officerName, setOfficerName] = useState(
    currentUser?.contactPerson ?? "",
  );
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [phone, setPhone] = useState(currentUser?.phone ?? "");
  const [gstin, setGstin] = useState(currentUser?.gstNo ?? "");
  const [city, setCity] = useState(currentUser?.city ?? "");
  const [selectedProductLine, setSelectedProductLine] = useState(product);
  const [quantity, setQuantity] = useState("500");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !phone.trim() || !officerName.trim()) {
      showToast("Please fill in company name, contact officer, and phone.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      showToast("Please enter a valid email.");
      return;
    }
    if (!isValidPhone(phone.trim())) {
      showToast("Please enter a valid phone number.");
      return;
    }

    addOffer({
      refNo: "RFQ-" + Date.now(),
      customerId: currentUser?.id ?? "GUEST",
      company: companyName.trim(),
      name: officerName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      category: selectedProductLine,
      notes: `${details.trim()}\nEstimated Volume: ${quantity}\nDelivery city: ${city.trim()}${
        gstin.trim() ? `\nGSTIN: ${gstin.trim().toUpperCase()}` : ""
      }`,
      filesCount: 0,
    });

    setSubmitted(true);
    showToast("Official Quotation RFQ submitted to Bangalore desk!");
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative bg-gradient-to-br from-[#EAF4FC] to-[#7395B8] rounded-[2.5rem] shadow-2xl shadow-blue-900/20 border border-blue-200 w-full max-w-4xl overflow-hidden text-slate-900 animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-label="Request for quotation"
        onClick={(event) => event.stopPropagation()}
      >
        {/* MODAL HEADER */}
        <div className="p-6 sm:p-8 border-b border-blue-200 flex items-center justify-between relative z-10 bg-gradient-to-r from-[#EAF4FC] to-[#A9C4E2]">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-800 font-extrabold uppercase tracking-widest">
                OFFICIAL QUOTATION DESK
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight flex items-center gap-2">
              <FileText size={20} className="text-blue-700 shrink-0" />
              <span>Request Commercial Quote: {product}</span>
            </h2>
          </div>

          <button
            className="p-2.5 rounded-full bg-white/80 hover:bg-blue-700 hover:text-white text-slate-700 transition-colors cursor-pointer border border-blue-200 shrink-0 shadow-2xs"
            type="button"
            onClick={onClose}
            aria-label="Close quotation form"
          >
            <X size={18} />
          </button>
        </div>

        {/* MODAL BODY CONTENT */}
        <div className="max-h-[80vh] overflow-y-auto p-4 sm:p-6 relative z-10">
          <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                PROCUREMENT OFFICER & CORPORATE CONTACT DETAILS
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                * Required Fields
              </span>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <CheckCircle2 size={44} className="text-emerald-600 mx-auto" />
                <h4 className="text-xl font-black text-slate-800">
                  Quotation Request Lodged Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed font-sans">
                  Your project requirements have been forwarded to our senior
                  estimation engineers in Bangalore. Expect GST Proforma within
                  2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="rfq-company" className={labelBase}>
                      Company Name *
                    </label>
                    <input
                      id="rfq-company"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Apex Automation Pvt Ltd"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-officer" className={labelBase}>
                      Contact Officer *
                    </label>
                    <input
                      id="rfq-officer"
                      type="text"
                      required
                      value={officerName}
                      onChange={(e) => setOfficerName(e.target.value)}
                      placeholder="Purchasing / Project Engineer"
                      className={inputBase}
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-email" className={labelBase}>
                      Corporate Email *
                    </label>
                    <input
                      id="rfq-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@company.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="rfq-phone" className={labelBase}>
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="rfq-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 99000 48877"
                      className={`${inputBase} font-mono`}
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-gstin" className={labelBase}>
                      Buyer GSTIN (For ITC 18%)
                    </label>
                    <input
                      id="rfq-gstin"
                      type="text"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="29AABCU9603R1ZM"
                      className={`${inputBase} font-mono uppercase`}
                    />
                  </div>

                  <div>
                    <label htmlFor="rfq-city" className={labelBase}>
                      Delivery Site City *
                    </label>
                    <input
                      id="rfq-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Bangalore"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="rfq-product-line" className={labelBase}>
                      Primary Product Line
                    </label>
                    <select
                      id="rfq-product-line"
                      value={selectedProductLine}
                      onChange={(e) => setSelectedProductLine(e.target.value)}
                      className={`${inputBase} cursor-pointer`}
                    >
                      <option
                        value="Flexible Cables & Wires (LAPP ÖLFLEX & UNITRONIC)"
                        className="py-2 text-xs font-sans"
                      >
                        Flexible Cables & Wires (LAPP ÖLFLEX & UNITRONIC)
                      </option>
                      <option
                        value="Industrial Switchgear (EATON Moeller PKZM0)"
                        className="py-2 text-xs font-sans"
                      >
                        Industrial Switchgear (EATON Moeller PKZM0)
                      </option>
                      <option
                        value="Wire Marking Systems (PARTEX Cable Tagging)"
                        className="py-2 text-xs font-sans"
                      >
                        Wire Marking Systems (PARTEX Cable Tagging)
                      </option>
                      <option
                        value="Industrial Plugs & Sockets (MENNEKES Heavy-Duty)"
                        className="py-2 text-xs font-sans"
                      >
                        Industrial Plugs & Sockets (MENNEKES Heavy-Duty)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="rfq-quantity" className={labelBase}>
                      Estimated Quantity / Volume
                    </label>
                    <input
                      id="rfq-quantity"
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="500"
                      className={inputBase}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="rfq-details" className={labelBase}>
                    Bill of Materials (BOM) Details & Specifications *
                  </label>
                  <textarea
                    id="rfq-details"
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Mention exact part numbers, specifications, required quantities, and site delivery dates..."
                    className="w-full p-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 text-slate-900 font-sans resize-none font-medium"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#15478A] hover:bg-blue-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Send size={15} />
                    <span>SUBMIT REQUEST FOR QUOTATION</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                    <ShieldCheck size={12} /> 100% Genuine European OEM Warranty
                  </span>
                  <span>·</span>
                  <span>GST Proforma Within 2 Hours</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
