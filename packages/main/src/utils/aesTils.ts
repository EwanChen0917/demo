import CryptoJS from 'crypto-js';

/**
 * AES 加密
 * @param word: 需要加密的文本
 * KEY: // 需要前后端保持一致
 * mode: ECB // 需要前后端保持一致
 * pad: Pkcs7 //前端 Pkcs7 对应 后端 Pkcs5
 * */
const KEY = CryptoJS.enc.Utf8.parse('d7b85f6e214dsadf');

export const encryptByAES = (word: string, keyStr?: any) => {
  keyStr = keyStr || KEY;
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};

/**
 * AES 解密
 * @param word: 需要加密的文本
 * KEY: // 需要前后端保持一致
 * mode: ECB // 需要前后端保持一致
 * pad: Pkcs7 //前端 Pkcs7 对应 后端 Pkcs5
 */
export const decryptByAES = (word: string, keyStr?: any) => {
  keyStr = keyStr || KEY;
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

/**
 * MD5加密
 * @param word: 需要加密的文本
 */

export const encryptByMD5 = (word: string) => {
  return CryptoJS.MD5(word).toString();
};

/**
 * base64 加密解密
 * @param word: 需要加密的文本
 */

export const encryptByBase64 = (word: string) => {
  const words = CryptoJS.enc.Utf8.parse(word);
  return CryptoJS.enc.Base64.stringify(words);
};

export const decryptByBase64 = (word: string) => {
  const words = CryptoJS.enc.Base64.parse(word);
  return CryptoJS.enc.Utf8.stringify(words);
};
export const uuid = () => {
  const tempUrl = URL.createObjectURL(new Blob());
  const id = tempUrl.toString();
  URL.revokeObjectURL(tempUrl);
  return id.substring(id.lastIndexOf('/') + 1);
};
