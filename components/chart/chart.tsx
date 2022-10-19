/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { api } from '../../lib/api';
import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { useAuth } from '../../lib/auth';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

interface LineProps {
  options: ChartOptions<'line'>;
  data: ChartData<'line'>;
}

const ChartMoods = () => {
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });
  const [userMood, setUserMood] = useState([]);
  const [averageMood, setAverageMood] = useState([]);
  useAuth();

  const chart = () => {
    const uMood: number[] = [];
    const aMood: number[] = [];
    api
      .get('/moods')
      .then((response) => {
        console.log(response.data);
        for (const dataObj of response.data.data) {
          uMood.push(dataObj.user_mood);
          aMood.push(dataObj.average_mood);
        }
        setChartData({
          labels: aMood,
          datasets: [
            {
              label: 'mood range',
              data: uMood,
              backgroundColor: ['rgba(75, 192, 192, 0.6)'],
              borderWidth: 4,
              fill: true,
              tension: 0.5,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(uMood, aMood);
  };

  useEffect(() => {
    api
      .get('/moods')
      .then((result) => {
        console.log(result.data);
        setUserMood(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Chart</h1>
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ChartMoods;
