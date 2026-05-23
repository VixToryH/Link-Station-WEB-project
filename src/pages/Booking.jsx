import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trainsData } from '../data/trains';
import { saveBooking } from '../services/BookingService';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import styles from './Booking.module.css';

const Booking = () => {
  const { trainId } = useParams();
  const train = trainsData.find((t) => t.id === trainId);

  const [selectedWagon, setSelectedWagon] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!train) {
    return (
      <div className={styles.notFound}>
        <h2>Потяг не знайдено</h2>
        <Link to="/">Назад на головну</Link>
      </div>
    );
  }

  const handleSelectWagon = (wagon) => {
    setSelectedWagon(wagon);
    setSelectedSeats([]);
  };

  const handleSelectSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleSubmit = (formData) => {
    const booking = {
      trainId: train.id,
      trainNumber: train.number,
      from: train.from,
      to: train.to,
      departureDate: train.departureDate,
      departureTime: train.departureTime,
      wagonId: selectedWagon.id,
      wagonType: selectedWagon.type,
      seats: selectedSeats,
      passenger: formData,
    };

    saveBooking(booking);
    setSelectedSeats([]);

    toast.success('Квитки успішно заброньовано!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className={styles.container}>
      <ToastContainer />

      <Link to="/" className={styles.backLink}>
        ← Назад до списку потягів
      </Link>

      <header className={styles.header}>
        <h1>Бронювання квитків</h1>
        <div className={styles.trainInfo}>
          <span>Потяг № {train.number}</span>
          <span>{train.from} → {train.to}</span>
          <span>{train.departureDate} о {train.departureTime}</span>
        </div>
      </header>

      <WagonSelector
        wagons={train.wagons}
        selectedWagon={selectedWagon}
        onSelectWagon={handleSelectWagon}
      />

      <SeatMap
        trainId={train.id}
        wagon={selectedWagon}
        selectedSeats={selectedSeats}
        onSelectSeat={handleSelectSeat}
      />

      {selectedWagon && (
        <BookingForm
          selectedSeats={selectedSeats}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Booking;