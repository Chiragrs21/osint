import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Scan = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:5000/get_data', {
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
    }, [token]);

    const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    const url_test = /(?:https?:\/\/)?(?:www\.)?\[(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\]/;
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const ipv6pattern2 = /^([0-9a-fA-F]{0,4}:){2,7}([0-9a-fA-F]{0,4})(%[0-9a-zA-Z]{1,})?$/;
    const phoneNumberRegex = /\b\d{10}\b/g;
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Navbar />
            <div className="container mt-4 bg-light">
                <h4>OSINT Automation :</h4>
                <hr />

                <div className="scan-tools d-flex justify-content-between">
                    <div className="search">
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchTerm}
                                onChange={handleChange}
                            />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="tools">
                        <Link to="/newscan">
                            <button type="button" className="btn btn-primary me-2">
                                New Scan <IoMdAdd className="fs-5" />
                            </button>
                        </Link>
                    </div>
                </div>

                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Scan Name</th>
                            <th scope="col">Scan Target</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {(ipv6Pattern.test(item.query) || ipv6pattern2.test((item.query || " ").trim())) ? (
                                        <Link to={`/data3/${item.name}`}>{item.name}</Link>
                                    ) : url_test.test(item.query) ? (
                                        <Link to={`/data/${item.name}`}>{item.name}</Link>
                                    ) : emailPattern.test(item.query) ? (
                                        <Link to={`/data2/${item.name}`}>{item.name}</Link>) : phoneNumberRegex.test(item.query) ? (
                                            <Link to={`/phone/${item.name}`}>{item.name}</Link>
                                        ) : <Link to={`/data/${item.name}`}>{item.name}</Link>}
                                </td>
                                <td>{item.query}</td>
                                <td><span className="badge text-bg-success">{item.status}</span></td>
                                <td>{item.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Scan;
