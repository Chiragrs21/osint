import React, { useContext } from 'react';
import SharedStateContext from '../statecontext/Usestatecontext';
import Results from './Results'
import moment from "moment";
import { FaEye } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';



const Data = () => {

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

    let count = 2; // Initialize count to 0

    if (data && data.json_data.links) { // Check if data and data.links are not undefined
        count = data.json_data.links.length;
    }
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
                        <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><FaDatabase />&nbsp; Data</button></Link>
                        <Link to={`/Graph/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><BsGraphUp />&nbsp; Graph</button></Link>
                        <Link to={`/doc/${name}`}><button type="button" class="btn btn-outline-dark  me-2"></button><button type="button" class="btn btn-outline-dark  me-2" ><FaCloudDownloadAlt /></button></Link>
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
                            <td><Link to={`/links/${name}`}>Sub-domains</Link></td>
                            <td>{count == NaN ? 0 : count}</td>
                            <td>{date_create}</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td><Link to={`/Info/${name}`}>Domain_Info</Link></td>
                            <td>1</td>
                            <td>{date_create}</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td><Link to={`/certificate/${name}`}>Domain_sh_certificates</Link></td>
                            <td>1</td>
                            <td>{date_create}</td>
                        </tr>
                        <tr>
                            <th scope="row">4</th>
                            <td><Link to={`/check_domain/${name}`}>DNS status</Link></td>
                            <td>1</td>
                            <td>{date_create}</td>
                        </tr>
                        <tr>
                            <th scope="row">5</th>
                            <td><Link to={`/domain_search/${name}`}>Domain_serach</Link></td>
                            <td>1</td>
                            <td>{date_create}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Data
