import React from 'react';
import TrainCard from './TrainCard';
import styles from './TrainList.module.css';

const TrainList = ({ trains }) => {
  if (trains.length === 0) {
    return <p className={styles.noTrains}>Потягів за вашим запитом не знайдено.</p>;
  }

  return (
    <div className={styles.listGrid}>
      {trains.map((train) => (
        <TrainCard key={train.id} train={train} />
      ))}
    </div>
  );
};

export default TrainList;