/**
 * Compliance utilities for Indian Payroll.
 * All calculations assume amounts are in paise (1 INR = 100 paise).
 */

export const PF_RATE = 0.12;
export const PF_WAGE_CEILING = 1500000; // 15,000 INR

export const ESI_EMPLOYEE_RATE = 0.0075;
export const ESI_WAGE_THRESHOLD = 2100000; // 21,000 INR

/**
 * Calculate Provident Fund (PF) deduction.
 * Standard is 12% of Basic + DA.
 */
export function calculatePF(basicPay: number, applyCeiling = true): number {
  const eligibleWage = applyCeiling
    ? Math.min(basicPay, PF_WAGE_CEILING)
    : basicPay;
  return Math.floor(eligibleWage * PF_RATE);
}

/**
 * Calculate Employee State Insurance (ESI) deduction.
 * 0.75% of Gross if Gross <= 21,000 INR.
 */
export function calculateESI(grossPay: number): number {
  if (grossPay > ESI_WAGE_THRESHOLD) return 0;
  return Math.ceil(grossPay * ESI_EMPLOYEE_RATE);
}

/**
 * Calculate Professional Tax (PT).
 * This varies by state. This is a simplified slab for Maharashtra-like states.
 */
export function calculatePT(gross: number, _state: string = 'MH'): number {
  const grossMonthlyInr = gross / 100;

  if (grossMonthlyInr <= 7500) return 0;
  if (grossMonthlyInr <= 10000) return 17500; // 175 INR
  return 20000; // 200 INR (2500 in Feb usually, simplified here)
}

/**
 * Calculate basic slab-based TDS estimation.
 * Very simplified annual estimation.
 */
export function calculateMonthlyTDS(monthlyGross: number): number {
  const annualGross = (monthlyGross * 12) / 100;
  let tax = 0;

  if (annualGross <= 250000) {
    tax = 0;
  } else if (annualGross <= 500000) {
    tax = (annualGross - 250000) * 0.05;
  } else if (annualGross <= 1000000) {
    tax = 12500 + (annualGross - 500000) * 0.2;
  } else {
    tax = 112500 + (annualGross - 1000000) * 0.3;
  }

  // Monthly tax in paise
  return Math.floor((tax / 12) * 100);
}
