import React, { useContext } from 'react';
import SharedStateContext from '../statecontext/Usestatecontext';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Sub_Domain = () => {
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
    }, [name, token]);


    return (
        <div>
            <Navbar />
            <div className="container bg-white">
                <br />
                <h4>OSINT Automation:</h4>
                <hr />
                <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                <table className="mt-4" style={{ borderCollapse: 'collapse', border: '2px solid black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Link</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data == '' ? <h5>No data</h5> : data.json_data.links.map((link, index) => (
                            <tr key={index} style={{ border: '2px solid black' }}>
                                <td style={{ border: '2px solid black', padding: '10px' }}>
                                    <a href={link.href} target="_blank" rel="noreferrer">
                                        {link.href}
                                    </a>
                                </td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{link.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </div>
    );
};

export default Sub_Domain;
