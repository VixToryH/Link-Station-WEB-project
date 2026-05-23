import React, { useEffect, useState } from 'react';
import { getBookedSeats } from '../services/BookingService';
import styles from './SeatMap.module.css';

const SeatMap = ({ trainId, wagon, selectedSeats, onSelectSeat }) => {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (wagon) {
      const booked = getBookedSeats(trainId, wagon.id);
      setBookedSeats(booked);
    }
  }, [trainId, wagon]);

  if (!wagon) {
    return <p className={styles.hint}>Оберіть вагон щоб побачити місця</p>;
  }

  const totalSeats = wagon.rows * wagon.seatsPerRow;

  const getSeatStatus = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return 'booked';
    if (selectedSeats.includes(seatNumber)) return 'selected';
    return 'free';
  };

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;
    onSelectSeat(seatNumber);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Вагон {wagon.id} — {wagon.type}
      </h3>

      <div className={styles.legend}>
        <span className={`${styles.legendItem} ${styles.free}`}>Вільне</span>
        <span className={`${styles.legendItem} ${styles.selected}`}>Обране</span>
        <span className={`${styles.legendItem} ${styles.booked}`}>Заброньоване</span>
      </div>

      <div className={styles.seatsGrid}>
        {Array.from({ length: totalSeats }, (_, i) => i + 1).map((seatNumber) => {
          const status = getSeatStatus(seatNumber);
          return (
            <button
              key={seatNumber}
              className={`${styles.seat} ${styles[status]}`}
              onClick={() => handleSeatClick(seatNumber)}
              disabled={status === 'booked'}
            >
              {seatNumber}
            </button>
          );
        })}
      </div>

      <p className={styles.selectedInfo}>
        Обрано місць: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'жодного'}
      </p>
    </div>
  );
};

export default SeatMap;