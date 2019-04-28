// This function is the webhook's request handler.
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const triggers = mongodb.db('TriggerTracker').collection('triggers');

    const newTrigger = JSON.parse(payload.body.text());
    console.log(JSON.stringify(newTrigger));
    
    return triggers.insertOne({name: newTrigger.name, email: newTrigger.email, habitCounts: []});
    
};