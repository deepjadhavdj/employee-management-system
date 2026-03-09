import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    salary: { type: Number, required: true },
    gender: { type: String, required: true }, // 'Male', 'Female', 'Other'
    dateOfJoining: { type: Date, required: true },
    address: { type: String, required: true },
    status: { type: String, default: 'Active' }, // 'Active', 'Inactive'
    createdAt: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
