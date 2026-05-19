import React from 'react';
import { Link } from 'react-router-dom';
import styles from './TrainCard.module.css';

const TrainCard = ({ train }) => {
  const { id, number, from, to, departureDate, departureTime, duration } = train;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.trainNumber}>Потяг № {number}</span>
        <span className={styles.duration}>{duration}</span>
      </div>
      
      <div className={styles.route}>
        <div className={styles.station}>
          <p className={styles.city}>{from}</p>
          <p className={styles.time}>{departureTime}</p>
          <p className={styles.date}>{departureDate}</p>
        </div>
        
        <div className={styles.arrow}>→</div>
        
        <div className={styles.station}>
          <p className={styles.city}>{to}</p>
          <p className={styles.time}>—</p>
          <p className={styles.date}>—</p>
        </div>
      </div>
      
      <Link to={`/booking/${id}`} className={styles.bookButton}>
        Вибрати місця
      </Link>
    </div>
  );
};

export default TrainCard;