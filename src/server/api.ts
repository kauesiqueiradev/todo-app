import { remultExpress } from "remult/remult-express"
import { createPostgresDataProvider } from "remult/postgres"
import { Task } from "../shared/Task";
import { TasksController } from "../shared/TasksController";

const DATABASE_URL = process.env["DATABASE_URL"];

export const api = remultExpress({
    dataProvider: DATABASE_URL 
        ? createPostgresDataProvider({ connectionString: DATABASE_URL })
        : undefined,
    entities: [Task],
    admin: true,
    controllers: [TasksController],
    getUser: req => req.session!["user"],
})
