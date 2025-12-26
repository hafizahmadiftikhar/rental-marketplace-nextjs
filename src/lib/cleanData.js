export function cleanPropertyData(prop) {
  const cleaned = { ...prop };

  // Keep beds, baths, sqft as strings
  if (cleaned.beds) cleaned.beds = String(cleaned.beds);
  if (cleaned.baths) cleaned.baths = String(cleaned.baths);
  if (cleaned.sqft) cleaned.sqft = String(cleaned.sqft);

  // Ensure rentMin / rentMax are numbers
  if (cleaned.rentMin !== undefined) cleaned.rentMin = Number(cleaned.rentMin) || 0;
  if (cleaned.rentMax !== undefined) cleaned.rentMax = Number(cleaned.rentMax) || 0;

  // Fix isVerified
  if (cleaned.isVerified === "true") cleaned.isVerified = true;
  if (cleaned.isVerified === "false") cleaned.isVerified = false;
  if (cleaned.isVerified === undefined) cleaned.isVerified = false;

  return cleaned;
}
