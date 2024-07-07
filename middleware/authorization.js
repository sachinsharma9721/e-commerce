const { Appconstants, errorResponse } = require("../utils/responseUtils");

module.exports = function (permittedRoles) {
  return function (req, res, next) {
    const user = req.user;

    if (!user) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_401)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_401,
            null,
            Appconstants.MESSAGE.AUTHORIZATION_TOKEN_NOT_VALID
          )
        );
    }
    const isPermitted = permittedRoles.some((role) =>
      user.role?.split(" ")?.includes(role)
    );

    if (!isPermitted) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_403)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_403,
            null,
            Appconstants.MESSAGE.PERMISSION_DENIED
          )
        );
    }
    return next();
  };
};
