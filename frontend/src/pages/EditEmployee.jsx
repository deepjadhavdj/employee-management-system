import { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        employeeId: '',
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

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`/employees/${id}`);
                // Format date for input field
                const data = response.data;
                if (data.dateOfJoining) {
                    data.dateOfJoining = data.dateOfJoining.split('T')[0];
                }
                setFormData(data);
            } catch (error) {
                console.error('Error fetching employee:', error);
                toast.error('Failed to fetch employee details');
            }
        };
        fetchEmployee();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/employees/${id}`, formData);
            toast.success('Employee updated successfully');
            navigate('/');
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Failed to update employee');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await axios.delete(`/employees/${id}`);
            toast.success('Employee deleted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-base-100 p-8 shadow-xl rounded-box">
            <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                    <label className="label">Name</label>
                    <input type="text" name="name" className="input input-bordered" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Employee ID</label>
                    <input type="text" name="employeeId" className="input input-bordered" value={formData.employeeId} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Email</label>
                    <input type="email" name="email" className="input input-bordered" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Phone</label>
                    <input type="text" name="phone" className="input input-bordered" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Department</label>
                    <select name="department" className="select select-bordered" value={formData.department} onChange={handleChange} required>
                        <option value="">Select Department</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">Designation</label>
                    <input type="text" name="designation" className="input input-bordered" value={formData.designation} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Salary</label>
                    <input type="number" name="salary" className="input input-bordered" value={formData.salary} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Gender</label>
                    <select name="gender" className="select select-bordered" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-control">
                    <label className="label">Date of Joining</label>
                    <input type="date" name="dateOfJoining" className="input input-bordered" value={formData.dateOfJoining} onChange={handleChange} required />
                </div>
                <div className="form-control">
                    <label className="label">Status</label>
                    <select name="status" className="select select-bordered" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Resigned">Resigned</option>
                    </select>
                </div>
                <div className="form-control md:col-span-2">
                    <label className="label">Address</label>
                    <textarea name="address" className="textarea textarea-bordered h-24" value={formData.address} onChange={handleChange} required></textarea>
                </div>

                <div className="form-control mt-6 md:col-span-2 flex flex-row gap-4">
                    <button type="submit" className="btn bg-yellow-400 hover:bg-yellow-500 text-black border-none flex-1">Update Employee</button>
                    <button type="button" onClick={handleDelete} className="btn bg-red-500 hover:bg-red-600 text-white border-none flex-1">Delete Employee</button>
                </div>
            </form>
        </div>
    );
};

export default EditEmployee;
