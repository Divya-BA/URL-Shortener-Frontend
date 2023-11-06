import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Main from '../Main';
import  styles from './styles.module.css'

const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
  const chartRef = useRef(null);

  useEffect(() => {
    const userId=localStorage.getItem("userId");

    const BASE_URL=`https://url-shortener-application-task.onrender.com`
    axios
      .get(`${BASE_URL}/api/data/${userId}`)
      .then((response) => {
        setStatsData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Create or update the chart when statsData changes
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = document.getElementById('urlChart').getContext('2d');
    chartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Created Today', 'Created This Month'],
        datasets: [
          {
            data: [statsData.urlsCreatedToday, statsData.urlsCreatedThisMonth],
            backgroundColor: ['#ffa550', '#ff4500'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'URLs Created Statistics',
            fontSize: 16,
          },
        },
      },
    });
  }, [statsData]);

  
  return (
    <div>
      <Main/>
      <div  className={styles.chart}>
     
        <canvas className={styles.canvas} id="urlChart" width="400" height="400"></canvas>
      </div>
      <h4>Total URL Created Today:   <p>{statsData.urlsCreatedToday}</p></h4>
      <h4>Total URL Created This Month:    <p>{statsData.urlsCreatedThisMonth}</p></h4>
    </div>
  );
};

export default Dashboard;


