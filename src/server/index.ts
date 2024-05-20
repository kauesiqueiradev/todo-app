import compression from "compression"
import express from "express"
import helmet from "helmet"
import session from 'cookie-session'
import path from "path"
import { api } from "./api"
import { auth } from "./auth"

const app = express()
app.use(session({
    secret: process.env["SESSION_SECRET"] || "my secret"
}))

app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                'script-src-attr': ["'unsafe-inline'"],
            },
        },
    })
)

app.use(compression())

app.use(auth)

app.use(api)

app.use(express.static(path.join(__dirname, '../remutl-angular-todo/')));

app.get('/*', (req, res) => {
    res.sendFile(
        path.join(__dirname, '../remult-angular-todo/', 'index.html')
    )
})

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"))
