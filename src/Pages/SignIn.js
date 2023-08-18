import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Api from '../Utils/Api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const SignIn = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
    });

    const handleSubmit = async (values) => {
        console.log('Form values:', values);
        try {
            const res = await Api.login(values);
            if (res.success === 1) {

                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('token', res.token);


                navigate("/home");
            }
        } catch (error) {
            console.error('API error:', error);
        }
    };

    useEffect(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {() => (
                        <Form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500" />
                            </div>
                            <div className="mt-4">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
                                >
                                    Sign In
                                </button>

                                <div className="w-full text-center pt-5">

                                    <Link to="/" className="text-blue-500 hover:underline">Registration</Link>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default SignIn;
