import React, { useState } from 'react';
import styles from './BookingForm.module.css';

const BookingForm = ({ onSubmit, selectedSeats }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Введіть ім'я";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Введіть телефон';
    } else if (!/^\+?[\d\s\-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Невірний формат телефону';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Введіть email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Невірний формат email';
    }

    if (selectedSeats.length === 0) {
      newErrors.seats = 'Оберіть хоча б одне місце';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Дані пасажира</h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Ім'я та прізвище</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Іваненко Іван"
            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Телефон</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380991234567"
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ivan@email.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        {errors.seats && <p className={styles.error}>{errors.seats}</p>}

        <button type="submit" className={styles.submitBtn}>
          Забронювати
        </button>
      </form>
    </div>
  );
};

export default BookingForm;