import { Router } from "express";
import { sendContactEmail, sendAutoReply } from "../mailer.js";

const router = Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    await Promise.all([
      sendContactEmail({ name, email, message }),
      sendAutoReply({ name, email }),
    ]);

    res.json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ success: false, message: "Failed to send message. Try again later." });
  }
});

export default router;
