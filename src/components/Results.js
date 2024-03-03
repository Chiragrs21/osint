import React from 'react'
import { FaEye } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";
import axios from 'axios';
import Navbar from './Navbar';

const Results = () => {
    const token = localStorage.getItem('token');
    const handleClick = async () => {
        try {
            const response = await axios.get('http://localhost:5000/export_data', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Response:', response.data);
            // Handle the response as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle the error
        }
    };
    return (
        <div>
            <div className="container bg-white mt-4">
                <br />
                <h4>OSINT Automation :</h4>
                <hr />
                <br />
                <h4>Scan name</h4>
                <div className="results-tools d-flex justify-content-between mt-4">

                    <div className="results-button">
                        <Link to='/summary'><button type="button" class="btn btn-outline-dark me-2"><FaEye className='fs-4' />&nbsp; Summary</button> </Link>
                        <Link to='/data'><button type="button" class="btn btn-outline-dark  me-2"><FaDatabase />&nbsp; Data</button></Link>
                        <Link to='/Graph'><button type="button" class="btn btn-outline-dark  me-2"><BsGraphUp />&nbsp; Graph</button></Link>
                        <button type="button" class="btn btn-outline-dark  me-2" onClick={handleClick}><FaCloudDownloadAlt /></button>
                    </div>

                    <div className="serach-element">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Results
