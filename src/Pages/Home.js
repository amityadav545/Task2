import React, { useEffect } from 'react'
import NavBar from '../Components/NavBar'
import UserTable from '../Components/UserTable'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {

        }
        else {
            navigate("/");
        }
    }, [token])
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>

                <div>
                    <UserTable />
                </div>
            </div>
        </div>
    )
}

export default Home