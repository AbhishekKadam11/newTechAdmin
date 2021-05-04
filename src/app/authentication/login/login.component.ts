import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthResult, NbAuthService, NbLoginComponent, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class NgxLoginComponent {
  redirectDelay: number = 0;
  showMessages: any = {};
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;
  errors:any = [];
  loadingMediumGroup = false;

  constructor(protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router, private authService: AuthService) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/pages/home']);
    }
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.loadingMediumGroup = true;

    // console.log(this.user);
    this.authService.login(this.user).subscribe((result)=>{
        // console.log(result);
        this.submitted = false;

        if (result['success']) {
          this.router.navigate(['/pages/home']);
          this.loadingMediumGroup = false;
        } else {
          this.errors = [result['msg']];
          this.showMessages.error = result['msg'];
          this.loadingMediumGroup = false;
          setTimeout(() => {
            this.errors = [];
          },3000)
        }
    })
    this.cd.detectChanges();
  }
  
  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}