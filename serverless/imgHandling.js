'use strict';
//myfunctions
const { createNameForImage, promissifyedImageHash, getParsedFile, validateRequest } = require('./functions/functions')
//aws
const AWS = require('aws-sdk');
AWS.config.update({ region: 'sa-east-1' });
//instances
var dynamodb = new AWS.DynamoDB
var s3 = new AWS.S3();

module.exports.hello = async (event) => {
  let isValid = validateRequest(event);
  if (isValid) {
    return isValid;
  }

  //Parsing file that comes in base64 thanks to multipart/form-data
  let parsedFile = getParsedFile(event);

  //Setting up params for s3 upload
  var paramsForS3 = {
    "Body": parsedFile.data,
    "Bucket": "print-it-bucket357",
    "Key": createNameForImage(parsedFile)
  };

  //But before upload, let me check if file already exists
  //I'm checking this hashing the img buffer and then looking into dynamo
  //Where I have all the hashs of the images from s3
  let hash = await promissifyedImageHash(parsedFile);

  const response = await dynamodb.getItem({
    TableName: "Imagens",
    Key: {
      HashFromImage: { "S": hash }
    }
  }).promise();

  let imageAlreadyExists = "Item" in response
  if (imageAlreadyExists) {
    return {
      Location: `https://print-it-bucket357.s3.sa-east-1.amazonaws.com/${response.Item.ImageKey.S}`
    }
  }
  try {
    dynamodb.putItem({
      TableName: "Imagens",
      Item: {
        HashFromImage: { "S": hash },
        ImageKey: { "S": paramsForS3["Key"] }
      }
    }).promise()


    let result = await s3.upload(paramsForS3).promise();
    return {
      Location: result.Location
    }
  } catch (error) {
    throw error
  }
};