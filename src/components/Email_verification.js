import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const Email_verification = () => {
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


    const socialMediaData = JSON.parse(data.verification || '{}');
    const rows = [];

    function flattenObject(obj, prefix = '') {
        return Object.keys(obj).reduce((acc, key) => {
            const propName = prefix ? `${prefix}.${key}` : key;
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                acc.push(...flattenObject(obj[key], propName));
            } else {
                acc.push({ key: propName, value: obj[key] });
            }
            return acc;
        }, []);
    }

    const flattenedData = flattenObject(socialMediaData);

    for (const { key, value } of flattenedData) {
        rows.push(
            <tr key={key}>
                <td>{key}</td>
                <td>{value.toString()}</td>
            </tr>
        );
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
                        <Link to={`/data2/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                    </div>
                    <div className="container">
                        <table style={{ borderCollapse: 'collapse', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <thead>
                                <tr>
                                    <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Key</th>
                                    <th style={{ padding: '8px', backgroundColor: '#f2f2f2', border: '1px solid #ddd' }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Email_verification
