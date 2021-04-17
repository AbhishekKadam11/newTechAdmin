import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

import { Camera, SecurityCamerasData } from '../../../@core/data/security-cameras';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { AddImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ProductsService } from '../products.service';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();

  cameras: any = [];
  selectedCamera: Camera;
  isSingleView = false;
  isNew = false;
  actionSize: NbComponentSize = 'medium';
  editor1: Editor;
  editor2: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right"]
  ];

  private alive = true;
  contacts: any[];
  recent: any[];
 
  // selectedCar: number = 0;
  html: '';
  imageData: any;
  imageArray =[];
  brandList =[];
  categoryList =[];
  shortdescriptionArray =[];
  fulldescriptionArray =[];
  productForm = this.fb.group({
    category: new FormControl(),
    brand: new FormControl(),
    title: new FormControl(),
    modelNo: new FormControl(),
    price: new FormControl(),
    quntity: new FormControl(),
    shortdescription: new FormControl(),
    fulldescription: new FormControl(),
    image: new FormControl(),
    productimages: new FormControl(),
  });

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData,
    private userService: UserData,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    let productid = this.activatedRoute.snapshot.params.id;
    // console.log("productid", productid);
    if (productid) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

    this.productsService.productCategories()
    .subscribe(result=>{
      this.brandList = result['brandList'];
      this.categoryList = result['categoryList'];
    })
    // this.securityCamerasService.getCamerasData()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((cameras: Camera[]) => {
    //     this.cameras = cameras;
    //     console.log("cameras",cameras)
    //     this.selectedCamera = this.cameras[0];
    //   });

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
      });

    forkJoin(
      this.userService.getContacts(),
      this.userService.getRecentUsers(),
    )
      .pipe(takeWhile(() => this.alive))
      .subscribe(([contacts, recent]: [Contacts[], RecentUsers[]]) => {
        this.contacts = contacts;
        this.recent = recent;
      });

  }

  get shortdescription() {
    return [this.productForm.get("shortdescription")];
  }

  get fulldescription() {
    return [this.productForm.get("fulldescription")];
  }

  addImage() {
    this.imageData = this.dialogService.open(AddImageDialogComponent, {
      context: {
        title: 'Add Image',
      },
    }).onClose.subscribe(result => {
      this.cameras.push({ "title": result.title, "source": result.source, "isPosterImage": result.isPosterImage })
        if (result['isPosterImage']) {
          this.productForm.controls.image.setValue(result['source'])
        } else {
          this.imageArray.push(result['source']);
        }
      this.productForm.controls.productimages.setValue(this.imageArray);
    });
  }

  viewImage() {
    this.imageData = this.dialogService.open(AddImageDialogComponent, {
      context: {
        title: 'View Image',
        data: this.cameras,
      },
    }).onClose.subscribe(result => {
      let imageArray =[];
      for (let i of result) {
        if (i['isPosterImage']) {
          this.productForm.controls.image.setValue(i['source'])
        } else {
          imageArray.push(i['source']);
        }
      }
      this.productForm.controls.productimages.setValue(imageArray);
      console.log(" this.productForm", this.productForm.value)
    });
  }

  onSubmit() {
    // var shortdescription = this.shortdescriptionArray.push(toHTML(this.productForm.value.shortdescription));
    // var fulldescription = this.fulldescriptionArray.push(toHTML(this.productForm.value.fulldescription));
    this.productForm.controls.shortdescription.setValue(toHTML(this.productForm.value.shortdescription))
    this.productForm.controls.fulldescription.setValue(toHTML(this.productForm.value.fulldescription))
    console.log(JSON.stringify(this.productForm.value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.editor1.destroy();
    this.editor2.destroy();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

}
