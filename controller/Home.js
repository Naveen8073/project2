const sequelize=require('sequelize');
var crypto=require('crypto');
const flash = require('connect-flash');
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'delivery',
});

module.exports= {
index:function (req,res){
  res.render('home',{msg:req.flash('msg')});	
},
login: function(req,res){
  res.render('login',{msg:req.flash('msg')});	
},
register: function(req,res){
  res.render('register',{msg:req.flash('msg')});	
},
feature: function(req,res){
if(req.session && req.session.auth==true){
  res.render('feature',{msg:req.flash('msg')});	
}else{
  req.flash('msg', 'Please login first.');
  res.redirect('/home');
}
},
about: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('about',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},

stock: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('stock',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},
staff: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('staff',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},
equipment: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('equipment',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},
delivery: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('delivery',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},
account: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('account',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},
customer: function(req,res){
  if(req.session && req.session.auth==true){
    res.render('customer',{msg:req.flash('msg')});	
  }else{
    req.flash('msg', 'Please login first.');
    res.redirect('/home');
  }
},


signup: function(req,res){
  var request_data = req.body;
 // console.log(request_data,"all submit data");return;
  request_data.password = crypto.createHash('sha1').update(request_data.password).digest('hex');
  var query ='insert into users values(" " ,"'+request_data.name+'","'+request_data.email+'","'+request_data.password+'","'+request_data.birthday+'","'+request_data.street_no+'","'+request_data.street_name+'","'+request_data.complement+'","'+request_data.city+'","'+request_data.state+'","'+request_data.country+'","'+request_data.postal_code+'"," "," ")';
  connection.query(query,(error,result) =>{
    if (error) throw error;
    req.flash('msg', 'Signup Successfully.');
    res.redirect('/login');
  });
},
login_user: function(req,res){
  req.body.password= crypto.createHash('sha1').update(req.body.password).digest('hex');
  var  queryString ='select * from users where email = "'+req.body.email+'" and password = "'+req.body.password+'"';
  connection.query(queryString, (error, result) => {
    if (error) throw error;
    if(result.length > 0){
      res.session = req.session;
      req.session.email = result[0].email;
      req.session.name = result[0].name;
      res.session.auth = true;
      req.flash('msg', 'Login Successfully.');
      res.redirect('/feature');
    }else{
      req.flash('msg', 'Invalid login details.')
      res.redirect('/login');
    }
  });
},
logout: function(req,res){
  req.session.auth = false;
  req.flash('msg', 'Logout Successfully.')
  res.redirect('/home');
},
forgot_password : function(req,res){
  res.render('forgot_password',{msg:req.flash('msg')});	
},
forgot: function(req,res){

  req.flash('msg', 'Password Send Successfully.')
  res.redirect('/login');
},
}