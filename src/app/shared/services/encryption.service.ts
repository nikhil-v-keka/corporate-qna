import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
    
    encryptedData(loginForm: any) {
    let secretKey = '-JaNdRgUkXp2s5v8';
    let vector = 'PdSgUkXp2s5v8y/B';
    const encodedIV = CryptoJS.enc.Utf8.parse(vector);
    const encodedSecretKey = CryptoJS.enc.Utf8.parse(secretKey);
    let encryptedUsername = CryptoJS.AES.encrypt( loginForm.userName, encodedSecretKey, {iv: encodedIV, mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7}).toString();
    let encryptedPassword = CryptoJS.AES.encrypt( loginForm.password, encodedSecretKey, {iv: encodedIV, mode: CryptoJS.mode.CBC,padding: CryptoJS.pad.Pkcs7}).toString();
    let encryptedData = {encryptedUsername, encryptedPassword}
    return encryptedData;
  }

}