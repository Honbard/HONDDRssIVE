let timerId;
let currentTotal = 0;
let elapsedSeconds = 0;

document.getElementById('startBtn').addEventListener('click', function () {
  clearInterval(timerId);
  elapsedSeconds = 0;

  timerId = setInterval(function () {
    const totalElement = document.getElementById('total');
    const elapsedTimeElement = document.getElementById('elapsedTime');
    const farePerMinute = 35000; // Harga per menit

    currentTotal += farePerMinute / 60;
    totalElement.textContent = currentTotal.toFixed(2);

    elapsedSeconds++;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    elapsedTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    // Animasi perubahan warna tombol Start
    document.getElementById('startBtn').style.backgroundColor = '#3498db';
    setTimeout(function () {
      document.getElementById('startBtn').style.backgroundColor = '#4CAF50';
    }, 300);
  }, 1000); // Pembaruan setiap detik
});

document.getElementById('stopBtn').addEventListener('click', function () {
  clearInterval(timerId);

  // Animasi perubahan warna tombol Stop
  document.getElementById('stopBtn').style.backgroundColor = '#e74c3c';
  setTimeout(function () {
    document.getElementById('stopBtn').style.backgroundColor = '#c0392b';
  }, 300);
});

document.getElementById('endTripBtn').addEventListener('click', function () {
  clearInterval(timerId);
  currentTotal = 0;
  elapsedSeconds = 0;

  const totalElement = document.getElementById('total');
  const elapsedTimeElement = document.getElementById('elapsedTime');
  totalElement.textContent = currentTotal.toFixed(2);
  elapsedTimeElement.textContent = '0:00';

  // Animasi perubahan warna tombol End Trip
  document.getElementById('endTripBtn').style.backgroundColor = '#e74c3c';
  setTimeout(function () {
    document.getElementById('endTripBtn').style.backgroundColor = '#c0392b';
  }, 300);
});
// Tambahkan variabel untuk menyimpan history perjalanan
let tripCount = 1;
let tripHistory = [];

// Tambahkan fungsi untuk menambahkan history
function addTripHistory(minutes, totalFare) {
  const historyElement = document.getElementById('history');
  const tripDetails = `
    <p>Perjalanan #${tripCount}</p>
    <p>Total Waktu: ${minutes} menit</p>
    <p>Total Harga: Rp. ${totalFare.toFixed(2)}</p>
    <hr>
  `;
  historyElement.innerHTML = tripDetails + historyElement.innerHTML;
  tripCount++;
  tripHistory.unshift({ minutes, totalFare });
}

// Tambahkan event listener untuk tombol copy
document.getElementById('copyBtn').addEventListener('click', function () {
  const historyText = tripHistory.map((trip, index) => {
    return `Perjalanan #${index + 1}\nTotal Waktu: ${trip.minutes} menit\nTotal Harga: Rp. ${trip.totalFare.toFixed(2)}\n`;
  }).join('\n');
  
  // Salin teks ke clipboard
  navigator.clipboard.writeText(historyText);

  // Animasi perubahan warna tombol Copy
  this.style.backgroundColor = '#2ecc71';
  setTimeout(() => {
    this.style.backgroundColor = '#3498db';
  }, 300);
});

// Modifikasi event listener End Trip untuk menambahkan history
document.getElementById('endTripBtn').addEventListener('click', function () {
  clearInterval(timerId);
  const totalElement = document.getElementById('total');
  const elapsedTimeElement = document.getElementById('elapsedTime');
  const farePerMinute = 50000; // Harga per menit

  const totalFare = currentTotal;
  const minutes = Math.floor(elapsedSeconds / 60);

  totalElement.textContent = totalFare.toFixed(2);
  elapsedTimeElement.textContent = `${minutes}:${elapsedSeconds % 60 < 10 ? '0' : ''}${elapsedSeconds % 60}`;

  // Tambahkan history
  addTripHistory(minutes, totalFare);

  // Reset nilai
  currentTotal = 0;
  elapsedSeconds = 0;
});