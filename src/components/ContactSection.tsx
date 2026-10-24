import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Sparkles,
  Maximize2,
  X,
  PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ContactSection: React.FC = () => {
  const location = useLocation();
  const prefilledProduct = (location.state as { product?: string })?.product || '';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: prefilledProduct ? `Inquiry: ${prefilledProduct}` : '',
    message: prefilledProduct
      ? `Hello, I would like to inquire about specifications, pricing, and availability for: ${prefilledProduct}.`
      : '',
  });

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    if (prefilledProduct) {
      setFormState((prev) => ({
        ...prev,
        subject: `Inquiry: ${prefilledProduct}`,
        message: `Hello, I would like to inquire about specifications, pricing, and availability for: ${prefilledProduct}.`,
      }));
    }
  }, [prefilledProduct]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F3EFFE] relative overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-[#F3EFFE] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-[#6D3FD6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EFFE] border border-[#E6DEFA] text-xs font-semibold tracking-widest uppercase text-[#55516B]">
              <Sparkles className="w-3.5 h-3.5 text-[#6D3FD6]" />
              <span>Contact Details</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1E1B2E] font-editorial tracking-tight leading-[1.18]">
              Get in touch with us <br className="hidden sm:inline" />
              for any questions about our products or solutions.
            </h2>

            <p className="text-sm sm:text-base text-[#55516B]/80 font-light max-w-xl leading-relaxed">
              Connect directly with our Bangalore central sales and application engineering division. 
              We provide rapid turnaround quotes, OEM specifications, and factory-certified supply support.
            </p>

            {/* Quick Live Hotlines & Response Stat */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F3EFFE] border border-[#E6DEFA] text-[#1E1B2E] font-medium">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6D3FD6] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6D3FD6]" />
                </span>
                <span>Dispatch Desk Online</span>
              </div>

              <a
                href="tel:08026720440"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6DEFA] text-[#1E1B2E] hover:text-[#55516B] hover:border-[#E6DEFA] transition-all shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#55516B]" />
                <span className="font-medium">080 – 2672 0440</span>
              </a>

              <a
                href="tel:09620000947"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E6DEFA] text-[#1E1B2E] hover:text-[#55516B] hover:border-[#E6DEFA] transition-all shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#55516B]" />
                <span className="font-medium">096200 00947</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-Impact Visual Image Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 relative"
          >
            <div
              onClick={() => setIsImageModalOpen(true)}
              className="group relative rounded-3xl overflow-hidden border border-[#E6DEFA] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer bg-[#F3EFFE]"
            >
              <img
                src="/images/resource/ind2.jpg"
                alt="Siddhi Kabel Bangalore Central Distribution Hub"
                className="w-full h-64 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FCFBFF] via-[#FCFBFF]/40 to-transparent" />

              {/* Top Zoom Pill */}
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#FCFBFF]/90 backdrop-blur-xs text-[11px] font-medium text-[#1E1B2E] flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform border border-[#E6DEFA]">
                <Maximize2 className="w-3 h-3 text-[#55516B]" />
                <span>View Hub</span>
              </div>

              {/* Bottom Card Overlay Content */}
              <div className="absolute bottom-5 left-5 right-5 text-[#1E1B2E] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#55516B] tracking-wider uppercase">
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Central Operations Hub</span>
                </div>
                <h3 className="text-base sm:text-lg font-medium font-editorial text-[#1E1B2E] leading-tight">
                  Siddhi Kabel Bangalore Facility
                </h3>
                <p className="text-xs text-[#55516B] font-light leading-snug">
                  Banashankari 3rd Stage · Ready stock &amp; rapid industrial logistics across South India &amp; nationwide.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* If pre-filled from clicking an item */}
        {prefilledProduct && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-[#6D3FD6]/8 border border-[#E6DEFA] rounded-2xl flex items-center justify-between gap-4 text-xs text-[#1E1B2E]"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#55516B]">Inquiring about:</span>
              <span className="font-medium">{prefilledProduct}</span>
            </div>
            <span className="text-[#6D3FD6] font-light hidden sm:inline">
              Form automatically prepared below
            </span>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details & Bangalore HQ Card (Dark Brown Version) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25 }}
              className="bg-[#F3EFFE] text-[#1E1B2E] rounded-3xl border border-[#E6DEFA] p-8 space-y-6 shadow-2xl relative overflow-hidden"
            >
              {/* Warm decorative ambient glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F3EFFE] rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#6D3FD6]/8 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-start gap-4">
                <div className="p-3 bg-white text-[#55516B] rounded-2xl border border-[#E6DEFA] shrink-0">
                  <MapPin className="w-5 h-5 text-[#6D3FD6]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#55516B] uppercase tracking-wider mb-1">
                    Head Office
                  </h3>
                  <p className="text-sm text-[#55516B] leading-relaxed font-light">
                    <strong className="font-semibold text-[#1E1B2E]">
                      Siddhi Kabel Corporation Private Limited
                    </strong>
                    <br />
                    No.3, 1st Main Road, 1st Block,
                    <br />
                    Banashankari 3rd Stage, Bangalore 560 085.
                  </p>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4 border-t border-[#E6DEFA] pt-5">
                <div className="p-3 bg-white text-[#55516B] rounded-2xl border border-[#E6DEFA] shrink-0">
                  <Phone className="w-5 h-5 text-[#6D3FD6]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#55516B] uppercase tracking-wider mb-1">
                    Call Support
                  </h3>
                  <div className="space-y-1.5 text-sm text-[#55516B] font-light">
                    <p>
                      Landline:{' '}
                      <a href="tel:08026720440" className="hover:text-[#E6DEFA] font-mono font-medium transition-colors">
                        080 – 2672 0440
                      </a>
                    </p>
                    <p>
                      Mobile 1:{' '}
                      <a href="tel:09620000947" className="hover:text-[#E6DEFA] font-mono font-medium transition-colors">
                        096200 00947
                      </a>
                    </p>
                    <p>
                      Mobile 2:{' '}
                      <a href="tel:09886058511" className="hover:text-[#E6DEFA] font-mono font-medium transition-colors">
                        098860 58511
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4 border-t border-[#E6DEFA] pt-5">
                <div className="p-3 bg-white text-[#55516B] rounded-2xl border border-[#E6DEFA] shrink-0">
                  <Mail className="w-5 h-5 text-[#6D3FD6]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#55516B] uppercase tracking-wider mb-1">
                    Email us
                  </h3>
                  <div className="space-y-1 text-sm text-[#55516B] font-light">
                    <p>
                      <a href="mailto:info@siddhikabel.com" className="hover:text-[#E6DEFA] font-mono transition-colors">
                        info@siddhikabel.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:guru@siddhikabel.com" className="hover:text-[#E6DEFA] font-mono transition-colors">
                        guru@siddhikabel.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-start gap-4 border-t border-[#E6DEFA] pt-5">
                <div className="p-3 bg-white text-[#55516B] rounded-2xl border border-[#E6DEFA] shrink-0">
                  <Clock className="w-5 h-5 text-[#6D3FD6]" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#55516B] uppercase tracking-wider mb-1">
                    Business Hours
                  </h3>
                  <p className="text-sm text-[#55516B] font-light">
                    Monday – Saturday: 9:00 AM – 6:30 PM
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Interactive Send a Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DEFA] hover:border-[#E6DEFA] p-8 sm:p-10 shadow-xs hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-normal text-[#1E1B2E] font-editorial mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-[#55516B]/80 font-light mb-6">
              Get in touch with us for any questions about our products or solutions.
            </p>

            {isSent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center space-y-3 bg-[#FCFBFF] rounded-2xl border border-[#E6DEFA]"
              >
                <div className="w-12 h-12 rounded-full bg-[#E6DEFA]/50 text-[#55516B] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-medium text-[#1E1B2E] font-editorial">
                  Message Successfully Sent
                </h4>
                <p className="text-xs text-[#55516B]/80 font-light max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Siddhi Kabel. An application engineer will review your inquiry and connect with you shortly.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-3 text-xs font-semibold text-[#55516B] underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#1E1B2E] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 transition-all text-[#1E1B2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#1E1B2E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 transition-all text-[#1E1B2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-[#1E1B2E] mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 transition-all text-[#1E1B2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-[#1E1B2E] mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 transition-all text-[#1E1B2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-[#1E1B2E] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FCFBFF] border border-[#E6DEFA] rounded-xl focus:bg-white focus:outline-hidden focus:border-[#E6DEFA] focus:ring-2 focus:ring-[#55516B]/20 transition-all text-[#1E1B2E] leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSending}
                    className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#FCFBFF] bg-[#6D3FD6] hover:bg-[#4F2AB0] rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {isSending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Now</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox for Facility Image */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageModalOpen(false)}
            className="fixed inset-0 z-50 bg-[#F3EFFE] backdrop-blur-sm backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FCFBFF] rounded-3xl overflow-hidden shadow-2xl border border-[#E6DEFA]"
            >
              <div className="relative">
                <img
                  src="/images/resource/ind2.jpg"
                  alt="Siddhi Kabel Central Facility Full View"
                  className="w-full max-h-[75vh] object-cover"
                />
                <button
                  onClick={() => setIsImageModalOpen(false)}
                  className="absolute top-4 right-4 p-2 bg-white/70 hover:bg-white text-[#1E1B2E] rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 bg-[#FCFBFF] space-y-1">
                <h4 className="text-lg font-medium text-[#1E1B2E] font-editorial">
                  Siddhi Kabel Corporation · Bangalore Central Logistics Hub
                </h4>
                <p className="text-xs text-[#55516B]/80 font-light">
                  No.3, 1st Main Road, 1st Block, Banashankari 3rd Stage, Bangalore 560 085
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
