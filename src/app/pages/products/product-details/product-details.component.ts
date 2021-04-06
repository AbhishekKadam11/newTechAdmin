import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, takeWhile } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NbComponentSize, NbDialogService, NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';

import { Camera, SecurityCamerasData } from '../../../@core/data/security-cameras';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
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

  cameras: Camera[];
  selectedCamera: Camera;
  isSingleView = false;
  actionSize: NbComponentSize = 'medium';
  editor: Editor;
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

  constructor(private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private securityCamerasService: SecurityCamerasData,
    private userService: UserData,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.editor = new Editor();
    let productid = this.activatedRoute.snapshot.params.id;
    console.log("productid",productid);

    this.securityCamerasService.getCamerasData()
    .pipe(takeUntil(this.destroy$))
    .subscribe((cameras: Camera[]) => {
      this.cameras = cameras;
      this.selectedCamera = this.cameras[0];
    });

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

  form = new FormGroup({
    productheighlight: new FormControl(),
    productInformation: new FormControl()
  });

  get doc(): AbstractControl {
    return this.form.get("productheighlight");
  }

  get doc1(): AbstractControl {
    return this.form.get("productInformation");
  }

  addImage() {
    this.dialogService.open(AddImageDialogComponent, {
      context: {
        title: 'Add Image',
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.editor.destroy();
  }

  selectCamera(camera: any) {
    this.selectedCamera = camera;
    this.isSingleView = true;
  }

}
