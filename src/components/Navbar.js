import React from 'react'
import { AiOutlineSecurityScan } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiFillContacts } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    const handleonclick = () => {
        localStorage.removeItem('token')
        navigate(`/Login`);

    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary p-3">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">OSINT</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item ms-4 d-flex">
                                <AiFillHome className='fs-5 mt-2' />
                                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item ms-4 d-flex">
                                <AiOutlineSecurityScan className='fs-4 mt-2' />
                                <Link class="nav-link" to="/scan"> Dashboard</Link>
                            </li>
                            <li class="nav-item ms-4 d-flex">
                                <AiOutlineInfoCircle className='fs-4 ms-2 mt-2' />
                                <Link class="nav-link" to="/about">About us</Link>
                            </li>
                            <li class="nav-item ms-4 d-flex">
                                <AiFillContacts className='fs-4 ms-2 mt-2' />
                                <Link class="nav-link" to="/contact">Contact us</Link>
                            </li>
                        </ul>
                        <button type="button" class="btn btn-primary" onClick={handleonclick}>Log out &nbsp;<IoMdLogOut className='fs-4' /></button>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
