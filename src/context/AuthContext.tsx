import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useToast } from "./ToastContext";
import type { Product } from "../types";
import {
  isNotEmptyString,
  isValidEmail,
  isValidPhone,
} from "../utils/validation";

export interface Customer {
  id: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  gstNo: string;
  state: string;
  city: string;
  password?: string;
  address: string;
  createdAt: string;
}

export interface CommercialOffer {
  refNo: string;
  customerId: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  notes: string;
  filesCount: number;
  date: string;
}

interface AuthContextType {
  currentUser: Customer | null;
  login: (
    identifier: string,
    password: string,
  ) => { success: boolean; message?: string };
  register: (data: Omit<Customer, "id" | "createdAt">) => {
    success: boolean;
    message?: string;
  };
  logout: () => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  authModalTab: "login" | "register";
  setAuthModalTab: (tab: "login" | "register") => void;
  openAuthModal: (tab?: "login" | "register") => void;
  closeAuthModal: () => void;
  accountModalOpen: boolean;
  setAccountModalOpen: (open: boolean) => void;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchCategory: string;
  setSearchCategory: (c: string) => void;
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  isSupportOpen: boolean;
  openSupport: () => void;
  closeSupport: () => void;
  isAboutOpen: boolean;
  openAbout: () => void;
  closeAbout: () => void;
  isRfqOpen: boolean;
  openRfq: (product?: string) => void;
  closeRfq: () => void;
  rfqProduct: string | null;
  userOffers: CommercialOffer[];
  addOffer: (offer: Omit<CommercialOffer, "date">) => void;
  deleteOffer: (refNo: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_DEMO_USER: Customer = {
  id: "SK-CUST-DEMO",
  companyName: "Apex Automation Pvt Ltd",
  contactPerson: "Rajesh Kumar",
  phone: "09845012345",
  email: "procurement@apexauto.in",
  gstNo: "29AABCU9603R1ZM",
  state: "Karnataka",
  city: "Bangalore",
  address: "Plot 14, Peenya 2nd Stage, Bangalore, Karnataka 560058",
  password: "password123",
  createdAt: new Date().toISOString(),
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<Customer | null>(() => {
    try {
      const raw = localStorage.getItem("siddhi_current_user");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.email?.includes("koppikar") || parsed.contactPerson?.includes("Radhika")) {
          localStorage.removeItem("siddhi_current_user");
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      localStorage.removeItem("siddhi_current_user");
      return null;
    }
  });

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">(
    "login",
  );
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [rfqProduct, setRfqProduct] = useState<string | null>(null);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const openSupport = useCallback(() => setIsSupportOpen(true), []);
  const closeSupport = useCallback(() => setIsSupportOpen(false), []);
  const openAbout = useCallback(() => setIsAboutOpen(true), []);
  const closeAbout = useCallback(() => setIsAboutOpen(false), []);

  const openRfq = useCallback((product = "Industrial Project Bulk Requirement") => {
    setRfqProduct(product);
    setIsRfqOpen(true);
  }, []);

  const closeRfq = useCallback(() => {
    setIsRfqOpen(false);
    setRfqProduct(null);
  }, []);

  // Global keyboard shortcut for search (⌘K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsSupportOpen(false);
        setIsAboutOpen(false);
        setIsRfqOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [offers, setOffers] = useState<CommercialOffer[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("siddhi_offers") || "[]");
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("siddhi_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("siddhi_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("siddhi_offers", JSON.stringify(offers));
  }, [offers]);

  const getStoredCustomers = (): Customer[] => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("siddhi_customers") || "[]",
      );
      if (stored.length === 0) return [DEFAULT_DEMO_USER];
      return stored;
    } catch {
      return [DEFAULT_DEMO_USER];
    }
  };

  const login = useCallback(
    (identifier: string, password: string) => {
      const cleanIdentifier = identifier.trim();
      if (!isNotEmptyString(cleanIdentifier)) {
        return {
          success: false,
          message: "Email or phone number is required.",
        };
      }
      if (!isNotEmptyString(password)) {
        return { success: false, message: "Password is required." };
      }
      const isEmailIdentifier = cleanIdentifier.includes("@");
      if (isEmailIdentifier && !isValidEmail(cleanIdentifier)) {
        return { success: false, message: "Please enter a valid email." };
      }
      if (!isEmailIdentifier && !isValidPhone(cleanIdentifier)) {
        return {
          success: false,
          message: "Please enter a valid phone number.",
        };
      }

      const cleanId = identifier.replace(/[^0-9]/g, "");
      const customers = getStoredCustomers();

      const user = customers.find((c) => {
        const phoneMatch =
          cleanId.length > 5 &&
          c.phone.replace(/[^0-9]/g, "").endsWith(cleanId);
        const emailMatch =
          c.email.toLowerCase() === cleanIdentifier.toLowerCase();
        return (phoneMatch || emailMatch) && c.password === password;
      });

      if (!user) {
        return {
          success: false,
          message:
            "Invalid credentials. No customer account matched this Phone/Email and password.",
        };
      }

      setCurrentUser(user);
      setAuthModalOpen(false);
      showToast(
        `Welcome back, ${user.contactPerson} (${user.companyName})!`,
      );
      return { success: true };
    },
    [showToast],
  );

  const register = useCallback(
    (data: Omit<Customer, "id" | "createdAt">) => {
      const customers = getStoredCustomers();
      const normalizedData = {
        ...data,
        companyName: data.companyName.trim(),
        contactPerson: data.contactPerson.trim(),
        phone: data.phone.trim(),
        email: data.email.trim().toLowerCase(),
        gstNo: data.gstNo.trim().toUpperCase(),
        state: data.state.trim(),
        city: data.city.trim(),
        address: data.address.trim(),
      };
      const password = normalizedData.password?.trim() || "";

      if (
        !isNotEmptyString(normalizedData.companyName) ||
        !isNotEmptyString(normalizedData.contactPerson) ||
        !isNotEmptyString(normalizedData.address) ||
        !isNotEmptyString(normalizedData.city) ||
        !isNotEmptyString(normalizedData.state) ||
        !isNotEmptyString(normalizedData.gstNo)
      ) {
        return {
          success: false,
          message: "Please fill in all required fields.",
        };
      }
      if (!isValidEmail(normalizedData.email)) {
        return { success: false, message: "Please enter a valid email." };
      }
      if (!isValidPhone(normalizedData.phone)) {
        return {
          success: false,
          message: "Please enter a valid phone number.",
        };
      }
      if (!isNotEmptyString(password) || password.length < 6) {
        return {
          success: false,
          message: "Password must be at least 6 characters long.",
        };
      }
      if (!/[!@#$%^&*(),.?":{}|<>_\-+=[\]\\/`~]/.test(password)) {
        return {
          success: false,
          message: "Password must contain at least one special character.",
        };
      }
      if (
        customers.some(
          (customer) =>
            customer.email.toLowerCase() === normalizedData.email ||
            customer.phone.replace(/\D/g, "") ===
              normalizedData.phone.replace(/\D/g, ""),
        )
      ) {
        return {
          success: false,
          message: "An account with this email or phone number already exists.",
        };
      }

      const newCustomer: Customer = {
        ...normalizedData,
        id: "SK-CUST-" + Date.now(),
        createdAt: new Date().toISOString(),
      };

      customers.push(newCustomer);
      localStorage.setItem("siddhi_customers", JSON.stringify(customers));
      setCurrentUser(newCustomer);
      setAuthModalOpen(false);
      showToast(
        `Welcome, ${newCustomer.contactPerson}! Account created for ${newCustomer.companyName}.`,
      );
      return { success: true };
    },
    [showToast],
  );

  const logout = useCallback(() => {
    localStorage.removeItem("siddhi_current_user");
    sessionStorage.removeItem("siddhi_current_user");
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    setCurrentUser(null);
    setAccountModalOpen(false);
    showToast("You have been signed out.");
  }, [showToast]);

  const openAuthModal = useCallback((tab: "login" | "register" = "login") => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
  }, []);

  const openAccountModal = useCallback(() => {
    if (!currentUser) {
      openAuthModal("login");
    } else {
      setAccountModalOpen(true);
    }
  }, [currentUser, openAuthModal]);

  const closeAccountModal = useCallback(() => {
    setAccountModalOpen(false);
  }, []);

  const openQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const addOffer = useCallback((newOffer: Omit<CommercialOffer, "date">) => {
    const fullOffer: CommercialOffer = {
      ...newOffer,
      date: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setOffers((prev) => [fullOffer, ...prev]);
  }, []);

  const deleteOffer = useCallback(
    (refNo: string) => {
      if (!currentUser || !isNotEmptyString(refNo)) return;

      setOffers((prev) =>
        prev.filter(
          (offer) =>
            offer.refNo !== refNo ||
            (offer.customerId !== currentUser.id &&
              offer.email !== currentUser.email &&
              offer.phone !== currentUser.phone),
        ),
      );
      showToast("Offer deleted successfully.");
    },
    [currentUser, showToast],
  );

  const userOffers = currentUser
    ? offers.filter(
        (o) =>
          o.customerId === currentUser.id ||
          o.email === currentUser.email ||
          o.phone === currentUser.phone,
      )
    : [];

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        register,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalTab,
        setAuthModalTab,
        openAuthModal,
        closeAuthModal,
        accountModalOpen,
        setAccountModalOpen,
        openAccountModal,
        closeAccountModal,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        searchQuery,
        setSearchQuery,
        searchCategory,
        setSearchCategory,
        isSearchOpen,
        openSearch,
        closeSearch,
        isSupportOpen,
        openSupport,
        closeSupport,
        isAboutOpen,
        openAbout,
        closeAbout,
        isRfqOpen,
        openRfq,
        closeRfq,
        rfqProduct,
        userOffers,
        addOffer,
        deleteOffer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};