import React from 'react';
import styles from './WagonSelector.module.css';

const WagonSelector = ({ wagons, selectedWagon, onSelectWagon }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Оберіть вагон</h3>
      <div className={styles.wagonList}>
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            className={`${styles.wagonBtn} ${selectedWagon?.id === wagon.id ? styles.active : ''}`}
            onClick={() => onSelectWagon(wagon)}
          >
            <span className={styles.wagonNumber}>Вагон {wagon.id}</span>
            <span className={styles.wagonType}>{wagon.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;