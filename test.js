// var Timestamp = require("timestamp-nano");
// const responseTime = require('response-time');
// test
// app.use(responseTime((req, res, time) => {
//     console.log(`${req.method} ${req.url} ${time}`);
// }))

// "response-time": "^2.3.2",
// "timestamp-nano": "^1.0.0"

app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Liam","Ginseng","Fruit"]);
   });

   app.get("/url", (req, res, next) => {
    
    res.json(Date.now()+" , "+Timestamp.fromString(Timestamp.fromDate(new Date()).toJSON()).getTimeT()+" , "+Timestamp.fromString(Timestamp.fromDate(new Date()).toJSON()).getNano()+","+now());
   });

app.get('/fan/:req', (req,res)=>{
    
    let query = req.params.req;
    console.log(query);
    // exec(`order=${query} sh ./ControlFan.sh`);
    if (query=="On"){
        exec("sudo uhubctl -l 2 -a 1", (error, stdout, stderror) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderror) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }
    else if (query=="Off"){
        exec("sudo uhubctl -l 2 -a 0", (error, stdout, stderror) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderror) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        })
    }
    res.send("haha")
});

app.post('/addData', async (req, res)=> {
    console.log(req.body);
    let haptic = new Haptic(req.body)
    await haptic.save()
    console.log('create data successfully')
    res.status(200).send(haptic)
 });

 app.get('/getData', async (req, res)=>{
    let haptic = await Haptic.find();
    res.send(haptic)     
});




// add sight effect 
app.get('/sight/:id', async(req,res)=>{
    let deviceId = req.params.id;
    let sight = new Sight(req.body)
    sight.deviceId = deviceId;
    await Sight.save();
    console.log('create data successfully')
    res.status(200).send(sight)
});

// add audio effect 
app.get('/audio/:id', async(req,res)=>{
    let deviceId = req.params.id;
    let audio = new Audio(req.body)
    audio.deviceId = deviceId;
    await audio.save();
    console.log('create data successfully')
    res.status(200).send(audio)
});

// add haptic effect 
app.get('/haptic/:id', async(req,res)=>{
    let deviceId = req.params.id;
    let haptic = new Haptic(req.body)
    haptic.deviceId = deviceId;
    await haptic.save();
    console.log('create data successfully')
    res.status(200).send(haptic)
});

// add haptic effect 
app.get('/smell/:id', async(req,res)=>{
    let deviceId = req.params.id;
    let smell = new Smell(req.body)
    smell.deviceId = deviceId;
    await smell.save();
    console.log('create data successfully')
    res.status(200).send(smell)
});

// add taste effect 
app.get('/taste/:id', async(req,res)=>{
    let deviceId = req.params.id;
    let taste = new Taste(req.body)
    taste.deviceId = deviceId;
    await taste.save();
    console.log('create data successfully')
    res.status(200).send(taste)
});


const getDuration = (time) => {
    const diff = process.hrtime(time)
    return (diff[0] * 1e9 + diff[1]) 
}

function setEffect(){
    effect.deviceId=req.body.deviceId;
    effect.category=req.body.category;
    effect.control=req.body.control;
    effect.description.properties.type = req.body.description.properties.type;
    effect.description.properties.measure = req.body.description.properties.measure; 
    effect.description.properties.unit = req.body.description.properties.unit;
    effect.description.properties.quantity = req.body.description.properties.quantity;
    effect.description.pattern.type = req.body.description.pattern.type;
    effect.description.pattern.LengthMs = req.body.description.pattern.LengthMs;
}

app.get('/ManageEffect/:effectId', async(req,res) => {
    let category = req.body.category;
    let id = req.params.effectId.split('_')[0]
    
    let previousCategory = req.params.effectId.split('_')[1]
    let effect;
    switch (category){
        case "Sight":
            effect = await Sight.findById(id)
            if (!effect){
                effect = new Sight(req.body);
                effect.deviceId=req.body.deviceId;
                remove(id, previousCategory)
            }else{
                setEffect();
                effect.description.properties.id = req.body.description.properties.id;
            }
            break;
        case "Audio": 
            effect = await Audio.findById(id)
            if (!effect){
                effect = new Audio(req.body);
                effect.deviceId=req.body.deviceId;
                remove(id, previousCategory)
            }else{
                setEffect();
                
            }    
            break;
        case "haptic_effects":
            effect = await Haptic.findById(id)
            if (!effect){
                effect = new Haptic(req.body);
                effect.deviceId=req.body.deviceId;
                remove(id, previousCategory)
            }else{
                setEffect();
            }
            break;
        case "smell_effects": 
            effect = await Smell.findById(id)
            if (!effect){
                effect = new Smell(req.body);
                effect.deviceId=req.body.deviceId;
                remove(id, previousCategory)
            }else{
                setEffect();
            }
            break;
        case "taste_effects":
            effect = await Taste.findById(id)
            if (!effect){
                effect = new Taste(req.body);
                effect.deviceId=req.body.deviceId;
                remove(id, previousCategory)
            }else{
                setEffect();
            }
            break;
    }    
    await effect.save();
    res.status(200).send(effect)
})


// app.get('/ManageEffect/:effectId', async(req,res) => {
//     let category = Object.keys(req.body)[0];
//     let id = req.params.effectId.split('_')[0]
    
//     let previousCategory = req.params.effectId.split('_')[1]
//     let effect;
//     switch (category){
//         case "sight_effects":
//             effect = await Sight.findById(id)
//             if (!effect){
//                 effect = new Sight(req.body);
//                 effect.deviceId=req.body.deviceId;
//                 remove(id, previousCategory)
//             }else{
//                 effect.deviceId=req.body.deviceId;
//                 effect.sight_effects[0].start = req.body.sight_effects[0].start;
//                 effect.sight_effects[1].start = req.body.sight_effects[1].start;
//                 effect.sight_effects[2].start = req.body.sight_effects[2].start;
//                 effect.sight_effects[3].start = req.body.sight_effects[3].start;
//                 effect.sight_effects[0].description.pattern[0].type = req.body.sight_effects[0].description.pattern[0].type
//                 effect.sight_effects[1].description.pattern[0].type = req.body.sight_effects[1].description.pattern[0].type
//                 effect.sight_effects[2].description.pattern[0].type = req.body.sight_effects[2].description.pattern[0].type
//                 effect.sight_effects[3].description.pattern[0].type = req.body.sight_effects[3].description.pattern[0].type
//                 effect.sight_effects[0].description.pattern[0].LengthMs = req.body.sight_effects[0].description.pattern[0].LengthMs 
//                 effect.sight_effects[1].description.pattern[0].LengthMs = req.body.sight_effects[1].description.pattern[0].LengthMs 
//                 effect.sight_effects[2].description.pattern[0].LengthMs = req.body.sight_effects[2].description.pattern[0].LengthMs 
//                 effect.sight_effects[3].description.pattern[0].LengthMs = req.body.sight_effects[3].description.pattern[0].LengthMs 
//                 effect.sight_effects[0].description.rate.frequency = req.body.sight_effects[0].description.rate.frequency
//                 effect.sight_effects[1].description.rate.frequency = req.body.sight_effects[1].description.rate.frequency
//                 effect.sight_effects[2].description.rate.frequency = req.body.sight_effects[2].description.rate.frequency
//                 effect.sight_effects[3].description.rate.frequency = req.body.sight_effects[3].description.rate.frequency
//                 effect.sight_effects[0].description.pattern[0].colour = req.body.sight_effects[0].description.pattern[0].colour 
//                 effect.sight_effects[1].description.pattern[0].colour = req.body.sight_effects[1].description.pattern[0].colour 
//                 effect.sight_effects[2].description.pattern[0].colour = req.body.sight_effects[2].description.pattern[0].colour 
//                 effect.sight_effects[3].description.pattern[0].colour = req.body.sight_effects[3].description.pattern[0].colour 
//                 effect.control=req.body.control
//             }
//             break;
//         case "audio_effects": 
//             effect = await Audio.findById(id)
//             if (!effect){
//                 effect = new Audio(req.body);
//                 effect.deviceId=req.body.deviceId;
//                 remove(id, previousCategory)
//             }else{
//                 effect.deviceId=req.body.deviceId;
//                 effect.audio_effects[0].start = req.body.audio_effects[0].start;
//                 effect.audio_effects[1].start = req.body.audio_effects[1].start;
//                 effect.audio_effects[2].start = req.body.audio_effects[2].start;
//                 effect.audio_effects[3].start = req.body.audio_effects[3].start;
//                 effect.audio_effects[0].description.pattern[0].type = req.body.audio_effects[0].description.pattern[0].type
//                 effect.audio_effects[1].description.pattern[0].type = req.body.audio_effects[1].description.pattern[0].type
//                 effect.audio_effects[2].description.pattern[0].type = req.body.audio_effects[2].description.pattern[0].type
//                 effect.audio_effects[3].description.pattern[0].type = req.body.audio_effects[3].description.pattern[0].type
//                 effect.audio_effects[0].description.pattern[0].LengthMs = req.body.audio_effects[0].description.pattern[0].LengthMs 
//                 effect.audio_effects[1].description.pattern[0].LengthMs = req.body.audio_effects[1].description.pattern[0].LengthMs 
//                 effect.audio_effects[2].description.pattern[0].LengthMs = req.body.audio_effects[2].description.pattern[0].LengthMs 
//                 effect.audio_effects[3].description.pattern[0].LengthMs = req.body.audio_effects[3].description.pattern[0].LengthMs 
//                 effect.audio_effects[0].description.rate.frequency = req.body.audio_effects[0].description.rate.frequency
//                 effect.audio_effects[1].description.rate.frequency = req.body.audio_effects[1].description.rate.frequency
//                 effect.audio_effects[2].description.rate.frequency = req.body.audio_effects[2].description.rate.frequency
//                 effect.audio_effects[3].description.rate.frequency = req.body.audio_effects[3].description.rate.frequency
//                 effect.control=req.body.control
//             }    
//             break;
//         case "haptic_effects":
//             effect = await Haptic.findById(id)
//             if (!effect){
//                 effect = new Haptic(req.body);
//                 effect.deviceId=req.body.deviceId;
//                 remove(id, previousCategory)
//             }else{
//                 effect.deviceId=req.body.deviceId;
//                 effect.haptic_effects[0].start = req.body.haptic_effects[0].start;
//                 effect.haptic_effects[1].start = req.body.haptic_effects[1].start;
//                 effect.haptic_effects[2].start = req.body.haptic_effects[2].start;
//                 effect.haptic_effects[3].start = req.body.haptic_effects[3].start;
//                 effect.haptic_effects[0].description.pattern[0].type = req.body.haptic_effects[0].description.pattern[0].type
//                 effect.haptic_effects[1].description.pattern[0].type = req.body.haptic_effects[1].description.pattern[0].type
//                 effect.haptic_effects[2].description.pattern[0].type = req.body.haptic_effects[2].description.pattern[0].type
//                 effect.haptic_effects[3].description.pattern[0].type = req.body.haptic_effects[3].description.pattern[0].type
//                 effect.haptic_effects[0].description.pattern[0].LengthMs = req.body.haptic_effects[0].description.pattern[0].LengthMs 
//                 effect.haptic_effects[1].description.pattern[0].LengthMs  = req.body.haptic_effects[1].description.pattern[0].LengthMs 
//                 effect.haptic_effects[2].description.pattern[0].LengthMs  = req.body.haptic_effects[2].description.pattern[0].LengthMs 
//                 effect.haptic_effects[3].description.pattern[0].LengthMs  = req.body.haptic_effects[3].description.pattern[0].LengthMs 
//                 effect.haptic_effects[0].description.rate.frequency = req.body.haptic_effects[0].description.rate.frequency
//                 effect.haptic_effects[1].description.rate.frequency = req.body.haptic_effects[1].description.rate.frequency
//                 effect.haptic_effects[2].description.rate.frequency = req.body.haptic_effects[2].description.rate.frequency
//                 effect.haptic_effects[3].description.rate.frequency = req.body.haptic_effects[3].description.rate.frequency
//                 effect.control=req.body.control
//             }
//             break;
//         case "smell_effects": 
//             effect = await Smell.findById(id)
//             if (!effect){
//                 effect = new Smell(req.body);
//                 effect.deviceId=req.body.deviceId;
//                 remove(id, previousCategory)
//             }else{
//                 effect.deviceId=req.body.deviceId;
//                 effect.smell_effects[0].start = req.body.smell_effects[0].start;
//                 effect.smell_effects[1].start = req.body.smell_effects[1].start;
//                 effect.smell_effects[2].start = req.body.smell_effects[2].start;
//                 effect.smell_effects[3].start = req.body.smell_effects[3].start;
//                 effect.smell_effects[0].description.pattern[0].type = req.body.smell_effects[0].description.pattern[0].type
//                 effect.smell_effects[1].description.pattern[0].type = req.body.smell_effects[1].description.pattern[0].type
//                 effect.smell_effects[2].description.pattern[0].type = req.body.smell_effects[2].description.pattern[0].type
//                 effect.smell_effects[3].description.pattern[0].type = req.body.smell_effects[3].description.pattern[0].type
//                 effect.smell_effects[0].description.pattern[0].LengthMs = req.body.smell_effects[0].description.pattern[0].LengthMs 
//                 effect.smell_effects[1].description.pattern[0].LengthMs = req.body.smell_effects[1].description.pattern[0].LengthMs 
//                 effect.smell_effects[2].description.pattern[0].LengthMs = req.body.smell_effects[2].description.pattern[0].LengthMs 
//                 effect.smell_effects[3].description.pattern[0].LengthMs = req.body.smell_effects[3].description.pattern[0].LengthMs 
//                 effect.smell_effects[0].description.rate.frequency = req.body.audio_effects[0].description.rate.frequency
//                 effect.smell_effects[1].description.rate.frequency = req.body.audio_effects[1].description.rate.frequency
//                 effect.smell_effects[2].description.rate.frequency = req.body.audio_effects[2].description.rate.frequency
//                 effect.smell_effects[3].description.rate.frequency = req.body.audio_effects[3].description.rate.frequency
//                 effect.smell_effects[0].description.pattern[0].fragrance = req.body.smell_effects[0].description.pattern[0].fragrance 
//                 effect.smell_effects[1].description.pattern[0].fragrance = req.body.smell_effects[1].description.pattern[0].fragrance 
//                 effect.smell_effects[2].description.pattern[0].fragrance = req.body.smell_effects[2].description.pattern[0].fragrance 
//                 effect.smell_effects[3].description.pattern[0].fragrance = req.body.smell_effects[3].description.pattern[0].fragrance 
//                 effect.control=req.body.control
//             }
//             break;
//         case "taste_effects":
//             effect = await Taste.findById(id)
//             if (!effect){
//                 effect = new Taste(req.body);
//                 effect.deviceId=req.body.deviceId;
//                 remove(id, previousCategory)
//             }else{
//                 effect.deviceId=req.body.deviceId;
//                 effect.taste_effects[0].start = req.body.taste_effects[0].start;
//                 effect.taste_effects[1].start = req.body.taste_effects[1].start;
//                 effect.taste_effects[2].start = req.body.taste_effects[2].start;
//                 effect.taste_effects[3].start = req.body.taste_effects[3].start;
//                 effect.taste_effects[0].description.pattern[0].type = req.body.taste_effects[0].description.pattern[0].type
//                 effect.taste_effects[1].description.pattern[0].type = req.body.taste_effects[1].description.pattern[0].type
//                 effect.taste_effects[2].description.pattern[0].type = req.body.taste_effects[2].description.pattern[0].type
//                 effect.taste_effects[3].description.pattern[0].type = req.body.taste_effects[3].description.pattern[0].type
//                 effect.taste_effects[0].description.pattern[0].LengthMs = req.body.taste_effects[0].description.pattern[0].LengthMs 
//                 effect.taste_effects[1].description.pattern[0].LengthMs = req.body.taste_effects[1].description.pattern[0].LengthMs 
//                 effect.taste_effects[2].description.pattern[0].LengthMs = req.body.taste_effects[2].description.pattern[0].LengthMs 
//                 effect.taste_effects[3].description.pattern[0].LengthMs = req.body.taste_effects[3].description.pattern[0].LengthMs 
//                 effect.taste_effects[0].description.rate.frequency = req.body.taste_effects[0].description.rate.frequency
//                 effect.taste_effects[1].description.rate.frequency = req.body.taste_effects[1].description.rate.frequency
//                 effect.taste_effects[2].description.rate.frequency = req.body.taste_effects[2].description.rate.frequency
//                 effect.taste_effects[3].description.rate.frequency = req.body.taste_effects[3].description.rate.frequency
//                 effect.taste_effects[0].description.pattern[0].flavour = req.body.taste_effects[0].description.pattern[0].flavour 
//                 effect.taste_effects[1].description.pattern[0].flavour = req.body.taste_effects[1].description.pattern[0].flavour 
//                 effect.taste_effects[2].description.pattern[0].flavour = req.body.taste_effects[2].description.pattern[0].flavour 
//                 effect.taste_effects[3].description.pattern[0].flavour = req.body.taste_effects[3].description.pattern[0].flavour 
//                 effect.control=req.body.control
//             }
//             break;
//     }    
//     await effect.save();
//     res.status(200).send(effect)
// })
// app.get('/CreateEffect/:deviceId', async(req,res) => {
    
//     let category = Object.keys(req.body)[0];
//     let collection;
//     switch (category){
//         case "sight_effects": collection = Sight; break;
//         case "audio_effects": collection = Audio; break;
//         case "haptic_effects": collection = Haptic; break;
//         case "smell_effects": collection = Smell; break;
//         case "taste_effects": collection = Taste; break;
//     }
//     let effect = new collection(req.body)
//     effect.deviceId = req.params.deviceId;
//     await effect.save();
//     console.log('create data successfully')
//     res.status(200).send(effect)
// })




// const hapticSchema = new mongoose.Schema({
//         deviceId : String,
//         control:String,
//         haptic_effects: [
//           {
//             start:Number,
//             description: {
//               pattern:[
//                 {
//                   type: {
//                     type: String
//                   },
//                  LengthMs: Number
//                 }
//               ],
//               rate: {
//                 frequency: Number
//               }
//             }
//           }
//         ],
// })
// const Haptic = new mongoose.model('Haptic', hapticSchema);

// const sightSchema = new mongoose.Schema({
//   deviceId : String,
//   control:String,
//   sight_effects: [
//     {
//       start:Number,
//       description: {
//         pattern:[
//           {
//             type: {
//               type: String
//             },
//            LengthMs: Number,
//            colour: String
//           }
//         ],
//         rate: {
//           frequency: Number
//         }
//       }
//     }
//   ],
// })
// const Sight = new mongoose.model('Sight', sightSchema);

// const audioSchema = new mongoose.Schema({
//   deviceId : String,
//   control:String,
//   audio_effects: [
//     {
//       start:Number,
//       description: {
//         pattern:[
//           {
//             type: {
//               type: String
//             },
//            LengthMs: Number
//           }
//         ],
//         rate: {
//           frequency: Number
//         }
//       }
//     }
//   ],
// })
// const Audio = new mongoose.model('Audio', audioSchema);

// const smellSchema = new mongoose.Schema({
//   deviceId : String,
//   control:String,
//   smell_effects: [
//     {
//       start:Number,
//       description: {
//         pattern:[
//           {
//             type: {
//               type: String
//             },
//            LengthMs: Number,
//            fragrance: String
//           }
//         ],
//         rate: {
//           frequency: Number
//         }
//       }
//     }
//   ],
// })
// const Smell = new mongoose.model('Smell', smellSchema);

// const tasteSchema = new mongoose.Schema({
//   deviceId : String,
//   control:String,
//   taste_effects: [
//     {
//       start:Number,
//       description: {
//         pattern:[
//           {
//             type: {
//               type: String
//             },
//            LengthMs: Number,
//            flavour: String
//           }
//         ],
//         rate: {
//           frequency: Number
//         }
//       }
//     }
//   ],
// })
// const Taste = new mongoose.model('Taste', tasteSchema);

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