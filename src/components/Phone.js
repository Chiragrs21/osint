import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const Phone = () => {
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
    return (
        <div>
            <Navbar />
            <div className="container">
                <br />
                <h4>OSINT Automation:</h4>
                <hr />
                <br />
                <h4>Scan name</h4>
                <hr />
                <Link to={`/scan`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                <div class="alert alert-primary mt-4" role="alert">
                    <div>

                        <b>Note:</b> The Phone number Lookup(<b>for eg., "7XXXXXXXX8"</b>)                    </div>
                </div>
                <table style={{ border: '1px solid black', boxShadow: '5px 5px 5px grey', width: '100%' }}>
                    <tbody>
                        {data.json_data && Object.keys(data.json_data).map((key, index) => (
                            <tr key={index} style={{ border: '1px solid black', boxShadow: '5px 5px 5px grey' }}>
                                <td style={{ border: '1px solid black', boxShadow: '5px 5px 5px grey', padding: '8px' }}>{key}</td>
                                <td style={{ border: '1px solid black', boxShadow: '5px 5px 5px grey', padding: '8px' }}>{JSON.stringify(data.json_data[key])}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Phone
