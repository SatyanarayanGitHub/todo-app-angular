import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HardcodedAuthenticationService } from "../service/hardcoded-authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  username = "dummy";
  password = "";
  errorMessage = "Invalid Credentials";
  invlaidLogin = false;

  //Router
  //Angular.giveeMeRouter
  //Dependency Injection
  constructor(
    private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  ngOnInit() {}

  handleLogin() {
    //if (this.username === "dummy" && this.password === "dummy") {
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      this.invlaidLogin = false;
      this.router.navigate(["welcome", this.username]);
    } else {
      this.invlaidLogin = true;
    }

    //console.log(this.invlaidLogin);
  }
}
