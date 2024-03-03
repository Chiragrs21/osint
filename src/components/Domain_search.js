import React from 'react'
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from "moment";
import { useEffect, useState } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

const Domain_search = () => {
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


    const renderValue = (value) => {
        if (typeof value === 'object' && value !== null) {
            if (Array.isArray(value)) {
                return value.map((item, index) => (
                    <div key={index}>
                        {renderValue(item)}
                    </div>
                ));
            } else {
                return Object.keys(value).map((key, index) => (
                    <div key={index} style={{ marginLeft: '20px' }}>
                        <strong>{key}: </strong>{renderValue(value[key])}
                    </div>
                ));
            }
        } else {
            return value;
        }
    };

    const rows = data.domain_search ? Object.entries(data.domain_search).map(([key, value]) => (
        <tr key={key}>
            <td style={{ border: '1px solid black', padding: '5px' }}>
                <strong>{key}</strong>
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
                {renderValue(value)}
            </td>
        </tr>
    )) : null;

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
                        <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark"><IoMdArrowRoundBack /></button></Link>
                    </div>
                    <div className="container">
                        <table style={{ borderCollapse: 'collapse', border: '1px solid black', marginTop: '20px' }}>
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

export default Domain_search
