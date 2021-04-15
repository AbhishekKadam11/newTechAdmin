import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { EventEmitter } from 'events';

@Component({
  selector: 'ngx-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class AddImageDialogComponent implements OnInit {

  @Input() title: string;
  imageSrc: string;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
    isPosterImage: new FormControl(''),
    title: new FormControl(''),
  });

  constructor(protected ref: NbDialogRef<AddImageDialogComponent>) { }
  ngOnInit(): void {

  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // console.log(event.target.files[0]['name'])
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;

        this.myForm.patchValue({
          source: reader.result,
          title: event.target.files[0]['name']
        });

      };

    }
  }

  submit() {
    console.log("this.myForm.value", this.myForm.value);
    this.ref.close(this.myForm.value);
  }

  dismiss(value) {
    this.ref.close();
  }
}
