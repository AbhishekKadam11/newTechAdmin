import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

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
   fileSource: new FormControl('', [Validators.required])
 });
 
  constructor(protected ref: NbDialogRef<AddImageDialogComponent>) {}
  ngOnInit(): void {
    
  }

  get f(){
    return this.myForm.controls;
  }
    
  onFileChange(event) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.imageSrc = reader.result as string;
      
        this.myForm.patchValue({
          fileSource: reader.result
        });
    
      };
    
    }
  }

  submit(){
    console.log(this.myForm.value);
   
  }

  dismiss() {
    this.ref.close();
  }
}
