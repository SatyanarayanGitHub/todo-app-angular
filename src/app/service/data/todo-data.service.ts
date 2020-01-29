import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Todo } from "src/app/list-todos/list-todos.component";

@Injectable({
  providedIn: "root"
})
export class TodoDataService {
  constructor(private http: HttpClient) {}

  retiveAllTodos(username) {
    console.log("Call TODO webservice !!");
    return this.http.get<Todo[]>(
      `http://localhost:8080/user/${username}/todo`,
      {
        responseType: "json"
      }
    );
  }

  deleteTodo(username, id) {
    console.log("Call TODO webservice !!");
    return this.http.delete(
      `http://localhost:8080/user/${username}/todos/${id}`
    );
  }
}
