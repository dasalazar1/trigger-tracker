// This function is the webhook's request handler.
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const habits = mongodb.db('TriggerTracker').collection('habits');

    const newHabit = JSON.parse(payload.body.text());
    console.log(JSON.stingify(newHabit));
    
    return habits.insertOne({name: newHabit.name, email: newHabit.email, triggerCounts: []});
    
};