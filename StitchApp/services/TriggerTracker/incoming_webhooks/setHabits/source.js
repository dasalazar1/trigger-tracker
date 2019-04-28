// This function is the webhook's request handler.
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const habits = mongodb.db('TriggerTracker').collection('habits');

    const newHabits = JSON.parse(payload.body.text())
    console.log('newHabits: ' + newHabits)

    const ret = newHabits.map(hab => {
      if(hab.habit === null){
        return habits.deleteOne({"_id": hab._id})
      }
      else{
        return habits.updateOne({"_id": hab._id},{$set: {habit: hab.habit,
                                                          email: hab.email,
                                                          "triggerCounts": hab.triggerCounts
        }},{upsert:true})
      }
      
    })


    return  ret
};