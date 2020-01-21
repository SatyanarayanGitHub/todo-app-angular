import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

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

  constructor(private router: Router) {}

  ngOnInit() {}

  handleLogin() {
    if (this.username === "dummy" && this.password === "dummy") {
      this.invlaidLogin = false;
      this.router.navigate(["welcome", this.username]);
    } else {
      this.invlaidLogin = true;
    }

    //console.log(this.invlaidLogin);
  }
}
