import CryptoJS from "crypto-js";

export const apiUrl = (url) => `${window.location.origin}/${url}`;

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
    const encryptedData = localStorage.getItem("userdata");

    // Check if "userdata" exists in localStorage
    if (!encryptedData) {
        clearLocalStorage();
        return null; // Return null if no userdata is found
    }

    try {
        // Decrypt and parse userdata
        const decryptedData = decrypt(encryptedData);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error("Error retrieving or parsing userdata:", error);
        clearLocalStorage(); // Clear localStorage if data is invalid
        return null; // Return null to indicate no valid data is available
    }
};

export const role = () => {
    return userData().user_role_id;
};
