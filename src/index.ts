import { v4 as uuid } from "uuid";
import { Task } from "./typings";
import { CronJob } from "cron";

export default class Scheduler {
    private static tasks: Task[] = []

    static schedule(callback: () => void, cronTime: string, onComplete?: () => void): string
    static schedule(callback: () => void, interval: number, onComplete?: () => void): string
    static schedule(callback: () => void, intervalOrCrontime: number | string, onComplete?: () => void) {
        const id = uuid();

        this.tasks.push({
            id,
            isCron: typeof intervalOrCrontime === "string",
            interval: intervalOrCrontime,
            callback,
            handler: typeof intervalOrCrontime === "string" ? new CronJob(intervalOrCrontime, callback, onComplete) : setInterval(async () => {
                await callback();
                if (onComplete) onComplete();
            }, intervalOrCrontime),
        });

        return id;
    }

    static unschedule(id: string) {
        const task = this.tasks.find((t) => t.id === id);
        if (!task) return;

        if (task.isCron) (task.handler as CronJob).stop();
        else clearInterval(task.handler as NodeJS.Timeout);

        this.tasks.splice(this.tasks.indexOf(task), 1);
    }

    static getTask(id: string) {
        return this.tasks.find((t) => t.id === id);
    }

    static getTasks() {
        return this.tasks;
    }
}
