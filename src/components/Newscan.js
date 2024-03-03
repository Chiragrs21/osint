import React from 'react'
import { TbTargetArrow } from "react-icons/tb";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharedStateContext from '../statecontext/Usestatecontext';
import { useContext } from 'react';
import { FaRegStopCircle } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import Navbar from './Navbar';


const Newscan = () => {

    const [url, setUrl] = useState('');
    const [ip, setIp] = useState('');
    const [name, Setname] = useState('');
    const [email, setemail] = useState('')

    const navigate = useNavigate();

    const { setSharedState, sharedState } = useContext(SharedStateContext);

    const [qname, qsetname] = useState('');
    const [loading, setLoading] = useState(false);

    const ipv6Pattern = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

    const ipv6pattern2 = /^([0-9a-fA-F]{0,4}:){2,7}([0-9a-fA-F]{0,4})(%[0-9a-zA-Z]{1,})?$/;

    const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;

    const phoneNumberRegex = /\b\d{10}\b/g;


    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {

            if (ipv6Pattern.test(url) || ipv6pattern2.test(url.trim()) || ipv4Pattern.test(url)) {
                const response = await fetch('http://127.0.0.1:5000/ip6_location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ url, name })
                });
                const data = await response.json();
                setSharedState(data);
                navigate(`/data3/${name}`);

            }
            else if (emailPattern.test(url)) {
                const response = await fetch('http://127.0.0.1:5000/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ url, name })
                });
                const data = await response.json();
                setSharedState(data);
                console.log(data);
                navigate(`/data2/${name}`);
            }
            else if (phoneNumberRegex.test(url)) {
                const response = await fetch('http://127.0.0.1:5000/phn_location', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ url, name })
                });
                const data = await response.json();
                setSharedState(data);
                console.log(data);
                navigate(`/phone/${name}`);
            }
            else {
                const response = await fetch('http://127.0.0.1:5000/url_scanner', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ url, name })
                });
                const data = await response.json();
                setSharedState(data);
                navigate(`/data/${name}`);
            }

        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };
    return (
        <div>
            <Navbar />
            <div className="container bg-light mt-4">
                <br />
                <h4>OSINT Automation tool:</h4>
                <hr />
                <div className="title d-flex justify-content-between">
                    <div className="tools_v1">

                        <h5><TbTargetArrow className='fs-4 me-2' />Project name & Target</h5>
                    </div>
                </div>
                <div className="scan mt-4">
                    <form onSubmit={handleSubmit} action='/results'>
                        <div class="mb-3">
                            <label for="formGroupExampleInput2" class="form-label">Project Name</label>
                            <input type="text" class="form-control" id='formGroupExampleInput2' value={name} onChange={(e) => Setname(e.target.value)} />
                            <div id="emailHelp" class="form-text">We'll never share your results with anyone else.</div>
                        </div>
                        <div class="mb-3">
                            <label for="formGroupExampleInput1" class="form-label"
                            >Scan Target</label>
                            <input type="text" class="form-control" id='formGroupExampleInput1' value={url} onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div class="form-check mb-4">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                            <label class="form-check-label" for="flexRadioDefault2">
                                All - <b>Get anything and everything about the target </b> (Every possible information about the target is enabled)
                            </label>
                        </div>
                        <button type="submit" class="btn btn-primary">{loading ? 'Loading...' : 'Submit'}</button>
                    </form>
                </div>
                <div class="alert alert-primary mt-4" role="alert">
                    <div>
                        <b>Email adress:</b><p>An email address typically consists of two parts separated by an "@" symbol: username and domain name <b>(e.g., user@example.com).</b></p>
                    </div>
                    <div >
                        <b>Domain adress:</b>
                        <p> A domain name typically consists of two parts separated by a do <br />
                            -The First-level domain,<b>(e,g, https://example.com)</b><br />-The second-level domain,<b> e.g:"www.example.com"</b>.</p>
                    </div>
                    <div>

                        <b>Phone number:</b> <p> The Phone number Lookup(<b>for eg., "7XXXXXXXX8"</b>)  </p>                  </div>
                    <div>
                        <b>IPV6 / IPV4 :</b>
                        <p> - IPv4: Consists of four sets of numbers separated by dots, each set ranging from 0 to 255 <b>(e.g., 192.168.1.1)</b> <br />
                            - IPv6: Consists of eight sets of four hexadecimal digits separated by colons, allowing for a much larger address space <b> <br />(e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)</b>.</p>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default Newscan
