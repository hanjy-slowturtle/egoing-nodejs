import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.get("/count", (req, res) => {
  const count = +req.cookies.count || 0;
  res.cookie("count", count + 1);
  res.send("count: " + count);
});

app.listen(3003, () => console.log("server on 3003"));
