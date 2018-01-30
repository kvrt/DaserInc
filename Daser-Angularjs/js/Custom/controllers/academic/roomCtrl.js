   
app.controller("roomCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,room_Data,building_Data,floor_Data,floor_Data_room)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
  
        $scope.rooms={
        block_id:'',
        floor_id:'',
        total_rooms:'',
         timestamps:'',
           dates:'' 
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
   
  
 
   
    
    var date = new Date();
           $scope.rooms.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.rooms.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
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
      templateUrl: 'views/Academics_1/popups/room.html',
      controller: 'room_ModalInstanceCtrl',
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
                 url: room_URL+"/"+vars,
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
                 url: room_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         room_Data.room_global_getdata().then(function(data)
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
        
        $scope.strl=$scope.addfloors.length;
        
        if($scope.rooms.block_id=="" || $scope.rooms.floor_id=="" || $scope.rooms.total_rooms=="")
        { 
           counter++  
        }
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.addfloors[i].room_no=="" || $scope.addfloors[i].room_type=="" || $scope.addfloors[i].room_capacity=="" || $scope.addfloors[i].room_desc=="")
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
            url: room_URL,
            data:{a:$scope.rooms,b:$scope.addfloors},
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
                              
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
                        $scope.addfloors=[];
                        $scope.rooms=[];
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.addfloors.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
             room_Data.room_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
               
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       
        

          });                
           }
        
    
    }
    

    $scope.addfloors=[];
     $scope.x=$scope.addfloors;
    $scope.getFloors=function()
    {
       console.log("from block name "+$scope.rooms.block_id); 
           $scope.block_name_id=17;
       floor_Data.floor_global_getdata($scope.rooms.block_id).then(function(data)
        {
           $ctrl.floors=data;
            
        });
    }
        $scope.getFloors1=function()
    {
       
       floor_Data.floor_global_getdata($scope.block_id).then(function(data)
        {
           $ctrl.floors1=data;
            
        });
    }  
    $scope.getRooms=function()
    { 
           $scope.addfloors=[]; floor_Data_room.floor_global_getdata_room($scope.rooms.floor_id).then(function(data)
        {
           $scope.rooms.total_rooms=data[0].no_of_rooms;
             for($scope.i=0;$scope.i<$scope.rooms.total_rooms;$scope.i++)
            {
                $scope.addfloors.push({room_no:'',room_type:'',room_capacity:'',
                                      roo_desc:''});
            }
        });
     
    }
    
    
     
   $scope.msg="hello from crud"; 
    
          Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
     room_Data.room_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
         
      building_Data.building_global_getdata().then(function(data)
        {
           $ctrl.blocks=data;
           $ctrl.blocks1=data;
            
        });
 
    
    
    
    
    
});
app.controller('room_ModalInstanceCtrl', function ($uibModalInstance,$http, items,room_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={rno:'',rtype:'',rcap:'',rdesc:''};
    $ctrl.msg="abcd";
     
 
      room_singleData.room_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.rno=$ctrl.thing[0].room_no;
    $ctrl.update.rtype=$ctrl.thing[0].room_type; 
    $ctrl.update.rcap=$ctrl.thing[0].room_capacity; 
    $ctrl.update.rdesc=$ctrl.thing[0].room_desc; 
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: room_URL+"/"+$ctrl.s,
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
              return response.data.room;
  
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
 


app.service('floor_Data', function($http) {  
    return {floor_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: building_URL+"/floors/"+id,
}).then(function successCallback(response) {return response.data.building;}, function errorCallback(response) {  return response.data.building;}); 
    }
 }  
});

app.service('floor_Data_room', function($http) {  
    return {floor_global_getdata_room:function(id){
   return $http({
  method: 'GET',
  url: building_URL+"/floors/rooms/"+id,
}).then(function successCallback(response) {return response.data.building;}, function errorCallback(response) {  return response.data.building;}); 
    }
 }  
});






app.service('room_Data', function($http) {  
    return {room_global_getdata:function(){
   return $http({
  method: 'GET',
  url: room_URL+"/numeric",
}).then(function successCallback(response) {return response.data.room;}, function errorCallback(response) {  return response.data.room;}); 
    }
 }  
});

app.service('room_singleData', function($http) {  
    return {room_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: room_URL+"/"+id,
}).then(function successCallback(response) {return response.data.room;}, function errorCallback(response) {  return response.data.room;}); 
    }
 }  
}); 