import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import MySQLStore from "express-mysql-session";

/**
 * app setting
 */
const app = express();
app.use(
  session({
    secret: "1q2w3e4r",
    resave: false,
    saveUninitialized: true,
    store: new (MySQLStore(session))({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "apmsetup",
      database: "o2",
      insecureAuth: true,
    }),
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * counter
 */
app.get("/count", (req, res) => {
  const count = +req.session.count || 0;
  req.session.count = count + 1;
  res.send("count: " + count);
});

/**
 * login
 */
app.get("/auth/login", (_, res) => {
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
      displayName: "hanjy",
    },
  };
  const { username, password } = req.body;
  if (userData[username] && userData[username].password === password) {
    req.session.loginData = {
      displayName: userData[username].displayName,
    };
    req.session.save(() => {
      res.redirect("/welcome");
    });
  } else {
    res.send(`Fail <a href="/auth/login">login</a>`);
  }
});
app.get("/welcome", (req, res) => {
  if (req.session.loginData) {
    const { displayName } = req.session.loginData;
    res.send(`
      <h1>Hello, ${displayName}</h1>
      <a href="/auth/logout">logout</a>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href="/auth/login">Login</a>
    `);
  }
});
app.get("/auth/logout", (req, res) => {
  delete req.session.loginData;
  req.session.save(() => {
    res.redirect("/welcome");
  });
});

/**
 * app run
 */
app.listen(3003, () => console.log("server on 3003"));
