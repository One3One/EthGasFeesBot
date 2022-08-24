var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
const {
    Telegram
} = require('telegraf')

const tg = new Telegram(process.env.BOT_TOKEN)

app.use(bodyParser.json()) // for parsing application/json

app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

//ETHGASFEES
app.get('/ethgasfees', function(req, res) {

axios.get('https://data-api.defipulse.com/api/v1/egs/api/ethgasAPI.json?api-key=' + process.env.DEFI_TOKEN ).then(res => {
   
   var first = res.data.fastest / 10 + " Gwei";
   var second = res.data.fast / 10 + " Gwei";
   var third = res.data.safeLow/ 10 + " Gwei";
   var fourth = res.data.average / 10 + " Gwei";
     
   const txt = "Eth Gas Fees 💎⛽ \n\nFastest: " + first + "\nFast: " + second + "\nStandard: " + third +
   "\nAverage: " + fourth
           
    tg.sendMessage(process.env.GROUP_ID, txt)
})
     res.send('Gas Fees Stated')
    //re.sendFile('views/index.html' , { root : __dirname});
})



app.listen(3000, function() {
    console.log('Telegram app listening on port 3000!')
})