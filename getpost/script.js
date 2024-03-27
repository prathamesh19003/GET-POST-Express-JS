const express = require("express");
const app = express();
const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true })); //to use url encoded data
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

app.use(express.json());

let comments = [
  {
    id: crypto.randomUUID(),
    username: "kevin",
    comment: "How are you?",
  },
  {
    id: crypto.randomUUID(),
    username: "ash",
    comment: "LOOL!!!!",
  },
  {
    id: crypto.randomUUID(),
    username: "joe",
    comment: "LMAO!!!",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("comments/new");
});

app.post("/comments", (req, res) => {
  const { username, comment } = req.body;
  id = crypto.randomUUID();
  //console.log(username, comment);
  comments.push({ username, comment, id });
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const comment = comments.find((c) => c.id === id);
  comment.comment = newComment;
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newComment = comments.find((c) => c.id === id);
  res.render("comments/show", { newComment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.listen(3000, () => {
  console.log("LISTENING ON PORT 3000");
});
