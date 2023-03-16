const CryptoJS = require("crypto-js");

export default verifyPassword = (hashedpassword, inputPassword) => {
  let isValid = false;
  const decryptedPassword = CryptoJS.AES.decrypt(
    hashedpassword,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);

  if (decryptedPassword === inputPassword) {
    isValid = true;
  }

  return isValid;
};
