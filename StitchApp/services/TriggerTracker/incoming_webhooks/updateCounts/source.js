// This function is the webhook's request handler.
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const triggers = mongodb.db('TriggerTracker').collection('triggers');
    const habits = mongodb.db('TriggerTracker').collection('habits');

    const keys = JSON.parse(payload.body.text());
    console.log(JSON.stringify(keys));
    console.log(keys.trigger);
    
    //return triggers.find({_id: BSON.ObjectId(keys.trigger)}).toArray()
    
    // .then(results => {
    //   console.log(JSON.stringify(results));
    // });
    
    triggers.findOne({"habitCounts.habit_id": keys.habit}).then(results => {
      console.log(JSON.stringify(results));
      if(results === null){
        let habitCount = {"habit_id": keys.habit, "count": 1};
        triggers.updateOne({"_id": BSON.ObjectId(keys.trigger)}, { $push: {"habitCounts": habitCount} });
        console.log('null');
      }
      else{
        triggers.updateOne({"habitCounts.habit_id": keys.habit}, {$inc: {"habitCounts.$.count": 1}});
        console.log('inc');
      }
      
    });
    
};

