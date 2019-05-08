// This function is the webhook's request handler.
exports = function(payload) {
  const mongodb = context.services.get('mongodb-atlas');
  const triggers = mongodb.db('TriggerTracker').collection('triggers');
  const habits = mongodb.db('TriggerTracker').collection('habits');

  const keys = JSON.parse(payload.body.text());
  console.log(JSON.stringify(keys));
  console.log(keys.trigger);

  var triUpdate = triggers.findOne({ _id: BSON.ObjectId(keys.trigger), 'habitCounts.habit_id': keys.habit }).then(results => {
    console.log(JSON.stringify(results));
    if (results === null) {
      let habitCount = { habit_id: keys.habit, count: 1 };
      return triggers.updateOne({ _id: BSON.ObjectId(keys.trigger) }, { $push: { habitCounts: habitCount } });
    } else {
      return triggers.updateOne(
        { _id: BSON.ObjectId(keys.trigger), 'habitCounts.habit_id': keys.habit },
        { $inc: { 'habitCounts.$.count': 1 } }
      );
    }
  });

  var habUpdate = habits.findOne({ _id: BSON.ObjectId(keys.habit), 'triggerCounts.trigger_id': keys.trigger }).then(results => {
    console.log(JSON.stringify(results));
    if (results === null) {
      let triggerCount = { trigger_id: keys.trigger, count: 1 };
      return habits.updateOne({ _id: BSON.ObjectId(keys.habit) }, { $push: { triggerCounts: triggerCount } });
    } else {
      return habits.updateOne(
        { _id: BSON.ObjectId(keys.habit), 'triggerCounts.trigger_id': keys.trigger },
        { $inc: { 'triggerCounts.$.count': 1 } }
      );
    }
  });

  return Promise.all([triUpdate, habUpdate]);
};
