var app = angular.module("myApp", ["ngRoute"]);
function islogin()
{
	//alert(sessionStorage.getItem('uniqueid'));
if(sessionStorage.getItem('uniqueid')==null)
{
			window.location.href="#/";
	
	
}
}

function logincheck()
{
	//alert(sessionStorage.getItem('uniqueid'));
	if(sessionStorage.getItem('uniqueid')!=null)
	{
			window.location.href="#/dashboard";
	
	
	}
}
/*
app.filter("id", function($http){
	return function(id)
	{
		//alert(id);
		
		var qws=[];
		
		$http.post("DB/seller_count.php",{'dataid':id})
	    .success(function(dataz){
			//qws.push("as");
			console.log(dataz+" sdfsdf");
			qws=dataz;
			//qws.push(dataz);
			//console.log(qws+"external");
		//return "asdf";
	   return qws;
        });
		// qws = qws.join('');
		//console.log(qws+"External");
		
		//console.log(qws+"external");
		/*switch(id)
		{
			case '2':
			return "Second";
			case '3':
			return "Third";
		}
	}
});

*/
app.config(function($routeProvider,$locationProvider){
	
	$locationProvider.hashPrefix('');
    $routeProvider
    .when("/", {
		
        templateUrl : "main.html"
		 
    })
    .when("/forgot", {
        templateUrl : "forgot.html"
    })
    .when("/dashboard", {
        templateUrl : "dashboard.html"
    })
    .when("/inact_seller", {
        templateUrl : "inactive_sellers.html"
    })
	.when("/act_buyers", {
        templateUrl : "active_buyers.html"
    })
	.when("/inact_buyers", {
       templateUrl : "inactive_buyers.html"
		
    })
	.when("/appointments", {
       templateUrl : "appointments.html"
		
    })
	.when("/open", {
       templateUrl : "open.html"
		
    })
	.when("/closed", {
       templateUrl : "closedap.html"
		
    })
	.when("/not_yet", {
       templateUrl : "notyet.html"
		
    })
	.when("/payments", {
       templateUrl : "payments.html"
		
    })
	.when("/support", {
       templateUrl : "supports.html"
		
    });
});

//sessionStorage.removeItem(key)

app.controller("header",function($scope,$http,$location){
	 
	 $scope.uname_s=sessionStorage.getItem('uname');
	 
	 $scope.logout=function()
	 {
		 sessionStorage.removeItem("uname");
		 sessionStorage.removeItem("uniqueid");
		 islogin();
	 }
	 
});

app.controller("admin_login",function($scope,$http,$location){
	logincheck(); 
	 /*getdata();
	 
	 function getdata()
	 {
		   $http.get("DB/login_chk.php",{'username':'swami.sri024@gmail.com'})
	    .success(function(data){
	    $scope.data=data;
		
		console.log($scope.data[0].name);
	   
        });	   
       	   
	}
	 */
	 
	 
	// $scope.show_M=true;
	$scope.login=function()
	{ 
		//alert($scope.username);
		//alert($scope.pass);
		
		
		
		$http.post("DB/login_chk.php",{'username':$scope.username, 'pass':$scope.pass}).success(function(data)
		{
			
		//	$scope.data=data;
			
			console.log(data);
		if (data == false) {
			$scope.msg=true;
			// Display login error message
		}
		else
		{
			//console.log(data[0].name);
			
			//$scope.uname=data[0].name;
			//sessionStorage.user = $scope.username;
			sessionStorage.setItem('uniqueid', $scope.username);
			sessionStorage.setItem('uname', data[0].name);
//alert(sessionStorage.getItem('uniqueid'));
			$location.path("/dashboard");
			
		}
			
		});
		
	}
});




app.controller("dashboard",function($scope,$http,$location){
	 
	// $scope.active_seller=24;
	// $scope.inactive_seller=26;
	//$scope.active_buyer=3;
	//$scope.inactive_buyer=24263;
	islogin();
	 $scope.asdf=sessionStorage.getItem('uniqueid');
	 

		 
		   $http.post("DB/seller.php",{'active_seller':'aseller'})
	    .success(function(data){
	    $scope.active_seller=data;
		
		console.log($scope.active_seller);
	   
        });	
		   $http.post("DB/seller.php",{'inactive_seller':'inaseller'})
	    .success(function(data){
	    $scope.inactive_seller=data;
		
		console.log($scope.inactive_seller);
	   
        });	
	 	$http.post("DB/seller.php",{'active_buyer':'abuyer'})
	    .success(function(data){
	    $scope.active_buyer=data;
		
		console.log($scope.active_buyer);
	   
        });	
		$http.post("DB/seller.php",{'inactive_buyer':'inabuyer'})
	    .success(function(data){
	    $scope.inactive_buyer=data;
		
		console.log($scope.inactive_buyer);
	   
        });	
		
	 
	 
	 
	 getdata();
	 
	 function getdata()
	 {
		$scope.GTotal = 0;
    
    $scope.setTotals = function(request){
        if (request){

            $scope.GTotal += parseInt(request.service_amount);
        }
    } 
		 
		 
		 
		   $http.post("DB/seller.php",{'users':'users-data'})
	    .success(function(data){
	    $scope.seller=data;
		
		console.log($scope.seller);
	   
        });	

$http.post("DB/seller.php",{'organization':'org-data'})
	    .success(function(data){
	    $scope.organ=data;
		
		console.log($scope.organ);
	   
        });	

$http.post("DB/seller.php",{'address':'addr-data'})
	    .success(function(data){
	    $scope.addr=data;
		
		console.log($scope.addr);
	   
        });			
      
	$http.post("DB/seller_count.php")
	    .success(function(dataz){
		$scope.appoint = dataz;
	   console.log($scope.appoint);
        }); 	   
	}
	
	
	
	
	/*
	 $scope.friends = [
    {id:2,name:'John', age:25, gender:'boy'},

    {id:2,name:'Johanna', age:28, gender:'girl'},
    {id:3,name:'Joy', age:15, gender:'girl'},
    {id:3,name:'Mary', age:28, gender:'girl'},
    {id:3,name:'Samantha', age:60, gender:'girl'}
  ];
	*/
	
	
	
	
	
	
	
	/*
$scope.initial=function()
{
	$http.post("DB/seller_count.php")
	    .success(function(dataz){
		$scope.appoint = dataz;
	   console.log($scope.appoint);
        });
	
}
*/
/*
$scope.user_appointments=function(appid)
{
	alert(appid);
}*/

	 
	
});





app.controller("appointments",function($scope,$http,$location){
	 
	 
	 
	 
	 islogin();
	 $http.post("DB/appointments.php",{'totalappointments':'appointmentstotal'})
	    .success(function(data){
	    $scope.total_appointments=data;
		
		console.log($scope.total_appointments);
	   
        });	
		
	 $http.post("DB/appointments.php",{'openappointments':'appointmentsopen'})
	    .success(function(data){
	    $scope.open_appointments=data;
		
		console.log($scope.open_appointments);
	   
        });	
		
		$http.post("DB/appointments.php",{'closedappointments':'appointmentsclosed'})
	    .success(function(data){
	    $scope.closed_appointments=data;
		
		console.log($scope.closed_appointments);
	   
        });	
		
		$http.post("DB/appointments.php",{'pendingappointments':'appointmentspending'})
	    .success(function(data){
	    $scope.pending_appointments=data;
		
		console.log($scope.pending_appointments);
	   
        });	
		
	 
	 
	 getappointments();
	 
	 function getappointments()
	 {
		   $http.post("DB/appointments.php",{'appointment_users':'users-appointment'})
	    .success(function(data){
	    $scope.allappointments=data;
		
		console.log($scope.allappointments);
	   
        });	
		
		
		   $http.post("DB/appointments.php",{'appointment_address':'users-address'})
	    .success(function(data){
	    $scope.useraddr=data;
		
		console.log($scope.useraddr);
	   
        });	
		
		$http.post("DB/appointments.php",{'appointment_service_request':'users-requests'})
	    .success(function(data){
	    $scope.userrequest=data;
		
		console.log($scope.userrequest);
	   
        });	
		
		$http.post("DB/appointments.php",{'appointment_service_type':'servicetype'})
	    .success(function(data){
	    $scope.servicetype=data;
		
		console.log($scope.servicetype);
	   
        });	
		$http.post("DB/appointments.php",{'organizations':'org_name'})
	    .success(function(data){
	    $scope.orgname=data;
		
		console.log($scope.orgname);
	   
        });	
		
		
		
	 
	 }
});








app.controller("supports",function($scope,$http,$location){
	 
	 
	 islogin();
	 getsupport();
	 
	 function getsupport()
	 {
		   $http.post("DB/supports.php",{'support_users':'users-data'})
	    .success(function(data){
	    $scope.users=data;
		
		console.log($scope.users);
	   
        });	
		
		
		$http.post("DB/supports.php",{'supports':'supports-data'})
	    .success(function(data){
	    $scope.support=data;
		
		console.log($scope.support);
	   
        });	
	 }
});	 










app.controller("payments",function($scope,$http,$location){
	 
	 islogin();
	 
	 getpayment();
	 
	 function getpayment()
	 {
		   $http.post("DB/payments.php",{'users':'users-data'})
	    .success(function(data){
	    $scope.users=data;
		
		console.log($scope.users);
	   
        });	
		
		
		$http.post("DB/payments.php",{'service_request':'users-requests'})
	    .success(function(data){
	    $scope.requests=data;
		
		console.log($scope.requests);
	   
        });	
		
		$http.post("DB/payments.php",{'service_type':'servicetype'})
	    .success(function(data){
	    $scope.stype=data;
		
		console.log($scope.stype);
	   
        });	
		
		$http.post("DB/payments.php",{'organizations':'org_name'})
	    .success(function(data){
	    $scope.organ=data;
		
		console.log($scope.organ);
	   
        });
		$http.post("DB/payments.php",{'buyer_payment':'buyerpayment'})
	    .success(function(data){
	    $scope.bpayment=data;
		
		console.log($scope.bpayment);
	   
        });
		$http.post("DB/payments.php",{'seller_payment':'sellerpayment'})
	    .success(function(data){
	    $scope.spayment=data;
		console.log($scope.spayment);
	   
        });
		
		
    $scope.GTotal = 0;
    
    $scope.setTotals = function(request){
        if (request){

            $scope.GTotal += parseInt(request.service_amount);
        }
    }
	
	$scope.update=function(userid)
	{

		$scope.a="Swami"+userid;
		$scope.b="Sri";
	}
	
		
	 }
});	 







