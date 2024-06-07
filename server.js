const express = require("express");
const bookstoreRoutes = require('./src/bookstore/routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello gaby")
})

app.use('/api/v1/', bookstoreRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));
