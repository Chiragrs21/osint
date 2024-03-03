import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Check_domain = () => {
    const { name } = useParams();
    const [data, setData] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
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
            <div className="container">
                <br />
                <h4>OSINT Automation:</h4>
                <hr />
                <br />
                <h4>Scan name</h4>
                <hr />
                <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                <div class="alert alert-primary mt-4" role="alert">
                    <div>

                        <b>Note:</b> The check_domain result includes an attribute called results, where a value of false indicates that the domain is <b>not blocked</b>, and a value of true indicates that it <b>is blocked</b> (<b>for eg., "simsrc.edu.in":false</b> indicates that the domain is not blocked)                    </div>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.check && Object.keys(data.check).map((key, index) => (
                            <tr key={index}>
                                <td>{key}</td>
                                <td>{JSON.stringify(data.check[key])}</td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            </div>
        </div >
    );
}

export default Check_domain
