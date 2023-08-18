import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Api from '../Utils/Api';

const NavBar = () => {
    const navigate = useNavigate();
    // const user = JSON.parse(localStorage.getItem('user'));

    const handleLogOut = async () => {
        try {
            const res = await Api.logout();
            if (res.success === 1) {

                localStorage.removeItem('user');
                localStorage.removeItem('token');
                navigate('/signin');
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    return (
        <nav className="bg-blue-500 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link to="/" className="text-white font-semibold text-lg">My Website</Link>
            </div>
            <div className="flex space-x-4">

                <button
                    onClick={handleLogOut}
                    className="text-white hover:underline focus:outline-none"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
