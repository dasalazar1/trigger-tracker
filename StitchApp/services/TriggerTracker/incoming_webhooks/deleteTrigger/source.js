// This function is the webhook's request handler. return habits.deleteOne({"_id": hab._id})
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const triggers = mongodb.db('TriggerTracker').collection('triggers');
    
    const triggerId = payload.query.triggerId;
    
    return triggers.deleteOne({"_id": BSON.ObjectId(triggerId)});
};