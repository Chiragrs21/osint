import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const Social_email = () => {

    const { name } = useParams();
    const date_create = moment().format("DD-MM-YYYY hh:mm:ss")
    const [data, setData] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/get_data_by_name/${name}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [name]);


    const socialMediaData = JSON.parse(data.social_media || '{}');

    const rows = Object.keys(socialMediaData).map((key) => (
        <tr key={key}>
            <td>{key}</td>
            <td>{typeof socialMediaData[key] === 'object' ? <pre>{JSON.stringify(socialMediaData[key], null, 2)}</pre> : socialMediaData[key]}</td>
        </tr>
    ));





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
                        <Link to={`/data2/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                    </div>
                    <div className="container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Link</th>
                                    <th>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows === '' ? <h5>No data available</h5> : rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Social_email
