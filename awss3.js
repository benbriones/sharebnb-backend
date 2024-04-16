"use strict";

import { createInterface } from "readline/promises";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  CreateBucketCommand
} from "@aws-sdk/client-s3";

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

/** create a bucket */
// async function createBucket(bucketName) {
//   const bucketName = `test-bucket-${Date.now()}`;
//   const newBucketName = `${bucketName}-${Date.now()}`;
//   await s3Client.send(
//     new CreateBucketCommand({
//       Bucket: newBucketName
//     })
//   );
// }

/** AWS function to add a new object into an S3 bucket.
 * Takes key (unique key) and body (link)
 */
async function putIntoBucket(key, body) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body
    })
  );
}

/** AWS function to read specific object from an S3 bucket.
 * Takes key (unique key) of object to read.
*/
async function readObject(key) {
  const { Body } = await S3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );

  console.log(String(Body)); // await?
}

module.exports = { putIntoBucket, readObject };