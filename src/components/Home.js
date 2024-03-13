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
                    <p>Open Source Intelligence (OSINT) is a method of gathering information from public or other open sources, which can be used by security experts, national intelligence agencies, or cybercriminals. When used by cyber defenders, the goal is to discover publicly available information related to their organization that could be used by attackers, and take steps to prevent those future attacks.
                    </p>
                    <p>OSINT leverages advanced technology to discover and analyze massive amounts of data, obtained by scanning public networks, from publicly available sources like social media networks, and from the deep web—content that is not crawled by search engines, but is still publicly accessible.
                    </p>
                    <p>OSINT tools may be open source or proprietary: the distinction should be made between open source code and open source content. Even if the tool itself is not open source, as an OSINT tool, it provides access to openly available content, known as open source intelligence.</p>
                    <hr />
                    <p class="mb-0">Follow the guidence as Mentioned below</p>
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
