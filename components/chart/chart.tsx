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
import styles from './chart.module.css';


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
  useAuth();

  const Chart = () => {
    const uMood: number[] = [];
    const aMood: number[] = [];
    const date: number[] = [];

    api
      .get('/moods')
      .then((response) => {
        console.log('res', response);
        for (const dataObj of response.data) {
          aMood.push(dataObj.av_mood);
          date.push(dataObj.postdate);
          console.log('wtf', dataObj);
        }
        //   let newDate= date.map((oneDay, i)=>{
        //   oneDay
        // })
        setChartData({
          labels: date,
          datasets: [
            {
              label: 'mood graph',
              data: aMood,
              backgroundColor: 'transparent',
              borderColor: 'rgb(255,255,255)',
              borderWidth: 4,
              fill: false,
              tension: 0.3,
            },
          ],
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(uMood, aMood);
  };

  useEffect(() => {
    Chart();
  }, []);

  return (
    <div className={styles.chart}>
      <Line data={chartData} />

    </div>
  );
};

export default ChartMoods;
