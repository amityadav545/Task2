import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';
import Api from '../Utils/Api';
import { useNavigate } from 'react-router-dom';
const Registration = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const user = location?.state?.editUser || {};
    const initialValues = user.id
        ? {
            name: user.name,
            email: user.email,
            password: '',
            phone: user.phone,
            dob: user.dob,
            address: user.address,
        }
        : {
            name: '',
            email: '',
            password: '',
            phone: '',
            dob: '',
            address: '',
        };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: user.id ? Yup.string() : Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        phone: Yup.string().required('Required'),
        dob: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
    });

    // const handleSubmit = async (values) => {

    //     try {
    //         const res = await Api.registration(values);
    //         if (res.success == 1) {
    //             navigate("/signin");
    //         }
    //     } catch (error) {
    //         console.error('API error:', error);
    //     }
    // };


    const handleSubmit = async (values) => {
        try {
            if (user.id) {
                const reqValue = {
                    id: user.id,
                    ...values
                }

                const res = await Api.updateUser(reqValue);
                if (res.success === 1) {

                    console.log('User updated successfully:', res);
                    navigate("/home");

                }
            } else {

                const res = await Api.registration(values);
                if (res.success === 1) {

                    console.log('User registered successfully:', res);
                    navigate("/signin");
                }
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };



    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl text-center font-semibold mb-4">{user.id ? "Update" : "Registeration"}</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block font-semibold mb-1">Name</label>
                                <Field type="text" id="name" name="name" className="w-full p-2 border rounded" />
                                <ErrorMessage name="name" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block font-semibold mb-1">Email</label>
                                <Field type="email" id="email" name="email" className="w-full p-2 border rounded" />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block font-semibold mb-1">Password</label>
                                <Field type="password" id="password" name="password" className="w-full p-2 border rounded" disabled={user.id} />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block font-semibold mb-1">Phone</label>
                                <Field type="text" id="phone" name="phone" className="w-full p-2 border rounded" />
                                <ErrorMessage name="phone" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dob" className="block font-semibold mb-1">Date of Birth</label>
                                <Field type="date" id="dob" name="dob" className="w-full p-2 border rounded" />
                                <ErrorMessage name="dob" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block font-semibold mb-1">Address</label>
                                <Field as="textarea" id="address" name="address" rows="4" className="w-full p-2 border rounded" />
                                <ErrorMessage name="address" component="div" className="text-red-500" />
                            </div>

                            <div className="flex justify-between items-center">
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">{user.id ? "Update" : "Register"}</button>
                                {!user.id && <Link to="/signin" className="text-blue-500 hover:underline">Already have an account? Login</Link>}
                            </div>


                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Registration;
