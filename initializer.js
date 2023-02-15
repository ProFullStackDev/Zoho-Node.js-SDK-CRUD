const { SDK, LOCAL_BASE_DIR } = require("./config");
const { InitializeBuilder } = require(`${SDK}/routes/initialize_builder`);
const { OAuthBuilder } = require(`${SDK}/models/authenticator/oauth_builder`);
const { UserSignature } = require(`${SDK}/routes/user_signature`);
const { Levels } = require(`${SDK}/routes/logger/logger`);
const { LogBuilder } = require(`${SDK}/routes/logger/log_builder`);
const { USDataCenter } = require(`${SDK}/routes/dc/us_data_center`);
const { SDKConfigBuilder } = require(`${SDK}/routes/sdk_config_builder`);
const { FileStore } = require(`${SDK}/models/authenticator/store/file_store`);

require(`dotenv`).config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CLIENT_EMAIL = process.env.CLIENT_EMAIL;
const CLIENT_NAME = process.env.CLIENT_NAME;
const GRANT_TOKEN = process.env.GRANT_TOKEN;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URL = process.env.REDIRECT_URL;
const USER_DIR = `${LOCAL_BASE_DIR}/${CLIENT_NAME}`;

class Initializer {
  static async initialize() {
    /*
     * Create an instance of Logger Class that takes two parameters
     * level -> Level of the log messages to be logged. Can be configured by typing Levels `.` and choose any level from the list displayed.
     * filePath -> Absolute file path, where messages need to be logged.
     */
    const logger = new LogBuilder()
      .level(Levels.INFO)
      .filePath(`${USER_DIR}/node_sdk_log.log`)
      .build();

    /*
     * Create an UserSignature instance that takes user Email as parameter
     */
    const user = new UserSignature(CLIENT_EMAIL);

    /*
     * Configure the environment
     * which is of the pattern Domain.Environment
     * Available Domains: USDataCenter, EUDataCenter, INDataCenter, CNDataCenter, AUDataCenter
     * Available Environments: PRODUCTION(), DEVELOPER(), SANDBOX()
     */
    const environment = USDataCenter.PRODUCTION();

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
    const token = new OAuthBuilder()
      .clientId(CLIENT_ID)
      .clientSecret(CLIENT_SECRET)
      .refreshToken(REFRESH_TOKEN)
      // .grantToken(GRANT_TOKEN)
      .redirectURL(REDIRECT_URL)
      .build();

    /*
     * hostName -> DataBase host name. Default value `localhost`
     * databaseName -> DataBase name. Default  value `zohooauth`
     * userName -> DataBase user name. Default value `root`
     * password -> DataBase password. Default value ``
     * portNumber -> DataBase port number. Default value `3306`
     * tableName -> Table Name. Default value `oauthtoken`
     */
    const tokenstore = new FileStore(`${USER_DIR}/tokenstore.log`);

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
    const sdkConfig = new SDKConfigBuilder()
      .pickListValidation(false)
      .autoRefreshFields(true)
      .build();

    /*
     * The path containing the absolute directory path to store user specific JSON files containing module fields information.
     */
    const resourcePath = `${USER_DIR}/zoho`;

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
