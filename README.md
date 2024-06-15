# Back's scheduler
Join my [discord server](https://discord.gg/xmwHqshYHF) or visit [my website](https://back.rs).
## What's this?
It's a task scheduler that uses either cron or setInterval.
## Usage
### Schedule a task
#### Using cron time
```ts
import Scheduler from "@backs/scheduler"

// Runs every hour
// Returns an id of type string
Scheduler.schedule("0 * * * *", () => console.log("Hello, World!"))
```
### Using set interval
```ts
import Scheduler from "@backs/scheduler"

// Runs every 1 hour from the time of execution
// Returns an id of type string
Scheduler.schedule(60 * 60 * 1000, () => console.log("Hello, World!"))
```
### Unscheduling a task
```ts
import Scheduler from "@backs/scheduler"

const myTaskID = Scheduler.schedule("0 * * * *", () => console.log("Hello, World!"))

Scheduler.unschedule(myTaskID)
```
### Getting a task
```ts
import Scheduler from "@backs/scheduler"

const myTaskID = Scheduler.schedule("0 * * * *", () => console.log("Hello, World!"))

// Returns a Task object
const myTask = Schedule.getTask(myTaskID) 
```
#### NOTE
**Modifying the task in any way could lead to unexpected errors. If you need to change a task just unschedule it and schedule a new one.**
### Getting all tasks
```ts
import Scheduler from "@backs/scheduler"

const myTaskID = Scheduler.schedule("0 * * * *", () => console.log("Hello, World!"))

// Returns an array of Task objects
const myTasks = Schedule.getTasks() 
```