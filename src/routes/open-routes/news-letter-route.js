import express from "express";
import { newsLetterValidator } from "../../serializers/validators/news-letter-validator.js";
import { sendNewsletterEmailController } from "../../controller/news-letter-controller.js";

const newsletterRoute = express();

/**
 * @description to send the mail to get the news letters regarding the platform
 * @route /v1/main/newsletter
 * @validator body - email is required to sent the mail for news letter
 * @return `{statusCode, message}`
 */
newsletterRoute.post("/", newsLetterValidator, sendNewsletterEmailController);

export default newsletterRoute;
