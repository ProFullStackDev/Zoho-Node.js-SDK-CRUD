const QueryOperations =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/query/query_operations").QueryOperations;
const APIException =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/query/api_exception").APIException;
const ResponseWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/query/response_wrapper").ResponseWrapper;
const BodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/query/body_wrapper").BodyWrapper;

class GetContacts {
  static async Run() {
    //Get instance of QueryOperations Class
    let queryOperations = new QueryOperations();

    //Get instance of BodyWrapper Class that will contain the request body
    let bodyWrapper = new BodyWrapper();

    let selectQuery =
      "select First_Name, Last_Name, Full_Name, Email, Phone, Mobile, Created_Time from Contacts where Last_Name is not null limit 200";

    bodyWrapper.setSelectQuery(selectQuery);

    //Call getRecords method that takes BodyWrapper instance as parameter
    let response = await queryOperations.getRecords(bodyWrapper);

    if (response != null) {
      //Get the status code from response
      console.log("Status Code: " + response.getStatusCode());

      //Get object from response
      let responseObject = response.getObject();

      if (responseObject != null) {
        //Check if expected ResponseWrapper instance is received
        if (responseObject instanceof ResponseWrapper) {
          //Get the array of obtained Record instances
          let records = responseObject.getData();
          let contacts = [];

          for (let record of records) {
            let keyValues = record.getKeyValues();
            let keyArray = [
              "id",
              "First_Name",
              "Last_Name",
              "Full_Name",
              "Email",
              "Phone",
              "Mobile",
              "Created_Time",
            ];
            let contact = {};
            for (let keyName of keyArray) {
              let value = keyValues.get(keyName);
              if (value) contact[keyName] = value;
              if (keyName === "id") contact[keyName] = value.toString();
            }
            contacts.push(contact);
          }

          return contacts;
        }

        //Check if the request returned an exception
        else if (responseObject instanceof APIException) {
          //Get the Message
          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  }
}

module.exports = { GetContacts };
