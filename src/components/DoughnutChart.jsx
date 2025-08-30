import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const generateColors = (numColors) => {
    return Array.from({ length: numColors }, () => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r}, ${g}, ${b}, 0.6)`;
    });
};

const DoughnutChart = ({ portfolioData }) => {

    const labels = portfolioData?.map((coin) => coin.name);
    const values = portfolioData?.map((coin) => coin.value);

    const colors = generateColors(values?.length);

    const data = {
        labels,
        datasets: [
            {
                label: "Portfolio",
                data: values,
                backgroundColor: colors,
                borderColor: colors?.map((c) => c.replace("0.6", "1")),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => {
                        const total = values.reduce((acc, val) => acc + val, 0);
                        const currentValue = values[tooltipItem.dataIndex];
                        const percentage = ((currentValue / total) * 100).toFixed(2);
                        return `${labels[tooltipItem.dataIndex]}: ${percentage}%`;
                    },
                },
            },
        },
    };

    return (
        <div className="w-[200px] ">
            <Doughnut data={data} options={options} />
        </div>
    )
}

export default DoughnutChart
