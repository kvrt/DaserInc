var moment = require('moment');
var _ = require('lodash');
var q = require('q');
var connection = require('../utils/db');
var config = require('../utils/config');

var mailer = require('../utils/mailer');
var constantsVar = require('../utils/constants');
var picsPath = './profilePics/';
var fs = require('fs');
var randtoken = require('rand-token');
var user = function () {
};


// User Signup

user.registration = function (data) {
        var deffered = q.defer();
		

                        var verifyToken = randtoken.generate(6);
                        var newUserMysql = new Object();
		
						newUserMysql.signer=data.signer;
						newUserMysql.addr1 = data.addr1;
                        newUserMysql.addr2 = data.addr2;
						newUserMysql.state = data.state;
                        newUserMysql.city = data.city;
						newUserMysql.zip = data.zip;
                        newUserMysql.country = data.country;
                        
                        
						var addrid=0;
						var orgid=0;
						
						
                        newUserMysql.phone = data.phone;
						newUserMysql.fname = data.fname;
						newUserMysql.lname = data.lname;
						newUserMysql.dob = data.dob;
						newUserMysql.email = data.email;
						newUserMysql.pass = data.pass;
						newUserMysql.orgname = data.orgname;

						                        data.active = 'N';
                        var encryptedPassword = MD5(data.pass);
                  		
						var insertQuery = "insert into users(phonenumber,signer_type,first_name,last_name,dob,emailaddress,password,stripe_customer_id,org_id,address_id,profilephoto,background_checked,active,verified,vericode,created_on,modified_on) values('"+newUserMysql.phone+"','"+newUserMysql.signer+"','"+newUserMysql.fname+"','"+newUserMysql.lname+"','"+newUserMysql.dob+"','"+newUserMysql.email+"','"+encryptedPassword+"','','"+orgid+"','"+addrid+"','NA','Y','N','N','"+verifyToken +"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"')";	
						
                        connection.query(insertQuery, function (error, rows) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else {
                                        newUserMysql.id = rows.insertId;
										
										
														var addr = "insert into service_request_address(user_id,address_line1,address_line2,city,state,zip,country) values('"+newUserMysql.id+"','"+newUserMysql.addr1+"','"+newUserMysql.addr2+"','"+newUserMysql.city+"','"+newUserMysql.state+"','"+newUserMysql.zip+"','"+newUserMysql.country+"')";

										connection.query(addr, function (upErr, addrrows) {
											var addrid = addrrows.insertId;
											var upQry = "UPDATE users set address_id ='" + addrid + "' WHERE id ='"+newUserMysql.id+"'";

                        connection.query(upQry, function (upErr, upRows) {});
											
										});
										
										if(newUserMysql.orgname!=0)
										{
										var org = "insert into organisations(name) values('"+newUserMysql.orgname+"')";

										connection.query(org, function (upErr, orgrows) {
											var orgid = orgrows.insertId;
											var upQry = "UPDATE users set org_id ='" + orgid + "' WHERE id ='"+newUserMysql.id+"'";

									connection.query(upQry, function (upErr, upRows) {});											
																					
										});
										
										}
										
                        
                                        deffered.resolve(newUserMysql);

                                }
                        });
               // }
        //});
        return deffered.promise;
};




user.emailconfirm = function (data) {
        var deffered = q.defer();

						var newUserMysql = new Object();
		
						newUserMysql.uid=data.uid;
						newUserMysql.otpcode = data.otpcode;
                        	
						var insertQuery = " select * from users where vericode='"+newUserMysql.otpcode+"' and vericode!='' and id='"+newUserMysql.uid+"'  ";	
						
                        connection.query(insertQuery, function (error, rows) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								if(rows!="")
								{
									//if()
										user.createStripeAccount(rows[0].emailaddress);
														var ecnf = " update users set active='Y',verified='Y',vericode='' where id='"+newUserMysql.uid+"' ";

										connection.query(ecnf, function (upErr, result) {
											//console.log(newUserMysql.otpcode);
											
										});
								}
										deffered.resolve(rows);
											
										
                                        

                                }
                        });
        return deffered.promise;
};




user.forgotpassword = function (data) {
        var deffered = q.defer();

						var newUserMysql = new Object();
		
						newUserMysql.uid=data.forgot;
							
						var fpQuery = " select * from users where emailaddress='"+newUserMysql.uid+"' ";	
						
                        connection.query(fpQuery, function (error, rows) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									deffered.resolve(rows);
								
     //   mailer.sendVerificationMail_forgotpassword(rows.emailaddress,  rows.id, rows.vericode,rows.first_name,rows.last_name);
                                
                                }
                        });
        return deffered.promise;
};



user.login = function (data) {
        var deffered = q.defer();

						var newUserMysql = new Object();
		
						newUserMysql.uname=data.username;
						newUserMysql.pass=MD5(data.password);
						
							
						var lginQuery=" select a.first_name as first_name,a.last_name as last_name,a.id as id,a.phonenumber as phonenumber,a.signer_type as signer_type,a.emailaddress as emailaddress,c.address_line1 as address1,c.address_line2 as address2,c.city as city,c.state as state,c.country as country,c.zip as zip from users a, service_request_address c where c.id=a.address_id and a.emailaddress='"+newUserMysql.uname+"' and a.password='"+newUserMysql.pass+"' and a.active='Y' and a.verified='Y' ";
                        connection.query(lginQuery, function (error, rowsg) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									deffered.resolve(rowsg);
									
									
						        }
                        });
        return deffered.promise;
};


user.updateaccount = function (data) {
        var deffered = q.defer();

						var helpMysql = new Object();
		
					
						helpMysql.id=data.id;
						helpMysql.type=data.type;
						helpMysql.fname=data.fname;
						helpMysql.lname=data.lname;
						helpMysql.dob=data.dob;
						helpMysql.phone=data.phone;
						helpMysql.orgn=data.orgn;
						helpMysql.addr1=data.addr1;
						helpMysql.addr2=data.addr2;
						helpMysql.state=data.state;
						helpMysql.city=data.city;
						helpMysql.zipcode=data.zipcode;
						helpMysql.country=data.country;
						if(helpMysql.type=="Seller")
						{
						var orgQuery = " select * from users where id='"+helpMysql.id+"' ";	
						connection.query(orgQuery, function (error, rowsorg) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								var orgsid=rowsorg[0].org_id;
								
                        connection.query("update organisations set name='"+helpMysql.orgn+"' where id='"+orgsid+"'", function (error, rowsorg) { });
								
								}
						});
						
						
							
						}
							
						var upaddrQuery = " update service_request_address set address_line1='"+helpMysql.addr1+"',address_line2='"+helpMysql.addr2+"',city='"+helpMysql.city+"',state='"+helpMysql.state+"',zip='"+helpMysql.zipcode+"',country='"+helpMysql.country+"' where user_id='"+helpMysql.id+"' ";	
						
                        connection.query(upaddrQuery, function (error, rowsuadr) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
						

									connection.query(" update users set modified_on='"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"',first_name='"+helpMysql.fname+"',last_name='"+helpMysql.lname+"',dob='"+helpMysql.dob+"',phonenumber='"+helpMysql.phone+"' where id='"+helpMysql.id+"' ", function (error, rowsuadrup) {
										
										deffered.resolve(rowsuadrup);
										
									});
								
								}
						});
        return deffered.promise;

		
		};


user.loginhelp = function (data) {
        var deffered = q.defer();

						var helpMysql = new Object();
		
						
						helpMysql.type=data.utype;
						helpMysql.id=data.uid;
						helpMysql.subject=data.subject;
						helpMysql.message=data.msg;
						
						
						var helpQuery = " insert into helps(user_id,signer_type,subject,description,created_on) values('"+helpMysql.id+"','"+helpMysql.type+"','"+helpMysql.subject+"','"+helpMysql.message+"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"') ";	
						
                        connection.query(helpQuery, function (error, rowsg) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									deffered.resolve(rowsg);
						        }
                        });
        return deffered.promise;

		
		};



		
user.customerchangepassword = function (data) {
        var deffered = q.defer();

						var helpMysql = new Object();
		
helpMysql.id=data.uid;
						helpMysql.currentpass=MD5(data.chpass1);
						helpMysql.newpass=MD5(data.chpass2);
						
						
						var chgpassQuery = " select * from users where password='"+helpMysql.currentpass+"' and id='"+helpMysql.id+"' ";	
						
                        connection.query(chgpassQuery, function (error, rowscpass) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								if(rowscpass!="")
								{
                        connection.query(" update users set password='"+helpMysql.newpass+"' where id='"+helpMysql.id+"' ", function (error, rowscp) {

						
						});
								}
						deffered.resolve(rowscpass);
								
								}
						});
												

						return deffered.promise;

		
		};



		

user.customersubservices = function (data) {
        var deffered = q.defer();

						var helpMysql = new Object();
		
						
						helpMysql.category=data.name;
						
						
						var servQuery = " SELECT * FROM servicetypes where description='"+helpMysql.category+"' ";	
						
                        connection.query(servQuery, function (error, rowssubs) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								var id=rowssubs[0].id;
                        connection.query(" select id as id,description as tag,rate as amount from servicetype_params where service_type_id='"+id+"' ", function (error, rowscnt) {
						if(error)
						{
							
						}
						else{
						
						deffered.resolve(rowscnt);
						}
						});
								
								
								}
						});
						
        return deffered.promise;

		
		};





user.schedule_appointment = function (data) {
        var deffered = q.defer();

						var aptMysql = new Object();
		
						aptMysql.sdate=data.date;
						aptMysql.id=data.id;
						
						aptMysql.cardid=data.cardid;
						aptMysql.crdstatus=data.statuscard;
						aptMysql.crdtkn=data.cardtoken;
						
										
						
						var service_id=0;
						var addr_id=0;
						var stripeid='';
						var cname="";
						var cdigi=0;
						var ctyp='';
							
						var userQuery = " select * from users where id='"+aptMysql.id+"' ";	
						
                        connection.query(userQuery, function (error, rows) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								 addr_id=rows[0].address_id;
								stripeid=rows[0].stripe_customer_id;
		
						var serviceidQuery = " select * from servicetypes where description='"+data.service+"' ";	
						
                        connection.query(serviceidQuery, function (error, rows_service) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								service_id=rows_service[0].id;
								
								if(data.addr1!="" && data.addr2!="" && data.city!="")
								{
									
									connection.query("select * from service_request_address where address_line1='"+data.addr1+"' and address_line2='"+data.addr2+"' and city='"+data.city+"' and state='"+data.state+"' and zip='"+data.zip+"' and country='"+data.country+"' and id='"+addr_id+"' ", function(error, rowsadr)
									{
										
										if(!rowsadr.length)
										{
															var addr = "insert into service_request_address(user_id,address_line1,address_line2,city,state,zip,country) values('"+aptMysql.id+"','"+data.addr1+"','"+data.addr2+"','"+data.city+"','"+data.state+"','"+data.zip+"','"+data.country+"')";

										connection.query(addr, function (upErr, addrrows) {
											addr_id = addrrows.insertId;
											var upQry = "UPDATE users set address_id ='" + addr_id + "' WHERE id ='"+aptMysql.id+"'";

                        connection.query(upQry, function (upErr, upRows) {});
						
						
						
						
						
						var upaddrQuery = " update service_request_address set address_line1='"+data.addr1+"',address_line2='"+data.addr2+"',city='"+data.city+"',state='"+data.state+"',zip='"+data.zip+"',country='"+data.country+"' where id='"+addr_id+"' ";	
						
                        connection.query(upaddrQuery, function (error, rows_address) {});
						
						
						
								
						var servicerequestQuery = " insert into service_requests(user_id,service_type_id,date_of_service,needed_asap,disclosures_checked,service_request_address_id,seller_user_id,service_amount,status,created_on,modified_on) values('"+data.id+"','"+service_id+"','"+aptMysql.sdate+"','Y','Y','"+addr_id+"','0','"+data.amount+"','P','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"') ";	
						
                        connection.query(servicerequestQuery, function (error, rows_sreq) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
								aptMysql.sreq_id=rows_sreq.insertId;
								
								
								var stripe = require("stripe")(constantsVar.stripeKeys.skKey);
if(aptMysql.cardid=="0")
{
	if(aptMysql.crdstatus=="0")
	{
		stripe.customers.createSource(
  stripeid,
  { source: aptMysql.crdtkn },
  function(err, card) {
	aptMysql.lasts=card.last4;
	aptMysql.brands=card.brand;
	
	
	 connection.query(" update users set Buyer_card_status='1',Buyer_last_fourdigits='"+card.last4+"',Buyer_card_type='"+card.brand+"' where id='"+aptMysql.id+"' ", function (error, rowsurs) {});
	 connection.query(" insert into buyer_payment(buyer_id,service_request_id,card_type,card_last_digit) values('"+aptMysql.id+"','"+aptMysql.sreq_id+"','"+card.brand+"','"+card.last4+"') ", function (error, rows_bpyt) {});
	
	
  });
	}
}


if(aptMysql.cardid!="0")
{
	if(aptMysql.crdstatus=="0")
	{

stripe.customers.update(stripeid, {
  source: aptMysql.crdtkn
}, function(err, customer) {
 
	
  stripe.customers.retrieveCard(
  stripeid,
  customer.default_source,
  function(err, card) {
    aptMysql.lasts=card.last4;
	aptMysql.brands=card.brand;
	
connection.query(" update users set Buyer_card_status='1',Buyer_last_fourdigits='"+card.last4+"',Buyer_card_type='"+card.brand+"' where id='"+aptMysql.id+"' ", function (error, rowsups) {});
connection.query(" insert into buyer_payment(buyer_id,service_request_id,card_type,card_last_digit) values('"+aptMysql.id+"','"+aptMysql.sreq_id+"','"+card.brand+"','"+card.last4+"') ", function (error, rows_bpyt) {});
	

	});
	
  });
	}
}

								
								
								
								// Start data insertion into notifications table
	var sqlServices = " SELECT * from users where signer_type='Seller'";
				 connection.query(sqlServices, function (err, rows) {
		           if (err)
		                   deffered.reject(err);
		           if (!rows.length) {
		                   deffered.reject(false);
		           } else {
		                   var result = [];
//console.log(rows);
                        var serviceTypeParams1 = new Object();
                       i=0;
            		rows.forEach(function(element, index, array){
            			
						
						var notificationIns = " INSERT INTO notifications SET seller_user_id='"+element.id+"',"+
            				"buyer_user_id='"+aptMysql.id+"', request_id='"+aptMysql.sreq_id+"',accept_status='P',created_on=now(), modified_on=now() ";
					connection.query(notificationIns, function (error, rows3) {});
            				
				});
		           }
		   });
		   
		   // End notifications
								
								var pvalue=data.paramv;
								var pamt=data.parama;
								var mvalue=data.max;
								var prm_id=data.prmid;
								
								var pv=pvalue.split("^");
								var pa=pamt.split("^");
								var prid=prm_id.split("^");
							
for(var i=0;i<mvalue;i++) {
    //arr[i] 
	
	
	if(pv[i]!="" && pv[i]!=null && pa[i]!="" && pa[i]!=null )
	{
		
		
								var paramsQuery = " insert into service_request_params(service_request_id,service_type_id,servicetype_param_id,servicetype_param_value,servicetype_param_amount) values('"+aptMysql.sreq_id+"','"+service_id+"','"+prid[i]+"','"+pv[i]+"','"+pa[i]+"') ";	
						
                        connection.query(paramsQuery, function (error, rows_params) {});
			
		
	}
}
								
							deffered.resolve(aptMysql);
								
								}
						});
						
						
											
										});
											
										}
										
									});
									
						
						
								// New address inserted and address id updated into users table and service_requests
								}
								else
								{
									
									
											
						var servicerequestQuery = " insert into service_requests(user_id,service_type_id,date_of_service,needed_asap,disclosures_checked,service_request_address_id,seller_user_id,service_amount,status,created_on,modified_on) values('"+data.id+"','"+service_id+"','"+aptMysql.sdate+"','Y','Y','"+addr_id+"','0','"+data.amount+"','P','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"') ";	
						
                        connection.query(servicerequestQuery, function (error, rows_sreq) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
								aptMysql.sreq_id=rows_sreq.insertId;
								
								
																var stripe = require("stripe")(constantsVar.stripeKeys.skKey);
if(aptMysql.cardid=="0")
{
	if(aptMysql.crdstatus=="0")
	{
		stripe.customers.createSource(
  stripeid,
  { source: aptMysql.crdtkn },
  function(err, card) {
	aptMysql.lasts=card.last4;
	aptMysql.brands=card.brand;
	
	
	 connection.query(" update users set Buyer_card_status='1',Buyer_last_fourdigits='"+card.last4+"',Buyer_card_type='"+card.brand+"' where id='"+aptMysql.id+"' ", function (error, rowsurs) {});
	 connection.query(" insert into buyer_payment(buyer_id,service_request_id,card_type,card_last_digit) values('"+aptMysql.id+"','"+aptMysql.sreq_id+"','"+card.brand+"','"+card.last4+"') ", function (error, rows_bpyt) {});
	
	
  });
	}
}


if(aptMysql.cardid!="0")
{
	if(aptMysql.crdstatus=="0")
	{

stripe.customers.update(stripeid, {
  source: aptMysql.crdtkn
}, function(err, customer) {
 
	
  stripe.customers.retrieveCard(
  stripeid,
  customer.default_source,
  function(err, card) {
    aptMysql.lasts=card.last4;
	aptMysql.brands=card.brand;
	
connection.query(" update users set Buyer_card_status='1',Buyer_last_fourdigits='"+card.last4+"',Buyer_card_type='"+card.brand+"' where id='"+aptMysql.id+"' ", function (error, rowsups) {});
connection.query(" insert into buyer_payment(buyer_id,service_request_id,card_type,card_last_digit) values('"+aptMysql.id+"','"+aptMysql.sreq_id+"','"+card.brand+"','"+card.last4+"') ", function (error, rows_bpyt) {});
	

	});
	
  });
	}
}

								
								
								
								// Start data insertion into notifications table
	var sqlServices = " SELECT * from users where signer_type='Seller'";
				 connection.query(sqlServices, function (err, rows) {
		           if (err)
		                   deffered.reject(err);
		           if (!rows.length) {
		                   deffered.reject(false);
		           } else {
		                   var result = [];
//console.log(rows);
                        var serviceTypeParams1 = new Object();
                       i=0;
            		rows.forEach(function(element, index, array){
            			
						
						var notificationIns = " INSERT INTO notifications SET seller_user_id='"+element.id+"',"+
            				"buyer_user_id='"+aptMysql.id+"', request_id='"+aptMysql.sreq_id+"',accept_status='P',created_on=now(), modified_on=now() ";
					connection.query(notificationIns, function (error, rows3) {});
            				
				});
		           }
		   });
		   
		   // End notifications
								
								var pvalue=data.paramv;
								var pamt=data.parama;
								var mvalue=data.max;
								var prm_id=data.prmid;
								
								var pv=pvalue.split("^");
								var pa=pamt.split("^");
								var prid=prm_id.split("^");
							
					for(var i=0;i<mvalue;i++) {
   
	
	
						if(pv[i]!="" && pv[i]!=null && pa[i]!="" && pa[i]!=null )
						{
		
		
		
								var paramsQuery = " insert into service_request_params(service_request_id,service_type_id,servicetype_param_id,servicetype_param_value,servicetype_param_amount) values('"+aptMysql.sreq_id+"','"+service_id+"','"+prid[i]+"','"+pv[i]+"','"+pa[i]+"') ";	
								connection.query(paramsQuery, function (error, rows_params) {});
			
		
						}
					}
								
							deffered.resolve(aptMysql);
								
								}
						});
									
								}
								// end else statement,regarding existing address
								
								
							
								
								
								
								
								}
								
						});
								
									//deffered.resolve(rowsg);
						        }
                        });
        return deffered.promise;
};




user.appointments = function (data) {
        var deffered = q.defer();

		

						var aptMysql = new Object();
		
						aptMysql.ids=data.id;
						aptMysql.type=data.type;
						
						if(aptMysql.type=="Buyer")
						{
							
						var aptsQuery=" select a.id as id,b.phonenumber as phone,b.emailaddress as mail,a.service_type_id as stid,a.seller_user_id as sellerid,b.first_name as fname,b.last_name as lname,a.date_of_service as service_date,a.service_amount as amount,a.status as status,c.address_line1 as address1,c.address_line2 as address2,c.city as city,c.state as state,c.country as country,c.zip as zip,d.description as servicetype,f.name as organisation from service_requests a, users b,service_request_address c,servicetypes d,organisations f,users_view g where a.seller_user_id=g.id and g.org_id=f.id and a.service_type_id=d.id and c.id=a.service_request_address_id and a.user_id='"+aptMysql.ids+"' and a.user_id=b.id and (a.seller_user_id=0 or a.seller_user_id!=0) ";
                        connection.query(aptsQuery, function (error, rows_apt_usr) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else {
									
									deffered.resolve(rows_apt_usr);
									
									
						}
                        });
							
						}
						else if(aptMysql.type=="Seller")
						{
						var aptsQuery=" select DISTINCT a.id as id,a.seller_user_id as sellerid,a.date_of_service as service_date,a.service_amount as amount,a.status as status,b.first_name as fname ,b.last_name as lname,b.phonenumber as phone,b.emailaddress as mail,c.address_line1 as address1,c.address_line2 as address2,c.city as city,c.state as state,c.country as country,c.zip as zip,d.name as organisation,g.description as servicetype from service_requests a,users b,service_request_address c,organisations d,users_view f,servicetypes g where g.id=a.service_type_id and f.id='"+aptMysql.ids+"' and f.org_id=d.id and c.id=a.service_request_address_id and b.id=a.user_id and (a.seller_user_id='"+aptMysql.ids+"' or a.seller_user_id='0') ";
                        connection.query(aptsQuery, function (error, rows_apt_usr) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else {
									
									deffered.resolve(rows_apt_usr);
								}
						});								
							
							
						}
						
        return deffered.promise;
};




user.send_notifications = function (data) {
        var deffered = q.defer();

						var noti = new Object();
						
						//aptactionsMysql.id=data.id;
							
						
						connection.query(" select * from notifications where s_user_id='"+data.id+"' and  accept_status='P' ", function(err,res){

							var id=res[0].id;
							var bid=res[0].buyer_id;
							var sqid=res[0].service_request_id;


						connection.query(" update notifications set accept_status='C' where id='"+id+"' ", function(errs, res_s){
						if(errs)
						{
							deffered.reject(errs);
						}
						else
						{

						connection.query(" select a.id as id,b.phonenumber as phone,b.emailaddress as mail,a.service_type_id as stid,a.seller_user_id as sellerid,b.first_name as fname,b.last_name as lname,a.date_of_service as service_date,a.service_amount as amount,a.status as status,c.address_line1 as address1,c.address_line2 as address2,c.city as city,c.state as state,c.country as country,c.zip as zip,d.description as servicetype,f.name as organisation from service_requests a, users b,service_request_address c,servicetypes d,organisations f,users_view g where a.seller_user_id=g.id and g.org_id=f.id and a.service_type_id=d.id and c.id=a.service_request_address_id and a.user_id='"+bid+"' and a.user_id=b.id and (a.seller_user_id=0 or a.seller_user_id!=0) and a.service_type_id='"+sqid+"' ", function(error,fdata){ 

						deffered.resolve(fdata);

						});

						}

					});
						});


							
							
							
							
						
        return deffered.promise;
};




user.appointments_actionsa = function (data) {
        var deffered = q.defer();

						var aptactionsMysql = new Object();
						
						aptactionsMysql.id=data.id;
						var closedsrvQuery = " SELECT c.Buyer_card_status as cstatus,c.Buyer_last_fourdigits as ldigits,c.Buyer_card_type as ctype,a.id as id,a.description as name,b.address_line1 as addr1,b.address_line2 as addr2,b.city as city,b.state as state,b.zip as zip,b.country as country FROM servicetypes a,service_request_address b, users c where b.user_id='"+aptactionsMysql.id+"' and c.id='"+aptactionsMysql.id+"' ";
						
                        connection.query(closedsrvQuery, function (error, rowscl) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
									deffered.resolve(rowscl);
						       
								
								}
						});
							
							
							
						
        return deffered.promise;
};




user.appointments_actions = function (data) {
        var deffered = q.defer();

						var aptactionsMysql = new Object();
						
						aptactionsMysql.id=data.id;
						aptactionsMysql.type=data.type;
						aptactionsMysql.record_id=data.recid;
						aptactionsMysql.rec_type=data.mtypes;
						aptactionsMysql.amount=data.amts;
						
						if(aptactionsMysql.rec_type=="Cancelled")
						{
							
						var cancelQuery = " delete from service_requests where id='"+aptactionsMysql.record_id+"' and user_id='"+aptactionsMysql.id+"' ";	
						
                        connection.query(cancelQuery, function (error, rowsc) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
								
						var cancelsrvQuery = " delete from service_request_params where service_request_id='"+aptactionsMysql.record_id+"' ";	
						
                        connection.query(cancelsrvQuery, function (error, rowscn) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									deffered.resolve(rowscn);
						       
								
								}
						});
								
								 }
                        });
						
						}
						else if(aptactionsMysql.rec_type=="Closed")
						{
							
								
						var closedsrvQuery = " update service_requests set status='C' where id='"+aptactionsMysql.record_id+"' and seller_user_id='"+aptactionsMysql.id+"' ";	
						
                        connection.query(closedsrvQuery, function (error, rowscl) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									deffered.resolve(rowscl);
						       
								
								}
						});
							
							
							
							
						}
						else if(aptactionsMysql.rec_type=="Open")
						{
								
						var opensrvQuery = " select * from service_requests where id='"+aptactionsMysql.record_id+"' and seller_user_id='0'  ";	
						
                        connection.query(opensrvQuery, function (error, rowsop) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
									
									if(rowsop!="")
									{
										
										
						var opendelsrvQuery = " update service_requests set status='I',seller_user_id='"+aptactionsMysql.id+"' where id='"+aptactionsMysql.record_id+"' ";	
						
                        connection.query(opendelsrvQuery, function (error, rowsopdel) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else {
									
									
									connection.query(" select * from users where id='"+rowsop[0].user_id+"' ", function (error, stid) {

									var stsid=stid[0].stripe_customer_id;
									var ph=stid[0].phonenumber;
									var eml=stid[0].emailaddress;
									var resd=ph+" - "+eml; 
									
									var amtt=(aptactionsMysql.amount*10);
									
																var stripe = require("stripe")(constants.stripeKeys.skKey);	
									stripe.charges.create({
  amount: amtt,
  currency: "usd",
  customer: stsid, 
  description: resd
}, function(err, charge) {

  
  
									connection.query(" update notifications set accept_status='C',accepted_on='now()' where seller_user_id='"+aptactionsMysql.id+"' and request_id='"+aptactionsMysql.record_id+"' ", function (error, rowsopnoti) { });
									connection.query(" update buyer_payment set buyer_payment_status='C',buyer_charged_date='now()' where service_request_id='"+aptactionsMysql.record_id+"'  ", function (error, rowsoppayment) { });
									connection.query(" insert into seller_payment(seller_id,service_type_id) values('"+aptactionsMysql.id+"','"+aptactionsMysql.record_id+"')  ", function (error, rowsopsellerpayment) { });
									
});
	
									
									
									});
									
									
									
									deffered.resolve(rowsopdel);
									
									
									
								}
						});
									
								}
										
									}
						});
						       
								
							
							
						}
						
        return deffered.promise;
};


user.changepassword = function (data) {
        var deffered = q.defer();

						var chngpassMysql = new Object();
						
						chngpassMysql.id=data.uid;
						chngpassMysql.currentpass=MD5(data.chpass1);
						chngpassMysql.newpass=MD5(data.chpass2);
						
						
						var chgpassQuery = " select * from users where password='"+chngpassMysql.currentpass+"' and id='"+chngpassMysql.id+"' ";	
						
                        connection.query(chgpassQuery, function (error, rowscpass) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
                        connection.query(" update users set password='"+chngpassMysql.newpass+"' where id='"+chngpassMysql.id+"' ", function (error, rowscp) {

						deffered.resolve(rowscp);
						
						});
								
								}
						});
						
						
							
};




user.help = function (data) {
        var deffered = q.defer();

						var helpMysql = new Object();
						
						helpMysql.type=data.utype;
						helpMysql.id=data.uid;
						helpMysql.subject=data.subject;
						helpMysql.message=data.msg;
						
						
						var helpQuery = " insert into helps(user_id,signer_type,subject,description,created_on) values('"+helpMysql.id+"','"+helpMysql.type+"','"+helpMysql.subject+"','"+helpMysql.message+"','"+ moment().utc().utcOffset("+05:30").format('YYYY-MM-DD HH:mm:ss') +"') ";	
						
                        connection.query(helpQuery, function (error, rowshelp) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								
						deffered.resolve(rowshelp);
						
								
								}
						});
						
						
							
};




user.subservice = function (data) {
        var deffered = q.defer();

						var service = new Object();
						
						service.category=data.name;
						
						
						var servQuery = " SELECT * FROM servicetypes where description='"+service.category+"' ";	
						
                        connection.query(servQuery, function (error, rowssubs) {
                                if (error) {
                                        deffered.reject(error);
                                }
                                else { 
								var id=rowssubs[0].id;
                        connection.query(" select description as tag,rate as amount from servicetype_params where service_type_id='"+id+"' ", function (error, rowscnt) {
						if(err)
						{
							
						}
						else{
						
						deffered.resolve(rowscnt);
						}
						});
								
								
								}
						});
						
						
							
};




user.authenticate = function (phonenumber,  password, signertype) {
        var deffered = q.defer();

		
		var lgn="select * from  organisations c,service_request_address b,users a where c.id=a.org_id and a.address_id=b.id and emailaddress = '" + phonenumber + "' and signer_type='"+signertype+"' and active='Y' and verified='Y'";
	
 connection.query(lgn, function (err, rows) {
      
                if (err)
                        deffered.reject(err);
                if (!rows.length) {
                        deffered.reject(false);
                } else {
                        // if the user is found but the password is wrong
                        if (rows[0].password == MD5(password))
                                deffered.resolve(rows[0]);
                        else
                                deffered.resolve([]);
                }
        });
        return deffered.promise;
};

user.authenticateadmin = function (emailaddress, password) {
        var deffered = q.defer();

               connection.query("select * from admin where username = '" + emailaddress + "'", function (err, rows) {                
                if (err)
                        deffered.reject(err);
                if (!rows.length) {
                         deffered.reject(false);//deffered.resolve("Invalid Login Credetials");
                } else {

                        // if the user is found but the password is wrong
                        if (rows[0].password == MD5(password)) {
                                deffered.resolve(rows[0]);
                        }
                        else {
                                deffered.resolve([]);//deffered.resolve("Invalid Login Credentials");
                         }
                }
        });
        return deffered.promise;
};

user.findOne = function (phonenumber) {
        var deffered = q.defer();
        connection.query("select * from users where phonenumber = '" + phonenumber + "'", function (err, rows) {

                if (err)
                        deffered.reject(err);
                if (!rows.length) {
                        deffered.reject(false);
                } else {
                        deffered.resolve(rows[0]);
                }
        });
        return deffered.promise;
};

user.everify = function (id, verificationCode,signertype) {
        var deffered = q.defer();
        connection.query("select * from users where id = '" + id + "' and signer_type='"+signertype+"' and vericode = '" + verificationCode + "' ", function (err, rows) {
                console.info("select * from users where id = '" + id + "' and signer_type='"+signertype+"' and vericode = '" + verificationCode + "' ");
                if (err)
                        deffered.reject(err);
                if (!rows.length) {
                        console.info("no data found");
                        deffered.reject(false);
                } else {
                        if (rows[0].verified !== 'Y') {
                        		 var emailAddress = rows[0]["emailaddress"];
                                var updateQuery = "Update users Set vericode='', verified = 'Y', modified_on = '" + moment().utc().format('YYYY-MM-DD HH:mm:ss') + "'  Where id = '" + id + "' and signer_type='"+signertype+"' ";

                                connection.query(updateQuery, function (error, rows) {
                                        if (error) {
                                                deffered.reject(error);
                                        }
                                        else {
                                                console.info("creating stripe account");
                                                user.createStripeAccount(emailAddress);  
                                                deffered.resolve('Your email address is verified successfully.');
                                        }
                                });
                        }
                        else {
                                deffered.resolve('Your email address is already verified.');
                        }
                }
        });
        return deffered.promise;
};




user.disclosures = function (data) {
    var deffered = q.defer();
    var disclosures = new Object();
    connection.query("select * from usersl ", function (err, result) {

        if (err)
			console.log(err+" testing");
            deffered.reject(err);
                    var retData = new Object();
                    //var newUserMysql="";
                    var recCnt = 0;
            		result.forEach(function(element, index, array){
            			recCnt = element.id;
					retData[recCnt]={
						disclosure_desc:element.disclosure_text
					};	
					recCnt++;
				});

            deffered.resolve(retData);
    });
    return deffered.promise;
};


user.createStripeAccount = function(emailAddress) {
//Customerid=cus_BEyLXylR7Lmsbc
var deffered = q.defer();
    var stripe = require("stripe")(
      constantsVar.stripeKeys.skKey
    );

    stripe.customers.create (
      { email: emailAddress},
      function(err, customer) {
	    if(err) {
			console.log(err);
		   deffered.resolve(err);
	    }
		else {

		   connection.query("update users set stripe_customer_id='"+customer.id+"' where emailaddress = '" + emailAddress + "'", function (err, rows) {

		           if (err)
		                   deffered.reject(err);
		   });

	    }
      });

};

user.createStripeCardAccount = function(emailAddress) {
    var deffered = q.defer();
    var stripe = require("stripe")(
      constantsVar.stripeKeys.skKey
    );
    
	stripe.tokens.create({

	  card: {
	    "number": '4242424242424242',
	    "exp_month": 12,
	    "exp_year": 2018,
	    "cvc": '123'
	  }
	}, function(err, token) {
	  // asynchronously called
	    if(err) {
		   deffered.reject(err);
	    }
		else {
//			console.log(token);
			var last4 = token.card.last4;
			var brand = token.card.brand;
			var card = token.card.object;
			
//			var upSql = "UPDATE buyer_payment set cardtype='"+card+"',cardtype='"+card+"',  
			stripe.customers.createSource ("cus_BEyT8xTpbqzkzQ",
			{  source:token.id },
			function(err, customer) {
			}
			);

		   deffered.resolve(token);	 
		   }
		   
	 });

};

var MD5 = function (string) {

        function RotateLeft(lValue, iShiftBits) {
                return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
                var lX4, lY4, lX8, lY8, lResult;
                lX8 = (lX & 0x80000000);
                lY8 = (lY & 0x80000000);
                lX4 = (lX & 0x40000000);
                lY4 = (lY & 0x40000000);
                lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
                if (lX4 & lY4) {
                        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
                }
                if (lX4 | lY4) {
                        if (lResult & 0x40000000) {
                                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                        } else {
                                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                        }
                } else {
                        return (lResult ^ lX8 ^ lY8);
                }
        }

        function F(x, y, z) { return (x & y) | ((~x) & z); }
        function G(x, y, z) { return (x & z) | (y & (~z)); }
        function H(x, y, z) { return (x ^ y ^ z); }
        function I(x, y, z) { return (y ^ (x | (~z))); }

        function FF(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function GG(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function HH(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function II(a, b, c, d, x, s, ac) {
                a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
                return AddUnsigned(RotateLeft(a, s), b);
        };

        function ConvertToWordArray(string) {
                var lWordCount;
                var lMessageLength = string.length;
                var lNumberOfWords_temp1 = lMessageLength + 8;
                var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
                var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
                var lWordArray = Array(lNumberOfWords - 1);
                var lBytePosition = 0;
                var lByteCount = 0;
                while (lByteCount < lMessageLength) {
                        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                        lBytePosition = (lByteCount % 4) * 8;
                        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                        lByteCount++;
                }
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
                lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
                lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
                return lWordArray;
        };

        function WordToHex(lValue) {
                var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
                for (lCount = 0; lCount <= 3; lCount++) {
                        lByte = (lValue >>> (lCount * 8)) & 255;
                        WordToHexValue_temp = "0" + lByte.toString(16);
                        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
                }
                return WordToHexValue;
        };

        function Utf8Encode(string) {
                string = string.replace(/\r\n/g, "\n");
                var utftext = "";

                for (var n = 0; n < string.length; n++) {

                        var c = string.charCodeAt(n);

                        if (c < 128) {
                                utftext += String.fromCharCode(c);
                        }
                        else if ((c > 127) && (c < 2048)) {
                                utftext += String.fromCharCode((c >> 6) | 192);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }
                        else {
                                utftext += String.fromCharCode((c >> 12) | 224);
                                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                                utftext += String.fromCharCode((c & 63) | 128);
                        }

                }

                return utftext;
        };

        var x = Array();
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
                AA = a; BB = b; CC = c; DD = d;
                a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
                d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
                c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
                b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
                a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
                d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
                c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
                b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
                a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
                d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
                c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
                b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
                a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
                d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
                c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
                b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
                a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
                d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
                c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
                b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
                a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
                d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
                c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
                b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
                a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
                d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
                c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
                b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
                a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
                d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
                c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
                b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
                a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
                d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
                c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
                b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
                a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
                d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
                c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
                b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
                a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
                d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
                c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
                b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
                a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
                d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
                c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
                b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
                a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
                d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
                c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
                b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
                a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
                d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
                c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
                b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
                a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
                d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
                c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
                b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
                a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
                d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
                c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
                b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
                a = AddUnsigned(a, AA);
                b = AddUnsigned(b, BB);
                c = AddUnsigned(c, CC);
                d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

        return temp.toLowerCase();
}

module.exports = user;
