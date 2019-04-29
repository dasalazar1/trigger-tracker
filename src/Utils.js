const url = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook';

export function fetchTriggers(email) {
  return fetch(url + '/getTriggers?email=' + email).then(response => {
    console.log('response from atlas triggers: ' + response);
    return response.json();
  });
}

export function fetchHabits(email) {
  return fetch(url + '/getHabits?email=' + email).then(response => {
    console.log('response from atlas habits: ' + response);
    return response.json();
  });
}

export function updateCounts(habitKey, triggerKey) {
  return fetch(url + '/updateCounts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ habit: habitKey, trigger: triggerKey })
  }).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}

export function newHabit(details) {
  return fetch(url + '/newHabit', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  }).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}

export function newTrigger(details) {
  return fetch(url + '/newTrigger', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  }).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}

export function deleteHabit(habitId) {
  return fetch(url + '/deleteHabit?habitId=' + habitId, { method: 'DELETE' }).then(response => {
    return response.json();
  });
}

export function postTriggers(triggers) {
  return fetch(url + '/setTriggers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(triggers)
  }).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}

export function postHabits(habits) {
  return fetch(url + '/setHabits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(habits)
  }).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}
