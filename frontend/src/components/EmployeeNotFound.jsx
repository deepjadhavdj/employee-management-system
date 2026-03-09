import { Link } from 'react-router-dom';

const EmployeeNotFound = () => {
    return (
        <div className="text-center py-20 bg-base-200 rounded-lg shadow-inner">
            <div className="text-6xl mb-4">👥</div>
            <h2 className="text-2xl font-bold mb-4">No employees yet</h2>
            <p className="mb-8">Ready to add employees? Add your first employee to the system.</p>
            <Link to="/add" className="btn btn-success text-white">Add First Employee</Link>
        </div>
    );
};

export default EmployeeNotFound;
