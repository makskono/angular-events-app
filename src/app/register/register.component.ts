import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerTitle = 'Register';
  registerUserData = {
    name: '',
    email: '',
    password: '',
  };
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  registerUser(): void {
    this.auth.registerUser(this.registerUserData).subscribe(
      (res: any) => {
        console.log(res + 'registerUser log');
        localStorage.setItem('token', res.token);
        this.router.navigate(['/special']);
      },
      (err: string) => console.log(err)
    );
  }
}
