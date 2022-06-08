const mongoose = require('mongoose')

const hapticSchema = new mongoose.Schema({
        haptic_effects: 
          {
            start: 0,
            description: {
              pattern:Array,
            //   [
            //     {
            //      type: String,
            //      "length-ms": Number
            //     }
            //   ],
              rate: {
                frequency: Number
              }
            }
          },
        
      
})

const Haptic = new mongoose.model('Haptic', hapticSchema);

module.exports.Haptic = Haptic;