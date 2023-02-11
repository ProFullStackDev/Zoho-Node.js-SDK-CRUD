const { SDK, SDK_API } = require(`../../config`);
const { BodyWrapper } = require(`${SDK_API}/record/body_wrapper`);
const { RecordOperations } = require(`${SDK_API}/record/record_operations`);
const { HeaderMap } = require(`${SDK}/routes/header_map`);
const RecordField = require(`${SDK_API}/record/field`).Field;
const ZCRMRecord = require(`${SDK_API}/record/record`).MasterModel;

/**
 *  Update Records
 * This method is used to update the records of a module with ID and print the response.
 * @param {String} module
 * @param {String} recordId
 * @param {Object} query
 */
const updateRecord = async (module, recordId, query) => {
  //Get instance of RecordOperations Class
  const recordOperations = new RecordOperations();

  //Get instance of BodyWrapper Class that will contain the request body
  const request = new BodyWrapper();

  //Array to hold Record instances
  const recordsArray = [];

  //Get instance of Record Class
  const record = new ZCRMRecord();

  //Declare Field according to the module
  let Field;
  if (module === "Leads") {
    Field = RecordField.Leads;
  } else {
    Field = RecordField.Contacts;
  }

  //ID of the record to be updated
  record.setId(BigInt(recordId));

  //Throws an error when the full name is not specified
  if (!query.firstname || !query.lastname) {
    throw new Error("First name and last name must be specified!");
  }

  /*
   * Call addFieldValue method that takes two arguments
   * Import the `@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/field` file
   * 1 -> Call Field `.` and choose the module from the displayed list and press `.` and choose the field name from the displayed list.
   * 2 -> Value
   */
  record.addFieldValue(Field.FIRST_NAME, query.firstname);
  record.addFieldValue(Field.LAST_NAME, query.lastname);
  record.addFieldValue(Field.PHONE, query.phone);
  record.addFieldValue(Field.MOBILE, query.mobile);
  record.addKeyValue(`Email`, query.email);

  //Add Record instance to the array
  recordsArray.push(record);

  //Set the array to data in BodyWrapper instance
  request.setData(recordsArray);

  //Get instance of HeaderMap Class
  const headerInstance = new HeaderMap();

  //Call updateRecords method that takes BodyWrapper instance and moduleAPIName as parameter.
  await recordOperations.updateRecords(module, request, headerInstance);
};
module.exports = updateRecord;
