const { SDK_API } = require(`../../config`);
const { QueryOperations } = require(`${SDK_API}/query/query_operations`);
const { APIException } = require(`${SDK_API}/query/api_exception`);
const { ResponseWrapper } = require(`${SDK_API}/query/response_wrapper`);
const { BodyWrapper } = require(`${SDK_API}/query/body_wrapper`);

/**
 *  Get Records
 * This method is used to fetch records of a module and print the response.
 * @param {String} module
 */
const getRecords = async (module) => {
  //Get instance of QueryOperations Class
  const queryOperations = new QueryOperations();

  //Get instance of BodyWrapper Class that will contain the request body
  const bodyWrapper = new BodyWrapper();

  const selectQuery = `select First_Name, Last_Name, Full_Name, Email, Phone, Mobile, Created_Time from ${module} where Last_Name is not null limit 200`;

  bodyWrapper.setSelectQuery(selectQuery);

  //Call getRecords method that takes BodyWrapper instance as parameter
  const response = await queryOperations.getRecords(bodyWrapper);

  if (response != null) {
    //Get object from response
    const responseObject = response.getObject();

    if (responseObject !== null) {
      //Check if expected ResponseWrapper instance is received
      if (responseObject instanceof ResponseWrapper) {
        //Get the array of obtained Record instances
        const records = responseObject.getData();
        const keyArray = [
          `id`,
          `First_Name`,
          `Last_Name`,
          `Full_Name`,
          `Email`,
          `Phone`,
          `Mobile`,
          `Created_Time`,
        ];
        let contacts = [];

        for (let record of records) {
          let keyValues = record.getKeyValues();
          let contact = {};
          for (let keyName of keyArray) {
            let value = keyValues.get(keyName);
            if (value) contact[keyName] = value;

            // Convert BigInt to String
            if (keyName === `id`) contact[keyName] = value.toString();
          }
          contacts.push(contact);
        }

        return contacts;
      }

      //Check if the request returned an exception
      else if (responseObject instanceof APIException) {
        //Get the Message
        console.log(`Message: ` + responseObject.getMessage().getValue());
      }
    }
  }
};

module.exports = getRecords;
