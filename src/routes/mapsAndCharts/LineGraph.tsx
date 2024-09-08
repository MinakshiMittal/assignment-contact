import axios from "axios";
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";
import { useQuery } from "react-query";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define the type for the API response
interface CovidHistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

// Fetch COVID-19 historical data
const fetchCovidHistoricalData = async (): Promise<CovidHistoricalData> => {
  const response = await axios.get<CovidHistoricalData>(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};

const CovidLineGraph: React.FC = () => {
  // Use react-query to fetch data
  const {
    data: historicalData,
    isLoading,
    error,
  } = useQuery<CovidHistoricalData>(
    "covidHistoricalData",
    fetchCovidHistoricalData
  );

  // Prepare the data for the line chart
  const prepareChartData = (): ChartData<"line", number[], string> => {
    if (!historicalData?.cases) {
      return {
        labels: [], // Fallback to empty array if data is not available
        datasets: [],
      };
    }

    const dates = Object.keys(historicalData.cases);
    const cases = Object.values(historicalData.cases);
    const deaths = Object.values(historicalData.deaths);
    const recovered = Object.values(historicalData.recovered);

    return {
      labels: dates,
      datasets: [
        {
          label: "Cases",
          data: cases,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
        {
          label: "Deaths",
          data: deaths,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          fill: true,
        },
        {
          label: "Recovered",
          data: recovered,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          fill: true,
        },
      ],
    };
  };

  // Chart options
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to expand to the container size
    plugins: {
      legend: {
        position: "top" as const, // Ensure position is correctly typed
        labels: {
          color: "#000", // Change legend text color if needed
        },
      },
      title: {
        display: true,
        text: "COVID-19 Cases Fluctuations Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
        grid: {
          display: false, // Hide grid lines if needed
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Cases",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Customize grid line color
        },
      },
    },
    layout: {
      padding: 0, // Adjust padding if needed
    },
    elements: {
      point: {
        radius: 0, // Adjust the radius if needed
      },
    },
  };

  if (isLoading)
    return <p className="text-center mt-4 text-gray-500">Loading data...</p>;
  if (error)
    return <p className="text-center mt-4 text-red-500">Error fetching data</p>;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-full md:w-10/12 lg:w-11/12 bg-white shadow-lg rounded-lg p-6">
        <div className="h-96 w-full">
          <Line data={prepareChartData()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default CovidLineGraph;
