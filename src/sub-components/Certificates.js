import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const Certificates = () => {
    const { name } = useParams();
    const [certificates, setCertificates] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:5000/get_data_by_name/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                if (response.data.certificates) {
                    setCertificates(JSON.parse(response.data.certificates));
                } else {
                    console.error('No certificates found in the response');
                }
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

                <table className="mt-4" style={{ borderCollapse: 'collapse', border: '2px solid black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Issuer CA ID</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Issuer Name</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Common Name</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Name Value</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>ID</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Entry Timestamp</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Not Before</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Not After</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Serial Number</th>
                            <th style={{ border: '2px solid black', padding: '10px' }}>Result Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificates === "Not found" ? <tr><td colSpan="10">Not found</td></tr> : certificates.map((certificate, index) => (
                            <tr key={index}>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.issuer_ca_id}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.issuer_name}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.common_name}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.name_value}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.id}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.entry_timestamp}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.not_before}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.not_after}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.serial_number}</td>
                                <td style={{ border: '2px solid black', padding: '10px' }}>{certificate.result_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Certificates;
