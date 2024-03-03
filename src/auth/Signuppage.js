import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            localStorage.setItem('token', response.data.token);
            toast.success('Login successfully')
            navigate('/');
        } catch (error) {
            toast.error('Signup failed:');
        }
    };

    return (
        <div>

            <div className="position-absolute top-50 start-50 translate-middle">
                <h5 className='mb-4'>Login to your account:</h5>
                <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example1">Enter username</label>
                    </div>
                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>
                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleLogin}>Sign in</button>
                        <div className="text-center ">
                            <p>Not a member? <Link to="/signup">Register</Link></p>
                            <p>or sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaFacebook />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaGoogle />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaTwitter />
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <FaGithub />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
