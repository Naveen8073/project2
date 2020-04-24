
Home = require('../controller/home');
module.exports = function(app){

  app.route('/home').get(Home.index);
  app.route('/').get(Home.index);
  app.route('/login').get(Home.login);
  app.route('/register').get(Home.register);
  app.route('/feature').get(Home.feature);
  //  signup api route
  app.route('/signup').post(Home.signup);
  //  user login api route
  app.route('/login_user').post(Home.login_user);
  app.route('/logout').get(Home.logout);
  app.route('/about').get(Home.about);
  app.route('/stock').get(Home.stock);
  app.route('/staff').get(Home.staff);
  app.route('/equipment').get(Home.equipment);
  app.route('/delivery').get(Home.delivery);
  app.route('/accounts').get(Home.account);
  app.route('/customers').get(Home.customer);
  app.route('/forgot_password').get(Home.forgot_password);
  app.route('/forgot').post(Home.forgot);





  };
