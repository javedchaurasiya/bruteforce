const router = require("express").Router();
const AWS = require("aws-sdk");
const fs = require("fs");
// const FileType = require("file-type");
const multiparty = require("multiparty");
require("dotenv").config();

// NOTE: if you're transpiling, using TS or don't use commonjs for any other reason, you can import instead of require:
// import express from 'express';
// import AWS, { S3 } from 'aws-sdk';
// import fs from 'fs';
// import FileType from 'file-type';
// import multiparty from 'multiparty';

// configure the keys for accessing AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// create S3 instance
const s3 = new AWS.S3();

// abstracts function to upload a file returning a promise
// NOTE: if you are using TypeScript the typed function signature will be
// const uploadFile = (buffer: S3.Body, name: string, type: { ext: string; mime: string })
const uploadFile = (buffer, name, ext) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    Key: `${name}.${ext}`,
  };
  return s3.upload(params).promise();
};

const middle = (request,response,next)=>{
  console.log(request.headers);
  next();
}

router.post("/",middle, (request, response) => {
  // console.log(request.headers.authorization);
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response.status(500).json({ error });
    }
    try {
      const path = files.file[0].path;
      const ext = path.split(".").slice(-1)[0];
      console.log(ext);
      const buffer = fs.readFileSync(path);
      //   const type = await FileType.fromBuffer(buffer);
      const fileName = `bucketFolder/${Date.now().toString()}`;
      const data = await uploadFile(buffer, fileName, ext);
      console.log(data);
      return response.status(200).json({ data });
    } catch (err) {
      return response.status(500).json({ err });
    }
  });
});

module.exports = router;
