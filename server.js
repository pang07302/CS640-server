const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.port || 8000
const app = express()
const {Device, Effect, Sight, Audio, Haptic, Smell, Taste} = require('./model/model')

const {exec} =  require('node:child_process');




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

// check whether the default table contains the device
app.get('/fans', async(req,res)=>{
    console.log(req.body);
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
            
            console.log(`Device: ${device.name}, ID: ${device.id} is ${req.body.status}`)
            res.status(200).send(`Device ID: ${device.id} is ${req.body.status}`); 
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

app.get('/createEffect/:deviceId', async(req,res) => {
    console.log(req.body)
    console.log(req.params.deviceId)
    console.log(req.body.sight_effects[0].description)
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