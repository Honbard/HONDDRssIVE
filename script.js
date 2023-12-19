let timerId;
let currentTotal = 0;
let elapsedSeconds = 0;

let tripCount = 1;
let tripHistory = [];

function addTripHistory(minutes, seconds, totalFare) {
  const historyElement = document.getElementById('history');
  const tripDetails = `
    <p>Perjalanan #${tripCount}</p>
    <p>Total Waktu: ${minutes} menit ${seconds} detik</p>
    <p>Total Harga: Rp. ${totalFare.toFixed(2)}</p>
    <hr>
  `;
  historyElement.innerHTML = tripDetails + historyElement.innerHTML;
  tripCount++;
  tripHistory.unshift({ minutes, seconds, totalFare });
}

document.getElementById('copyBtn').addEventListener('click', function () {
  const historyText = tripHistory.map((trip, index) => {
    return `Perjalanan #${index + 1}\nTotal Waktu: ${trip.minutes} menit ${trip.seconds} detik\nTotal Harga: Rp. ${trip.totalFare.toFixed(2)}\n`;
  }).join('\n');

  navigator.clipboard.writeText(historyText);

  this.style.backgroundColor = '#2ecc71';
  setTimeout(() => {
    this.style.backgroundColor = '#3498db';
  }, 300);
});

document.getElementById('endTripBtn').addEventListener('click', function () {
  clearInterval(timerId);
  const totalElement = document.getElementById('total');
  const elapsedTimeElement = document.getElementById('elapsedTime');
  const farePerMinute = 35000;

  const totalFare = currentTotal;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  totalElement.textContent = totalFare.toFixed(2);
  elapsedTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  addTripHistory(minutes, seconds, totalFare);

  currentTotal = 0;
  elapsedSeconds = 0;
});

document.getElementById('startBtn').addEventListener('click', function () {
  clearInterval(timerId);
  elapsedSeconds = 0;

  timerId = setInterval(function () {
    const totalElement = document.getElementById('total');
    const elapsedTimeElement = document.getElementById('elapsedTime');
    const farePerMinute = 35000;

    currentTotal += farePerMinute / 60;
    totalElement.textContent = currentTotal.toFixed(2);

    elapsedSeconds++;
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    elapsedTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    document.getElementById('startBtn').style.backgroundColor = '#3498db';
    setTimeout(function () {
      document.getElementById('startBtn').style.backgroundColor = '#4CAF50';
    }, 300);
  }, 1000);
});

document.getElementById('stopBtn').addEventListener('click', function () {
  clearInterval(timerId);
  document.getElementById('stopBtn').style.backgroundColor = '#e74c3c';
  setTimeout(function () {
    document.getElementById('stopBtn').style.backgroundColor = '#c0392b';
  }, 300);
});

