import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  base64String: string;

  constructor() { }

  getBase64FromFile = (file: File) => {
    const promise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      this.base64String = '';
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
      reader.onloadend = () => resolve(this.base64String);
    });

    return promise;

  }

  private handleReaderLoaded = (readerEvt) => {
    const binaryString = readerEvt.target.result;
    this.base64String = btoa(binaryString);
  }
}
