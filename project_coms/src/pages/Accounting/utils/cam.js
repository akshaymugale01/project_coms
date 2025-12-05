// CAM (Common Area Maintenance) calculation utilities
// All functions are pure and testable.

// Parse a date string (YYYY-MM-DD) safely
export function parseISO(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

export function startOfMonth(date) {
  const d = new Date(date);
  d.setDate(1);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfMonth(date) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1, 0); // last day of month
  d.setHours(23, 59, 59, 999);
  return d;
}

export function daysInMonth(date) {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

// Inclusive day count between two dates (at day granularity)
export function daysBetweenInclusive(startDate, endDate) {
  const ONE_DAY = 24 * 60 * 60 * 1000;
  const s = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const e = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  return Math.max(0, Math.floor((e - s) / ONE_DAY) + 1);
}

// Determine active days in billing window for a unit given its CAM start date (possession)
export function getActiveDaysInPeriod(camStartDate, periodStart, periodEnd) {
  if (!camStartDate) return 0;
  const cam = parseISO(camStartDate);
  if (!cam) return 0;
  const effStart = cam > periodStart ? cam : periodStart;
  if (effStart > periodEnd) return 0;
  return daysBetweenInclusive(effStart, periodEnd);
}

// Calculate unit monthly CAM using per-sqft rate model
// amount = rate_per_sqft * carpet_area
// Daily CAM = monthly_amount / days_in_month
// Prorated by active days within billing window
export function calcUnitMonthlyCamRateModel({
  ratePerSqft,
  carpetArea,
  camStartDate,
  periodStart,
  periodEnd,
}) {
  const area = Number(carpetArea || 0);
  const rate = Number(ratePerSqft || 0);
  const monthlyAmount = rate * area;
  const dim = daysInMonth(periodStart);
  const activeDays = getActiveDaysInPeriod(camStartDate, periodStart, periodEnd);
  const daily = dim > 0 ? monthlyAmount / dim : 0;
  const prorated = daily * activeDays;
  return { monthlyAmount, dailyAmount: daily, activeDays, proratedAmount: prorated };
}

// Expense per sqft = totalExpense / totalActiveCarpetArea
// Unit CAM = perSqftExpense * unitCarpetArea (prorated by active days)
export function calcExpenseDistribution({
  totalExpense,
  units, // [{carpet_area, cam_start_date}]
  periodStart,
  periodEnd,
}) {
  const dim = daysInMonth(periodStart);
  const activeUnits = units.map((u) => {
    const activeDays = getActiveDaysInPeriod(u.cam_start_date, periodStart, periodEnd);
    const weight = (Number(u.carpet_area || 0) * activeDays) / (dim || 1);
    return { ...u, activeDays, weight };
  });
  const totalWeightedArea = activeUnits.reduce((sum, u) => sum + Number(u.weight || 0), 0);
  const perSqftExpense = totalWeightedArea > 0 ? Number(totalExpense || 0) / totalWeightedArea : 0;
  const allocations = activeUnits.map((u) => {
    const proratedCarpet = (Number(u.carpet_area || 0) * u.activeDays) / (dim || 1);
    const amount = perSqftExpense * proratedCarpet;
    return { unit_id: u.id || u.unit_id, activeDays: u.activeDays, amount };
  });
  return { perSqftExpense, allocations, totalWeightedArea };
}

// Days-only distribution: weight by active days only (no area)
export function calcDaysOnlyDistribution({ totalExpense, units, periodStart, periodEnd }) {
  const activeUnits = units.map((u) => {
    const activeDays = getActiveDaysInPeriod(u.cam_start_date, periodStart, periodEnd);
    return { ...u, activeDays };
  });
  const totalDays = activeUnits.reduce((sum, u) => sum + Number(u.activeDays || 0), 0);
  const allocations = activeUnits.map((u) => {
    const share = totalDays > 0 ? Number(totalExpense || 0) * Number(u.activeDays || 0) / totalDays : 0;
    return { unit_id: u.id || u.unit_id, activeDays: u.activeDays, amount: share };
  });
  return { allocations, totalDays };
}

// Build combined allocation preview (days-only and area-days) for UI tables
export function buildAllocationPreview({ totalExpense, units, periodStart, periodEnd }) {
  const dim = daysInMonth(periodStart);
  const rows = units.map((u) => {
    const area = Number(u.carpet_area_sqft ?? u.carpet_area ?? 0);
    const activeDays = getActiveDaysInPeriod(u.cam_start_date, periodStart, periodEnd);
    const areaDays = area * activeDays;
    return {
      unit_id: u.id || u.unit_id,
      flat: u.flat || u.name || u.flat_no || (u.id || u.unit_id),
      area,
      activeDays,
      areaDays,
    };
  });
  const totalDays = rows.reduce((s, r) => s + r.activeDays, 0);
  const totalAreaDays = rows.reduce((s, r) => s + r.areaDays, 0);
  const E = Number(totalExpense || 0);
  const withShares = rows.map((r) => ({
    ...r,
    daysShare: totalDays > 0 ? (E * r.activeDays) / totalDays : 0,
    areaDaysShare: totalAreaDays > 0 ? (E * r.areaDays) / totalAreaDays : 0,
  }));
  return { rows: withShares, totals: { days: totalDays, area: rows.reduce((s, r) => s + r.area, 0), areaDays: totalAreaDays, expense: E, daysInMonth: dim } };
}

// Build per-unit CAM using rate model for a period
export function buildCamRateModelBills({ units, ratePerSqft, periodStart, periodEnd }) {
  return units.map((u) => {
    const { proratedAmount, activeDays, monthlyAmount, dailyAmount } = calcUnitMonthlyCamRateModel({
      ratePerSqft,
      carpetArea: u.carpet_area,
      camStartDate: u.cam_start_date,
      periodStart,
      periodEnd,
    });
    return {
      unit_id: u.id || u.unit_id,
      flat_no: u.flat || u.name || u.flat_no,
      carpet_area: Number(u.carpet_area || 0),
      active_days: activeDays,
      daily_amount: dailyAmount,
      monthly_amount: monthlyAmount,
      bill_amount: proratedAmount,
    };
  });
}

// Helpers to build date range for a given yyyy-mm
export function makePeriod(year, month) {
  const start = new Date(year, month - 1, 1);
  const end = endOfMonth(start);
  return { start, end };
}

export default {
  parseISO,
  startOfMonth,
  endOfMonth,
  daysInMonth,
  daysBetweenInclusive,
  getActiveDaysInPeriod,
  calcUnitMonthlyCamRateModel,
  calcExpenseDistribution,
  calcDaysOnlyDistribution,
  buildAllocationPreview,
  buildCamRateModelBills,
  makePeriod,
};
