import React, { useState } from "react";
import {
  X,
  Building,
  ShieldCheck,
  ArrowRight,
  Mail,
  Lock,
  Phone,
  User,
  MapPin,
  FileText,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useToast } from "../../../context/ToastContext";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
} from "../../../utils/validation";

export const AuthModal: React.FC = () => {
  const {
    authModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    register,
  } = useAuth();
  const { showToast } = useToast();

  // Login form state
  const [loginId, setLoginId] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginFieldErrors, setLoginFieldErrors] = useState<
    Record<string, string>
  >({});

  // Register form state
  const [regData, setRegData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    gstNo: "",
    state: "Karnataka",
    city: "Bangalore",
    address: "Peenya Industrial Area, Bangalore",
    password: "",
  });
  const [regError, setRegError] = useState("");
  const [regFieldErrors, setRegFieldErrors] = useState<Record<string, string>>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!isNotEmptyString(loginId))
      errors.loginId = "Please enter your Email or Phone number.";
    if (!isNotEmptyString(loginPass))
      errors.loginPass = "Please enter your password.";

    if (Object.keys(errors).length > 0) {
      setLoginFieldErrors(errors);
      return;
    }

    setLoginFieldErrors({});
    setIsSubmitting(true);
    const res = login(loginId, loginPass);
    setIsSubmitting(false);

    if (res.success) {
      showToast("Signed in successfully to Enterprise Portal!");
      closeAuthModal();
    } else {
      setLoginError(
        res.message ||
          "Invalid credentials. Please verify or register an enterprise account.",
      );
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!isNotEmptyString(regData.companyName))
      errors.companyName = "Company name is required.";
    if (!isNotEmptyString(regData.contactPerson))
      errors.contactPerson = "Contact person name is required.";
    if (!isValidEmail(regData.email))
      errors.email = "Please enter a valid business email.";
    if (!isValidPhone(regData.phone))
      errors.phone = "Please enter a valid 10-digit mobile number.";
    if (!isNotEmptyString(regData.password) || regData.password.length < 6)
      errors.password = "Password must be at least 6 characters.";

    if (Object.keys(errors).length > 0) {
      setRegFieldErrors(errors);
      setRegError("Please fix the highlighted fields below.");
      return;
    }

    setRegFieldErrors({});
    setRegError("");
    setIsSubmitting(true);

    try {
      const res = register(regData);

      if (res && typeof res === "object" && "success" in res && !res.success) {
        setIsSubmitting(false);
        setRegError(
          res.message || "An account with this email/phone already exists.",
        );
      } else {
        // Automatically sign in the user immediately after successful registration
        login(regData.email, regData.password);
        setIsSubmitting(false);

        showToast(
          `Welcome ${regData.companyName}! Enterprise account registered and signed in.`,
        );
        closeAuthModal();
      }
    } catch (err) {
      login(regData.email, regData.password);
      setIsSubmitting(false);
      showToast(
        `Welcome ${regData.companyName}! Enterprise account registered and signed in.`,
      );
      closeAuthModal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fade-in select-none">
      <div
        className="relative flex max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] w-full max-w-xl flex-col overflow-hidden bg-gradient-to-br from-[#EAF4FF] to-[#FFF0F0] rounded-[2.5rem] shadow-2xl border border-blue-100 transition-all transform animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Animated Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/80 hover:bg-blue-700 hover:text-white text-slate-600 transition-all duration-200 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          aria-label="Close dialog"
          type="button"
        >
          <X size={18} />
        </button>

        <div className="relative shrink-0 p-6 sm:p-8 bg-gradient-to-br from-[#DCEEFF] to-[#FCE4E5] text-blue-950 overflow-hidden border-b border-blue-100">
          <div className="relative z-10 flex items-center gap-4 mb-5">
            <div className="p-3.5 bg-white/80 border border-white text-blue-700 rounded-2xl shadow-sm">
              <Building size={24} />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black tracking-tight text-blue-950">
                Enterprise B2B Customer Portal
              </h3>
              <span className="text-xs text-red-700 font-mono font-medium tracking-wide">
                Siddhi Kabel Corporation Private Limited
              </span>
            </div>
          </div>

          {/* Smooth Tab Switcher */}
          <div className="relative z-10 grid grid-cols-2 gap-2 p-1.5 bg-white/70 rounded-2xl border border-white text-xs font-bold shadow-sm">
            <button
              type="button"
              onClick={() => {
                setAuthModalTab("login");
                setLoginError("");
                setRegError("");
              }}
              className={`py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalTab === "login"
                  ? "bg-blue-700 text-white shadow-md font-extrabold scale-[1.01]"
                  : "text-slate-700 hover:text-blue-800 hover:bg-blue-50"
              }`}
            >
              <span>Sign In to Account</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthModalTab("register");
                setLoginError("");
                setRegError("");
              }}
              className={`py-3 rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5 ${
                authModalTab === "register"
                  ? "bg-red-600 text-white shadow-md font-extrabold scale-[1.01]"
                  : "text-slate-700 hover:text-red-700 hover:bg-red-50"
              }`}
            >
              <Sparkles size={13} className="text-red-500" />
              <span>Register Profile</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-8 bg-stone-50/50 transition-all duration-300">
          {authModalTab === "login" ? (
            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4 animate-fade-in"
            >
              {loginError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 leading-snug font-medium animate-fade-in">
                  {loginError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                  Registered Business Email or Mobile *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Mail size={16} />
                  </span>
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="engineer@company.com or 10-digit phone"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-2xl border text-xs sm:text-sm text-slate-900 bg-white outline-none transition-all duration-200 ${
                      loginFieldErrors.loginId
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 focus:border-[#1E4EBB] focus:ring-4 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    }`}
                  />
                </div>
                {loginFieldErrors.loginId && (
                  <span className="text-[11px] text-red-600 mt-1 block font-medium">
                    {loginFieldErrors.loginId}
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                  Account Password *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-3.5 rounded-2xl border text-xs sm:text-sm text-slate-900 bg-white outline-none transition-all duration-200 ${
                      loginFieldErrors.loginPass
                        ? "border-red-500 bg-red-50"
                        : "border-slate-200 focus:border-[#1E4EBB] focus:ring-4 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    }`}
                  />
                </div>
                {loginFieldErrors.loginPass && (
                  <span className="text-[11px] text-red-600 mt-1 block font-medium">
                    {loginFieldErrors.loginPass}
                  </span>
                )}
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-2xl text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
                <ShieldCheck
                  size={18}
                  className="text-emerald-600 shrink-0 mt-0.5"
                />
                <span className="leading-relaxed">
                  Enterprise session protected. Instant access to custom project
                  pricing and quotation history.
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-5 bg-gradient-to-r from-blue-700 to-red-600 hover:from-blue-800 hover:to-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                <span>
                  {isSubmitting ? "Signing In..." : "Sign In to Account"}
                </span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-slate-500 font-medium">
                  New corporate client?{" "}
                  <button
                    type="button"
                    onClick={() => setAuthModalTab("register")}
                    className="font-bold text-blue-700 hover:text-red-700 hover:underline cursor-pointer"
                  >
                    Register GST Profile
                  </button>
                </span>
              </div>
            </form>
          ) : (
            <form
              onSubmit={handleRegisterSubmit}
              className="space-y-4 pr-1 animate-fade-in"
            >
              {regError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 leading-snug font-medium">
                  {regError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Company Name *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Building size={15} />
                    </span>
                    <input
                      type="text"
                      value={regData.companyName}
                      onChange={(e) =>
                        setRegData({ ...regData, companyName: e.target.value })
                      }
                      placeholder="e.g. Apex Engineering"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    />
                  </div>
                  {regFieldErrors.companyName && (
                    <span className="text-[10px] text-red-600 font-medium">
                      {regFieldErrors.companyName}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Contact Person *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <User size={15} />
                    </span>
                    <input
                      type="text"
                      value={regData.contactPerson}
                      onChange={(e) =>
                        setRegData({
                          ...regData,
                          contactPerson: e.target.value,
                        })
                      }
                      placeholder="e.g. Anand Sharma"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    />
                  </div>
                  {regFieldErrors.contactPerson && (
                    <span className="text-[10px] text-red-600 font-medium">
                      {regFieldErrors.contactPerson}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Business Email *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Mail size={15} />
                    </span>
                    <input
                      type="email"
                      value={regData.email}
                      onChange={(e) =>
                        setRegData({ ...regData, email: e.target.value })
                      }
                      placeholder="procurement@apex.com"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    />
                  </div>
                  {regFieldErrors.email && (
                    <span className="text-[10px] text-red-600 font-medium">
                      {regFieldErrors.email}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Mobile Phone *
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <Phone size={15} />
                    </span>
                    <input
                      type="tel"
                      value={regData.phone}
                      onChange={(e) =>
                        setRegData({ ...regData, phone: e.target.value })
                      }
                      placeholder="10-digit number"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    />
                  </div>
                  {regFieldErrors.phone && (
                    <span className="text-[10px] text-red-600 font-medium">
                      {regFieldErrors.phone}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    Company GSTIN
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <FileText size={15} />
                    </span>
                    <input
                      type="text"
                      value={regData.gstNo}
                      onChange={(e) =>
                        setRegData({ ...regData, gstNo: e.target.value })
                      }
                      placeholder="29AAAAA0000A1Z5"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 font-mono outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs uppercase"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                    City / Area
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                      <MapPin size={15} />
                    </span>
                    <input
                      type="text"
                      value={regData.city}
                      onChange={(e) =>
                        setRegData({ ...regData, city: e.target.value })
                      }
                      placeholder="Bangalore"
                      className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 font-mono uppercase tracking-wider">
                  Password (min 6 characters) *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
                    <Lock size={15} />
                  </span>
                  <input
                    type="password"
                    value={regData.password}
                    onChange={(e) =>
                      setRegData({ ...regData, password: e.target.value })
                    }
                    placeholder="Create secure password"
                    className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 outline-none focus:border-[#1E4EBB] focus:ring-2 focus:ring-[#1E4EBB]/10 shadow-2xs"
                  />
                </div>
                {regFieldErrors.password && (
                  <span className="text-[10px] text-red-600 font-medium">
                    {regFieldErrors.password}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-5 bg-gradient-to-r from-blue-700 to-red-600 hover:from-blue-800 hover:to-red-700 text-white font-black text-xs uppercase tracking-wider rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-70"
              >
                <span>
                  {isSubmitting
                    ? "Registering & Signing In..."
                    : "Create Account & Sign In"}
                </span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
