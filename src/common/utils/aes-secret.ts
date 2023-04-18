import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('AOWQ4P0YEC4YXUKS'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('fasdo978ouiojiocsdj'); //十六位十六进制数作为密钥偏移量

/**
 * 解密
 * @param word
 * @returns
 */
export const secretDecrypt = (word: string) => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

/**
 * 加密
 * @param word
 * @returns
 */
export const secretEncrypt = (word: string) => {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};
