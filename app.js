const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const bodyParser = require('body-parser');

// Handlebars Middleware
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Index Route
app.get('/',(req, res)=>{
  const title = 'Welcome';
  res.render('index',{
    title:title
  });
});

//About Route
app.get('/about',(req,res)=>{
  res.render('about');
});

//Add Idea Page
app.get('/ideas/add',(req,res)=>{
  res.render('ideas/add');
});

//Process Form
app.post('/ideas', (req,res)=>{
  let errors =[];

  if(!req.body.title){
    errors.push({text:'Please add a title'});
  }

  if(!req.body.details){
    errors.push({text:'Pleas add some details'});
  }

  if(errors.length >0){
    res.render('ideas/add',{
      errors:errors,
      title:req.body.title,
      details:req.body.details
    });
  }

});

const port = 5000;


app.listen(port,()=>{
  console.log(`Server started on port ${port}`);
});
