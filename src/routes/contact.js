import { Router } from "express";
import { body, validationResult } from "express-validator";
import { sendContactEmail, sendAutoReply } from "../mailer.js";

const router = Router();

const validate = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 100 }),
  body("email").isEmail().withMessage("Valid email required").normalizeEmail(),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ min: 5, max: 2000 }),
];

router.post("/", validate, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, message } = req.body;

  try {
    // Send both in parallel
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
