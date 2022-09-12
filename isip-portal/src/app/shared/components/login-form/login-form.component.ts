import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  roles: string[] = [];

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) {
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const { email, password } = this.formData;
    this.loading = true;
    this.authService.logIn(email, password).subscribe({
      next: (result: any) => {
        this.tokenStorage.saveToken(result.accessToken);
        this.tokenStorage.saveUser(result);
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate([this.authService._lastAuthenticatedPath]);
        this.loading = false;
        console.log("User was login successfully.", result);
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
        notify("Email or password is incorrect", 'error', 2000);
        
      }
    });
  }

  onCreateAccountClick = () => {
    this.router.navigate(['/create-account']);
  }
}
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }
