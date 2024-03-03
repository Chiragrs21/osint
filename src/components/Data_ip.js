import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

import { FaCloudDownloadAlt } from "react-icons/fa";


const Data_ip = () => {

    const { name } = useParams();

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

    const rows = data.json_data && Object.entries(data.json_data).map(([key, value]) => (
        <tr key={key}>
            <td>{key}</td>
            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
        </tr>
    ));

    return (
        <div>
            <Navbar />
            <div className="container bg-white mt-4">
                <br />
                <h4>OSINT Automation:</h4>
                <hr />
                <br />
                <h4>IP Geo-Location data</h4>
                <hr />
                <Link to={`/data3/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                <button type="button" class="btn btn-outline-dark  me-2 ms-3" ><FaCloudDownloadAlt /></button>
                <table>
                    <tbody>
                        {rows === '' ? <h5>No data available</h5> : rows}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Data_ip
