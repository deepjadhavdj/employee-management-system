import { useState } from 'react';
import axios from '../lib/axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AddEmployee = () => {
    const navigate = useNavigate();

    const generateId = () => 'EMP-' + Math.floor(10000 + Math.random() * 90000);

    const [formData, setFormData] = useState({
        name: '',
        employeeId: generateId(),
        email: '',
        phone: '',
        department: '',
        designation: '',
        salary: '',
        gender: '',
        dateOfJoining: '',
        address: '',
        status: 'Active'
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/employees', formData);
            toast.success('Employee added successfully');
            navigate('/');
        } catch (error) {
            console.error('Error adding employee:', error);
            const errorMsg = error.response?.data?.message || 'Failed to add employee';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-base-100 p-8 shadow-xl rounded-box">
            <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">Name</label>
                    <input type="text" name="name" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Employee ID (Auto-Generated)</label>
                    <input type="text" name="employeeId" value={formData.employeeId} className="input input-bordered bg-base-200 font-mono text-base-content/70" readOnly />
                </div>
                <div className="form-control">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Phone</label>
                    <input type="text" name="phone" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Department</label>
                    <select name="department" className="select select-bordered" onChange={handleChange} required>
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">Designation</label>
                    <input type="text" name="designation" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Salary</label>
                    <input type="number" name="salary" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Gender</label>
                    <select name="gender" className="select select-bordered" onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">Date of Joining</label>
                    <input type="date" name="dateOfJoining" className="input input-bordered" onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Status</label>
                    <select name="status" className="select select-bordered" onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Resigned">Resigned</option>
                    </select>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Address</label>
                    <textarea name="address" className="textarea textarea-bordered h-24" onChange={handleChange} required></textarea>
                </div>

                <div className="form-control mt-6 md:col-span-2">
                    <button type="submit" className="btn btn-primary">Add Employee</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
