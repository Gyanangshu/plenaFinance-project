import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ portfolioData, colors }) => {

    const labels = portfolioData?.map((coin) => coin.name);
    const values = portfolioData?.map((coin) => coin.value);

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
