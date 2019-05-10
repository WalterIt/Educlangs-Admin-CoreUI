import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styles: []
})
export class EnglishComponent implements OnInit {

  user: Object = {};
  fileToUpload: any = null;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  uploadFile(event) {    // line 1
    let elem = event.target;  // line 2
    if (elem.files.length > 0) {     // line 3
      const formData = new FormData();  // line 4
      this.fileToUpload = elem.files[0];
      formData.append('myfile', this.fileToUpload);  // line 5

      console.log(this.fileToUpload);

      /*
      this.fileService.sendFile(formData).subscribe( // line7
      	(response) => {
      		// response code
          console.log(response);
        });
        */
    }

    elem.value = ''; // line 8
}


submit() {
  console.log(this.user['name']);
  console.log(this.fileToUpload);
  // formData.append('name', this.user['name']);
  const formData = new FormData();

  formData.append('name', this.user['name']);
  formData.append('myfile', this.fileToUpload);

  this.fileService.sendFile(formData).subscribe( // line7
    (response) => {
      // response code
      console.log(response);
    });


  // console.log(formData);


}

get diagnostic() { return JSON.stringify(this.user); }






}
