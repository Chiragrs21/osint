import Navbar from './Navbar'
import { FaDatabase } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaCloudDownloadAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';
import { generateGraphData } from './Datagenerator'

const Graph = () => {
    const { name } = useParams();
    const [data, setData] = useState('');
    const [nodes, setNodes] = useState([]);
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
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [name]);

    useEffect(() => {
        if (data && data.json_data && data.json_data.links && data.json_data.links.length > 0) {
            const links = data.json_data.links.map(link => ({ id: link.text }));
            setNodes(links);
        }
    }, [data]);

    useEffect(() => {

        const { nodes: graphNodes, links } = generateGraphData(nodes);

        const svg = d3.select(svgRef.current)
            .attr("width", 600)
            .attr("height", 400)
            .style("overflow", "auto");

        const simulation = d3.forceSimulation(graphNodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(0))
            .force("charge", d3.forceManyBody().strength(-1500))
            .force("center", d3.forceCenter(window.innerWidth / 3, window.innerHeight / 2))
            .force("collision", d3.forceCollide().radius(30));

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter().append("line")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 2);

        const node = svg.append("g")
            .selectAll("g")
            .data(graphNodes)
            .enter().append("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("circle")
            .attr("r", d => d.id === `${data.query}` ? 15 : 10)
            .attr("fill", d => d.id === `${data.query}` ? "red" : "#1f77b4");

        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id);

        node.append("title")
            .text(d => d.id);

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
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
    }, [nodes.length]);

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
                        <Link to={`/data/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><FaDatabase />&nbsp; Data</button></Link>
                        <Link to={`/Graph/${name}`}><button type="button" class="btn btn-outline-dark  me-2"><BsGraphUp />&nbsp; Graph</button></Link>
                        <Link to={`/doc/${name}`}><button type="button" class="btn btn-outline-dark  me-2"></button><button type="button" class="btn btn-outline-dark  me-2" ><FaCloudDownloadAlt /></button></Link>
                    </div>
                </div>
                <hr />

                {nodes.length > 0 && (
                    <svg ref={svgRef} style={{ width: '100vw', height: '100vh' }}>
                        {/* SVG elements will be rendered here */}
                    </svg>
                )}

            </div>
        </div>
    )
}
export default Graph
