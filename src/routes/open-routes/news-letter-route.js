import express from "express";
import { newsLetterValidator } from "../../serializers/validators/news-letter-validator.js";
import { sendNewsletterEmailController } from "../../controller/news-letter-controller.js";

const newsletterRoute = express();

newsletterRoute.post("/", newsLetterValidator, sendNewsletterEmailController);

export default newsletterRoute;
