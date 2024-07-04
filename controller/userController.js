const {
  Appconstants,
  successResponse,
  errorResponse,
} = require("../utils/responseUtils");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const { JWT_SECRET_KEY, CLIENT_URL } = require("../config");
const { welcomeMail } = require("../utils/mailUtils");
const { GMAIL_USER } = require("../config");
const db = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const EventEmmiter = require("events");
const eventEmmiter = new EventEmmiter();

const newToken = (user, expireTime) => {
  return jwt.sign({ user }, JWT_SECRET_KEY, {
    expiresIn: expireTime,
  });
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body.request.requestData;

    const user = await db.user.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_401)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_401,
            null,
            Appconstants.MESSAGE.NO_CUSTOMER_AVAILABLE,
            false
          )
        );
    }

    const isUserActive = await db.user.findOne({
      where: {
        email: email,
        is_Active: 0,
      },
    });
    if (isUserActive) {
      const token = newToken(user, "10m");
      eventEmmiter.on("userRegister", welcomeMail);
      eventEmmiter.emit("userRegister", {
        from: GMAIL_USER,
        to: user.email,
        user,
        html: `
            Hii, ${user.firstName} ${user.lastName} \n

           <p>You have just registered with us 🎉😎🙌.So wihout doing any late we want  you to verify your email first.Please use the below given link for the verification process</p> \n
           <h5 style={fontWeight:'bold'}>Please note that the verification link is valid for only 10 minutes</h5>
           <a href='${CLIENT_URL}/api/v1/user/auth/register/emailVerification/${token}' >Click to verify</a>\n
           Thanks and regards <br/>
           Sachin Sharma
           `,
      });
      return res
        .status(Appconstants.STATUS.STATUS_CODE_200)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_200,
            null,
            Appconstants.MESSAGE.ACTIVATE_YOUR_ACCOUNT,
            false
          )
        );
    }

    const checkPassword = comparePassword(password, user.password);
    if (!checkPassword) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_400)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_400,
            null,
            Appconstants.MESSAGE.INVALID_CREDENTIALS
          )
        );
    }
    const token = newToken(user, "1d");
    return res.status(Appconstants.STATUS.STATUS_CODE_200).json(
      successResponse(
        Appconstants.STATUS.STATUS_CODE_200,
        {
          token: token,
          userData: user,
        },
        Appconstants.MESSAGE.LOGIN_SUCCESS,
        true
      )
    );
  } catch (error) {
    return res
      .status(Appconstants.STATUS.STATUS_CODE_500)
      .json(
        errorResponse(
          Appconstants.STATUS.STATUS_CODE_500,
          error.message,
          Appconstants.MESSAGE.SOMETHING_WENT_WRONG
        )
      );
  }
};

const userRegistration = async (req, res) => {
  try {
    const { email, password, orgName } = req.body.request.requestData;
    const { requestData } = req.body.request;
    let user = await db.user.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_200)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_409,
            null,
            Appconstants.MESSAGE.CUSTOMER_ALREADY_AVAILABLE,
            false
          )
        );
    }
    const organization = await db.organization.create({
      orgName: orgName,
    });
    if (organization) {
      let hashedPassword = hashPassword(requestData.password);
      user = await db.user.create({
        ...requestData,
        orgId: organization.orgId,
        password: hashedPassword,
      });
      const token = newToken(user, "10m");
      eventEmmiter.on("userRegister", welcomeMail);
      eventEmmiter.emit("userRegister", {
        from: GMAIL_USER,
        to: user.email,
        user,
        html: `
            Hii, ${user.firstName} ${user.lastName} \n

           <p>You have just registered with us 🎉😎🙌.So wihout doing any late we want  you to verify your email first.Please use the below given link for the verification process</p> \n
           <h5 style={fontWeight:'bold'}>Please note that the verification link is valid for only 10 minutes</h5>
           <a href='${CLIENT_URL}/api/v1/user/auth/register/emailVerification/${token}' >Click to verify</a>\n
           Thanks and regards <br/>
           Sachin Sharma
           `,
      });
      return res
        .status(Appconstants.STATUS.STATUS_CODE_200)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_200,
            null,
            Appconstants.MESSAGE.USER_ADDED_SUCCESSFULLY,
            true
          )
        );
    }
  } catch (error) {
    return res
      .status(Appconstants.STATUS.STATUS_CODE_500)
      .json(
        errorResponse(
          Appconstants.STATUS.STATUS_CODE_500,
          error.message,
          Appconstants.MESSAGE.SOMETHING_WENT_WRONG
        )
      );
  }
};

const emailVerification = async (req, res) => {
  try {
    const token = req.params.token;
    if (token) {
      jwt.verify(token, JWT_SECRET_KEY, async (err, user) => {
        if (err) {
          return res
            .status(Appconstants.STATUS.STATUS_CODE_400)
            .json(
              errorResponse(
                Appconstants.STATUS.STATUS_CODE_400,
                null,
                Appconstants.MESSAGE.TOKEN_HAS_EXPIRED
              )
            );
        }
        const { user_id } = user.user;
        const isUserActivate = await db.user.update(
          {
            is_Active: 1,
          },
          {
            where: {
              user_id: user_id,
            },
          }
        );
        if (isUserActivate[0] === 1) {
          res.redirect(`${CLIENT_URL}/login`);
          return;
        }
      });
    } else {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_400)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_400,
            null,
            Appconstants.MESSAGE.USER_ACCOUNT_NOT_FOUND
          )
        );
    }
  } catch (error) {
    return res
      .status(Appconstants.STATUS.STATUS_CODE_500)
      .json(
        errorResponse(
          Appconstants.STATUS.STATUS_CODE_500,
          error.message,
          Appconstants.MESSAGE.SOMETHING_WENT_WRONG
        )
      );
  }
};

module.exports = {
  userLogin,
  userRegistration,
  emailVerification,
};
