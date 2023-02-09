const fs = require("fs");
const path = require("path");
const {
  RecordOperations,
  DeleteRecordParam,
  DeleteRecordsParam,
  GetDeletedRecordsHeader,
  GetDeletedRecordsParam,
  GetMassUpdateStatusParam,
  GetRecordHeader,
  GetRecordParam,
  GetRecordsHeader,
  GetRecordsParam,
  SearchRecordsParam,
} = require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record_operations");
const Participants =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/participants").Participants;
const Territory =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/territory").Territory;
const StreamWrapper =
  require("@zohocrm/nodejs-sdk-2.0/utils/util/stream_wrapper").StreamWrapper;
const FileBodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/file_body_wrapper").FileBodyWrapper;
const ZCRMUser =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/users/user").User;
const FileDetails =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/file_details").FileDetails;
const RemindAt =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/remind_at").RemindAt;
const Participant =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/participants").Participants;
const RecurringActivity =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/recurring_activity").RecurringActivity;
const ZCRMRecord =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/record").MasterModel;
const ZCRMLayout =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/layouts/layout").Layout;
const PricingDetails =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/pricing_details").PricingDetails;
const LineItemProduct =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/line_item_product").LineItemProduct;
const Tag =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/tags/tag").Tag;
const LineTax =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/line_tax").LineTax;
const InventoryLineItems =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/inventory_line_items").InventoryLineItems;
const ResponseWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/response_wrapper").ResponseWrapper;
const DeletedRecordsWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/deleted_records_wrapper").DeletedRecordsWrapper;
const BodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/body_wrapper").BodyWrapper;
const MassUpdateBodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/mass_update_body_wrapper").MassUpdateBodyWrapper;
const MassUpdateActionWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/mass_update_action_wrapper").MassUpdateActionWrapper;
const MassUpdateResponseWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/mass_update_response_wrapper").MassUpdateResponseWrapper;
const MassUpdateSuccessResponse =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/mass_update_success_response").MassUpdateSuccessResponse;
const MassUpdate =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/mass_update").MassUpdate;
const ConvertBodyWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/convert_body_wrapper").ConvertBodyWrapper;
const LeadConverter =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/lead_converter").LeadConverter;
const ActionWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/action_wrapper").ActionWrapper;
const ConvertActionWrapper =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/convert_action_wrapper").ConvertActionWrapper;
const RecordField =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/field").Field;
const Consent =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/consent").Consent;
const APIException =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/api_exception").APIException;
const SuccessResponse =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/success_response").SuccessResponse;
const SuccessfulConvert =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/successful_convert").SuccessfulConvert;
const Comment =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/comment").Comment;
const ParameterMap =
  require("@zohocrm/nodejs-sdk-2.0/routes/parameter_map").ParameterMap;
const HeaderMap =
  require("@zohocrm/nodejs-sdk-2.0/routes/header_map").HeaderMap;
const Choice = require("@zohocrm/nodejs-sdk-2.0/utils/util/choice").Choice;
const Reminder =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/reminder").Reminder;
const Attachment =
  require("@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/attachments/attachment").Attachment;

class CreateContact {
  /**
   *  Create Records
   * This method is used to create records of a module and print the response.
   * @param {String} moduleAPIName The API Name of the module to create records.
   */
  static async Run() {
    let moduleAPIName = "Contacts";

    //Get instance of RecordOperations Class
    let recordOperations = new RecordOperations();

    //Get instance of BodyWrapper Class that will contain the request body
    let request = new BodyWrapper();

    //Array to hold Record instances
    let recordsArray = [];

    //Get instance of Record Class
    let record = new ZCRMRecord();

    /* Value to Record's fields can be provided in any of the following ways */

    /*
     * Call addFieldValue method that takes two arguments
     * Import the "@zohocrm/nodejs-sdk-2.0/core/com/zoho/crm/api/record/field" file
     * 1 -> Call Field "." and choose the module from the displayed list and press "." and choose the field name from the displayed list.
     * 2 -> Value
     */
    record.addFieldValue(RecordField.Leads.LAST_NAME, "Node JS SDK");

    record.addFieldValue(RecordField.Leads.FIRST_NAME, "Node");

    record.addFieldValue(RecordField.Leads.COMPANY, "ZCRM");

    record.addFieldValue(RecordField.Leads.CITY, "City");

    // record.addKeyValue("External", "TestExternal12345678");

    /*
     * Call addKeyValue method that takes two arguments
     * 1 -> A string that is the Field's API Name
     * 2 -> Value
     */
    record.addKeyValue("Custom_field", "Value");

    record.addKeyValue("Custom_field_2", "value");

    record.addKeyValue("Date_1", new Date(2020, 10, 20));

    record.addKeyValue("Subject", "AutomatedSDK");

    let fileDetails = [];

    let fileDetail = new FileDetails();

    fileDetail.setFileId(
      "ae9c7cefa418aec1d6a5cc2d9ab35c32f5fe2c5250e0126a51408469e129c8c7"
    );
    console.log("1111");
    fileDetails.push(fileDetail);

    fileDetail = new FileDetails();

    fileDetail.setFileId(
      "ae9c7cefa418aec1d6a5cc2d9ab35c329d22053bf53af16b6d920bfeb0743fbd"
    );

    fileDetails.push(fileDetail);

    fileDetail = new FileDetails();

    fileDetail.setFileId(
      "ae9c7cefa418aec1d6a5cc2d9ab35c323daf4780bfe0058133556f155795981f"
    );

    fileDetails.push(fileDetail);

    record.addKeyValue("File_Upload", fileDetails);

    //Used when GDPR is enabled
    let dataConsent = new Consent();

    dataConsent.setConsentRemarks("Approved.");

    dataConsent.setConsentThrough("Email");

    dataConsent.setContactThroughEmail(true);

    dataConsent.setContactThroughSocial(false);

    record.addKeyValue("Data_Processing_Basis_Details", dataConsent);

    /** Following methods are being used only by Inventory modules */

    let dealName = new ZCRMRecord();

    dealName.addFieldValue(RecordField.Deals.ID, 347706110553012n);

    record.addFieldValue(RecordField.Sales_Orders.DEAL_NAME, dealName);

    let contactName = new ZCRMRecord();

    contactName.addFieldValue(RecordField.Contacts.ID, 347706110352015n);

    contactName.addFieldValue(
      RecordField.Sales_Orders.CONTACT_NAME,
      contactName
    );

    let accountName = new ZCRMRecord();

    accountName.addFieldValue(RecordField.Accounts.ID, 347706110352011n);

    record.addFieldValue(RecordField.Sales_Orders.ACCOUNT_NAME, accountName);

    record.addKeyValue("Discount", 10.5);

    let inventoryLineItemArray = [];

    let inventoryLineItem = new InventoryLineItems();

    let lineItemProduct = new LineItemProduct();

    lineItemProduct.setId(347706110561019n);

    inventoryLineItem.setProduct(lineItemProduct);

    inventoryLineItem.setQuantity(3);

    inventoryLineItem.setProductDescription("productDescription");

    inventoryLineItem.setListPrice(10.0);

    inventoryLineItem.setDiscount("5.90");

    let productLineTaxes = [];

    let productLineTax = new LineTax();

    productLineTax.setName("MyTax1134");

    productLineTax.setPercentage(20.0);

    productLineTaxes.push(productLineTax);

    inventoryLineItem.setLineTax(productLineTaxes);

    inventoryLineItemArray.push(inventoryLineItem);

    record.addKeyValue("Product_Details", inventoryLineItemArray);

    let lineTaxes = [];

    let lineTax = new LineTax();

    lineTax.setName("MyTax1134");

    lineTax.setPercentage(20.0);

    lineTaxes.push(lineTax);

    record.addKeyValue("$line_tax", lineTaxes);

    /** End Inventory **/

    /** Following methods are being used only by Activity modules */

    record.addFieldValue(RecordField.Tasks.DESCRIPTION, "New Task");

    record.addKeyValue("Currency", new Choice("INR"));

    let remindAt = new RemindAt();

    remindAt.setAlarm(
      "FREQ=NONE;ACTION=EMAILANDPOPUP;TRIGGER=DATE-TIME:2022-07-03T12:30:00.05:30"
    );

    record.addFieldValue(RecordField.Tasks.REMIND_AT, remindAt);

    let whoId = new ZCRMRecord();

    whoId.setId(347706110352015n);

    record.addFieldValue(RecordField.Tasks.WHO_ID, whoId);

    record.addFieldValue(
      RecordField.Tasks.STATUS,
      new Choice("Waiting for input")
    );

    record.addFieldValue(RecordField.Tasks.DUE_DATE, new Date(2020, 10, 10));

    record.addFieldValue(RecordField.Tasks.PRIORITY, new Choice("High"));

    let whatId = new ZCRMRecord();

    whatId.setId(347706110352011n);

    record.addFieldValue(RecordField.Tasks.WHAT_ID, whatId);

    record.addKeyValue("$se_module", "Accounts");

    /** Recurring Activity can be provided in any activity module*/

    let recurringActivity = new RecurringActivity();

    recurringActivity.setRrule(
      "FREQ=DAILY;INTERVAL=10;UNTIL=2020-08-14;DTSTART=2020-07-03"
    );

    record.addFieldValue(
      RecordField.Events.RECURRING_ACTIVITY,
      recurringActivity
    );

    record.addFieldValue(RecordField.Events.DESCRIPTION, "My Event");

    let startDateTime = new Date("October 15, 2020 05:35:32");

    record.addFieldValue(RecordField.Events.START_DATETIME, startDateTime);

    let participantsArray = [];

    let participant = new Participant();

    participant.setParticipant("test@gmail.com");

    participant.setType("email");

    participantsArray.push(participant);

    participant = new Participant();

    participant.addKeyValue("participant", "347706110654001");

    participant.setType("lead");

    participantsArray.push(participant);

    record.addFieldValue(RecordField.Events.PARTICIPANTS, participantsArray);

    record.addKeyValue("$send_notification", true);

    record.addFieldValue(RecordField.Events.EVENT_TITLE, "New Automated Event");

    let endDateTime = new Date("November 15, 2020 05:35:32");

    record.addFieldValue(RecordField.Events.END_DATETIME, endDateTime);

    let remindAt1 = new Date("October 15, 2020 04:35:32");

    record.addFieldValue(RecordField.Events.REMIND_AT, remindAt1);

    record.addFieldValue(RecordField.Events.CHECK_IN_STATUS, "PLANNED");

    whatId = new ZCRMRecord();

    whatId.setId(347706110654001n);

    record.addFieldValue(RecordField.Tasks.WHAT_ID, whatId);

    record.addKeyValue("$se_module", "Leads");

    /** End Activity **/

    /** Following methods are being used only by Price_Books module */

    let pricingDetailsArray = [];

    let pricingDetail = new PricingDetails();

    pricingDetail.setFromRange(1.0);

    pricingDetail.setToRange(5.0);

    pricingDetail.setDiscount(2.0);

    pricingDetailsArray.push(pricingDetail);

    pricingDetail = new PricingDetails();

    pricingDetail.addKeyValue("from_range", 6.0);

    pricingDetail.addKeyValue("to_range", 11.0);

    pricingDetail.addKeyValue("discount", 3.0);

    pricingDetailsArray.push(pricingDetail);

    record.addFieldValue(
      RecordField.Price_Books.PRICING_DETAILS,
      pricingDetailsArray
    );

    record.addKeyValue("Email", "abc@zoho.com");

    record.addFieldValue(RecordField.Price_Books.DESCRIPTION, "TEST");

    record.addFieldValue(RecordField.Price_Books.PRICE_BOOK_NAME, "book_name");

    record.addFieldValue(
      RecordField.Price_Books.PRICING_MODEL,
      new Choice("Flat")
    );

    /** End of Price_Books */

    let tagsArray = [];

    let tag = new Tag();

    tag.setName("Testtask");

    tagsArray.push(tag);

    record.addKeyValue("Tag", tagsArray);

    //Add Record instance to the array
    recordsArray.push(record);

    //Set the array to data in BodyWrapper instance
    request.setData(recordsArray);

    let trigger = [];

    trigger.push("approval");

    trigger.push("workflow");

    trigger.push("blueprint");

    //Set the array containing the trigger operations to be run
    request.setTrigger(trigger);

    let larId = "34096432157065";

    //Set the larId
    request.setLarId(larId);

    let process = ["review_process"];

    //Set the array containing the process to be run
    request.setProcess(process);

    //Get instance of HeaderMap Class
    let headerInstance = new HeaderMap();

    // await headerInstance.add(CreateRecordsHeader.X_EXTERNAL, "Leads.External");

    //Call createRecords method that takes BodyWrapper instance and moduleAPIName as parameters
    let response = await recordOperations.createRecords(
      moduleAPIName,
      request,
      headerInstance
    );

    if (response != null) {
      //Get the status code from response
      console.log("Status Code: " + response.getStatusCode());

      //Get object from response
      let responseObject = response.getObject();

      if (responseObject != null) {
        //Check if expected ActionWrapper instance is received
        if (responseObject instanceof ActionWrapper) {
          //Get the array of obtained ActionResponse instances
          let actionResponses = responseObject.getData();

          actionResponses.forEach((actionResponse) => {
            //Check if the request is successful
            if (actionResponse instanceof SuccessResponse) {
              //Get the Status
              console.log("Status: " + actionResponse.getStatus().getValue());

              //Get the Code
              console.log("Code: " + actionResponse.getCode().getValue());

              console.log("Details");

              //Get the details map
              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              console.log("Message: " + actionResponse.getMessage().getValue());
            }
            //Check if the request returned an exception
            else if (actionResponse instanceof APIException) {
              //Get the Status
              console.log("Status: " + actionResponse.getStatus().getValue());

              //Get the Code
              console.log("Code: " + actionResponse.getCode().getValue());

              console.log("Details");

              //Get the details map
              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              //Get the Message
              console.log("Message: " + actionResponse.getMessage().getValue());
            }
          });
        }
        //Check if the request returned an exception
        else if (responseObject instanceof APIException) {
          //Get the Status
          console.log("Status: " + responseObject.getStatus().getValue());

          //Get the Code
          console.log("Code: " + responseObject.getCode().getValue());

          console.log("Details");

          //Get the details map
          let details = responseObject.getDetails();

          if (details != null) {
            Array.from(details.keys()).forEach((key) => {
              console.log(key + ": " + details.get(key));
            });
          }

          //Get the Message
          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  }
}
module.exports = { CreateContact };
