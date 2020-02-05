import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class WelcomeDataService {
  constructor(private http: HttpClient) {}

  executeWelcomeMessageService() {
    console.log("Call welcome webservice !!");

    let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();
    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });

    return this.http.get<WelcomeBean>("http://localhost:8080/welcome/message", {
      responseType: "json",
      headers
    });
  }

  executeExceptionMessageService() {
    console.log("Call Exception webservice !!");
    return this.http.get<WelcomeBean>(
      "http://localhost:8080/welcome/runtimeexception",
      {
        responseType: "json"
      }
    );
  }

  createBasicAuthenticationHttpHeader() {
    let username = "user";
    let password = "password";
    let basicAuthHeaderString =
      "Basic " + window.btoa(username + ":" + password);

    return basicAuthHeaderString;
  }

  // After spring security - Error-1
  //Access to XMLHttpRequest at 'http://localhost:8080/welcome/message' from origin 'http://localhost:4200' has been blocked by CORS policy: 
  //No 'Access-Control-Allow-Origin' header is present on the requested resource.


  //Afte set Authorization in Header - Error-2
  //Access to XMLHttpRequest at 'http://localhost:8080/welcome/message' from origin 'http://localhost:4200' has been blocked by CORS policy: 
  //Response to preflight request doesn't pass access control check: It does not have HTTP ok status.
}

export class WelcomeBean {
  constructor(public message: string) {}
}
