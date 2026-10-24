// src/utils/validation.ts

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return isNotEmptyString(email) && emailRegex.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  return /^\d{10}$/.test(phone.trim());
};

export const isNotEmptyString = (value: string): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

export const isValidPositiveNumber = (value: number | string): boolean => {
  const num =
    typeof value === "string"
      ? value.trim() === ""
        ? NaN
        : Number(value)
      : value;
  return Number.isFinite(num) && num > 0;
};

export const isValidNonNegativeNumber = (value: number | string): boolean => {
  const num =
    typeof value === "string"
      ? value.trim() === ""
        ? NaN
        : Number(value)
      : value;
  return Number.isFinite(num) && num >= 0;
};

export const sanitizeInput = (value: string): string => {
  return value.trim();
};
