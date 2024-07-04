const successResponse = (code, data, message, status) => {
  return {
    statusCode: code,
    responseObject: data,
    message: message,
    status: status,
  };
};

const errorResponse = (code, err, message) => {
  return {
    statusCode: code,
    errorRes: err,
    message: message,
    status: false,
  };
};

const Appconstants = {
  MESSAGE: {
    SUCCESS: "Success",
    NO_DATA_AVAILABLE: "NO Data Available",
    LOGIN_SUCCESS: "Login Successful",
    NO_CUSTOMER_AVAILABLE: "No Customer Available",
    INVALID_CREDENTIALS: "Invalid Credentials",
    CUSTOMER_ALREADY_AVAILABLE:
      "Customer Already Available With Email or Mobile",
    UNABLE_TO_PROCESS: "Unable to process your request",
    USER_ADDED_SUCCESSFULLY: "User Added Successfully",
    SOMETHING_WENT_WRONG: "Something went wrong",
    ROLE_ID_LIST_NOT_AVAILABLE: "Role Id List Not Available",
    USER_ACCOUNT_NOT_FOUND: "User account is not found",
    TOKEN_HAS_EXPIRED: "Token has expired",
    ACTIVATE_YOUR_ACCOUNT:
      "Please activate your account by verifying your email address",
  },
  STATUS: {
    STATUS_CODE_200: 200,
    STATUS_CODE_409: 409,
    STATUS_CODE_401: 401,
    STATUS_CODE_500: 500,
    STATUS_CODE_400: 400,
  },
};

module.exports = {
  successResponse,
  errorResponse,
  Appconstants,
};
