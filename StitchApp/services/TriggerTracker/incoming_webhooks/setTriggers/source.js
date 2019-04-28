// This function is the webhook's request handler.
exports = function(payload) {
    const mongodb = context.services.get('mongodb-atlas');
    const triggers = mongodb.db('TriggerTracker').collection('triggers');

    console.log(JSON.stringify(payload.body));
    const newTriggers = JSON.parse(payload.body.text());
    
    console.log('newTriggers: ' + newTriggers);

    const ret = newTriggers.map(tri => {
      return triggers.updateOne({"_id": tri._id},{$set: {trigger: tri.trigger,
                                                          email: tri.email,
                                                          "habitCounts": tri.habitCounts
      }},{upsert:true});
    });


    return  ret;
};

