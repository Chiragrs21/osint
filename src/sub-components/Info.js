import React, { useContext } from 'react';
import SharedStateContext from '../statecontext/Usestatecontext';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Info = () => {
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
                if (response.data.certificates) {
                    setData((response.data.json_data.pages));
                } else {
                    console.error('No certificates found in the response');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [name]);


    const rows = Object.entries(data).map(([key, value]) => (
        <tr key={key} style={{ border: '2px solid black' }}>
            <td style={{ border: '2px solid black', padding: '10px' }}>{key}</td>
            <td style={{ border: '2px solid black', padding: '10px' }}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
        </tr>
    ));
    return (
        <div>
            <Navbar />
            <div className="container bg-white">
                <br />
                <h4>OSINT Automation:</h4>
                <hr />
                <br />
                <h4>Scan name</h4>
                <hr />
                <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                <table className="mt-4" style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Link</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Text</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? <h5>No data available</h5> : rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Info
