const express = require('express')
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));







// get request for home page
app.get('/', (req, res) => {
    fs.readdir(`./hisaab`,(err,file) => {
        if (err) return res.status(500).send(err);
        res.render('index', { file: file });   ///if we use return then we can't use else statement
    })
});

// get request for edit page
app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`, 'utf-8', (err, fileData) => {
        if (err) return res.status(500).send(err);
        res.render('edit', { fileData, filename: req.params.filename });
    });
});

// get request for hisaab page
app.get('/hisaab/:filename', (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`, 'utf-8', (err, fileData) => {
        if (err) return res.status(500).send(err);
        res.render('hisaab', { fileData, filename: req.params.filename });
    });
});

// get request for delete page
app.get('/delete/:filename', (req, res) => {
    fs.unlink(`./hisaab/${req.params.filename}`,(err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    });
});

// post request for update page
app.post('/update/:filename', (req, res) => {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    })
})

// get request for create page
app.get('/create', (req, res) => {
    res.render('create');
})

// post request for create page
app.post('/createhisaab', (req, res) => {

    var currentDate = new Date();
    var date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;


    fs.writeFile(`./hisaab/${req.body.title}_${date}.txt`, req.body.content, (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/');
    })
})











app.listen(4000, () => {
    console.log('Server is running on port 3000');
});
