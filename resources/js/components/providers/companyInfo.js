import CryptoJS from "crypto-js";

export const apiUrl = (url) => `http://localhost:8000/${url}`;

export const date = new Date();

export const encryptKey =
    "CAPSTONE-PROJECT-APPLICATION" + `-${date.getFullYear()}`;

export const encrypt = (data) => {
    return CryptoJS.AES.encrypt(data, encryptKey).toString();
};

export const decrypt = (data) => {
    try {
        return CryptoJS.AES.decrypt(data, encryptKey).toString(
            CryptoJS.enc.Utf8
        );
    } catch (error) {
        console.error("Error decrypting data: ", error);
        clearLocalStorage();
        window.location.reload();
        return null;
    }
};

export const clearLocalStorage = () => {
    localStorage.token = "";
    localStorage.userdata = "";
    return false;
};

export const token = () => {
    if (localStorage.getItem("token") === null) {
        clearLocalStorage();
        return false;
    }
    return "Bearer " + localStorage.getItem("token");
};

export const userData = () => {
    if (localStorage.getItem("userdata") === null) {
        clearLocalStorage();
        return false;
    }
    return JSON.parse(decrypt(localStorage.getItem("userdata")));
};

export const role = () => {
    return userData().user_role_id;
};
