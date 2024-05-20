import { Component, OnDestroy, OnInit } from '@angular/core';
import { remult } from 'remult';
import { Task } from 'src/shared/Task';
import { TasksController } from 'src/shared/TasksController';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy{
  newTaskTitle = ''
  taskRepo = remult.repo(Task);
  tasks: Task[] = [];
  unsubscribe = () => {}

  ngOnInit() {
    this.unsubscribe = this.taskRepo
      .liveQuery({
        limit: 20,
        orderBy: { createdAt:'asc' },
        // where: { completed: true }
      })
      .subscribe(info => (this.tasks = info.applyChanges(this.tasks)));
  }

  ngOnDestroy() {
    this.unsubscribe()
  }

  // Create Task
  async addTask() {
    try {
      const newTask = await this.taskRepo.insert({ title: this.newTaskTitle })
      // this.tasks.push(newTask) <-- this line is no longer needed
      this.newTaskTitle = ""
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Save Task
  async saveTask(task: Task) {
    try {
      await this.taskRepo.save(task)
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Delete  Task
  async deleteTask(task: Task) {
    await this.taskRepo.delete(task);
    // this.tasks = this.tasks.filter(t => t !== task); <-- this lini is no longer needed
  }

  // Seletected All
  async setAllCompleted(completed: boolean) {
    await TasksController.setAllCompleted(completed);
  }
}
