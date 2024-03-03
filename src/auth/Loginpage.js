import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Loginpage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const navigate = useNavigate();
    const handleSignup = async () => {
        toast.error('hi')
        try {
            const response = await axios.post('http://localhost:5000/signup', { username, password });
            localStorage.setItem('token', response.data.token); // Save token in localStorage
            navigate('/login');
        } catch (error) {
            toast.error('Signup failed:', { position: toast.POSITION.TOP_CENTER });
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="position-absolute top-50 start-50 translate-middle">
                <h4>Create your account</h4>
                <form>
                    <div className="form-outline mb-4">
                        <input type="text" id="form2Example1" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
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
                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSignup}>Create account</button>
                        <div className="text-center">
                            <p>Already a member? <Link to="/login">Login</Link></p>
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

export default Loginpage;
