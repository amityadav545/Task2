import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Api from '../Utils/Api';





const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [status, setStatue] = useState(false)
    const navigate = useNavigate()
    const handleDelete = async (id) => {

        console.log(`Delete user with ID: ${id}`);
        try {
            const res = await Api.deleteUser(id);
            if (res.success == 1) {

                setStatue(!status)
            }

        } catch (error) {
            console.error('API error:', error);
            navigate('/signin');
        }
    };

    const getAllUsers = async () => {
        try {
            const res = await Api.getUsers();
            if (res.success == 1) {

                setUsers(res.data)
            }

        } catch (error) {
            console.error('API error:', error);
            navigate('/signin');
        }
    }

    useEffect(() => {
        getAllUsers()
    }, [status])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">User Table</h2>
            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">DOB</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 && users.map((user) => (
                        <tr key={user.id} className="bg-white">
                            <td className="p-2 border text-center">{user.name}</td>
                            <td className="p-2 border text-center">{user.email}</td>
                            <td className="p-2 border text-center">{user.phone}</td>
                            <td className="p-2 border text-center">{user.dob}</td>
                            <td className="p-2 border text-center">{user.address}</td>
                            <td className="p-2 border text-center">
                                <button
                                    className="text-blue-600 hover:underline mr-2"
                                    onClick={() => {

                                        navigate('/', {
                                            state: { editUser: user },
                                        });

                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-600 hover:underline"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
