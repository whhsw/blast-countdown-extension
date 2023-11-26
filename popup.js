document.addEventListener('DOMContentLoaded', function() {
  fetch('https://waitlist-api.prod.blast.io/v1/user/dashboard')
    .then(response => response.json())
    .then(data => {
      startCountdown(data.spinStats.timeUntilNextSpinSeconds);
    })
    .catch(error => {
      document.getElementById('countdown').innerText = 'Error fetching data';
      console.error('Error:', error);
    });
});

function startCountdown(seconds) {
  const countdownElement = document.getElementById('countdown');
  const interval = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(interval);
      countdownElement.innerText = 'Time is up!';
    } else {
      countdownElement.innerText = `Time until next spin: ${seconds} seconds`;
      seconds--;
    }
  }, 1000);
}
