const {
  Appconstants,
  successResponse,
  errorResponse,
} = require("../utils/responseUtils");
const { hashPassword } = require("../utils/passwordUtils");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const db = require("../config/dbConfig");

//Add Employees
const addEmployee = async (req, res) => {
  try {
    const { empEmail, empPassword } = req.body.request.requestData;
    const { requestData } = req.body.request;

    const emp = await db.employee.findOne({
      where: { empEmail },
    });
    if (emp) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_409)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_409,
            null,
            Appconstants.MESSAGE.EMP_ALREADY_AVAILABLE
          )
        );
    }
    const hashedPassword = hashPassword(empPassword);
    const orgId = req.user.orgId;

    const newEmp = await db.employee.create({
      ...requestData,
      empEmail,
      empPassword: hashedPassword,
      orgId,
    });

    if (newEmp) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_201)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_201,
            null,
            Appconstants.MESSAGE.EMP_ADDED_SUCCESSFULLY,
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

//Get all employees
const getEmployees = async (req, res) => {
  try {
    const orgId = req.user.orgId;
    const employees = await db.employee.findAll({
      where: {
        orgId,
      },
    });
    if (employees) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_200)
        .json(
          successResponse(
            Appconstants.STATUS.STATUS_CODE_200,
            employees,
            Appconstants.MESSAGE.EMPLOYEES_FETCHED_SUCCESSFULLY,
            true
          )
        );
    } else {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_404)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_404,
            null,
            Appconstants.MESSAGE.NO_EMPLOYEE_AVAILABLE
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

//Delete employee by id
const deleteEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const orgId = req.user.orgId;
    const employee = await db.employee.findOne({
      where: {
        orgId,
        empId,
      },
    });
    if (!employee) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_404)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_404,
            null,
            Appconstants.MESSAGE.NO_EMPLOYEE_AVAILABLE
          )
        );
    }
    await db.employee.destroy({
      where: {
        orgId,
        empId,
      },
    });
    return res
      .status(Appconstants.STATUS.STATUS_CODE_200)
      .json(
        successResponse(
          Appconstants.STATUS.STATUS_CODE_200,
          null,
          Appconstants.MESSAGE.EMP_DELETED_SUCCESSFULLY,
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

//Update user data by id
const updateEmployee = async (req, res) => {
  try {
    const { empId } = req.params;
    const orgId = req.user.orgId;
    const { empPassword } = req.body.request.requestData;
    const { requestData } = req.body.request;

    const employee = await db.employee.findOne({
      where: {
        orgId,
        empId,
      },
    });

    if (!employee) {
      return res
        .status(Appconstants.STATUS.STATUS_CODE_404)
        .json(
          errorResponse(
            Appconstants.STATUS.STATUS_CODE_404,
            null,
            Appconstants.MESSAGE.NO_EMPLOYEE_AVAILABLE
          )
        );
    }

    const hashedPassword = hashPassword(empPassword);
    await db.employee.update(
      { ...requestData, empPassword: hashedPassword },
      { where: { orgId, empId } }
    );

    const updatedEmployeeData = await db.employee.findAll({
      where: { orgId, empId },
    });

    return res
      .status(Appconstants.STATUS.STATUS_CODE_200)
      .json(
        successResponse(
          Appconstants.STATUS.STATUS_CODE_200,
          updatedEmployeeData,
          Appconstants.MESSAGE.EMP_UPDATED_SUCCESSFULLY,
          true
        )
      );
  } catch (error) {
    return res
      .status(Appconstants.STATUS.STATUS_CODE_500)
      .json(
        Appconstants.STATUS.STATUS_CODE_500,
        error.message,
        Appconstants.MESSAGE.SOMETHING_WENT_WRONG
      );
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  deleteEmployee,
  updateEmployee,
};
