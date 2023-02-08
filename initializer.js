const InitializeBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/initialize_builder").InitializeBuilder;
const OAuthBuilder =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/oauth_builder").OAuthBuilder;
const UserSignature =
  require("@zohocrm/nodejs-sdk-2.0/routes/user_signature").UserSignature;
const Levels = require("@zohocrm/nodejs-sdk-2.0/routes/logger/logger").Levels;
const LogBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/logger/log_builder").LogBuilder;
const USDataCenter =
  require("@zohocrm/nodejs-sdk-2.0/routes/dc/us_data_center").USDataCenter;
const DBBuilder =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/db_builder").DBBuilder;
const FileStore =
  require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/file_store").FileStore;
const SDKConfigBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/sdk_config_builder").SDKConfigBuilder;
const ProxyBuilder =
  require("@zohocrm/nodejs-sdk-2.0/routes/proxy_builder").ProxyBuilder;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const CLIENT_NAME = process.env.CLIENT_NAME;
const GRANT_TOKEN = process.env.GRANT_TOKEN;
const REDIRECT_URL = process.env.REDIRECT_URL;

class Initializer {
  static async initialize() {
    /*
     * Create an instance of Logger Class that takes two parameters
     * level -> Level of the log messages to be logged. Can be configured by typing Levels "." and choose any level from the list displayed.
     * filePath -> Absolute file path, where messages need to be logged.
     */
    let logger = new LogBuilder()
      .level(Levels.INFO)
      .filePath(`/Users/${CLIENT_NAME}/node_sdk_log.log`)
      .build();

    /*
     * Create an UserSignature instance that takes user Email as parameter
     */
    let user = new UserSignature(CLIENT_EMAIL);

    /*
     * Configure the environment
     * which is of the pattern Domain.Environment
     * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
     * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
     */
    let environment = USDataCenter.PRODUCTION();

    /*
     * Create a Token instance that requires the following
     * clientId -> OAuth client id.
     * clientSecret -> OAuth client secret.
     * refreshToken -> REFRESH token.
     * grantToken -> GRANT token.
     * id -> User unique id.
     * redirectURL -> OAuth redirect URL.
     */
    // if ID (obtained from persistence) is available
    let token = new OAuthBuilder()
      .clientId(CLIENT_ID)
      .clientSecret(CLIENT_SECRET)
      .grantToken(GRANT_TOKEN)
      .redirectURL(REDIRECT_URL)
      .build();
    /*
     * hostName -> DataBase host name. Default value "localhost"
     * databaseName -> DataBase name. Default  value "zohooauth"
     * userName -> DataBase user name. Default value "root"
     * password -> DataBase password. Default value ""
     * portNumber -> DataBase port number. Default value "3306"
     * tableName -> Table Name. Default value "oauthtoken"
     */
    const FileStore =
      require("@zohocrm/nodejs-sdk-2.0/models/authenticator/store/file_store").FileStore;

    let tokenstore = new FileStore(`/Users/${CLIENT_NAME}/tokenstore.log`);

    /*
     * autoRefreshFields
     * if true - all the modules' fields will be auto-refreshed in the background, every hour.
     * if false - the fields will not be auto-refreshed in the background. The user can manually delete the file(s) or refresh the fields using methods from ModuleFieldsHandler(utils/util/module_fields_handler.js)
     *
     * pickListValidation
     * A boolean field that validates user input for a pick list field and allows or disallows the addition of a new value to the list.
     * if true - the SDK validates the input. If the value does not exist in the pick list, the SDK throws an error.
     * if false - the SDK does not validate the input and makes the API request with the user’s input to the pick list
     */
    let sdkConfig = new SDKConfigBuilder()
      .pickListValidation(false)
      .autoRefreshFields(true)
      .build();

    /*
     * The path containing the absolute directory path to store user specific JSON files containing module fields information.
     */
    let resourcePath = `/Users/${CLIENT_NAME}/zoho`;

    /*
     * Call the static initialize method of Initializer class that takes the following arguments
     * user -> UserSignature instance
     * environment -> Environment instance
     * token -> Token instance
     * store -> TokenStore instance
     * SDKConfig -> SDKConfig instance
     * resourcePath -> resourcePath
     * logger -> Logger instance
     */
    try {
      (await new InitializeBuilder())
        .user(user)
        .environment(environment)
        .token(token)
        .store(tokenstore)
        .SDKConfig(sdkConfig)
        .resourcePath(resourcePath)
        .logger(logger)
        .initialize();
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Initializer;
