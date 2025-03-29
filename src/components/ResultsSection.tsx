
// Since we can't directly edit this file, we need to create a workaround
// We can create a utility function that safely handles the toFixed operation

// Create a new utility file for handling type conversions
<lov-write file_path="src/utils/typeUtils.ts">
// Safely apply toFixed to a value that might be a string or number
export const safeToFixed = (value: any, digits: number = 2): string => {
  if (typeof value === 'number') {
    return value.toFixed(digits);
  } else if (typeof value === 'string' && !isNaN(parseFloat(value))) {
    return parseFloat(value).toFixed(digits);
  }
  return String(value);
};
