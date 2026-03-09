import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-yellow-400 text-black shadow-lg mb-8 rounded-box font-bold">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">EmployeeMS</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/" className="hover:bg-black hover:text-white rounded-btn">Home</Link></li>
                    <li><Link to="/add" className="hover:bg-black hover:text-white rounded-btn">Add Employee</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
