import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "src/app/list-todos/list-todos.component";

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retiveAllTodos(username) {
    console.log("Call Get All Todo API !!");
    return this.http.get<Todo[]>(
      `http://localhost:8080/user/${username}/todo`,
      {
        responseType: "json"
      }
    );
  }

  deleteTodo(username, id) {
    console.log("Call Delete Todo API !!");
    return this.http.delete(
      `http://localhost:8080/user/${username}/todos/${id}`
    );
  }

  retriveTodo(username, id) {
    console.log("Call Get Todo API !!");
    return this.http.get<Todo>(
      `http://localhost:8080/user/${username}/todo/${id}`
    );
  }

  updateTodo(username, todo) {
    console.log("Call Create Todo API !!");

    return this.http.put(`http://localhost:8080/user/${username}/todo`, todo);
  }

  saveTodo(username, todo) {
    console.log("Call Create Todo API !!");

    return this.http.post(`http://localhost:8080/user/${username}/todo`, todo);
  }
}
