const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const qr = require("qrcode");

//Setting the view engine 
app.set('view engine', 'ejs');

//using body parser 
app.use(bodyParser.urlencoded({ extended: false }));

//routes to render index.ejs file
app.get('/', (req, res) => {
    res.render('index.ejs');

});

app.post('/scan', (req, res) => {
    const url = req.body.url;
    // console.log(url);
    if (url.length === 0) res.send('No Data Provided');

    //converting the url into a png image
    //toDataURL takes url as input and converts it into a source as src

    qr.toDataURL(url, (err, src) => {
        if (err) throw err;
        res.render('scan', { src });
    })
})


const port = 8000;
app.listen(port, () => console.log("Server at 8000"));