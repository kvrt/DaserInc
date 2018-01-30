   
app.controller("buildingCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,building_Data)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
  
       $scope.buildings={
             block_name1:'',number1:'', 
           building:'',
           dates:'',
           timestamps:''
           
       };
    
 
      $scope.contacts = [];

    $scope.addMore = function() {
        $scope.plus=true;
        $scope.minus=true;
        
    $scope.contacts.push({
      
        block_name2:'',number2:'' 
        
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
         $scope.plus=false;
        $scope.minus=false;
  $scope.contacts.splice(index,1);
  $scope.str2.splice(index,1);
  }
  
  
  
  
  $scope.x=$scope.contacts;
   
    
    var date = new Date();
           $scope.buildings.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.buildings.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
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
      templateUrl: 'views/Academics_1/popups/building.html',
      controller: 'building_ModalInstanceCtrl',
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
                 url: building_URL+"/"+vars,
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
    
    
    
    $scope.str1=[];
    $scope.str2=[];
   
    $scope.n1=0;
    $scope.n2=0;
     
    $scope.getFloors = function() {
           $scope.str1=[];
 if($scope.buildings.number1=='')
            {
              
                $scope.str1=[];
                $scope.n1=0;  
                  $scope.str1.splice(0,$scope.n1);
             }
            else
            {
                
                 $scope.n1=$scope.buildings.number1;
                                    //        $scope.str1.push({a1:'',b1:''});
             }

for($scope.i=0;$scope.i<$scope.n1;$scope.i++)
    {
        console.log("abcd"+$scope.i);
        
        $scope.str1.push({a1:'',b1:''});
    }
      
}
 
       $scope.getMoreFloors = function(vs,index) {
     $scope.str2=[];
        if(vs=='')
            {
                 $scope.str2=[];
                        $scope.n2=0;  
               $scope.str2.splice(0,$scope.n2);
             }
            else
            {
                
                 $scope.n2=vs;
                  $scope.str2=[];
             }

           for($scope.i1=0;$scope.i1<$scope.n2;$scope.i1++)
           {
               $scope.str2.push({c1:'',d1:''});
        }
    
    // return new Array(parseInt($scope.n2));   
}
    
    
     $scope.deletechks=function()
    {
           $scope.loading=true;
        console.log("rsd");
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: building_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         building_Data.building_global_getdata().then(function(data)
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
        
        if($scope.buildings.block_name1=="" || $scope.buildings.number1=="")
        { 
           counter++  
        }
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.x[i].building1=="" || $scope.x[i].code1=="")
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
            url: building_URL,
            data:{a:$scope.buildings,b:$scope.str1,d:$scope.str2,c:$scope.contacts},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) 
           {
             //  alert(response.data.str2+"from console");
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
                      $scope.buildings.block_name1='';
                      $scope.buildings.number1='';

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.contacts.splice(0,$scope.x.length);
                        $scope.str1.splice(0,$scope.str1.length);
                        $scope.str2.splice(0,$scope.str2.length);
                    }
           
               
               
             
                          
               
             building_Data.building_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
               
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       console.log("from error block"+response);
           

          });                
           }
        
    
    }
    
     
   $scope.msg="hello from crud"; 
    
          Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
     building_Data.building_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
         
});
app.controller('building_ModalInstanceCtrl', function ($uibModalInstance,$http, items,building_singleData,$timeout,Data,floors_getSingleData) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
    
    $ctrl.buildings1={number3:''};
    $ctrl.n3=0; 
    $ctrl.str3=[];
        $ctrl.getFloors1 = function() {
           
         $ctrl.str3=[];
 if($ctrl.buildings1.number3=='')
            {
              
                $ctrl.str3=[];
                $ctrl.n3=0;  
                  $ctrl.str3.splice(0,$ctrl.n3);
             }
            else
            {
                
                 $ctrl.n3=$ctrl.buildings1.number3;
                                    //        $scope.str1.push({a1:'',b1:''});
             }

for($ctrl.i=0;$ctrl.i<$ctrl.n3;$ctrl.i++)
    {
        console.log("abcd"+$ctrl.i);
        
        $ctrl.str3.push({a1:'',b1:''});
    }
      
}
    
    
    
    
    
    $ctrl.update={building:'',floor1:''};
    $ctrl.msg="abcd";
    $ctrl.floors=[]; 
   
      building_singleData.building_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.building=$ctrl.thing[0].block_name;
    $ctrl.update.floor1=$ctrl.thing[0].no_of_floors;
     
        });

    floors_getSingleData.floors_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.floors=data;
            
   
     
        });
    
$ctrl.contacts=[];
    
    
    $ctrl.addMore=function()
    {
        console.log("hiii");
        $ctrl.contacts.push({t1:'',t2:''});
         $ctrl.update.floor1= parseInt($ctrl.update.floor1)+1;
    }
    
     $ctrl.delete1=function(index)
    {
         console.log("index value-"+index);
         $ctrl.contacts.splice(1,index);
         if(index==0)
             {
                $ctrl.contacts.splice(0,index); 
                 
             }
          $ctrl.update.floor1= parseInt($ctrl.update.floor1)-1;
     }
     
    $ctrl.delete=function(vars,index,c)
    {
      
        
        
        
      if(confirm("Are you sure?")){
           $ctrl.diff=1;
        $ctrl.updateCounter=(parseInt(c)-parseInt($ctrl.diff));
        console.log("Update Counter is is"+$ctrl.updateCounter);
            console.log("value is"+vars);
        console.log("upda is"+c);
       
        console.log("Block_id is is"+$ctrl.s);
             $ctrl.item=$http({
                 method: 'DELETE',
                 url: building_URL+"/floors/"+vars+"/"+$ctrl.s+"/"+$ctrl.updateCounter,
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                  $ctrl.update.floor1=$ctrl.updateCounter;
                 alert("Successfully Deleted Record"); 
                   $ctrl.floors.splice(index,1);
                return response.data;
                                                    }, 
                 function errorCallback(response) {
                     
	               alert(response.data);
                });
                                }
          $ctrl.update.floor1=$ctrl.updateCounter;
    }
    
    
    
  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: building_URL+"/"+$ctrl.s,
            data:{a:$ctrl.update,b:$ctrl.floors,c:$ctrl.contacts},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) {
           // alert(response.data[0].name);
   //$ctrl.thing=response.data;
           $ctrl.AlertMessage="Successfully Updated Records"; 
            $ctrl.succ=true;
               $ctrl.fail=false; 
         $timeout(function () { $ctrl.AlertMessage = ''; $ctrl.succ=false;}, 3000); 
              return response.data.building;
  
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
 
app.service('building_Data', function($http) {  
    return {building_global_getdata:function(){
   return $http({
  method: 'GET',
  url: building_URL,
}).then(function successCallback(response) {return response.data.building;}, function errorCallback(response) {  return response.data.building;}); 
    }
 }  
});

app.service('building_singleData', function($http) {  
    return {building_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: building_URL+"/"+id,
}).then(function successCallback(response) {return response.data.building;}, function errorCallback(response) {  return response.data.building;}); 
    }
 }  
}); 

app.service('floors_getSingleData', function($http) {  
    return {floors_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: building_URL+"/floors/"+id,
}).then(function successCallback(response) {return response.data.building;}, function errorCallback(response) {  return response.data.building;}); 
    }
 }  
}); 