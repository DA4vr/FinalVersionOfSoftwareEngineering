
const firebaseConfig = {
    apiKey: "AIzaSyD9gHim51ecM6rMqMjF7N-FNDJRnGOTnnI",
    authDomain: "software-engineering-17dd3.firebaseapp.com",
    projectId: "software-engineering-17dd3",
    storageBucket: "software-engineering-17dd3.appspot.com",
    messagingSenderId: "952604620572",
    appId: "1:952604620572:web:29a19895e888e56338acd9",
    measurementId: "G-551MVD47X1"
};
  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const machinesRef = db.collection('machines');
  const bookingsRef = db.collection('bookings');
  
  document.addEventListener('DOMContentLoaded', async () => {
    const machineSelect = document.getElementById('machine');
    const snapshot = await machinesRef.get();
    snapshot.forEach(doc => {
      const option = document.createElement('option');
      option.value = doc.id;
      option.textContent = doc.data().name;
      machineSelect.appendChild(option);
    });
  });
  
  document.getElementById('machine').addEventListener('change', fetchAvailableTimes);
  document.getElementById('date').addEventListener('change', fetchAvailableTimes);
  
  async function fetchAvailableTimes() {
    const machine = document.getElementById('machine').value;
    const date = document.getElementById('date').value;
    const timeSelect = document.getElementById('time');
  
    if (machine && date) {
      timeSelect.innerHTML = ''; 
      const bookedTimesSnapshot = await bookingsRef
        .where('machine', '==', machine)
        .where('date', '==', date)
        .get();
      
      const bookedTimes = bookedTimesSnapshot.docs.map(doc => doc.data().time);
      const allTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00']; // Example time slots
  
      const availableTimes = allTimes.filter(time => !bookedTimes.includes(time));
  
      availableTimes.forEach(time => {
        const option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
      });
    }
  }
  
  document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const machine = document.getElementById('machine').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
  
    try {
      await bookingsRef.add({
        machine,
        date,
        time
      });
      alert('Booking successful');
    } catch (error) {
      console.error('Error adding booking: ', error);
      alert('Booking failed');
    }
  });
  