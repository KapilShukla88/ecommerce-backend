import { sendNewsLetterUseCase } from "../use-cases/news-letter-usecase.js";
import emailService from "../utils/sendEmail.js";

/**
 * @description to send the email to the user by using the email service
 * @param {*} req {email} - email is required
 * @returns `{statusCode, message}`
 */
const sendNewsletterEmailController = async (req, res) => {
  try {
    const options = {
      email: req.body.email,
      subject: "Greetings from Finestdeals.",
      message: "Thank you for subscribing for newsletter.",
    };

    await sendNewsLetterUseCase(options, { emailService });

    res
      .status(200)
      .json({ statusCode: 200, message: "email sent successfully." });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      message: "Something went wrong. Unable to send an email.",
    });
  }
};

export { sendNewsletterEmailController };
