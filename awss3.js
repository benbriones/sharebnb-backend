import { createInterface } from "readline/promises";
import { S3Client, PutObjectCommand, GetObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";
require("dotenv").config();


const s3Client = new S3Client({region: process.env.AWS_REGION,
  credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

//TODO: create a bucke tin the dashboard
/** create a bucket */
async function createBucket(bucketName) {
  // const bucketName = `test-bucket-${Date.now()}`;
  const newBucketName = `${bucketName}-${Date.now()}`;
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: newBucketName
    })
  );
}

async function putIntoBucket(key, body, bucketName) {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: body
    })
  );
}

async function readObject(bucketName, key) {
  const { Body } = await S3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );

  console.log(String(Body)); // await?
}

module.exports = { createBucket, putIntoBucket, readObject };