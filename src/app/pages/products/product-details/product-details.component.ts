import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

import { Camera, SecurityCamerasData } from '../../../@core/data/security-cameras';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Contacts, RecentUsers, UserData } from '../../../@core/data/users';
import { AddImageDialogComponent } from '../image-dialog/image-dialog.component';

@Component({
  selector: 'ngx-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();

  cameras: Camera[] = [];
  selectedCamera: Camera;
  isSingleView = false;
  isNew = false;
  actionSize: NbComponentSize = 'medium';
  editor1: Editor;
  editor2: Editor;
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];

  private alive = true;
  contacts: any[];
  recent: any[];
  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
  ];
  selectedCar: number = 0;
  html: '';
  imageData: any;

  productForm =  this.fb.group({
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
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editor1 = new Editor();
    this.editor2 = new Editor();
    let productid = this.activatedRoute.snapshot.params.id;
    // console.log("productid", productid);
    if(productid) {
      this.isNew = true;
    } else {
      this.isNew = false;
    }

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

  // form = new FormGroup({
  //   shortdescription: new FormControl(),
  //   productInformation: new FormControl()
  // });

  get doc(): AbstractControl {
    return this.productForm.get("shortdescription");
  }

  get doc1(): AbstractControl {
    return this.productForm.get("fulldescription");
  }

  addImage() {
   this.imageData = this.dialogService.open(AddImageDialogComponent, {
      context: {
        title: 'Add Image',
      },
    }).onClose.subscribe(result => {
      this.cameras.push({"title": "image", "source": result.source})
      if(result.isPosterImage) {
        this.productForm.value.image = result.fileSource;
      }
     // console.log("result",JSON.stringify(result));
    });
  }

  onSubmit() {
    // console.log(this.productForm.value.file);
    // this.cameras.push({"title": "image", "source": this.productForm.value.file})
    const html = toHTML(this.productForm.value.shortdescription);
      // console.log("this.html", html);
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
