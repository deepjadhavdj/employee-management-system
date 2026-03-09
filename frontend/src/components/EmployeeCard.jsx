import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiUser, FiBriefcase } from 'react-icons/fi';
import { formatData } from '../lib/utils';

const EmployeeCard = ({ employee, handleDelete }) => {
    return (
        <div className="card bg-base-200 shadow-xl border border-success/50 hover:border-success transition-all duration-300">
            <div className="card-body p-6">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-base-content/70 font-mono">
                        {employee.employeeId || employee._id}
                    </span>
                    <div className={`badge badge-sm border-none text-white ${employee.status === 'Active' ? 'bg-success' : employee.status === 'Inactive' ? 'bg-error' : 'bg-warning'}`}>
                        {employee.status}
                    </div>
                </div>

                <h3 className="card-title text-xl font-bold uppercase tracking-wide mb-1 text-base-content">
                    {employee.name}
                </h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-base-content/80">
                        <span className="w-6 h-6 rounded-md bg-success/20 flex items-center justify-center text-success">
                            <FiUser size={14} />
                        </span>
                        <span className="font-semibold tracking-tight">{employee.designation}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-base-content/60">
                        <span className="w-6 h-6 flex items-center justify-center text-base-content/40">
                            <FiBriefcase size={12} />
                        </span>
                        <span className="uppercase tracking-widest font-medium italic">{employee.department}</span>
                    </div>
                </div>

                <div className="flex justify-between items-end mt-4">
                    <span className="text-xs text-base-content/60 font-medium">
                        {employee.dateOfJoining
                            ? formatData(new Date(employee.dateOfJoining))
                            : formatData(new Date(employee.createdAt))
                        }
                    </span>
                    <div className="flex gap-4">
                        <Link to={`/edit/${employee._id}`} className="text-warning hover:text-warning focus:outline-none transition-transform hover:scale-110">
                            <FiEdit size={18} />
                        </Link>
                        <button onClick={() => handleDelete(employee._id)} className="text-error hover:text-error focus:outline-none transition-transform hover:scale-110">
                            <FiTrash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeCard;
