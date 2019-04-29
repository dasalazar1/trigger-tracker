// This function is the webhook's request handler. return habits.deleteOne({"_id": hab._id})
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const habits = mongodb.db('TriggerTracker').collection('habits');
    
    const habitId = payload.query.habitId;
    
    return habits.deleteOne({"_id": BSON.ObjectId(habitId)});
};