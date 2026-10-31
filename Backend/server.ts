
import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";

import postRoute from "./routes/post.route.ts";
import webHookRouter from "./routes/webhook.ts";
import userRouter from "./routes/user.route.ts";
import connectDB from "./lib/connectDb.ts";

dotenv.config();

const app = express();
const PORT = 5000;

// IMPORTANT: Webhook must come before express.json()
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webHookRouter
);

// Other middleware
app.use(express.json());

app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);

app.get("/", (req, res) => {
  res.send("Blog API is running!");
});

app.use("/api/blogs", postRoute);
app.use("/api/users", userRouter);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`App is listening at port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
