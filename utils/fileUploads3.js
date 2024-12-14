const fs = require("fs");

const { Upload } = require("@aws-sdk/lib-storage");
const { S3 } = require("@aws-sdk/client-s3");

export default async function uploadFileToS3(
  fileBuffer,
  { folderName, fileName }
) {
  // Create an S3 instance
  const s3 = new S3({
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },

    region: process.env.AWS_S3_REGION,
  });

  // Specify the S3 bucket and file information
  const bucketName = "eway-models";

  // Set S3 upload parameters

  const params = {
    Bucket: bucketName,
    Key: `${folderName}/${fileName || Date.now()}`,
    Body: fileBuffer,
    ACL: "public-read", // Set ACL as needed
  };

  const uploaded = await new Upload({
    client: s3,
    params,
  }).done();
  console.log(uploaded.Location);
  return uploaded.Location;
}
