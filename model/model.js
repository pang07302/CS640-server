const mongoose = require('mongoose')

const hapticSchema = new mongoose.Schema({
        haptic_effects: [
          {
            start:Number,
            description: {
              pattern:[
                {
                  type: {
                    type: String
                  },
                 "length-ms": Number
                }
              ],
              rate: {
                frequency: Number
              }
            }
          }
        ],
          // { type: 'custom', 'length-ms': 100 }
        
      
})

const Haptic = new mongoose.model('Haptic', hapticSchema);

module.exports.Haptic = Haptic;