chrome.runtime.onInstalled.addListener(() => {
    fetchCountdownTime();
  });
  
  function fetchCountdownTime() {
    fetch('https://waitlist-api.prod.blast.io/v1/user/dashboard')
      .then(response => response.json())
      .then(data => {
        if (data && data.timeUntilNextSpinSeconds) {
          startCountdown(data.timeUntilNextSpinSeconds);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        chrome.browserAction.setBadgeText({text: 'Err'});
      });
  }
  
  function startCountdown(seconds) {
    chrome.browserAction.setBadgeBackgroundColor({ color: '#0000FF' }); // Set background color to blue
    const interval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(interval);
        chrome.browserAction.setBadgeText({text: ''});
        fetchCountdownTime(); // Fetch new countdown time
      } else {
        chrome.browserAction.setBadgeText({text: seconds.toString()});
        seconds--;
      }
    }, 1000);
  }
  