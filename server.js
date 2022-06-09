const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = process.env.port || 8000
const app = express()
const {Haptic} = require('./model/model')

const url = 'mongodb+srv://user:user@cluster0.ts2fe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
}).then(()=>{
    console.log('Connected to database')
}).catch(err => console.log(err))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true
    // methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    // allowedHeaders: 'Content-Type,Access-Token'
}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true, limit: '50mb'}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

app.listen(PORT, () => {
    console.log(`Server listening or port ${PORT}`)
})


app.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Liam","Ginseng","Fruit"]);
   });

app.post('/addData', async (req, res)=> {
    console.log(req.body);
    let haptic = new Haptic(req.body)
    console.log(haptic)
    await haptic.save()
    console.log('create data successfully')
    res.status(200).send(haptic)
 });

app.get('/getData', async (req, res)=>{
    request(
        { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
        (error, response, body) => {
            console.log(',,,')
            let haptic = await Haptic.find();
            res.send(haptic)
        }
    )        
});