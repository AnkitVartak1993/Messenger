import { Component,  OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit{
signInForm: FormGroup;

    onSubmit(){
        console.log('form submitted');
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