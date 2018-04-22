import { Component} from "@angular/core";

@Component({
    selector: 'app-messages',
    templateUrl: `
        <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <app-message-input> </app-message-input>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <app-message-list> </app-message-list>
        </div>
    </div>
    `
})
export class MessagesComponent {

}