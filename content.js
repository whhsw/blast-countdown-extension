chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.timeUntilNextSpin) {
      displayCountdown(request.timeUntilNextSpin);
    }
  }
);

function displayCountdown(seconds) {
  const countdownElement = document.createElement('div');
  countdownElement.id = 'countdownTimer';
  countdownElement.style.position = 'fixed';
  countdownElement.style.bottom = '10px';
  countdownElement.style.right = '10px';
  countdownElement.style.backgroundColor = 'white';
  countdownElement.style.border = '1px solid black';
  countdownElement.style.padding = '5px';
  document.body.appendChild(countdownElement);

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
