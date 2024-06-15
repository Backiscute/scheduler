import { CronJob } from "cron";

export interface Task<T extends boolean = boolean> {
    id: string;
    isCron: T;
    interval: T extends true ? string : number;
    callback: (() => any) | (() => Promise<any>);
    handler: CronJob<any, any> | NodeJS.Timeout;
}