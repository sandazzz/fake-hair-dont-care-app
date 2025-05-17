function generateAlphanumeric(length: number) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  const randomArray = new Uint8Array(length);
  crypto.getRandomValues(randomArray);
  randomArray.forEach((value) => {
    result += chars.charAt(value % chars.length);
  });
  return result;
}
function generateUppercaseLetters(length: number) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return result;
}

export function generateSpecialId() {
  const prefix = generateUppercaseLetters(6);
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // MM
  const year = String(now.getFullYear()).slice(-2); // YY
  const randomStr = generateAlphanumeric(6); // XXXXXX

  return `${prefix}-${month}-${year}-${randomStr}`;
}
