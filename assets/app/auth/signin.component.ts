import { Component,  OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "./user.model";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit{
    
signInForm: FormGroup;
constructor(private authService: AuthService, private router: Router){}
    onSubmit(){
        //console.log('form submitted');
        const user = new User(this.signInForm.value.email, this.signInForm.value.password);
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userId', data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.signInForm.reset();
    }
    ngOnInit() {
        this.signInForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
               ]),
            password: new FormControl(null, Validators.required)
        });
    }
}