// This function is the webhook's request handler.
exports = function(payload) {
  const mongodb = context.services.get('mongodb-atlas');
  const habits = mongodb.db('TriggerTracker').collection('habits');
  
  const email = payload.query.email;
  console.log('payload: ' + JSON.stringify());
  
  return habits.find({email: email}).toArray();
};