/* eslint-disable */
import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const Chart = ({ data }) => {
    return (
        <ResponsiveContainer width={"100%"} height={500} >
            <BarChart width={150} height={40} data={data}>
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey={"total"}
                    fill="#8884d8"
                />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;