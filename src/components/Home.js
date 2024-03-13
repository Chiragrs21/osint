import React from 'react';
import Navbar from './Navbar';


const Home = () => {
    return (
        <>
            {/* Navbar */}
            <Navbar />
            <div className="container">
                <br />
                <h5>OSINT Tools Automation</h5>

                <br />

                <div class="alert alert-success" role="alert">
                    <h4 class="alert-heading">Welcome from team Hackquarium</h4>
                    <br />
                </div>
                <div class="alert alert-primary" role="alert">
                    <div>
                        <b>Email adress:</b><p>An email address typically consists of two parts separated by an "@" symbol: username and domain name <b>(e.g., user@example.com).</b></p>
                    </div>
                    <div >
                        <b>Domain adress:</b>
                        <p> A domain name typically consists of two parts separated by a do <br />
                            -The First-level domain,<b>(e,g, https://example.com)</b><br />-The second-level domain,<b> e.g:"www.example.com"</b>.</p>
                    </div>
                    <div>
                        <b>IP Address(IPv4 or IPv6):</b>
                        <p> - IPv4: Consists of four sets of numbers separated by dots, each set ranging from 0 to 255 <b>(e.g., 192.168.1.1)</b> <br />
                            - IPv6: Consists of eight sets of four hexadecimal digits separated by colons, allowing for a much larger address space <b> <br />(e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)</b>.</p>

                    </div>
                    <div>

                        <b>Phone number:</b> <p> The Phone number Lookup(<b>for eg., "7XXXXXXXX8"</b>)  </p>                  </div>

                </div>


            </div>
        </>
    )
}

export default Home
