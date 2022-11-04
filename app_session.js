import express from "express";
import session from "express-session";

const app = express();
app.use(
  session({
    secret: "1q2w3e4r",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/count", (req, res) => {
  const count = +req.session.count || 1;
  req.session.count = count + 1;
  res.send("count: " + count);
});

app.get("/auth/login", (req, res) => {
  const output = `
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

app.listen(3003, () => console.log("server on 3003"));
