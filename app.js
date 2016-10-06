var express = require('express');
var app = express();
var router = express.Router();
//Node.Js does not server static content on it's own, 
//routes has to defined for serving static content via Node.
app.use('/scripts', express.static(__dirname + '/js/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));


//use mongoose 
var mongoose = require('mongoose');
//connect to mongodb
mongoose.connect('mongodb://localhost/testDB',function(err) {
    if (err) throw err;
});
//schema
var UserSchema = mongoose.Schema(
  {
    id:   { type: String, require: true, unique: true },
    name:      { type: String },  
    password:  { type: String },
    email:     { type: String , require: true, unique: true },
    role:      { type: String },
    createDt:  { type: Date },
    updateDt:  { type: Date }
  }
);
//model
var User = mongoose.model('user', UserSchema);

router.get('/', function(req, res) {
  // console.log('home page!');
  // console.log('cookies:'+ req.cookies);
  res.sendFile(__dirname + '/index.html');
});


//Create
router.get('/insert', function(req, res) {
  console.log('get!');
   console.log('name: '+req.query.name);
   console.log('id: '+req.query.id);
   console.log('pwd: '+req.query.pwd);

   var newUser = new User({
      name: req.query.name,
      id: req.query.id,
      password: req.query.pwd,
      email: req.query.email,
      role: 'n',
      createDt: new Date(),
      updateDt: new Date()
   });

   newUser.save(function(err){
    if(err){
      console.error(err);
      console.log("insert wrong.");

      res.send(err.code);
    }
    else{
      console.log("insert OK.");
      res.send(true);
    }
   });

   
});

//Read  
router.get('/query', function(req, res) {
	console.log('query!');
  console.log('id: '+req.query.id);

  console.log('id=null: '+req.query.id ===null );
  console.log('id=undefined: '+req.query.id ===undefined );
  // console.log('id: '+req.params.id);
  if(req.query.id===null || req.query.id===undefined){
    User.find(function(err, users) {
      console.log("[find]");
      if (!err){       
        console.log(users);
          for(var idx in users){
            console.log(users[idx].name);
          }
          res.send(users); 
      } else {throw err;}
    });   
  }
  else{
    User.find( {"id":req.query.id}, function ( err, users ){
      console.log("[findById]");
      if (!err){        
          console.log(users);
          for(var idx in users){
            console.log(users[idx].name);
          }
          console.log("send back");
          res.send(users); 
      } 
      else {
        throw err;
      }

    });
  }
  // else{
  //   User.findById( req.query.id, function ( err, users ){
  //     console.log("[findById]");
  //     // if (!err){ 
        
  //       console.log(users);
  //         for(var idx in users){
  //           console.log(users[idx].name);
  //         }
  //         res.send(users); 
  //     // } 
  //     // else {
  //     //   throw err;
  //     // }

  //   }); 
  // }
  //   console.log("find without id");
   

});


//Update




//Delete
router.get('/delete', function(req, res) {
  console.log('delete! '+req.query.target);
  var target = req.query.target;
  if(target!==null && target!==undefined){

    // User.find({'id':target}).remove(function(err) {
    //   if (err)
    //     console.log("Error while deleting " + err.message);
    // });
    // 
  
    User.find({'id':target},function(err, users) {
      console.log(users);
      if(users.length===0){
        console.log("User "+target+" not exist");
      }
      else{
        users[0].remove(function(err) {
          if (err)
          console.log("Error while deleting " + err.message);
        });
      }    
    });
  }
  else{
    console.log("User is null");
  }
});



app.use('/', router);

app.listen(8000,function(){
    console.log("Started on port 8000");
});


