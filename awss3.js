"use strict";

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

require("dotenv").config();

const bucketName = process.env.AWS_BUCKET_NAME;

const s3Client = new S3Client({
  region: "us-west-1",
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
 * Takes key (unique key) and file
 */
async function putIntoBucket(key, file) {
  const data = new PutObjectCommand({
    Bucket: bucketName,
    ContentType: "image/jpg",
    Tagging: "public=yes",
    Key: key,
    Body: file
  });
  try {
    const result = await s3Client.send(
      data);
      console.log("result", result)
  } catch (error) {
    console.log("putIntoBucket errors: ", error);
  }
}

/** AWS function to read specific object from an S3 bucket.
 * Takes key (unique key) of object to read.
*/
async function readObject(key) {
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );

  // const resp = await Body.json();

  console.log(("*********BODY", Body)); // await?
}

module.exports = { putIntoBucket, readObject };