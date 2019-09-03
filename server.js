require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const schema = require("./server/schema");
const root = require("./server/root");

mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.once("open", () => console.log("Connected to DB"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

app.get("/api/test", (req, res) => {
  // res.sendStatus(200)
});

app.listen(port, () => console.log(`Listening on ${port}`));
