
import './config/env.ts'
import express from "express";

import { clerkMiddleware } from "@clerk/express";
import cors from "cors";

import postRoute from "./routes/post.route.ts";
import webHookRouter from "./routes/webhook.ts";
import userRouter from "./routes/user.route.ts";
import connectDB from "./lib/connectDb.ts";
import { getAuth } from "@clerk/express";


const app = express();
const PORT = 5000;

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Clerk webhook (raw body)
app.use(
  "/api/webhooks",
  express.raw({ type: "application/json" }),
  webHookRouter
);

// JSON parser
app.use(express.json());

// Clerk authentication middleware
app.use(
  clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY,
  })
);


app.get("/test-auth", (req, res) => {
  const auth = getAuth(req);

  console.log("Auth result:", auth);
  console.log("User ID:", auth.userId);

  return res.json({
    authenticated: !!auth.userId,
    userId: auth.userId,
  });
});

app.get("/", (req, res) => {
  res.send("Blog API is running!");
});

app.use((req, res, next) => {
  console.log("Authorization:", req.headers.authorization);
  
  next();
});

// Routes
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
