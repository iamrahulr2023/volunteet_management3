/**
 * Calculate distance between two lat/lng points using Haversine formula
 * @returns distance in kilometers
 */
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (deg) => deg * (Math.PI / 180);

/**
 * Standard API response helper
 */
const apiResponse = (res, statusCode, success, message, data = null) => {
  const response = { success, message };
  if (data !== null) response.data = data;
  return res.status(statusCode).json(response);
};

module.exports = { calculateDistance, apiResponse };
