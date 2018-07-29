const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper('getCurrentDate',()=>{
    return new Date().getFullYear();
});
app.set('viewengine','hbs');

app.use((req, res, next)=>{
    var now = new Date().toISOString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n',(error)=>{
        console.log("server couldn't log error.");
    });

    next();
});

/* app.use((req,res,next)=>{
    res.render('maintainence.hbs');
}); */

app.use(express.static(__dirname+'/public'))

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});
app.get('/',(req,res)=>{
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our webste'
    });
});

app.get('/bad',((req,res)=>{
    res.send({
        code:400,
        message:'an error occurred'
    });
}));


app.listen(port,()=>{
    console.log(`Server is running (:${port}) ...`);
});