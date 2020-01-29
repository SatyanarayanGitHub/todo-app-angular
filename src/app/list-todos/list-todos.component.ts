import { Component, OnInit } from "@angular/core";
import { TodoDataService } from "../service/data/todo-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from 'rxjs';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ) {}
}

@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.css"]
})
export class ListTodosComponent implements OnInit {
  todos: Todo[];
  errorMessage: String;


  constructor(private todoService: TodoDataService) {}

  ngOnInit() {
    this.todoService.retiveAllTodos("satya").subscribe(
      response => {
        console.log(response);
        this.todos = response;
      },
      error => this.handelErrorResponse(error)
    );
  }

  handelErrorResponse(error: HttpErrorResponse) {
    //console.log("step-1 :: ", error);
    //console.log("step-2 :: ", error.error);
    //console.error("step-3 :: ", error.message);

    //Client side error - such as network issues and JavaScript syntax and type errors.
    if (error.error instanceof ErrorEvent) {
      this.errorMessage = `ERROR :: ${error.error.message}`;
    } else {
      // Server Error - Such as code errors in the server and database access errors.
      this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
    }
    return throwError(this.errorMessage);
  }
}
