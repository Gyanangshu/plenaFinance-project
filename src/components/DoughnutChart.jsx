import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {

    // Sample data
    const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "Votes",
                data: [12, 19, 3],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            legend: false,
            tooltip: {
                enabled: true,
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
