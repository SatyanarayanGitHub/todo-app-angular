import { Component, OnInit } from "@angular/core";
import { TodoDataService } from "../service/data/todo-data.service";
import { Todo } from "../list-todos/list-todos.component";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  id: number;
  todo: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    //Handle dummy to handle asynchronous
    this.todo = new Todo(0, "", false, new Date());
    this.todoService.retriveTodo("satya", this.id).subscribe(response => {
      this.todo = response;
    });
  }

  saveTodo() {
    this.todoService.updateTodo("satya", this.todo).subscribe(response => {
      console.log(response);
      this.router.navigate(["todos"]);
    });
  }
}
