    
app.controller("departmentCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,department_Data,building_Data,floor_Data,room_Data)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
   var $ctrl = this;
       $scope.departments={
           
           name:'',
           code:'',
           desc:'',
           dates:'',
           timestamps:''
           
       };
    
     
      building_Data.building_global_getdata().then(function(data)
        {
           $scope.blocks=data;
            
        });
    room_Data.room_global_getdata().then(function(data)
        {
           $ctrl.roomdata=data;
            
        });
       $scope.getFloors=function()
    {
       console.log("here only"+$scope.block_id);
       floor_Data.floor_global_getdata($scope.block_id).then(function(data)
        {
           $scope.floors=data;
            
        });
    }  
      $scope.depts = [];

    $scope.addMore = function() {
    $scope.depts.push({
        name1:'',
        code1:'',
        desc1:''
        
    })
  }
   $scope.allocate="Allocated Rooms are \r"
    $scope.chks=[];
    $scope.chkAction = function(id,index,status,roomno) {
        console.log("from my -"+status);
        if(status==true)
            {
                   $scope.chkl= $scope.chks.length;
                $scope.allocate+=roomno+",";
            $scope.chks.push({id:id,index:index,roomno:''});
            }
        else
            {
                   $scope.chkl= $scope.chks.length;
            $scope.allocate=$scope.allocate.replace(roomno+",","");    
            $scope.chks.splice(index,1);
            }
       
    }
    $scope.cancel = function(index) {
  $scope.depts.splice(index,1);
  }


  
  
  
  $scope.x=$scope.depts;
   
    
    var date = new Date();
           $scope.departments.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.departments.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
    $scope.thing={};
 
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
      templateUrl: 'views/Academics_1/popups/dept.html',
      controller: 'department_ModalInstanceCtrl',
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
          $scope.page1 = 1;
   
	$scope.pageChanged = function() {
	  var startPos = ($scope.page - 1) * 3;
	//  $scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
	  console.log($scope.page);
	};
    	$scope.pageChanged1 = function() {
	  var startPos = ($scope.page1 - 1) * 3;
	//  $scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
	  console.log($scope.page1);
	};
    
    $scope.delete=function(vars,index)
    {
        console.log("indes"+index);
        
          $scope.loading=true;
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: department_URL+"/"+vars,
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
        else
            {
                          $scope.loading=false;
            }
    };
     $scope.deletechks=function()
    {
           $scope.loading=true;
        console.log("rsd");
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: department_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         department_Data.department_global_getdata().then(function(data)
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
        
        if($scope.departments.name=="" || $scope.departments.code=="" || $scope.departments.desc=="")
        
           { 
           counter++  
            }
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.x[i].code1=="" || $scope.x[i].name1=="" || $scope.x[i].desc1=="")
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
            url: department_URL,
            data:{a:$scope.departments,b:$scope.x},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) 
           {
               $ctrl.tabdata=response.data;
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
                              
                               $scope.departments.name =''; 
                              $scope.departments.code =''; 
                              $scope.departments.desc =''; 
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.depts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
             department_Data.department_global_getdata().then(function(data)
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
                      $scope.depts.splice(0,$scope.x.length);
                             
                              $scope.departments.department=""; 
           
         department_Data.department_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });

          });                
           
           }
        
    
    }
    
     $scope.allocateData=function()
     {
         
         
              $scope.item=$http({
            method: 'POST',
            url: department_URL+"/depts",
           data:{a:$scope.departments,b:$scope.bname,c:$scope.chks},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) 
           {
               room_Data.room_global_getdata().then(function(data)
        {
           $ctrl.roomdata=data;
            
        });
               
                 department_Data.department_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
               
               $scope.allocate='';
             $scope.AlertMessage="Successfully Allocated"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.depts.splice(0,$scope.x.length);
                  window.scrollTo(0,0);
               
            return response.data;
  
                                            },
          function errorCallback(response) {
       
       

          });                
           
     }
     
     
       $ctrl.open1 = function (size, parentSelector,id,index) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/Academics_1/popups/deptrooms.html',
      controller: 'department_ModalInstanceCtrl1',
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
   $scope.msg="hello from crud"; 
    
          Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
     department_Data.department_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
         
});
app.controller('department_ModalInstanceCtrl', function ($uibModalInstance,$http, items,department_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={department:''};
    $ctrl.msg="abcd";
     
   
      department_singleData.department_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.dname=$ctrl.thing[0].department_name;
    $ctrl.update.dcode=$ctrl.thing[0].department_code;
    $ctrl.update.ddesc=$ctrl.thing[0].department_desc;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: department_URL+"/"+$ctrl.s,
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
              return response.data.department;
  
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
app.controller('department_ModalInstanceCtrl1', function ($uibModalInstance,$http, items,department_singleData,$timeout,Data,department_allocate_singleData) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={department:''};
    $ctrl.msg="abcd";
     
   
      department_allocate_singleData.department_allocate_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.dname=$ctrl.thing[0].department_name;
    $ctrl.update.dcode=$ctrl.thing[0].department_code;
    $ctrl.update.ddesc=$ctrl.thing[0].department_desc;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: department_URL+"/"+$ctrl.s,
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
              return response.data.department;
  
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
 
app.service('department_Data', function($http) {  
    return {department_global_getdata:function(){
   return $http({
  method: 'GET',
  url: department_URL,
}).then(function successCallback(response) {return response.data.department;}, function errorCallback(response) {  return response.data.department;}); 
    }
 }  
});

app.service('department_singleData', function($http) {  
    return {department_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: department_URL+"/"+id,
}).then(function successCallback(response) {return response.data.department;}, function errorCallback(response) {  return response.data.department;}); 
    }
 }  
}); 

app.service('department_allocate_singleData', function($http) {  
    return {department_allocate_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: department_URL+"/allocate/"+id,
}).then(function successCallback(response) {return response.data.department;}, function errorCallback(response) {  return response.data.department;}); 
    }
 }  
}); 