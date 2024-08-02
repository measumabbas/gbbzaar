export const getTextColorBasedOnBackground = (backgroundColor) => {
  if (!backgroundColor || typeof backgroundColor !== "string") {
    // Handle invalid or missing input
    return "black"; // Default to black
  }

  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (!hexRegex.test(backgroundColor)) {
    // Handle invalid hex color format
    return "black"; // Default to black
  }

  // Convert hex to RGB
  let hex = backgroundColor.replace(/^#/, "");
  hex = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return text color based on brightness
  return brightness > 128 ? "black" : "white";
};
