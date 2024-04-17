"use strict";

const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");

require("dotenv").config();
const {Readable} = require("stream");

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
// TODO: dont need this
/** AWS function to read specific object from an S3 bucket.
 * Takes key (unique key) of object to read.
*/
async function readObject(key) {
  console.log('inreaddddd***')
  const { Body } = await s3Client.send(
    new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
  );

  console.log('123',Body.servername)

  // console.log('***readable', fileStream)

  console.log(("*********BODY", Body)); // await?
}
//https://sharebnb-bucket-bb1016.s3.us-west-1.amazonaws.com/testKey5
function getObjectUrl(key, bucketName) {
  return `https://${bucketName}.s3.us-west-1.amazonaws.com/${key}`;
}

module.exports = { putIntoBucket, readObject };