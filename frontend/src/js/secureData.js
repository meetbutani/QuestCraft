import CryptoJS from "crypto-js"

export const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), "questcraftsecretkey").toString();
    return encryptedData;
};

export const decryptData = (encryptedData) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData ? encryptedData : localStorage.getItem("user"), "questcraftsecretkey");
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
};