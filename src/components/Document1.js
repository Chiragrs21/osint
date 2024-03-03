import Navbar from './Navbar'
import { FaDatabase } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Document1 = () => {
    const { name } = useParams();
    const [data, setData] = useState('');
    const [nodes, setNodes] = useState([]);
    const [certificates, setCertificates] = useState(' ');
    const svgRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:5000/get_data_by_name/${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data);
                setCertificates(JSON.parse(response.data.certificates))
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [name]);



    const handlePDFDownload = () => {
        const element = document.getElementById('container');
        const options = {
            scale: 1.0,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.scrollHeight,
        };

        html2canvas(element, options).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgData = canvas.toDataURL('image/png');
            const imgWidth = 210;
            const imgHeight = canvas.height * imgWidth / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save('json_data.pdf');
        });
    };

    const handleCSVDownload = () => {
        // Prepare data in CSV format (example data)
        const csvData = 'Name,Email\nJohn Doe,john@example.com\nJane Smith,jane@example.com';

        // Create a Blob object from the CSV data
        const blob = new Blob([csvData], { type: 'text/csv' });

        // Create a URL for the Blob object
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element
        const link = document.createElement('a');

        // Set the href and download attributes
        link.href = url;
        link.download = 'data.csv';

        // Trigger a click event on the anchor element to initiate the download
        link.click();

        // Cleanup: Revoke the URL object to release the resources
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="container" id="container">
            <h1 className="heading">JSON DATA</h1>
            {data && (
                <div>
                    <div className="section">
                        <h2 className="sub-heading">Links</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Text</th>
                                    <th>Link</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.json_data.links.map((link, index) => (
                                    <tr key={index}>
                                        <td>{link.text}</td>
                                        <td><a href={link.href} className="link">{link.href}</a></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {data.json_data.pages && (
                        <div className="section">
                            <h2 className="sub-heading">Pages</h2>
                            <table className="table">
                                <tbody>
                                    {Object.entries(data.json_data.pages).map(([key, value], index) => (
                                        <tr key={index}>
                                            <td>{key}</td>
                                            <td>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
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
                    </table><table className="mt-4" style={{ borderCollapse: 'collapse', border: '2px solid black', boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.5)' }}>
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
                    <div className="section">
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
                </div>
            )}
            <button className="download-button" onClick={handlePDFDownload}>Download as pdf</button>
        </div>
    );
}

export default Document1
