import express from "express";
import session from "express-session";
import bodyParser from "body-parser";

const app = express();
app.use(
  session({
    secret: "1q2w3e4r",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/count", (req, res) => {
  const count = +req.session.count || 1;
  req.session.count = count + 1;
  res.send("count: " + count);
});

app.get("/auth/login", (req, res) => {
  const output = `
    <h1>Login</h1>
    <form action="/auth/login" method="post">
      <p>
        <input type="text" name="username" placeholder="username" />
      </p>
      <p>
        <input type="password" name="password" placeholder="password" />
      </p>
      <p>
        <input type="submit" />
      </p>
    </form>
  `;
  res.send(output);
});
app.post("/auth/login", (req, res) => {
  const userData = {
    hello: {
      password: "123",
    },
  };
  const username = req.body.username;
  const password = req.body.password;
  if (userData[username] && userData[username].password === password) {
    res.redirect("/welcome");
  } else {
    res.send(`Fail <a href="/auth/login">login</a>`);
  }
});

app.listen(3003, () => console.log("server on 3003"));
