import React from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from "moment";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { FaDatabase } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";

const Data2 = () => {
    const { name } = useParams();
    const date_create = moment().format("DD-MM-YYYY hh:mm:ss")
    const [data, setData] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/get_data_by_name/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [name]);
    return (
        <div>
            <Navbar />
            <div className="container bg-white ">
                <br />
                <h4>OSINT Automation :</h4>
                <hr />
                <br />
                <h4>Scan name</h4>
                <div className="results-tools d-flex justify-content-between mt-4">

                    <div className="results-button">
                        <Link to={`/data2/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><FaDatabase />&nbsp; Data</button></Link>
                        <Link to={`/Graph2/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><BsGraphUp />&nbsp; Graph</button></Link>
                        <Link to={`/doc2/${name}`}><button type="button" class="btn btn-outline-dark  me-2"></button><button type="button" class="btn btn-outline-dark  me-2" ><FaCloudDownloadAlt /></button></Link>
                    </div>

                    <div className="serach-element">
                        <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
                <hr />
                <table class="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Type</th>
                            <th scope="col">Total data elements</th>
                            <th scope="col">Last date element</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td><Link to={`/email/${name}`}>Email_info</Link></td>
                            <td>{1}</td>
                            <td>{date_create}</td>

                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td><Link to={`/social_mail/${name}`}>Social_accounts</Link></td>
                            <td>{1}</td>
                            <td>{date_create}</td>

                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td><Link to={`/email_verify/${name}`}>Email_verify</Link></td>
                            <td>{1}</td>
                            <td>{date_create}</td>

                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td><Link to={`/domain_email/${name}`}>Domains</Link></td>
                            <td>{1}</td>
                            <td>{date_create}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Data2
