// This function is the webhook's request handler.
exports = function(payload) {
  const mongodb = context.services.get('mongodb-atlas');
  const triggers = mongodb.db('TriggerTracker').collection('triggers');
  
  const email = payload.query.email;
  console.log('payload: ' + JSON.stringify());
  //return email;
  return triggers.find({email: email}).toArray();
};