// This function is the webhook's request handler.
exports = function(payload) {
  const mongodb = context.services.get('mongodb-atlas');
  const triggers = mongodb.db('TriggerTracker').collection('triggers');
  const habits = mongodb.db('TriggerTracker').collection('habits');
  
  const email = payload.query.email;
  console.log('payload: ' + email);
  
  let triggerGraphCursor = triggers.aggregate([ {$match: {email: email}}
                        ,{$unwind: "$habitCounts"}
                        ,{$lookup: 
                            {from: "habits", 
                            localField: "habitCounts.habit_id", 
                            foreignField: "_id", 
                            as: "habitCounts.habit_id"}}
                        ,{$unwind: "$habitCounts.habit_id"}
                        ,{$replaceRoot: { newRoot: {trigger: "$name", name: "$habitCounts.habit_id.name", count: "$habitCounts.count"  } } }
                        ,{$group: { _id: "$trigger", data: {$push: {k: "$name", v: "$count"} } }}
                        ,{$project: {_id: 0, name: "$_id", c: {$arrayToObject: "$data"} } }
                        ,{$addFields: { "c.name": "$name" } }
                        ,{$replaceRoot: { "newRoot": "$c" }  }
                     ]);
                     
  let habitsGraphCursor = habits.aggregate([ {$match: {email: email}}
                        ,{$unwind: "$triggerCounts"}
                        ,{$lookup: 
                            {from: "triggers", 
                            localField: "triggerCounts.trigger_id", 
                            foreignField: "_id", 
                            as: "triggerCounts.trigger_id"}}
                        ,{$unwind: "$triggerCounts.trigger_id"}
                        ,{$replaceRoot: { newRoot: {habit: "$name", name: "$triggerCounts.trigger_id.name", count: "$triggerCounts.count"  } } }
                        ,{$group: { _id: "$habit", data: {$push: {k: "$name", v: "$count"} } }}
                        ,{$project: {_id: 0, name: "$_id", c: {$arrayToObject: "$data"} } }
                        ,{$addFields: { "c.name": "$name" } }
                        ,{$replaceRoot: { "newRoot": "$c" }  }
                     ]);
                     
  let triggerData = triggerGraphCursor.toArray();
  let habitData   = habitsGraphCursor.toArray();
  
  return {triggerData: triggerData, habitData: habitData};

};