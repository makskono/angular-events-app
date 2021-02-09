import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  appTitle = 'TEST';

  constructor(public authService: AuthService) {}

  // changeTitle(): void {
  //   this.appTitle = 'PROD';
  //   if (this.authService.getToken()) {
  //     this.appTitle = 'LOGIN';
  //   }
  // }
}
