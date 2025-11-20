"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function PricePredictionChart() {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // Mock Data
        const data = Array.from({ length: 30 }, (_, i) => ({
            date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
            price: 600 + Math.random() * 200 + (i * 5), // Upward trend
            predictedLow: 580 + Math.random() * 100 + (i * 5),
            predictedHigh: 750 + Math.random() * 100 + (i * 5),
        }));

        // Dimensions
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 400 - margin.left - margin.right;
        const height = 250 - margin.top - margin.bottom;

        // Clear previous
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3
            .select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Scales
        const x = d3
            .scaleTime()
            .domain(d3.extent(data, (d) => d.date) as [Date, Date])
            .range([0, width]);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.predictedHigh) as number])
            .range([height, 0]);

        // Axes
        svg
            .append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(5));

        svg.append("g").call(d3.axisLeft(y).ticks(5));

        // Area (Prediction Range)
        const area = d3
            .area<any>()
            .x((d) => x(d.date))
            .y0((d) => y(d.predictedLow))
            .y1((d) => y(d.predictedHigh))
            .curve(d3.curveMonotoneX);

        svg
            .append("path")
            .datum(data)
            .attr("fill", "#bfdbfe") // blue-200
            .attr("opacity", 0.5)
            .attr("d", area);

        // Line (Price Trend)
        const line = d3
            .line<any>()
            .x((d) => x(d.date))
            .y((d) => y(d.price))
            .curve(d3.curveMonotoneX);

        svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#2563eb") // blue-600
            .attr("stroke-width", 2)
            .attr("d", line);

    }, []);

    return <svg ref={svgRef} className="w-full h-full" />;
}
