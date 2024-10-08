const express = require("express");
const app = express();
const HTTP_PORT = 8080; 

// i dont know if this is right
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const LegoData = require("./modules/legoSets");
const legoData = new LegoData();
const path = require('path');
legoData.initialize(); 



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`);
});

app.use(express.json());

app.get('/lego/sets', async (req, res) => {
    const theme = req.query.theme;
    let themeSets=0;
    try {
        // await legoData.initialize(); 
        themeSets = await legoData.getSetsByTheme(theme)

        res.json(themeSets);
    } catch (error) {
        console.error(error);
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

app.get('/lego/sets/:set_num', async (req, res) => {
    const setNum = req.params.set_num;
    let setNum1 = 0;
    try {
        // await legoData.initialize(); 
        setNum1  = await legoData.getSetByNum(setNum)

        res.json(setNum1);
    } catch (error) {
        console.error(error);
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    }
});

