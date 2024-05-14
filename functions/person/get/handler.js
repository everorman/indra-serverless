const aws = require('aws-sdk');
const { formatResponse } = require('../../../utils/formatResponse');
const { getPersonById } = require('../../../utils/personService');


const get = async (event) => {
  let personId = event.pathParameters.id;
  const params = {
    TableName: 'indraTable',
    Key: {
      pk: personId,
    },
  };

  const item = await getPersonById(personId);
  if (!item) return formatResponse(403, { error: "Person not found" });
  return formatResponse(200, item);

};

module.exports = {
  get
};