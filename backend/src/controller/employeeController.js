import Employee from "../models/EmployeeModel.js";

// GET all employees
export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// POST create employee
export const createEmployee = async (req, res) => {
    console.log('Received POST request:', req.body);
    const employee = new Employee(req.body);
    try {
        const newEmployee = await employee.save();
        res.status(201).json(newEmployee);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.employeeId) {
            return res.status(400).json({ message: "Employee ID already exists" });
        }
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(400).json({ message: err.message });
    }
}

// GET single employee
export const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// PUT update employee
export const updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.employeeId) {
            return res.status(400).json({ message: "Employee ID already exists" });
        }
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(400).json({ message: err.message });
    }
}

// DELETE employee
export const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
