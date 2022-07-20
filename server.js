const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.port || 8000
const app = express()
const {Device, Effect, Sight, Audio, Haptic, Smell, Taste} = require('./model/model')
const {exec} =  require('node:child_process');
const responseTime = require('response-time');



// https://www.freecodecamp.org/news/shell-scripting-crash-course-how-to-write-bash-scripts-in-linux/#:~:text=What%20is%20a%20Bash%20Script%3F,it%20using%20the%20command%20line.

const url = 'mongodb+srv://user:user@cluster0.ts2fe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(()=>{
    console.log('Connected to database')
}).catch(err => console.log(err))

// https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i
app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    },
    optionsSuccessStatus: 200,
    credentials: true
  }));
  app.use(responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}`);
  }))


app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb'}))


app.listen(PORT, () => {
    console.log(`Server listening or port ${PORT}`)
})
// test
app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Liam","Ginseng","Fruit"]);
   });


app.get('/createDefaultTable', async(req,res)=>{
    console.log(req.body)
});

// create the default device table
app.get('/createDeviceTable', async(req,res)=>{
    console.log(req.body.device)
    Device.findOne({name: req.body.device[0].name}, async(err, result) => {
        if (err) throw err
        if (result){
            console.log('Table has already exists')
            res.send('Table has already exists')
        }else{
            for (var i=0; i<req.body.device.length; i++){
                let device = new Device(req.body.device[i])
                console.log(device);
                await device.save()
            } 
            res.status(200).send('create data successfully')
        }
    })  
});
// create the default effect table
app.get('/createEffectTable', async(req,res)=>{
    console.log(req.body)
    Effect.findOne({category: req.body.effect[0].category}, async(err, result) => {
        if (err) throw err
        if (result){
            console.log('Table has already exists')
            res.send('Table has already exists')
        }else{
            for (var i=0; i<req.body.effect.length; i++){
                let effect = new Effect(req.body.effect[i])
                console.log(effect);
                await effect.save()
            } 
            res.status(200).send('create data successfully')
        }
    })  
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

const getDurationInMilliseconds = (time) => {
    const diff = process.hrtime(time)
    return (diff[0] * 1e9 + diff[1]) / 1e9
    
}


// check whether the default table contains the device
app.get('/fans', async(req,res)=>{
    let start = process.hrtime();
    
    Device.findOne({name: req.body.name}, async(err, device) => {
        if (err) throw err
        if (!device){
            console.log('Device is not exists')
            res.send('Device is not exists')
        } else{
            // if (req.body.status=="On"){
            //     exec("sudo uhubctl -l 2 -a 1", (error, stdout, stderror) => {
            //         if (error) {
            //             console.log(`error: ${error.message}`);
            //             return;
            //         }
            //         if (stderror) {
            //             console.log(`stderr: ${stderr}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //     })
            // }
            // else if (query=="Off"){
            //     exec("sudo uhubctl -l 2 -a 0", (error, stdout, stderror) => {
            //         if (error) {
            //             console.log(`error: ${error.message}`);
            //             return;
            //         }
            //         if (stderror) {
            //             console.log(`stderr: ${stderr}`);
            //             return;
            //         }
            //         console.log(`stdout: ${stdout}`);
            //     })
            // }   
            let time = getDurationInMilliseconds(start);
            
            console.log(`Device: ${device.name}, ID: ${device.id} is ${req.body.status}`)
            res.status(200).send(`Device ID: ${device.id} is ${req.body.status}, time: ${time}`); 
        }
    })    
});

app.get('/customDevice', async(req,res)=>{
    console.log(req.body);
    let len = await Device.count()
    // console.log(len)
    Device.findOne({name: req.body.name}, async(err, device) => {
        if (err) throw err
        if (device){
            console.log('Device is already exists')
            res.send('Device is already exists')
        } else{
            
       
            // console.log(len);
            

            let device = new Device({name:req.body.name, id:len+1});
            console.log(device);
            device.save();
            
            console.log(`Device: ${device.name}, ID: ${device.id} is ${req.body.status}`)
            res.status(200).send(`Device ID: ${device.name} is added `); 
        }
    })    
});

// get haptic effects id
app.get('/getDeviceEffectsId/:id', async(req,res)=>{
    let id = req.params.id.split('(')[0];
    let category = req.params.id.split('(')[1].substring(0,req.params.id.split('(')[1].length-1);
    let collection;
    switch (category){
        case "Sight": collection = Sight; break;
        case "Audio": collection = Audio; break;
        case "Haptic": collection = Haptic; break;
        case "Smell": collection = Smell; break;
        case "Taste": collection = Taste; break;
    }
    let effectId = [];
    
    collection.find({deviceId: id}, async(err, effect) => {
        if (err) throw err
        if (!effect){
            console.log('Device has no effect yet')
            res.send('Device has no effect yet')
        } else{
            
            for (var i =0; i<effect.length; i++){
                effectId.push(effect[i]._id);
               
            }
            console.log(effectId);
            res.status(200).send(effectId); 
        }
    })    
})

app.get('/getDeviceEffect/:req', async(req,res)=>{
    console.log(req.params.req);
    let id = req.params.req.split('_')[0];
    let category = req.params.req.split('_')[1];
    let collection;
    switch (category){
        case "Sight": collection = Sight; break;
        case "Audio": collection = Audio; break;
        case "Haptic": collection = Haptic; break;
        case "Smell": collection = Smell; break;
        case "Taste": collection = Taste; break;
    }
    collection.findOne({_id: id}, async(err, effect) => {
        if (err) throw err
        if (!effect){
            console.log('Effect dose not exist')
            res.send('Effect does not exist')
        } else{
            console.log(effect);
            res.status(200).send(effect); 
        }
    })    
})

app.get('/CreateEffect/:deviceId', async(req,res) => {
    
    let category = Object.keys(req.body)[0];
    let collection;
    switch (category){
        case "sight_effects": collection = Sight; break;
        case "audio_effects": collection = Audio; break;
        case "haptic_effects": collection = Haptic; break;
        case "smell_effects": collection = Smell; break;
        case "taste_effects": collection = Taste; break;
    }
    let effect = new collection(req.body)
    effect.deviceId = req.params.deviceId;
    await effect.save();
    console.log('create data successfully')
    res.status(200).send(effect)
})

app.get('/ManageEffect/:effectId', async(req,res) => {
    let category = Object.keys(req.body)[0];
    console.log(req.params.effectId)
    let effect;
    switch (category){
        case "sight_effects":
            effect = await Sight.findById(req.params.effectId)
            effect.sight_effects[0].start = req.body.sight_effects[0].start;
            effect.sight_effects[1].start = req.body.sight_effects[1].start;
            effect.sight_effects[2].start = req.body.sight_effects[2].start;
            effect.sight_effects[3].start = req.body.sight_effects[3].start;
            effect.sight_effects[0].description.pattern[0].type = req.body.sight_effects[0].description.pattern[0].type
            effect.sight_effects[1].description.pattern[0].type = req.body.sight_effects[1].description.pattern[0].type
            effect.sight_effects[2].description.pattern[0].type = req.body.sight_effects[2].description.pattern[0].type
            effect.sight_effects[3].description.pattern[0].type = req.body.sight_effects[3].description.pattern[0].type
            effect.sight_effects[0].description.pattern[0].LengthMs = req.body.sight_effects[0].description.pattern[0].LengthMs 
            effect.sight_effects[1].description.pattern[0].LengthMs = req.body.sight_effects[1].description.pattern[0].LengthMs 
            effect.sight_effects[2].description.pattern[0].LengthMs = req.body.sight_effects[2].description.pattern[0].LengthMs 
            effect.sight_effects[3].description.pattern[0].LengthMs = req.body.sight_effects[3].description.pattern[0].LengthMs 
            effect.sight_effects[0].description.rate.frequency = req.body.sight_effects[0].description.rate.frequency
            effect.sight_effects[1].description.rate.frequency = req.body.sight_effects[1].description.rate.frequency
            effect.sight_effects[2].description.rate.frequency = req.body.sight_effects[2].description.rate.frequency
            effect.sight_effects[3].description.rate.frequency = req.body.sight_effects[3].description.rate.frequency
            effect.sight_effects[0].description.pattern[0].colour = req.body.sight_effects[0].description.pattern[0].colour 
            effect.sight_effects[1].description.pattern[0].colour = req.body.sight_effects[1].description.pattern[0].colour 
            effect.sight_effects[2].description.pattern[0].colour = req.body.sight_effects[2].description.pattern[0].colour 
            effect.sight_effects[3].description.pattern[0].colour = req.body.sight_effects[3].description.pattern[0].colour 
            break;
        case "audio_effects": 
            effect = await Audio.findById(req.params.effectId)
            effect.audio_effects[0].start = req.body.audio_effects[0].start;
            effect.audio_effects[1].start = req.body.audio_effects[1].start;
            effect.audio_effects[2].start = req.body.audio_effects[2].start;
            effect.audio_effects[3].start = req.body.audio_effects[3].start;
            effect.audio_effects[0].description.pattern[0].type = req.body.audio_effects[0].description.pattern[0].type
            effect.audio_effects[1].description.pattern[0].type = req.body.audio_effects[1].description.pattern[0].type
            effect.audio_effects[2].description.pattern[0].type = req.body.audio_effects[2].description.pattern[0].type
            effect.audio_effects[3].description.pattern[0].type = req.body.audio_effects[3].description.pattern[0].type
            effect.audio_effects[0].description.pattern[0].LengthMs = req.body.audio_effects[0].description.pattern[0].LengthMs 
            effect.audio_effects[1].description.pattern[0].LengthMs = req.body.audio_effects[1].description.pattern[0].LengthMs 
            effect.audio_effects[2].description.pattern[0].LengthMs = req.body.audio_effects[2].description.pattern[0].LengthMs 
            effect.audio_effects[3].description.pattern[0].LengthMs = req.body.audio_effects[3].description.pattern[0].LengthMs 
            effect.audio_effects[0].description.rate.frequency = req.body.audio_effects[0].description.rate.frequency
            effect.audio_effects[1].description.rate.frequency = req.body.audio_effects[1].description.rate.frequency
            effect.audio_effects[2].description.rate.frequency = req.body.audio_effects[2].description.rate.frequency
            effect.audio_effects[3].description.rate.frequency = req.body.audio_effects[3].description.rate.frequency
            break;
        case "haptic_effects": 
            effect = await Haptic.findById(req.params.effectId)
            effect.haptic_effects[0].start = req.body.haptic_effects[0].start;
            effect.haptic_effects[1].start = req.body.haptic_effects[1].start;
            effect.haptic_effects[2].start = req.body.haptic_effects[2].start;
            effect.haptic_effects[3].start = req.body.haptic_effects[3].start;
            effect.haptic_effects[0].description.pattern[0].type = req.body.haptic_effects[0].description.pattern[0].type
            effect.haptic_effects[1].description.pattern[0].type = req.body.haptic_effects[1].description.pattern[0].type
            effect.haptic_effects[2].description.pattern[0].type = req.body.haptic_effects[2].description.pattern[0].type
            effect.haptic_effects[3].description.pattern[0].type = req.body.haptic_effects[3].description.pattern[0].type
            effect.haptic_effects[0].description.pattern[0].LengthMs = req.body.haptic_effects[0].description.pattern[0].LengthMs 
            effect.haptic_effects[1].description.pattern[0].LengthMs  = req.body.haptic_effects[1].description.pattern[0].LengthMs 
            effect.haptic_effects[2].description.pattern[0].LengthMs  = req.body.haptic_effects[2].description.pattern[0].LengthMs 
            effect.haptic_effects[3].description.pattern[0].LengthMs  = req.body.haptic_effects[3].description.pattern[0].LengthMs 
            effect.haptic_effects[0].description.rate.frequency = req.body.haptic_effects[0].description.rate.frequency
            effect.haptic_effects[1].description.rate.frequency = req.body.haptic_effects[1].description.rate.frequency
            effect.haptic_effects[2].description.rate.frequency = req.body.haptic_effects[2].description.rate.frequency
            effect.haptic_effects[3].description.rate.frequency = req.body.haptic_effects[3].description.rate.frequency
            break;
        case "smell_effects": 
            effect = await Smell.findById(req.params.effectId)
            effect.smell_effects[0].start = req.body.smell_effects[0].start;
            effect.smell_effects[1].start = req.body.smell_effects[1].start;
            effect.smell_effects[2].start = req.body.smell_effects[2].start;
            effect.smell_effects[3].start = req.body.smell_effects[3].start;
            effect.smell_effects[0].description.pattern[0].type = req.body.smell_effects[0].description.pattern[0].type
            effect.smell_effects[1].description.pattern[0].type = req.body.smell_effects[1].description.pattern[0].type
            effect.smell_effects[2].description.pattern[0].type = req.body.smell_effects[2].description.pattern[0].type
            effect.smell_effects[3].description.pattern[0].type = req.body.smell_effects[3].description.pattern[0].type
            effect.smell_effects[0].description.pattern[0].LengthMs = req.body.smell_effects[0].description.pattern[0].LengthMs 
            effect.smell_effects[1].description.pattern[0].LengthMs = req.body.smell_effects[1].description.pattern[0].LengthMs 
            effect.smell_effects[2].description.pattern[0].LengthMs = req.body.smell_effects[2].description.pattern[0].LengthMs 
            effect.smell_effects[3].description.pattern[0].LengthMs = req.body.smell_effects[3].description.pattern[0].LengthMs 
            effect.smell_effects[0].description.rate.frequency = req.body.audio_effects[0].description.rate.frequency
            effect.smell_effects[1].description.rate.frequency = req.body.audio_effects[1].description.rate.frequency
            effect.smell_effects[2].description.rate.frequency = req.body.audio_effects[2].description.rate.frequency
            effect.smell_effects[3].description.rate.frequency = req.body.audio_effects[3].description.rate.frequency
            effect.smell_effects[0].description.pattern[0].fragrance = req.body.smell_effects[0].description.pattern[0].fragrance 
            effect.smell_effects[1].description.pattern[0].fragrance = req.body.smell_effects[1].description.pattern[0].fragrance 
            effect.smell_effects[2].description.pattern[0].fragrance = req.body.smell_effects[2].description.pattern[0].fragrance 
            effect.smell_effects[3].description.pattern[0].fragrance = req.body.smell_effects[3].description.pattern[0].fragrance 
            break;
        case "taste_effects":
            effect = await Taste.findById(req.params.effectId)
            effect.taste_effects[0].start = req.body.taste_effects[0].start;
            effect.taste_effects[1].start = req.body.taste_effects[1].start;
            effect.taste_effects[2].start = req.body.taste_effects[2].start;
            effect.taste_effects[3].start = req.body.taste_effects[3].start;
            effect.taste_effects[0].description.pattern[0].type = req.body.taste_effects[0].description.pattern[0].type
            effect.taste_effects[1].description.pattern[0].type = req.body.taste_effects[1].description.pattern[0].type
            effect.taste_effects[2].description.pattern[0].type = req.body.taste_effects[2].description.pattern[0].type
            effect.taste_effects[3].description.pattern[0].type = req.body.taste_effects[3].description.pattern[0].type
            effect.taste_effects[0].description.pattern[0].LengthMs = req.body.taste_effects[0].description.pattern[0].LengthMs 
            effect.taste_effects[1].description.pattern[0].LengthMs = req.body.taste_effects[1].description.pattern[0].LengthMs 
            effect.taste_effects[2].description.pattern[0].LengthMs = req.body.taste_effects[2].description.pattern[0].LengthMs 
            effect.taste_effects[3].description.pattern[0].LengthMs = req.body.taste_effects[3].description.pattern[0].LengthMs 
            effect.taste_effects[0].description.rate.frequency = req.body.taste_effects[0].description.rate.frequency
            effect.taste_effects[1].description.rate.frequency = req.body.taste_effects[1].description.rate.frequency
            effect.taste_effects[2].description.rate.frequency = req.body.taste_effects[2].description.rate.frequency
            effect.taste_effects[3].description.rate.frequency = req.body.taste_effects[3].description.rate.frequency
            effect.taste_effects[0].description.pattern[0].flavour = req.body.taste_effects[0].description.pattern[0].flavour 
            effect.taste_effects[1].description.pattern[0].flavour = req.body.taste_effects[1].description.pattern[0].flavour 
            effect.taste_effects[2].description.pattern[0].flavour = req.body.taste_effects[2].description.pattern[0].flavour 
            effect.taste_effects[3].description.pattern[0].flavour = req.body.taste_effects[3].description.pattern[0].flavour 
            break;
    }    
    await effect.save();
    console.log(effect);
    res.status(200).send(effect)
})

