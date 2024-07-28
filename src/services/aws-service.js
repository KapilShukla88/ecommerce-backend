import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const getAWSObject = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
  }); // generate the command for to pass to get the signed ur;

  const url = await getSignedUrl(s3Client, command); // get the signed url

  return url;
};

/**
 * @description to put the image in aws s3 bucket
 * @param {*} fileName image file name
 * @param {*} body image buffer
 * @param {*} contentType type of image
 * @param {*} contentLength size of an image
 */
export const putAWSObject = async (
  fileName,
  body,
  contentType,
  contentLength
) => {
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    ContentType: contentType,
    Body: body,
    ContentLength: contentLength,
  });

  await s3Client.send(command);
};
