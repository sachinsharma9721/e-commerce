const { JWT_SECRET_KEY } = require("../config");
const { Appconstants, errorResponse } = require("../utils/responseUtils");
const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, `${JWT_SECRET_KEY}`, (err, user) => {
      if (err) return reject(err);
      resolve(user);
    });
  });
};

module.exports = () => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
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

    const token = req.headers.authorization.split(" ")[1];

    try {
      const user = await verifyToken(token);
      req.user = user.user;
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(Appconstants.STATUS.STATUS_CODE_401)
          .json(
            errorResponse(
              Appconstants.STATUS.STATUS_CODE_401,
              err.message,
              Appconstants.MESSAGE.TOKEN_EXPIRED
            )
          );
      }
      return res
        .status(Appconstants.STATUS.STATUS_CODE_401)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_401,
            err.message,
            Appconstants.MESSAGE.AUTHORIZATION_TOKEN_NOT_VALID
          )
        );
    }
  };
};
