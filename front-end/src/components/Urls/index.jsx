import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Main from '../Main';
import  styles from './styles.module.css'
import Swal from 'sweetalert2'; 
import Spinner from '../Spinner';




function Urls() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true); 
  // const BASE_URL =`http://localhost:3000`
  const BASE_URL=`https://shorturl-ba.onrender.com`


  useEffect(() => {
    const userId=localStorage.getItem("userId");
    axios.get(`${BASE_URL}/api/urls/${userId}`)
      .then((response) => {
        setUrls(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from the backend:', error);
      });
  }, []);

  
  const handleDelete = (shortUrl) => {
    // Show a SweetAlert confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this URL!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${BASE_URL}/${shortUrl}`)
          .then((response) => {
            setUrls((prevUrls) => prevUrls.filter((url) => url.shortUrl !== shortUrl));
          })
          .catch((error) => {
            console.error('Error deleting URL:', error);
          });
      }
    });
  };

  return (
    <div>
      <Main/>
      {loading ?(<Spinner/>):(
        <>
          <h1>List of all Created URLs </h1>
        <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Long URL</th>
            <th className={styles.th}>Short URL</th>
            <th className={styles.th}>Created At</th>
            <th className={styles.th}>Clicks</th>
            <th className={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url) => (
            <tr key={url._id}>
              <td><a className={styles.link} href={url.originalUrl} target='_blank'>{url.originalUrl}</a></td>
              <td><a className={styles.link} href={`${BASE_URL}/${url.shortUrl}`} target='_blank'>{url.shortUrl}</a></td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>{url.clicks}</td>
              <td>
                <button className={styles.delete} onClick={() => handleDelete(url.shortUrl)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}
    
     
    </div>
  );
}

export default Urls;
