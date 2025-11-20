"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function RewardsGraph() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Mock Data
        const nodes = [
            { id: "You", group: 1 },
            { id: "Chase", group: 2 },
            { id: "Amex", group: 2 },
            { id: "British Airways", group: 3 },
            { id: "Virgin Atlantic", group: 3 },
            { id: "Delta", group: 3 },
            { id: "Flight", group: 4 },
        ];

        const links = [
            { source: "You", target: "Chase", value: 1 },
            { source: "You", target: "Amex", value: 1 },
            { source: "Chase", target: "British Airways", value: 1 },
            { source: "Chase", target: "Virgin Atlantic", value: 1 },
            { source: "Amex", target: "Delta", value: 1 },
            { source: "Amex", target: "British Airways", value: 1 },
            { source: "British Airways", target: "Flight", value: 1 },
            { source: "Virgin Atlantic", target: "Flight", value: 1 },
            { source: "Delta", target: "Flight", value: 1 },
        ];

        const width = 600;
        const height = 400;

        // Clear previous
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
            .select(svgRef.current)
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, width, height]);

        const simulation = d3
            .forceSimulation(nodes as any)
            .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const link = svg
            .append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", (d) => Math.sqrt(d.value));

        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(nodes)
            .join("circle")
            .attr("r", 10)
            .attr("fill", (d) => {
                if (d.group === 1) return "#2563eb"; // You
                if (d.group === 4) return "#16a34a"; // Flight
                return "#9333ea"; // Partners
            });

        // Add labels
        const labels = svg
            .append("g")
            .selectAll("text")
            .data(nodes)
            .join("text")
            .text((d) => d.id)
            .attr("font-size", 12)
            .attr("dx", 15)
            .attr("dy", 4);

        simulation.on("tick", () => {
            link
                .attr("x1", (d: any) => d.source.x)
                .attr("y1", (d: any) => d.source.y)
                .attr("x2", (d: any) => d.target.x)
                .attr("y2", (d: any) => d.target.y);

            node
                .attr("cx", (d: any) => d.x)
                .attr("cy", (d: any) => d.y);

            labels
                .attr("x", (d: any) => d.x)
                .attr("y", (d: any) => d.y);
        });

    }, []);

    return <svg ref={svgRef} className="w-full h-full" />;
}
