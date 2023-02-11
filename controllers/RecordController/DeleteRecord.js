const { SDK, SDK_API } = require(`../../config`);
const {
  RecordOperations,
  DeleteRecordsParam,
} = require(`${SDK_API}/record/record_operations`);
const { HeaderMap } = require(`${SDK}/routes/header_map`);
const { ParameterMap } = require(`${SDK}/routes/parameter_map`);

/**
 *  Delete Records
 * This method is used to delete records of a module and print the response.
 * @param {String} moduleAPIName The API Name of the module to delete records.
 * @param {Array} recordIds The array of record IDs to be deleted
 */
const deleteRecord = async (module, recordId) => {
  //Get instance of RecordOperations Class
  const recordOperations = new RecordOperations();

  //Get instance of ParameterMap Class
  let paramInstance = new ParameterMap();
  await paramInstance.add(DeleteRecordsParam.IDS, recordId);
  await paramInstance.add(DeleteRecordsParam.WF_TRIGGER, true);

  //Get instance of HeaderMap Class
  let headerInstance = new HeaderMap();

  //Call deleteRecords method that takes paramInstance and moduleAPIName as parameter.
  await recordOperations.deleteRecords(module, paramInstance, headerInstance);
};
module.exports = deleteRecord;
