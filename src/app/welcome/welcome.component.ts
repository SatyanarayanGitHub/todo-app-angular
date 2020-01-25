import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WelcomeDataService } from "../service/data/welcome-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  name: string = "";
  welcomeMessage: string;
  errorMessage1: string;
  exceptionMessage: string;

  constructor(
    private route: ActivatedRoute,
    private welcomeService: WelcomeDataService
  ) {
    this.name = this.route.snapshot.params["name"];
  }

  ngOnInit() {
    //console.log(this.welcomeMessage);
  }

  getWelcomeMessage() {
    //console.log("Get welcome message btn clicked!!");
    this.welcomeService.executeWelcomeMessageService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handelErrorResponse(error)
    );

    console.log("Last line of get Welcome method !!");
  }

  handleSuccessfulResponse(response) {
    console.log("Inside successful response method !!");
    //console.log(JSON.stringify(response.message));
    this.welcomeMessage = response.message;
    this.errorMessage1 = "";
  }

  handelErrorResponse(error: HttpErrorResponse) {
    //console.log("step-1 :: ", error);
    //console.log("step-2 :: ", error.error);
    //console.error("step-3 :: ", error.message);

    //Client side error - such as network issues and JavaScript syntax and type errors.
    if (error.error instanceof ErrorEvent) {
      this.errorMessage1 = `ERROR :: ${error.error.message}`;
    } else {
      // Server Error - Such as code errors in the server and database access errors.
      this.errorMessage1 = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(this.errorMessage1);
  }

  clearWelcomeMessage() {
    this.welcomeMessage = "";
    this.errorMessage1 = "";
  }

  getExceptionMessage() {
    this.welcomeService.executeExceptionMessageService().subscribe(
      response => console.log(response),
      error => this.handleExceptionResponse(error)
    );
  }

  /*
  handleExceptionResponse(error) {
    this.exceptionMessage = error.error.message;
  }
  */

  handleExceptionResponse(error: HttpErrorResponse) {
    //Client side error - such as network issues and JavaScript syntax and type errors.
    if (error.error instanceof ErrorEvent) {
      this.exceptionMessage = `ERROR :: ${error.error.message}`;
      console.error("An error occurred:", error.error.message);
    } else {
      // Server Error - Such as code errors in the server and database access errors.
      this.exceptionMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }

    return throwError("Something bad happened; please try again later.");
  }

  clearExceptionMessage() {
    this.exceptionMessage = "";
  }
}
