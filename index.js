import { app } from "./app.js";

app
    .use('/', (req,res) => res.send('Привет'))

    .listen(4321);