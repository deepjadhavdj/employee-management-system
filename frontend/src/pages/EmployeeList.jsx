import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../lib/axios';
import EmployeeCard from '../components/EmployeeCard';
import EmployeeNotFound from '../components/EmployeeNotFound';
import { FiSearch } from 'react-icons/fi';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMessage, setLoadingMessage] = useState('Loading...');

    // Filter states
    const [statusFilter, setStatusFilter] = useState('All');
    const [salaryFilter, setSalaryFilter] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/employees');
            setEmployees(response.data);
            setLoading(false);
            setLoadingMessage(null); // Clear message on success
        } catch (error) {
            console.error('Error fetching employees:', error);
            toast.error('Failed to fetch employees');
            setLoading(false);
            setLoadingMessage(null); // Clear message on error
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this employee?')) return;
        try {
            await axios.delete(`/employees/${id}`);
            toast.success('Employee deleted successfully');
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
            toast.error('Failed to delete employee');
        }
    };

    useEffect(() => {
        let timeout;
        if (loading) {
            timeout = setTimeout(() => {
                setLoadingMessage("Waking up the server... This can take up to 50 seconds on Render's free tier. Please wait!");
            }, 5000);
        }
        return () => clearTimeout(timeout);
    }, [loading]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center mt-20">
            <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
            <div className="text-lg font-medium text-center px-4">
                {loadingMessage}
            </div>
        </div>
    );

    // Filter Logic
    const filteredEmployees = employees
        .filter((emp) => {
            // Status Match (Feature 3)
            const matchesStatus = statusFilter === 'All' || emp.status === statusFilter;

            // Salary Match (Compulsory Feature)
            let matchesSalary = true;
            if (salaryFilter) {
                matchesSalary = emp.salary && emp.salary.toString().includes(salaryFilter);
            }

            // Department Match (Additional Feature)
            const matchesDepartment = departmentFilter === 'All' || emp.department === departmentFilter;

            // Search Match
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch = !searchQuery ||
                (emp.name && emp.name.toLowerCase().includes(searchLower)) ||
                (emp.designation && emp.designation.toLowerCase().includes(searchLower)) ||
                (emp.department && emp.department.toLowerCase().includes(searchLower)) ||
                (emp.employeeId && emp.employeeId.toLowerCase().includes(searchLower)) ||
                (emp._id && emp._id.toLowerCase().includes(searchLower));

            return matchesStatus && matchesSalary && matchesDepartment && matchesSearch;
        });

    return (
        <div className="w-full">
            {/* Header Bar matching the screenshot style */}
            <div className="bg-warning text-warning-content px-6 py-4 flex justify-between items-center rounded-t-none md:rounded-lg mb-8 shadow-md">
                <h2 className="text-xl font-bold tracking-widest uppercase">EMPLOYEE DIRECTORY</h2>
                <Link to="/add" className="btn btn-sm btn-success text-white rounded-full px-6">
                    + Add New
                </Link>
            </div>

            {/* Controls Bar for Filtering & Search */}
            <div className="bg-base-100 p-3 rounded-lg shadow-sm mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-base-300">
                {/* Search Bar */}
                <div className="w-full">
                    <label className="label text-xs py-1">Search</label>
                    <label className="input input-bordered input-sm flex items-center gap-2 w-full">
                        <FiSearch className="text-red-500" />
                        <input
                            type="text"
                            className="grow"
                            placeholder="Name, ID, role, dept..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </label>
                </div>

                {/* Status Tracking Dropdown */}
                <div className="w-full">
                    <label className="label text-xs py-1">Status</label>
                    <select
                        className="select select-bordered select-sm w-full"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Resigned">Resigned</option>
                    </select>
                </div>

                {/* Manual Salary Filter Input */}
                <div className="w-full">
                    <label className="label text-xs py-1">Salary</label>
                    <input
                        type="number"
                        className="input input-bordered input-sm w-full"
                        placeholder="Enter salary..."
                        value={salaryFilter}
                        onChange={(e) => setSalaryFilter(e.target.value)}
                    />
                </div>

                {/* Department Dropdown */}
                <div className="w-full">
                    <label className="label text-xs py-1">Department</label>
                    <select
                        className="select select-bordered select-sm w-full"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    >
                        <option value="All">All Departments</option>
                        <option value="IT">IT</option>
                        <option value="HR">HR</option>
                        <option value="Finance">Finance</option>
                        <option value="Marketing">Marketing</option>
                    </select>
                </div>
            </div>

            {filteredEmployees.length === 0 ? (
                <EmployeeNotFound />
            ) : (
                <div className="flex flex-col mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
                        {filteredEmployees.map((employee) => (
                            <EmployeeCard key={employee._id} employee={employee} handleDelete={handleDelete} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
