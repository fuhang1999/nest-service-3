import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('AOWQ4P0YEC4YXUKS'); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('fasdo978ouiojiocsdj'); //十六位十六进制数作为密钥偏移量
const CryptoSecret = '__SecretKey__';

/**
 * 加密数据
 * @param data - 数据
 */
export function encrypt(data: string) {
  return CryptoJS.AES.encrypt(data, CryptoSecret).toString();
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypt(cipherText: string) {
  const bytes = CryptoJS.AES.decrypt(cipherText, CryptoSecret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText) return JSON.parse(originalText);
  return null;
}

/**
 * 解密
 * @param word
 * @returns
 */
export const secretDecrypt = (word: string) => {
  if (word?.length > 100) {
    return;
  }
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
