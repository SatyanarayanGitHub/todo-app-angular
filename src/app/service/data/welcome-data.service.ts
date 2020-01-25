import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WelcomeDataService {
  constructor(private http: HttpClient) {}

  executeWelcomeMessageService() {
    console.log("Call welcome webservice !!");
    return this.http.get<WelcomeBean>("http://localhost:8080/welcome/message", {
      responseType: "json"
    });
  }

  executeExceptionMessageService() {
    console.log("Call Exception webservice !!");
    return this.http.get<WelcomeBean>("http://localhost:8080/welcome/runtimeexception", {
      responseType: "json"
    });
  }
}

export class WelcomeBean {
  constructor(public message: string) {}
}
