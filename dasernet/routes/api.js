var express = require('express');
var router = express.Router();
var passport = require('passport');
var user = require('../models/user');
var config = require('../utils/config');
var connection = require('../utils/db');
var _ = require('lodash');
var constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const authenticate = expressJwt({ secret: 'server secret' });


function authenticat(req,res,next){
    
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) return res.status(401).json({ code: '404' }); //auth: false, message: 'No token provided.' });
  
  jwt.verify(token, config.secrets, function(err, decoded) {
    if (err)
	{		return res.status(500).json({ code: '404' }); //auth: false, message: 'Failed to authenticate token.' });
	}
	else
	{
		var re=decoded.id;
		next();
	}
  });
}



// Signu Api
router.post('/customer/registration', function (req, res) {
  var data = req.body;
		
  if (!_.isUndefined(data.email)) {
    user.registration(data).then(function (data) {
      return res.status(200).json({
		code:'1',
		userid:data.id
		//status: 'Registration successful!'
      });
    }, function (error) {
      return res.status(500).json({
        //status: error
		code:'0',
		userid:''
		
		
      });
    });
  } else { // Incorrect data
    return res.status(400).json({
     // status: 'Incomplete data'
	 code:'0',
	 userid:''
		
    });
  }
});

// Email Confirmation
router.post('/customer/emailconfirmation', function (req, res) {
  var data = req.body;
		
    user.emailconfirm(data).then(function (data) {
      if(data!="")
		{
	  return res.status(200).json({
		code:'1',
		data
		//datas:data.affectedRows
      });
	}
	else
	{
		return res.status(200).json({
		code:'0',
		data
		//datas:data.affectedRows
		//status: 'Registration successful!'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		code:'0'
		
      });
    });
  
  
});



// Forgot password
router.post('/customer/forgotpassword', function (req, res) {
  var data = req.body;
		
    user.forgotpassword(data).then(function (data) {
      if(data!="")
		{
	  return res.status(200).json({
		code:'1'
		//datas:data.affectedRows
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
		//datas:data.affectedRows
		//status: 'Registration successful!'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		code:'0'
		
      });
    });
  
  
});





// Login
router.post('/customer/signin', function (req, res, next) {
 
passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(200).json({
        code:'0'
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(200).json({
         
		  code:'0'
        });
      }
      req.token = jwt.sign({ id: req.user.id }, config.secrets, { expiresIn: 60 * 60 * 24 });
	 
      res.status(200).json({
		
				id:user.user_id,
		type:user.signer_type,
		phonenumber:user.phonenumber,
		emailaddress:user.emailaddress,
		first_name:user.first_name,
		last_name:user.last_name,
		dob:user.dob,
		
		code:'1',
		address1:user.address_line1,
		address2:user.address_line2,
		city:user.city,
		state:user.state,
		country:user.country,
		zip:user.zip,		
		orgn:user.name,
		token:req.token
		

		  

      });
	  console.log(user);
	  console.log(req.token);
    });
  })(req, res, next);


  
});



// help
router.post('/customer/support', authenticat,function (req, res) {
  var data = req.body;
		
    user.loginhelp(data).then(function (data) {
      if(data.affectedRows!=0)
		{
	  return res.status(200).json({
		code:'1',
		
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		code:'0'
		
      });
    });
  
  
});


// Account update
router.post('/customer/accountupdate', authenticat,function (req, res) {
  var data = req.body;
		
    user.updateaccount(data).then(function (data) {
      if(data.affectedRows!=0)
		{
	  return res.status(200).json({
		
		code:'1'
		
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        
		code:'0'
		
      });
    });
  
  
});



// Schedule appointment
router.post('/customer/schedule', authenticat,function (req, res) {
  var data = req.body;
		
    user.schedule_appointment(data).then(function (data) {
      if(data.sreq_id!="" && data.sreq_id!=0)
		{
	  return res.status(200).json({
		
		code:'1',
		
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        
		code:'0'
		
      });
    });
  
  
});








// Appointments
router.post('/customer/appointments', authenticat, function (req, res) {
  var data = req.body;
		
    user.appointments(data).then(function (data) {
		
      if(data!="")
		{
	  return res.status(200).json({
		
		data
      });
	}
	else
	{
		return res.status(200).json({
		
		data
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		data
      });
    });
  
  
});



// Appointments actions
router.post('/customer/appointments_actions',authenticat, function (req, res) {
  var data = req.body;
		
    user.appointments_actions(data).then(function (data) {
		console.log(data);
      if(data.affectedRows!=0)
		{
	  return res.status(200).json({
		
		code:'1'
		
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		code:'0'
		
      });
    });
  
  
});




// customer getservices
router.post('/customer/servicesget', authenticat, function (req, res) {
  var data = req.body;
		
    user.appointments_actionsa(data).then(function (data) {
      if(data!="" && data!=0)
		{
	  return res.status(200).json({
		
		services:data
		
		
      });
	}
	else
	{
		return res.status(200).json({
		services:data
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		services:data
		
      });
    });
  
  
});



// get sub services
router.post('/customer/subservices',authenticat, function (req, res) {
  var data = req.body;
		
    user.customersubservices(data).then(function (data) {
      if(data!=0)
		{
	  return res.status(200).json({
		
		category:data
		
      });
	}
	else
	{
		return res.status(200).json({
		category:data
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		category:data
		
      });
    });
  
  
});





// change password
router.post('/customer/changepassword',authenticat, function (req, res) {
  var data = req.body;
		
    user.customerchangepassword(data).then(function (data) {
      if(data!="")
		{
	  return res.status(200).json({
		
		code:'1'
		
      });
	}
	else
	{
		return res.status(200).json({
		code:'0'
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        
		code:'0'
		
      });
    });
  
  
});




// Send notifications
router.post('/customer/sendnotifications', authenticat, function (req, res) {
  var data = req.body;
		
    user.send_notifications(data).then(function (data) {
		
      if(data!="")
		{
	  return res.status(200).json({
		
		data
		
      });
	}
	else
	{
		return res.status(200).json({
		
		data
      });
		
	}
	
    }, function (error) {
      return res.status(500).json({
        //status: error
		data
      });
    });
  
  
});

router.post('/admin/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.token = jwt.sign({ id: req.user.id, }, 'server secret', { expiresIn: 60 * 60 * 24 });
      res.status(200).json({
        data: user,
        token: req.token
      });
    });
  })(req, res, next);
});


router.post('/authenticate', function(req, res) {

	// find the user
	user.findOne({
		name: req.body.name
	}, function(err, user) {

		if (err) throw err;

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		} else if (user) {

			// check if password matches
			if (user.password != req.body.password) {
				res.json({ success: false, message: 'Authentication failed. Wrong password.' });
			} else {

				// if user is found and password is right
				// create a token
				var payload = {
					admin: user.admin	
				}
				var token = jwt.sign(payload, app.get('superSecret'), {
					expiresIn: 86400 // expires in 24 hours
				});

				res.json({
					success: true,
					message: 'Enjoy your token!',
					token: token
				});
			}		

		}

	});
});


router.get('/customer/logout', function (req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});



router.post('/customer/disclosures',  function (req, res) {
  var data = req.body;
  if (!_.isUndefined(data.signertype)) {
    user.disclosures(data).then(function (data) {
      return res.status(200).json({
        status: "ok",
        reultdata: data
      });
    }, function (error) {
        return res.status(500).json({
          status: error
        });
    });
  } else { // Incorrect data
    return res.status(400).json({
      status: 'Incomplete data'
    });
  }
});





module.exports = router;
