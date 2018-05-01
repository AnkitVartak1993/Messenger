import { Component } from "@angular/core";
var MessagesComponent = /** @class */ (function () {
    function MessagesComponent() {
    }
    MessagesComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-messages',
                    template: "\n        <div class=\"row\">\n        <div class=\"col-md-8 col-md-offset-2\">\n            <app-message-input> </app-message-input>\n        </div>\n    </div>\n    <br>\n    <div class=\"row\">\n        <div class=\"col-md-8 col-md-offset-2\">\n            <app-message-list> </app-message-list>\n        </div>\n    </div>\n    "
                },] },
    ];
    return MessagesComponent;
}());
export { MessagesComponent };
