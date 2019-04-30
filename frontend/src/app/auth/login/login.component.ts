import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

/**    PRIMENG     */
import {Message, SelectItem} from 'primeng/components/common/api';

// App imports
import { AuthService } from '../_services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  error: any;
  returnUrl: string;

  msgs: Message[] = [];
  messages: Message[] = [];



  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    //  Set the return url
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(loginForm): void {
    this.authService.onLogin(this.user).subscribe(
      (response) => {
        // get return url from route parameters or default to '/'
        this.router.navigate(['/user-profile']);
      },
      (error) => {
        this.error = error.error;
        // this.msgs = this.error;
        this.messages = [];
        this.messages.push({severity: 'error', summary: 'Error Message', detail: this.error['error'] });
        // console.log(this.error);
      }

    );
    // Clear form fields
    loginForm.reset();
  }


}
