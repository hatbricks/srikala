/**
 * Indian Postal Index (PIN) zoning rules:
 * - Zone 5: Andhra Pradesh (51-53), Telangana (50), Karnataka (56-59)
 * - Zone 6: Tamil Nadu & Puducherry (60-64), Kerala & Lakshadweep (67-69)
 * Any 6-digit Indian pincode starting with 5 or 6 belongs to South India.
 *
 * All other zones (1, 2, 3, 4, 7, 8) belong to North, West, East, and Central India.
 */
export function isSouthIndiaPincode(pincode, state = '') {
  const cleanPin = String(pincode || '').trim();
  const cleanState = String(state || '').toLowerCase().trim();

  // 1. If valid 6-digit pincode is present, postal zone is definitive:
  // Zone 5 (AP, TS, KA) & Zone 6 (TN, KL, PY, Lakshadweep)
  if (/^[1-9][0-9]{5}$/.test(cleanPin)) {
    const firstDigit = cleanPin.charAt(0);
    return firstDigit === '5' || firstDigit === '6';
  }

  // 2. Fallback to state check (for pre-validation or partial entry)
  const southFullStates = [
    'andhra pradesh',
    'andhra',
    'telangana',
    'karnataka',
    'tamil nadu',
    'tamilnadu',
    'kerala',
    'puducherry',
    'pondicherry',
    'lakshadweep',
  ];
  const southCodes = ['ap', 'ts', 'tg', 'ka', 'tn', 'kl', 'py'];

  if (cleanState) {
    if (southCodes.includes(cleanState)) return true;
    if (southFullStates.some((s) => cleanState === s || cleanState.includes(s))) return true;
  }

  return false;
}

export function getZoneShippingFee(pincode, state = '', settings = {}) {
  const isSouth = isSouthIndiaPincode(pincode, state);

  const feeSouth = Number.isFinite(Number(settings?.feeSouth)) ? Number(settings.feeSouth) : 120;
  const feeNorth = Number.isFinite(Number(settings?.feeNorth)) ? Number(settings.feeNorth) : 150;

  const fee = isSouth ? feeSouth : feeNorth;

  return {
    isSouth,
    zoneName: isSouth ? 'South India' : 'North & Rest of India',
    fee,
  };
}
