
import { Request, Response } from "express";
import { Webhook } from "svix";
import User from "../models/Users.ts";

export const ClerkwebHooks = async (
  req: Request,
  res: Response
) => {
  console.log("Webhook received!");

  const secret = process.env.CLERK_WEBHOOK_SECRET;

  if (!secret) {
    console.error("Webhook secret missing");

    return res.status(500).json({
      message: "Webhook secret missing",
    });
  }

  console.log("Raw body:", Buffer.isBuffer(req.body));
  console.log("Svix headers:", {
    id: req.headers["svix-id"],
    timestamp: req.headers["svix-timestamp"],
    signaturePresent: !!req.headers["svix-signature"],
  });

  const wh = new Webhook(secret);

 
let evt: any;

try {
  // Verify the original raw payload
  wh.verify(req.body, {
    "svix-id": req.headers["svix-id"] as string,
    "svix-timestamp": req.headers["svix-timestamp"] as string,
    "svix-signature": req.headers["svix-signature"] as string,
  });

  // Parse the payload only after successful verification
  evt = JSON.parse(req.body.toString("utf8"));

  console.log("Signature verified!");
  console.log("Event type:", evt.type);

} catch (error: any) {
  console.error("Webhook verification failed:", error.message);

  return res.status(400).json({
    success: false,
    message: "Webhook verification failed",
    error: error.message,
  });
}



  try {
    if (evt.type === "user.created") {
      const {
        id,
        username,
        first_name,
        last_name,
        email_addresses,
      } = evt.data;

      const email = email_addresses?.[0]?.email_address;

      if (!email) {
        return res.status(400).json({
          message: "User email missing",
        });
      }

      const newUser = await User.create({
        userName:
          username ||
          `${first_name || ""} ${last_name || ""}`.trim() ||
          email.split("@")[0],
        email,
        clerkUserId: id,
        savedPosts: [],
      });

      console.log("User saved:", newUser.email);
    }

    return res.status(200).json({
      success: true,
      message: "Webhook processed",
    });

  } catch (error: any) {
    console.error("Database error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
