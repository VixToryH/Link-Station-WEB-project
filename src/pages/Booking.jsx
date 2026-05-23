const BOOKINGS_KEY = 'link_station_bookings';

export const getBookings = () => {
  const data = localStorage.getItem(BOOKINGS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
};

export const getBookedSeats = (trainId, wagonId) => {
  const bookings = getBookings();
  const bookedSeats = [];
  bookings.forEach((booking) => {
    if (booking.trainId === trainId && booking.wagonId === wagonId) {
      bookedSeats.push(...booking.seats);
    }
  });
  return bookedSeats;
};