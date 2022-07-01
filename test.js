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