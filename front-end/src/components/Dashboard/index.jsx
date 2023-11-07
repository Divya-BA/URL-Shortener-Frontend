import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Main from '../Main';
import styles from './styles.module.css';
import Spinner from '../Spinner';

const Dashboard = () => {
  const [statsData, setStatsData] = useState({});
  const chartRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const BASE_URL=`https://shorturl-ba.onrender.com`

    axios
      .get(`${BASE_URL}/api/data/${userId}`)
      .then((response) => {
        setStatsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const initChart = () => {
      const canvas = document.getElementById('urlChart');
      if (canvas) {
        const ctx = canvas.getContext('2d');
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
      }
    };

    if (!loading) {
      initChart();
    }
  }, [statsData, loading]);

  return (
    <div>
      <Main />
      <div className={styles.chart}>
        {loading ? (
          <Spinner />
        ) : (
          <canvas className={styles.canvas} id="urlChart" width="400" height="400"></canvas>
        )}
      </div>
      <h4>Total URL Created Today: <p>{statsData.urlsCreatedToday}</p></h4>
      <h4>Total URL Created This Month: <p>{statsData.urlsCreatedThisMonth}</p></h4>
    </div>
  );
};

export default Dashboard;
