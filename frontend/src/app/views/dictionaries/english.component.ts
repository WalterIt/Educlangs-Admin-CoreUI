import { Component, OnInit } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-english',
  templateUrl: './english.component.html',
  styles: []
})
export class EnglishComponent implements OnInit {

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  uploadFile(event){    // line 1
    let elem = event.target;  // line 2
    if(elem.files.length > 0){     // line 3
      let formData = new FormData();  // line 4
      formData.append('myfile', elem.files[0]);  // line 5

      console.log(event);

      

      this.fileService.sendFile(formData).subscribe( // line7
      	(response) => {
      		// response code
          console.log(response);
      	});

    }

    elem.value = ""; //line 8
}

}
