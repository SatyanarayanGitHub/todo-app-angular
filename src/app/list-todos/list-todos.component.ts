import { Component, OnInit } from "@angular/core";
import { TodoDataService } from "../service/data/todo-data.service";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Router } from '@angular/router';

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
  deleteMessage: String;

  constructor(
    private todoService: TodoDataService,
    private router: Router
  ) {}

  ngOnInit() {
    //Load Todos
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoService.retiveAllTodos("satya").subscribe(
      response => {
        console.log(response);
        this.todos = response;
      },
      error => this.handelErrorResponse(error)
    );
  }

  deleteTodo(id) {
    console.log("Delete button clicked for todo id : " + id);
    this.todoService.deleteTodo("satya", id).subscribe(
      response => {
        console.log(response);
        //Load Todos
        this.refreshTodos();
        this.deleteMessage = `Delete of Todo ${id} Successful!`;
      },
      error => this.handelErrorResponse(error)
    );
  }

  updateTodo(id) {
    console.log("Update button clicked for todo id : " + id);
    this.router.navigate(["todo", id]);
  }

  addNewTodo(){
    console.log("Add New Todo button clicked!!");
    this.router.navigate(['todo', -1]);
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
