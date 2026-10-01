import React from "react";
import { X, FileText, Paperclip, Trash2, LogOut, Plus, ShieldCheck, Building2, MapPin } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const AccountModal: React.FC = () => {
  const {
    currentUser,
    accountModalOpen,
    closeAccountModal,
    logout,
    userOffers,
    deleteOffer,
  } = useAuth();
  const useNavigateInstance = useNavigate();

  if (!accountModalOpen || !currentUser) return null;

  const initials =
    currentUser.contactPerson
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "SK";

  const handleSendNewOffer = () => {
    closeAccountModal();
    if (window.location.pathname !== "/") {
      useNavigateInstance("/#rfqSection");
    } else {
      document.getElementById("rfqSection")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div
        className="relative bg-[#143284] rounded-3xl shadow-2xl border border-rose-950/60 w-full max-w-2xl overflow-hidden transition-all transform animate-in fade-in zoom-in-95 duration-300 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Minimalist Close Button */}
        <button
          onClick={closeAccountModal}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer backdrop-blur-xs shadow-2xs border border-white/10"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Header Profile Banner in Luxury 2-Color Wine Gradient */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-[#1C46BB] to-[#183DA1] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-5 overflow-hidden border-b border-[#1D49AF]/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex items-center gap-4.5">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white font-black text-xl flex items-center justify-center shadow-lg font-mono tracking-wider border border-white/20 backdrop-blur-xs">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-extrabold text-white tracking-tight">
                  {currentUser.contactPerson}
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30 font-mono">
                  <ShieldCheck size={11} />
                  <span>VERIFIED B2B</span>
                </span>
              </div>
              <p className="text-xs text-rose-100/90 font-medium mt-1 flex items-center gap-1.5">
                <Building2 size={13} className="text-sky-400" />
                <span>{currentUser.companyName}</span>
              </p>
              {currentUser.gstNo && (
                <div className="text-[11px] text-rose-200/80 font-mono mt-1">
                  GSTIN: <span className="text-white font-semibold">{currentUser.gstNo}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sign Out Button in Striking Red */}
          <button
            onClick={() => {
              logout();
              closeAccountModal();
            }}
            className="relative z-10 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold flex items-center gap-2 transition-all border border-red-500 cursor-pointer shadow-md"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Body Content with Rich Dark Multi-Stop Gradient Canvas */}
        <div className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-blue-800 via-blue-900 to-[#163793]">
          
          {/* Company Details Glass Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs shadow-inner backdrop-blur-sm">
            <div>
              <span className="text-[10px] text-rose-300/80 uppercase font-bold block font-mono tracking-wider">Business Email</span>
              <span className="font-semibold text-white truncate block mt-1">{currentUser.email}</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300/80 uppercase font-bold block font-mono tracking-wider">Phone</span>
              <span className="font-mono font-semibold text-white block mt-1">{currentUser.phone}</span>
            </div>
            <div>
              <span className="text-[10px] text-rose-300/80 uppercase font-bold block font-mono tracking-wider">Location</span>
              <span className="font-semibold text-white truncate block mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-sky-400" />
                <span>{currentUser.city ? `${currentUser.city}, ${currentUser.state}` : currentUser.state}</span>
              </span>
            </div>
          </div>

          {/* Quotations & RFQ History */}
          <div>
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center gap-2">
                <FileText size={17} className="text-sky-400" />
                <h4 className="text-sm font-extrabold text-white tracking-tight">
                  Commercial RFQ Quotation History
                </h4>
              </div>
              <button
                onClick={handleSendNewOffer}
                className="text-xs font-bold text-rose-200 hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors bg-white/10 px-3 py-1.5 rounded-lg border border-white/15 shadow-2xs"
              >
                <Plus size={13} className="text-sky-400" />
                <span>New RFQ Inquiry</span>
              </button>
            </div>

            {userOffers.length > 0 ? (
              <div className="divide-y divide-white/10 bg-white/5 border border-white/10 rounded-2xl overflow-hidden max-h-60 overflow-y-auto shadow-inner backdrop-blur-sm">
                {userOffers.map((off) => (
                  <div key={off.refNo} className="p-4 hover:bg-white/10 transition-colors flex items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-bold text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded-md border border-sky-400/20">
                          {off.refNo}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-300 font-mono text-[11px]">{off.date}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-rose-200 font-bold text-[10px] uppercase font-mono tracking-wider border border-white/10">
                          {off.category}
                        </span>
                      </div>
                      <p className="text-slate-300 line-clamp-1 mt-1.5 text-[11px] font-medium">
                        {off.notes || "Standard catalog BOM RFQ requested"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {off.filesCount > 0 && (
                        <span className="flex items-center gap-1 text-[11px] text-slate-300 font-mono bg-white/10 px-2 py-1 rounded-lg border border-white/10">
                          <Paperclip size={12} className="text-sky-400" />
                          <span>{off.filesCount} file(s)</span>
                        </span>
                      )}
                      <button
                        onClick={() => deleteOffer(off.refNo)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-500/30"
                        title="Delete reference"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white/5 border border-dashed border-white/15 rounded-2xl text-center shadow-inner">
                <FileText size={28} className="text-rose-300/50 mx-auto mb-2.5" />
                <p className="text-xs text-slate-300 mb-4 font-medium">
                  You haven't submitted any commercial RFQs yet in this session.
                </p>
                <button
                  onClick={handleSendNewOffer}
                  className="px-5 py-3 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-slate-800 font-black rounded-xl text-xs transition-all cursor-pointer shadow-md border border-sky-400"
                >
                  Create First Project Quotation
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};