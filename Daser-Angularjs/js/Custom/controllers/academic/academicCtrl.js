   
app.controller("academicCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,academic_Data)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
  
       $scope.academics={
           
           fname:'',
        lname:'',
        designation:'',
        qualification:'',
        desc1:'',
           dates:'',
           timestamps:''
           
       };
    
 
      $scope.Contacts = [];

    $scope.addMore = function() {
    $scope.Contacts.push({
        fname1:'',
        lname1:'',
        designation1:'',
        qualification1:'',
        desc1:''
        
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
  
  
  
  
  $scope.x=$scope.Contacts;
   
    
    var date = new Date();
           $scope.academics.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.academics.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
    $scope.thing={};
  var $ctrl = this;
    $ctrl.items = ['item1', 'item2', 'item3'];
    $ctrl.msg="";
  $ctrl.animationsEnabled = true;
    
  $ctrl.open = function (size, parentSelector,id,index) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Academics_1/popups/academic.html',
      controller: 'academic_ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
       
      resolve: {
        items: function () {
          return id;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
          $scope.loading=true;
         $ctrl.tabdata = selectedItem;
          $ctrl.msg="Updated Record";
        
            $scope.AlertMessage="Successfully Updated Record"; 
            $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
          $scope.loading=false;
        
    }, function () {
    });
  };
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
                 url: academic_URL+"/"+vars,
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
                 url: academic_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         academic_Data.academic_global_getdata().then(function(data)
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
    $scope.addData=function(){  
       $scope.loading=true; 
        var counter=0;
        var counter1=0;
        
        $scope.strl=$scope.x.length;
        
        if($scope.academics.fname=="" || $scope.academics.lname=="" || $scope.academics.designation=="" || $scope.academics.qualification=="" || $scope.academics.desc=="")
        { 
           counter++  
        }
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.x[i].fname1=="" || $scope.x[i].lname1=="" || $scope.x[i].qualification1=="" || $scope.x[i].designation1=="" || $scope.x[i].desc1=="" )
                {
                    counter1++;
                }
            
              }
          }
        if(counter!=0)
        {
            
            $scope.AlertMessage="Please Enter the Details"; 
            $scope.fail=true;
            window.scrollTo(0,0);
             $scope.loading=false; 
          
        }
        else if(counter1!=0)
        {
            $scope.AlertMessage="Please Enter Add More fields  Details"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
       else
           {
       $scope.item=$http({
            method: 'POST',
            url: academic_URL,
            data:{a:$scope.academics,b:$scope.x},
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
                              
                              $scope.academics=[]; 
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.Contacts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
             academic_Data.academic_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
               
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       
           $scope.loading=false; 
               $scope.AlertMessage="Already Existed in DB and some records are inserted into DB"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);
                      $scope.Contacts.splice(0,$scope.x.length);
                             
                              $scope.academics.academic=""; 
           
         academic_Data.academic_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });

          });                
           }
        
    
    }
    
     
   $scope.msg="hello from crud"; 
    
          Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
     academic_Data.academic_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
         
});
app.controller('academic_ModalInstanceCtrl', function ($uibModalInstance,$http, items,academic_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={fname:'',
                 lname:'',
                 designation:'',
                 qualification:'',
                 desc:''};
    $ctrl.msg="abcd";
     
   
      academic_singleData.academic_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.fname=$ctrl.thing[0].fname;
    $ctrl.update.lname=$ctrl.thing[0].lname;
    $ctrl.update.designation=$ctrl.thing[0].designation;
    $ctrl.update.qualification=$ctrl.thing[0].qualification;
    $ctrl.update.desc=$ctrl.thing[0].description;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: academic_URL+"/"+$ctrl.s,
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
              return response.data.academic;
  
                                            },
          function errorCallback(response) {
              //  alert(response.data);
                                            });
      
      
       /* $ctrl.ite1= Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
      
      */
      
      console.log($ctrl.ite);
    
    $uibModalInstance.close($ctrl.ite);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
 
app.service('academic_Data', function($http) {  
    return {academic_global_getdata:function(){
   return $http({
  method: 'GET',
  url: academic_URL,
}).then(function successCallback(response) {return response.data.academic;}, function errorCallback(response) {  return response.data.academic;}); 
    }
 }  
});

app.service('academic_singleData', function($http) {  
    return {academic_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: academic_URL+"/"+id,
}).then(function successCallback(response) {return response.data.academic;}, function errorCallback(response) {  return response.data.academic;}); 
    }
 }  
}); 