import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs = []; // In-memory storage for blogs
var i=0;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  const newBlog = {
    id: i++,
    title: req.body.title,
    content: req.body.content
  };
  blogs.push(newBlog);
  res.redirect("/my-blogs");
});

app.get("/my-blogs", (req, res) => {
  res.render("my-blogs.ejs", { blogs });
});

app.get("/blogs/:id", (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (blog) {
    res.render("blog.ejs", { blog });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.get("/blogs/:id/edit", (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (blog) {
    res.render("edit-blog.ejs", { blog });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.post("/blogs/:id/edit", (req, res) => {
  const blog = blogs.find(b => b.id == req.params.id);
  if (blog) {
    blog.title = req.body.title;
    blog.content = req.body.content;
    res.redirect("/my-blogs");
  } else {
    res.status(404).send("Blog not found");
  }
});

app.post("/blogs/:id/delete", (req, res) => {
  blogs = blogs.filter(b => b.id != req.params.id);
  blogs.forEach((b, index) => {
    b.id = index;
  });
  res.redirect("/my-blogs");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
