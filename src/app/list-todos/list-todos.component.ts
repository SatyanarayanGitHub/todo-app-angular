import { Component, OnInit } from "@angular/core";

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
  todo = {
    id: 1,
    description: "Start learning Angular"
  };

  todos = [
    new Todo(1, "Learn to Java Programming", false, new Date()),
    new Todo(2, "Learn to Angular JS", false, new Date()),
    new Todo(3, "Learn to Hibernate", false, new Date()),
    new Todo(4, "Learn to AWS", false, new Date()),
    new Todo(5, "Learn to Spring Boot", true, new Date())
  ];

  constructor() {}

  ngOnInit() {}
}
