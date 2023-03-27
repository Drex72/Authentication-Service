const express = require("express");
const verifyJWT = require("../../middleware/verifyJWT");
const router = express.Router();

const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
} = require("../../controllers/employeesController");

router.use(verifyJWT);
router
  .route("/")
  .get(getAllEmployees)
  .post(createEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);
module.exports = router;
