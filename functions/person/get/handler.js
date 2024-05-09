const crypto = require('crypto');
const aws = require('aws-sdk');


const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: 'http://localhost:8000',
    sslEnabled: false,
    region: 'local-env',
  }),
};
const dynamodb = new aws.DynamoDB.DocumentClient(config);

const get = async (event) => {
  let personId = event.pathParameters.id;
  const params = {
    TableName: 'indraTable',
    Key: {
      pk: personId,
    },
  };

  const res = await dynamodb.get(params).promise();
  return {
    "statusCode": 200,
    "body": JSON.stringify({ data: res.Item })
  };
};

module.exports = {
  get
};