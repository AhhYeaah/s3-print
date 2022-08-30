import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient, private router: Router) {

  }

  upload(file: any) {

    let fileToUpload = file.item(0)

    const formData = new FormData();
    formData.append('inputFile', fileToUpload)

    return this.http.post('https://axc5bbd6l6.execute-api.sa-east-1.amazonaws.com/graphql', formData)
      .toPromise().then(
        data => console.log(data)
      ).catch(
        error => console.log(error)
      )
  }
}
