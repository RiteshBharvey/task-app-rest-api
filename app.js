const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookiesParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const { errorMiddleware } = require("./middlewares/error");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookiesParser());
app.use(
  cors({
    origin:[https://task-react-app-web.netlify.app"],
    credentials:true
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to db");
    app.listen(8080, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
