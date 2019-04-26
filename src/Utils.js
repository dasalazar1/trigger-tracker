export function fetchTriggers(email) {
  return fetch(
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/getTriggers?email=' +
      email
  ).then(response => {
    console.log('response from atlas triggers: ' + response);
    return response.json();
  });
}

export function fetchHabits(email) {
  return fetch(
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/getHabits?email=' +
      email
  ).then(response => {
    console.log('response from atlas habits: ' + response);
    return response.json();
  });
}

export function postTriggers(triggers) {
  return fetch(
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/setTriggers',
    {
      method: 'POST',
      body: JSON.stringify(triggers)
    }
  ).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}

export function postHabits(habits) {
  return fetch(
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stitchapp-lifjq/service/TriggerTracker/incoming_webhook/setHabits',
    {
      method: 'POST',
      body: JSON.stringify(habits)
    }
  ).then(response => {
    if (!response.ok) {
      console.error(response.status);
    }
    return response.json();
  });
}
