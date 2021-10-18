import AWS from "aws-sdk";

//const AWS_S3_ACCESS_KEY = 'AKIAVA6543JUE5NUBVGA';

//const AWS_S3_SECRET_KEY = '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';

//AWS S3 bucket config
const s3Bucket = new AWS.S3({
  accessKeyId: "AKIAVA6543JUE5NUBVGA",
  secretAccessKey: "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",
  region: "ap-south-1",
});

export const s3Upload = (options) => {
  return new Promise((resolve, reject) =>
    s3Bucket.upload(options, (error, data) => {
      if (error) return reject(error);
      return resolve(data);
    })
  );
};
