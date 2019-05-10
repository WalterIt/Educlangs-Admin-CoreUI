import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FileService {

  constructor(private httpClient: HttpClient) { }

  sendFile(formData: any){
  	//assume your backend base url is http://127.0.0.1:8000
	  let baseUrl = 'http://127.0.0.1:8000/api';
  	let url = `${baseUrl}/english`;       //line 4 
  	return this.httpClient.post(   //line 5
  		url,
  		formData)


  }

}
