const mongoose = require('mongoose')

const hapticSchema = new mongoose.Schema({
        deviceId : String,
        control:String,
        haptic_effects: [
          {
            start:Number,
            description: {
              pattern:[
                {
                  type: {
                    type: String
                  },
                 LengthMs: Number
                }
              ],
              rate: {
                frequency: Number
              }
            }
          }
        ],
})
const Haptic = new mongoose.model('Haptic', hapticSchema);

const sightSchema = new mongoose.Schema({
  deviceId : String,
  control:String,
  sight_effects: [
    {
      start:Number,
      description: {
        pattern:[
          {
            type: {
              type: String
            },
           LengthMs: Number,
           colour: String
          }
        ],
        rate: {
          frequency: Number
        }
      }
    }
  ],
})
const Sight = new mongoose.model('Sight', sightSchema);

const audioSchema = new mongoose.Schema({
  deviceId : String,
  control:String,
  audio_effects: [
    {
      start:Number,
      description: {
        pattern:[
          {
            type: {
              type: String
            },
           LengthMs: Number
          }
        ],
        rate: {
          frequency: Number
        }
      }
    }
  ],
})
const Audio = new mongoose.model('Audio', audioSchema);

const smellSchema = new mongoose.Schema({
  deviceId : String,
  control:String,
  smell_effects: [
    {
      start:Number,
      description: {
        pattern:[
          {
            type: {
              type: String
            },
           LengthMs: Number,
           fragrance: String
          }
        ],
        rate: {
          frequency: Number
        }
      }
    }
  ],
})
const Smell = new mongoose.model('Smell', smellSchema);

const tasteSchema = new mongoose.Schema({
  deviceId : String,
  control:String,
  taste_effects: [
    {
      start:Number,
      description: {
        pattern:[
          {
            type: {
              type: String
            },
           LengthMs: Number,
           flavour: String
          }
        ],
        rate: {
          frequency: Number
        }
      }
    }
  ],
})
const Taste = new mongoose.model('Taste', tasteSchema);

// const deviceSchema = new mongoose.Schema({
//       device:[
//         {
//           id: { type: Number, default: 1 },
//           name: { type: String, default: "LED-light"}
//         },
//         {
//           id: { type: Number, default: 2 },
//           name: { type: String, default: "VR-Headset"}
//         },
//         {
//           id: { type: Number, default: 3 },
//           name: { type: String, default: "headphone"}  
//         },
//         {
//           id: { type: Number, default: 4 },
//           name: { type: String, default: "speaker"}
//         },
//         {
//           id: { type: Number, default: 5 },
//           name: { type: String, default: "exoskeletons"}
//         },
//         {
//           id: { type: Number, default: 6 },
//           name: { type: String, default: "glove"}
//         },
//         {
//           id: { type: Number, default: 7 },
//           name: { type: String, default: "joysticks"}
//         },
//         {
//           id: { type: Number, default: 8 },
//           name: { type: String, default: "fan"}
//         },
//         {
//           id: { type: Number, default: 9 },
//           name: { type: String, default: "olfactometers"}
//         },
//         {
//           id: { type: Number, default: 10 },
//           name: { type: String, default: "electronic cigarettes"}
//         }
//       ]
// })  

const deviceSchema = new mongoose.Schema({
  id: { type: Number},
  name: { type: String},
  category: { type: String},
})  
const Device = new mongoose.model('Device', deviceSchema);

const effectSchema = new mongoose.Schema({
  id: { type: Number},
  category: {type: String},
  colour: [{type: String}],
  smell: [{type:String}]

  
})
const Effect = new mongoose.model('Effect', effectSchema);
// effect: [
//   {
//     id: 1,
//     category: "sight",
//     // colour: ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "white"]
//   },
//   {
//     id: 2,
//     category: "audio"
//   },
//   {
//     id: 3,
//     category: "haptic"
//   },
//   {
//     id: 4,
//     category: "smell",

//   },
//   {
//     id: 5,
//     category: "taste"
//   }
// ]




module.exports.Device = Device;
module.exports.Effect = Effect;
module.exports.Haptic = Haptic;
module.exports.Sight = Sight;
module.exports.Audio = Audio;
module.exports.Smell = Smell;
module.exports.Taste = Taste;
// module.exports.Table = Table;