const path = require("path");
const fsPromises = require("fs").promises;

const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (tempData) {
    this.employees = tempData;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};
const createEmployee = async (req, res) => {
  const newEmployee = {
    id: parseInt(data.employees[data.employees.length - 1]?.id) + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    res.status(400).json({ message: "first name and last name not filled" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  console.log(newEmployee, data);
  res.status(201).json(data.employees);
};
const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.body.id} not found` });
  }
  if (req.body.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body.lastname) {
    employee.lastname = req.body.lastname;
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArray = [...filteredArray, employee];
  data.setEmployees(
    unsortedArray.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  res.json(data.employees);
};
const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.body.id} not found` });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};
const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(400)
      .json({ message: `Employee id ${req.params.id} not found` });
  }
  res.json(employee);
};
module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
