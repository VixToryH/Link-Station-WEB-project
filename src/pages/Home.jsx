import React, { useState } from 'react';
import { trainsData } from '../data/trains';
import TrainList from '../components/TrainList';
import styles from './Home.module.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Логіка фільтрації: перевіряє номер, місто відправлення або прибуття
  const filteredTrains = trainsData.filter((train) => {
    const query = searchQuery.toLowerCase();
    return (
      train.number.toLowerCase().includes(query) ||
      train.from.toLowerCase().includes(query) ||
      train.to.toLowerCase().includes(query)
    );
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Укрзалізниця • Моделювання бронювання</h1>
        <p>Знайдіть потрібний рейс та забронюйте квитки в кілька кліків</p>
      </header>

      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Пошук за містом відправлення, прибуття або номером потяга..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <main>
        <h2 className={styles.sectionTitle}>Доступні рейси</h2>
        <TrainList trains={filteredTrains} />
      </main>
    </div>
  );
};

export default Home;