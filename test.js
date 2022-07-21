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
