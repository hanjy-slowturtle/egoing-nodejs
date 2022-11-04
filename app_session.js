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

app.listen(3003, () => console.log("server on 3003"));
