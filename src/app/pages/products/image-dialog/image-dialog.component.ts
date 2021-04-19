import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { EventEmitter } from 'events';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ngx-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class AddImageDialogComponent implements OnInit, OnChanges {

  @Input() title: string;
  private imageData: any;
  @Input()
  set data(val: any) {
    this.imageData = val;
  }
  get data(): any {
    return this.imageData;
  }
  imageSrc: string;
  file: any;
  selectPosterImage;
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    source: new FormControl('', [Validators.required]),
    isPosterImage: new FormControl(''),
    title: new FormControl(''),
    fileId: new FormControl(''),
  });

  constructor(protected ref: NbDialogRef<AddImageDialogComponent>,
    private productsService: ProductsService) { }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("this.data", this.data);
  }
  ngOnInit(): void {
    // console.log("data", this.data)
    // this.imageData = this.data;
    for (let i of this.imageData) {
      if (i['isPosterImage']) {
        this.selectPosterImage = i['isPosterImage'];
      }
    }
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = event.target.files[0];
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
    // console.log("event.target.files",event.target.files)
  }

  submit() {
    // console.log("this.myForm.value", this.myForm.value);
  
    this.productsService.uploads(this.file)
    .subscribe(result=>{
      this.myForm.patchValue({
        "fileId": result.fileId
      })
      this.ref.close(this.myForm.value);
    }, error=>{
      console.log(error);
    })
  }

  setImages() {
    // console.log("this.myForm.value", this.myForm.value);
    this.ref.close(this.imageData);
  }

  dismiss(value) {
    this.ref.close();
  }

  setPosterImage(title) {
    for (let i of this.imageData) {
      if (i['title'] === title) {
        i['isPosterImage'] = true;
      } else {
        i['isPosterImage'] = false;
      }
    }
  }
}
