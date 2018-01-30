   
app.controller("aboutusCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,aboutus_Data)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
  
       $scope.aboutus={
           
           about:'',
           dates:'',
           timestamps:''
           
       };
    
 
      $scope.contacts = [];

    $scope.addMore = function() {
    $scope.contacts.push({
        aboutus1:'' 
        
    })
  }
   
    $scope.chks=[];
    $scope.chkAction = function(id,index,status) {
        console.log("from my -"+status);
        if(status==true)
            {
            $scope.chks.push({id:id,index:index});
            }
        else
            {
            $scope.chks.splice(index,1);
            }

    }
    $scope.cancel = function(index) {
  $scope.contacts.splice(index,1);
  }
  
  
  
  
  $scope.x=$scope.contacts;
   
    
    var date = new Date();
           $scope.aboutus.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.aboutus.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
    $scope.thing={};
  var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];
    $ctrl.msg="";
  $ctrl.animationsEnabled = true;
    
 
      $ctrl.toggleAnimation = function () {
    $ctrl.animationsEnabled = !$ctrl.animationsEnabled;
  };
          $scope.page = 1;
   
	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 3;
	//  $scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
	  console.log($scope.page);
	};
    
    
    $scope.delete=function(vars,index)
    {
        console.log("indes"+index);
        
          $scope.loading=true;
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: aboutus_URL+"/"+vars,
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                       $scope.loading=false;
                  $scope.AlertMessage="Successfully Deleted Record"; 
                      $scope.fail=false; 
            $scope.succ=true;
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                 $ctrl.tabdata.splice(index, 1);
                return response.data;
                                                    }, 
                 function errorCallback(response) {
                     
	               //alert(response.data);
                });
                                }
    };
     $scope.deletechks=function()
    {
           $scope.loading=true;
        console.log("rsd");
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: aboutus_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
               $scope.loading=false;
            
        });
                 //$ctrl.thing.splice(0, $scope.chks.length);
                return response.data;
                                                    }, 
                 function errorCallback(response) {
	               //alert(response.data);
                });
        
                                }
    };
    $scope.updateData=function(){  
       $scope.loading=true; 
        var counter=0;
        var counter1=0;
        
        $scope.strl=$scope.x.length;
        
        if($scope.aboutus.about=="")
        { 
           counter++  
        }
        
       
        if(counter!=0)
        {
            
            $scope.AlertMessage="Please Enter the Details"; 
            $scope.fail=true;
            window.scrollTo(0,0);
             $scope.loading=false; 
          
        }
        
       else
           {
       $scope.item=$http({
            method: 'POST',
            url: aboutus_URL+"/update",
            data:{a:$scope.aboutus},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) 
           {
               
              $scope.loading=false; 
               if(response.data.errors)
                   {
                     //  console.log("from s"+response.data.errors);
                       //var eCount = Object.keys(response.data.errors).length;

 
                 $scope.AlertMessage="Already Existed these Records"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);  
                   }
               else
                    {
                              
                            //  $scope.aboutus.about=""; 
                                

             $scope.AlertMessage="Successfully Updated Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.contacts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
             aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
           $scope.aboutus.about=data[0].about;
            
        });
               
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       
           $scope.loading=false; 
               $scope.AlertMessage="Already Existed in DB and some records are inserted into DB"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);
                      $scope.contacts.splice(0,$scope.x.length);
                             
                              $scope.aboutus.about=""; 
           
         aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });

          });                
           }
        
    
    }
       $scope.addData=function(){  
       $scope.loading=true; 
        var counter=0;
        var counter1=0;
        
        $scope.strl=$scope.x.length;
        
        if($scope.aboutus.about=="")
        { 
           counter++  
        }
        
       
        if(counter!=0)
        {
            
            $scope.AlertMessage="Please Enter the Details"; 
            $scope.fail=true;
            window.scrollTo(0,0);
             $scope.loading=false; 
          
        }
        
       else
           {
       $scope.item=$http({
            method: 'POST',
            url: aboutus_URL,
            data:{a:$scope.aboutus},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) 
           {
               
              $scope.loading=false; 
               if(response.data.errors)
                   {
                     //  console.log("from s"+response.data.errors);
                       //var eCount = Object.keys(response.data.errors).length;

 
                 $scope.AlertMessage="Already Existed these Records"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);  
                   }
               else
                    {
                              
                             // $scope.aboutus.about=""; 
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.contacts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
          aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
                 $scope.x=data.length;
           if($scope.x!='')
        {
             $scope.update=true;
             $scope.aboutDesc=data[0].about;
          $scope.aboutus.about=data[0].about;
            
            
            $scope.submit=true;
        }
    else
        {
            $scope.submit=false;
             $scope.update=false;
                         $scope.aboutDesc=data[0].about;
          $scope.aboutus.about=data[0].about;
        }
     
        });
               
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       
           $scope.loading=false; 
               $scope.AlertMessage="Already Existed in DB and some records are inserted into DB"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);
                      $scope.contacts.splice(0,$scope.x.length);
                             
                              $scope.aboutus.about=""; 
           
         aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });

          });                
           }
        
    
    }
     
   $scope.msg="hello from crud"; 
    
         $x= Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
     aboutus_Data.aboutus_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
         
            $scope.x=data.length;
           if($scope.x!='')
        {
             $scope.update=true;
             $scope.aboutDesc=data[0].about;
          $scope.aboutus.about=data[0].about;
            
            
            $scope.submit=true;
        }
    else
        {
            $scope.submit=false;
             $scope.update=false;
        }
        });
   
  
         
});
/*app.controller('aboutus_ModalInstanceCtrl', function ($uibModalInstance,$http, items,aboutus_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={aboutus:''};
    $ctrl.msg="abcd";
     
   
      aboutus_singleData.aboutus_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.aboutus=$ctrl.thing[0].aboutus_name;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: aboutus_URL+"/"+$ctrl.s,
            data:{a:$ctrl.update},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) {
           // alert(response.data[0].name);
   //$ctrl.thing=response.data;
           $ctrl.AlertMessage="Successfully Updated Records"; 
            $ctrl.succ=true;
               $ctrl.fail=false; 
         $timeout(function () { $ctrl.AlertMessage = ''; $ctrl.succ=false;}, 3000); 
              return response.data;
  
                                            },
          function errorCallback(response) {
              //  alert(response.data);
                                            });
      
      
        $ctrl.ite1= Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
      
      
      
      console.log($ctrl.ite);
    
    $uibModalInstance.close($ctrl.ite);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
 */
app.service('aboutus_Data', function($http) {  
    return {aboutus_global_getdata:function(){
   return $http({
  method: 'GET',
  url: aboutus_URL,
}).then(function successCallback(response) {return response.data.aboutus;}, function errorCallback(response) {  return response.data.aboutus;}); 
    }
 }  
});

app.service('aboutus_singleData', function($http) {  
    return {aboutus_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: aboutus_URL+"/"+id,
}).then(function successCallback(response) {return response.data.aboutus;}, function errorCallback(response) {  return response.data.aboutus;}); 
    }
 }  
}); 