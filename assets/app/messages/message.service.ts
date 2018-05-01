import { Message } from "./message.model";
import { Injectable, EventEmitter } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { ErrorService } from "../errors/error.service";
import { API_URL } from "../environment";

@Injectable()
export class MessageService {

messages: Message[] = [];
messageIsEdit = new EventEmitter<Message>();
constructor(private http: Http, private errorService: ErrorService){

}
addMessage(message: Message){
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type':'application/json'});
    const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
       
    return this.http.post( API_URL +'/message' + token, body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content, result.obj.user.firstName, result.obj._id, result.obj.user);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json());
            });
}

editMessage(message: Message) {
    this.messageIsEdit.emit(message);
}

updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch(API_URL + '/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json());
            });
    }
getMessage(){
    return this.http.get(API_URL + '/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {
                    transformedMessages.push(new Message(message.content, message.user.firstName, message._id, message.user._id));
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json());
            });
}

deleteMessage(message: Message){
    this.messages.splice(this.messages.indexOf(message),1);
    const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
    return this.http.delete( API_URL + '/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
               return Observable.throw(error.json());
            });
}
}