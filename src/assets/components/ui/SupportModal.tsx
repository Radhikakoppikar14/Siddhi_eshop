import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  X,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useToast } from "../../../context/ToastContext";

interface SupportModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen = false,
  onClose,
}) => {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      showToast("Please fill in your name, phone, and message.");
      return;
    }
    setSubmitted(true);
    showToast("Support ticket lodged! Bangalore desk notified.");
    setTimeout(() => {
      setSubmitted(false);
      if (onClose) onClose();
    }, 2000);
  };

  const handleWhatsAppChat = () => {
    window.open(
      "https://wa.me/919620000947?text=Hello%20Siddhi%20Kabel%20Sales%20Desk,%20I%20would%20like%20to%20inquire%20about%20industrial%20cables%20and%20switchgear.",
      "_blank",
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in select-none overflow-hidden"
      onClick={onClose}
    >
      <div
        className="w-full h-[100dvh] max-h-[100dvh] sm:h-auto sm:max-h-[90vh] max-w-4xl flex flex-col bg-gradient-to-br from-[#1948A6] via-[#164195] to-[#143B89] rounded-none sm:rounded-[2.5rem] shadow-2xl border border-indigo-900/50 overflow-hidden text-white relative p-4 sm:p-8 lg:p-10 gap-4 sm:gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* TOP HEADER SECTION */}
        <div className="flex items-start justify-between gap-3 pb-4 sm:pb-6 border-b border-indigo-900/40 relative z-10 shrink-0">
          <div className="min-w-0 space-y-1.5 sm:space-y-2">
            <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Direct Sales & Dispatch Desk
            </h2>
            <p className="text-[11px] sm:text-sm text-indigo-200/80 font-sans max-w-2xl leading-relaxed">
              Connect directly with our senior application engineers for cable
              sizing assistance, factory batch certificates, or immediate
              warehouse pickups.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
              aria-label="Close dialog"
              type="button"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1 space-y-4 sm:space-y-8 relative z-10">
          {/* THREE CARDS ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 relative z-10">
            {/* Box 1: Main Showroom & Address */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-slate-900 shadow-xl space-y-3 border border-indigo-100 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700">
                  <MapPin size={18} />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-[10px] font-mono font-bold">
                  BANGALORE
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                  MAIN SHOWROOM & COUNTER
                </span>
                <h4 className="text-sm font-black text-slate-800">
                  Siddhi Kabel Corporation
                </h4>
                <p className="text-xs text-slate-600 font-mono leading-relaxed">
                  No. 42/1, 2nd Main, Banashankari 3rd Stage / Peenya Industrial
                  Area, Bangalore - 560058
                </p>
              </div>
            </div>

            {/* Box 2: Phone Numbers & Email Addresses */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-slate-900 shadow-xl space-y-3 border border-indigo-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                    <Phone size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                    DIRECT CONTACTS
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    HOTLINE & EMAILS
                  </span>
                  <div className="text-sm font-black font-mono text-slate-800">
                    +91 96200 00947
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    Landline: +91 80 2221 4455 / 4456
                  </span>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-0.5 font-mono text-xs">
                    <a
                      href="mailto:sales@siddhikabel.com"
                      className="font-bold text-slate-900 hover:text-indigo-700 transition-colors block truncate"
                    >
                      sales@siddhikabel.com
                    </a>
                    <a
                      href="mailto:enquiry@siddhikabel.com"
                      className="text-slate-500 hover:text-indigo-700 transition-colors block truncate text-[11px]"
                    >
                      enquiry@siddhikabel.com
                    </a>
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleWhatsAppChat}
                className="w-full py-2 px-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <MessageSquare size={14} />
                <span>Open WhatsApp Chat</span>
              </button>
            </div>

            {/* Box 3: Operating Timings Only */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-slate-900 shadow-xl space-y-3 border border-indigo-100 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700">
                    <Clock size={18} />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[10px] font-mono font-bold">
                    HOURS
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    WAREHOUSE TIMINGS
                  </span>
                  <h4 className="text-sm font-black text-slate-800 mb-2">
                    Operating Schedule
                  </h4>
                </div>

                <div className="pt-1 font-mono text-xs space-y-2 text-slate-600">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-900">
                      Monday - Friday:
                    </span>
                    <span className="font-medium text-slate-900">
                      9:30 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-semibold text-slate-900">
                      Saturday:
                    </span>
                    <span className="font-medium text-slate-900">
                      9:30 AM - 5:30 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Sunday:</span>
                    <span className="text-emerald-700 font-bold">
                      Emergency On-Call
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INTERACTIVE INQUIRY FORM SECTION */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 text-slate-900 shadow-xl space-y-4 sm:space-y-6 relative z-10">
            {submitted ? (
              <div className="py-10 text-center space-y-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <CheckCircle2 size={40} className="text-emerald-600 mx-auto" />
                <h4 className="text-lg font-black text-slate-800">
                  Support Ticket Lodged Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your inquiry has been dispatched to our senior application
                  engineers in Bangalore.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-medium text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-mono font-medium text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 transition-colors font-medium text-slate-900"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-600 block">
                      Project Bill of Materials / Quote Details *
                    </label>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                      <Sparkles size={11} /> DIRECT DESK ACTIVE
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention part numbers, quantities, or project requirements..."
                    className="w-full p-4 rounded-xl border border-slate-300 focus:border-slate-900 text-xs outline-none bg-slate-50/50 font-sans resize-none transition-colors font-medium text-slate-900"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-4 bg-[#15478A] hover:bg-blue-800 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <Send size={15} />
                    <span>Call Sales Desk Now & Send Enquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
