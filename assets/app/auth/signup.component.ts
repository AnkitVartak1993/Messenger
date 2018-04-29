import { Component,  OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit{
signUpForm: FormGroup;
constructor(private authService: AuthService){}
    onSubmit(){
        //console.log('form submitted');
        const user = new User(this.signUpForm.value.email,
                              this.signUpForm.value.password,
                              this.signUpForm.value.firstName,
                              this.signUpForm.value.lastName
                              );
        this.authService.signup(user)
        .subscribe(
           data => console.log(data),
           error => console.error(error) 
        );
        this.signUpForm.reset();
    }
    ngOnInit() {
        this.signUpForm = new FormGroup({
            firstName: new FormControl(null, Validators.required),
            lastName: new FormControl(null, Validators.required),
            email: new FormControl(null, [
                Validators.required,
                Validators.email
               ]),
            password: new FormControl(null, Validators.required)
        });
    }
}