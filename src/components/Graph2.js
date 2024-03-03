import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import Navbar from './Navbar'
import { FaDatabase } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";

const Graph2 = () => {
    const { name } = useParams();
    const [data, setData] = useState(null);
    const [nodes, setNodes] = useState([]);

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

    useEffect(() => {
        if (data) {
            const data1 = JSON.parse(data.social_media || '{}')
            const registeredPlatforms = getRegisteredPlatforms(data1.data);
            const { nodes, links } = generateGraphData([{ id: data.query }, ...registeredPlatforms.map(platform => ({ id: platform }))]);
            setNodes(nodes);

            const svg = d3.select(svgRef.current);
            svg.attr("width", 600)
                .attr("height", 400)
                .style("overflow", "auto");

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody().strength(-2000))
                .force("center", d3.forceCenter(500, 350))
                .force("collision", d3.forceCollide().radius(30));

            const link = svg.selectAll("line")
                .data(links)
                .enter().append("line")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .attr("stroke-width", 2);

            const node = svg.selectAll("g")
                .data(nodes)
                .enter().append("g")
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append("circle")
                .attr("r", 10)
                .attr("fill", d => d.id === `${data.query}` ? "red" : "#1f77b4");

            node.append("text")
                .attr("dx", 12)
                .attr("dy", ".35em")
                .text(d => d.id);

            simulation.on("tick", () => {
                link.attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);
                node.attr("transform", d => `translate(${d.x},${d.y})`);
            });

            function dragstarted(event, d) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(event, d) {
                d.fx = event.x;
                d.fy = event.y;
            }

            function dragended(event, d) {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return () => {
                simulation.stop();
            };
        }
    }, [data]);

    const svgRef = useRef(null);

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
                        <Link to={`/data2/${name}`}><button type="button" className="btn btn-outline-dark me-2"><FaDatabase />&nbsp; Data</button></Link>
                        <Link to={`/Graph2/${name}`}><button type="button" className="btn btn-outline-dark me-2"><BsGraphUp />&nbsp; Graph</button></Link>
                        <Link to={`/doc2/${name}`}><button type="button" className="btn btn-outline-dark me-2"><FaCloudDownloadAlt /></button></Link>
                    </div>
                </div>
                <hr />
                <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
                    <svg ref={svgRef} style={{ position: 'absolute', width: '100%', height: '100%' }}>
                        {/* SVG elements will be rendered here */}
                    </svg>
                </div>
            </div>
        </div>
    );
}

// Sample implementation of getRegisteredPlatforms and generateGraphData
function getRegisteredPlatforms(data) {
    const registeredPlatforms = [];
    for (const platform in data.account_details) {
        if (data.account_details.hasOwnProperty(platform)) {
            if (data.account_details[platform].registered === true) {
                registeredPlatforms.push(platform);
            }
        }
    }
    return registeredPlatforms;
}

function generateGraphData(nodes) {
    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
            if (i !== j) {
                links.push({ "source": nodes[i].id, "target": nodes[j].id });
            }
        }
    }
    return { nodes, links };
}

export default Graph2;
