import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Document2 = () => {
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

    const rows1 = data.json_data && Object.entries(data.json_data).map(([key, value]) => (
        <tr key={key}>
            <td>{key}</td>
            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
        </tr>
    ));

    const socialMediaData = JSON.parse(data.verify || '{}');

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
                    <div key={index}>
                        <strong>{key}: </strong>{renderValue(value[key])}
                    </div>
                ));
            }
        } else {
            if (typeof value === 'boolean') {
                return value ? 'true' : 'false';
            } else {
                return value;
            }
        }
    };

    const rows = Object.entries(socialMediaData).map(([key, value]) => (
        <tr key={key}>
            <td style={{ border: '1px solid black', padding: '5px' }}>
                <strong>{key}</strong>
            </td>
            <td style={{ border: '1px solid black', padding: '5px' }}>
                {renderValue(value)}
            </td>
        </tr>
    ));
    return (
        <div className="container" id="container">
            <h1 className="heading">JSON DATA</h1>
            {data && (
                <div>
                    <h3>IP-GeoLoaction : </h3>
                    <table>
                        <tbody>
                            {rows1 === '' ? <h5>No data available</h5> : rows1}
                        </tbody>
                    </table>
                    <h3 className='mt-4'>IP-open ports </h3>
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
            )}
            <button className="download-button" onClick={handlePDFDownload}>Download as pdf</button>
        </div>
    )
}

export default Document2
