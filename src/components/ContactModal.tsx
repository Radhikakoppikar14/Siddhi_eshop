import React, { useState, useEffect } from 'react';
import { X, MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  prefilledItem?: string;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  prefilledItem = '',
  onClose,
}) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (prefilledItem) {
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: `Inquiry: ${prefilledItem}`,
        message: `Hello, I would like to inquire regarding specifications, pricing, and availability for: ${prefilledItem}.`,
      });
    } else {
      setFormState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    }
    setIsSent(false);
  }, [prefilledItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#F3EFFE] backdrop-blur-sm backdrop-blur-md overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#F3EFFE] rounded-3xl shadow-2xl border border-[#E6DEFA] max-w-3xl w-full my-auto overflow-hidden text-[#1E1B2E]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Contact Title & Subtext */}
            <div className="bg-[#F3EFFE] px-6 sm:px-8 py-5 border-b border-[#E6DEFA] flex items-center justify-between">
              <div>
                <span className="text-sm sm:text-base font-bold uppercase tracking-widest text-[#1E1B2E] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#6D3FD6]" />
                  CONTACT SIDDHI KABEL
                </span>
                <p className="text-[11px] sm:text-xs text-[#55516B] font-light mt-1">
                  Get in touch with us for any questions about our products or solutions.
                </p>
              </div>
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={onClose}
                className="p-2 rounded-full bg-white hover:bg-[#F3EFFE] text-[#1E1B2E] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto space-y-4 bg-[#F3EFFE]">
              {/* Head Office Quick Info Strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-white rounded-2xl border border-[#E6DEFA] text-xs text-[#1E1B2E]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#6D3FD6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold text-[#1E1B2E]">Head Office:</strong>
                    <span className="text-[#55516B] font-light text-[11px] leading-snug">
                      No.3, 1st Main Rd, Banashankari 3rd Stage, Bangalore 560 085
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#6D3FD6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold text-[#1E1B2E]">Call Support:</strong>
                    <span className="text-[#55516B] font-light text-[11px] block">
                      080 – 2672 0440
                    </span>
                    <span className="text-[#1E1B2E] font-medium text-[11px] block">
                      096200 00947, 098860 58511
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#6D3FD6] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold text-[#1E1B2E]">Email Us:</strong>
                    <span className="text-[#55516B] font-light text-[11px] block">
                      info@siddhikabel.com
                    </span>
                    <span className="text-[#55516B] font-light text-[11px] block">
                      guru@siddhikabel.com
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Feedback Screen */}
              {isSent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 px-6 bg-[#FCFBFF] rounded-2xl border border-[#E6DEFA] text-center space-y-4 shadow-xl"
                >
                  <div className="w-14 h-14 bg-[#E6DEFA]/50 text-[#55516B] rounded-full mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-normal text-[#1E1B2E] font-editorial">
                    Message Successfully Sent!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#55516B]/80 font-light max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="font-semibold text-[#1E1B2E]">{formState.name}</strong>. An application sales engineer from Siddhi Kabel Bangalore will review your inquiry and get in touch with you shortly.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-colors shadow-sm cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Contact Message Form in Crisp Light Contrast Container */
                <div className="bg-[#FCFBFF] rounded-2xl p-5 sm:p-6 border border-[#E6DEFA] shadow-xl space-y-4">
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E6DEFA]">
                      <h4 className="text-xs sm:text-sm font-bold text-[#1E1B2E] uppercase tracking-wider">
                        Send an Inquiry Message
                      </h4>
                      {prefilledItem && (
                        <span className="text-[11px] text-[#55516B] bg-[#F3EFFE] px-2.5 py-0.5 rounded-full font-medium border border-[#E6DEFA]">
                          Item: {prefilledItem}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-semibold text-[#1E1B2E] mb-1">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Enter your name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 text-[#1E1B2E] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[#1E1B2E] mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="Enter your mobile number"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 text-[#1E1B2E] transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-semibold text-[#1E1B2E] mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 text-[#1E1B2E] transition-all"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-[#1E1B2E] mb-1">
                          Subject / Requirement
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Lapp Cable Quote / Switchgear"
                          value={formState.subject}
                          onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 text-[#1E1B2E] transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#1E1B2E] mb-1">
                        Your Message *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Specify item quantities, technical queries, or project delivery deadline..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-[#E6DEFA] rounded-xl focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 text-[#1E1B2E] transition-all"
                      />
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#E6DEFA]">
                      <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2.5 text-xs text-[#55516B] hover:text-[#1E1B2E] border border-[#E6DEFA] rounded-xl transition-colors cursor-pointer bg-white"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-2 px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                      >
                        {isSending ? (
                          <span>Sending...</span>
                        ) : (
                          <>
                            <span>Send Inquiry</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
