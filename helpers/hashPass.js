const CryptoJS = require("crypto-js");

export default HashedPassword = (password) => {
  const HashedPassword = CryptoJS.AES.encrypt(
    password,
    process.env.SECRET_KEY
  ).toString();

  return HashedPassword;
};
