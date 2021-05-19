import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

import { Camera } from '../../../@core/data/security-cameras';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AddImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ProductsService } from '../products.service';
import { GlobalShared } from '../../../app.global';
import { AuthService } from '../../../authentication/service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  loading = false;
  imgloading = false;
  cameras: any = [];
  selectedCamera: Camera;
  isSingleView = false;
  isUpdate = false;
  productid: string;
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
  productDetails: any = {}
  reviewDetails: any = {}
  contacts: any[];
  recent: any[];
  errors: any = [];
  html: '';
  imageData: any;
  imageArray = [];
  brandList = [];
  categoryList = [];
  shortdescriptionArray = [];
  fulldescriptionArray = [];
  isAdmin:boolean = false;
  base64DefaultURL;
  productForm = this.fb.group({
    category: new FormControl(),
    brand: new FormControl(),
    title: new FormControl(),
    modalno: new FormControl(),
    price: new FormControl(),
    quntity: new FormControl(),
    shortdescription: new FormControl(),
    fulldescription: new FormControl(),
    image: new FormControl(),
    productimages: new FormControl(),
  });
  
  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private dialogService: NbDialogService,
    private fb: FormBuilder,
    protected router: Router,
    private productsService: ProductsService,
    private globalShared: GlobalShared,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private cd: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin;
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.productid = this.activatedRoute.snapshot.params.id;

    if (this.productid) {
      this.isUpdate = true;
      this.imgloading = true;
      this.productsService.productDetails(this.productid)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(result => {
          this.productDetails = result;
          this.productForm.patchValue(this.productDetails);
          for (let i of this.productDetails['productimages']) {
            this.productsService.getFile(i)
              .subscribe(result => {
                this.cameras.push({ "title": i, "source": "data:image/jpg;base64," + result, "isPosterImage": false });
              })
          }
          if (this.productDetails['image']) {
            this.productsService.getFile(this.productDetails['image'])
              .subscribe(result => {
                this.cameras.push({ "title": this.productDetails['image'], "source": "data:image/jpg;base64," + result, "isPosterImage": true });
              })
          }
          this.imgloading = false;
        })

      this.productsService.productReview(this.productid)
        .subscribe(result => {
          this.reviewDetails = result;
        })

    } else {
      this.isUpdate = false;
    }

    this.productsService.productCategories()
      .subscribe(result => {
        this.brandList = result['brandList'];
        this.categoryList = result['categoryList'];
      })

    const breakpoints = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(map(([, breakpoint]) => breakpoint.width))
      .subscribe((width: number) => {
        this.actionSize = width > breakpoints.md ? 'medium' : 'small';
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
      // console.log("result", result)
      this.cameras.push({ "title": result.title, "source": result.source, "isPosterImage": result.isPosterImage })
      if (result['isPosterImage']) {
        this.productForm.controls.image.setValue(result['fileId'])
      } else {
        this.imageArray.push(result['fileId']);
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
      let imageArray = [];
      for (let i of result) {
        if (i['isPosterImage']) {
          this.productForm.controls.image.setValue(i['title'])
        } else {
          imageArray.push(i['title']);
        }
      }
      this.productForm.controls.productimages.setValue(imageArray);
      // console.log(" this.productForm", this.productForm.value)
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.isUpdate) {
      this.productsService.productUpdate(this.productid, this.productForm.value).subscribe((result) => {
        if (result) {
          this.router.navigate(['/pages/products']);
          this.loading = false;
        } else {
          this.errors = ["Something went wrong"];
        }
      }, (error) => {
        console.log("productUpload api " + error);
      })
    } else {
      this.productForm.controls.shortdescription.setValue(toHTML(this.productForm.value.shortdescription));
      this.productForm.controls.fulldescription.setValue(toHTML(this.productForm.value.fulldescription));
      this.productsService.productUpload(this.productForm.value).subscribe((result) => {
        if (result) {
          this.router.navigate(['/pages/products']);
          this.loading = false;
        } else {
          this.errors = ["Something went wrong"];
        }
      }, (error) => {
        console.log("productUpload api " + error);
      })
    }

  }

  customerPage(cid) {
    this.router.navigate(['/pages/customer/details', cid]);
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
