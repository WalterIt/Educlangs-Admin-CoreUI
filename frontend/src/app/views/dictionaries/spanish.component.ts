import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-spanish',
  templateUrl: './spanish.component.html',
  styles: []
})
export class SpanishComponent implements OnInit {

  title = 'Image Upload with Crop tool'

  myform: FormGroup = null;

  public defaultImageURL =
    'https://i2.wp.com/theinfogrid.com/wp-content/uploads/2018/08/Angular-Material-Autocomplete-with-HTTP-Lookup.png';

  constructor(private fb: FormBuilder) {}

  createForm(): FormGroup {
    return this.fb.group({
      BlobImage: [null, Validators.compose([Validators.required])],
      base64Image: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.myform = this.createForm();
  }

  submit() {
    console.log(this.myform.value);
  }
}