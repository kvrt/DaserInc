app.controller("subjectCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,semister_Data,$ocLazyLoad,regulations_Data,branches_Data,course_years,subject_Data,branch_Data,reg_Data)
              {
    
    
    $scope.subjects={
        
        course:'',
        regulation:'',
        branch:'',
        yr:'',
        semister:'',
        subject_code:'',
        subject_name:'',
        subject_type:'',
        subject_credits:''
        
    };
    
          $scope.contacts = [];

    $scope.addMore = function() {
    $scope.contacts.push({
         
        subject_code1:'',
        subject_name1:'',
        subject_type1:'',
        subject_credits1:''
        
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
           $scope.subjects.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.subjects.timestamp =  $filter('date')(new Date(), 'hh:mm:ss a');
    
    $scope.thing={};
    
       subject_Data.subject_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });  
    
    
    
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
      templateUrl: 'views/Academics_1/popups/subject.html',
      controller: 'subject_ModalInstanceCtrl',
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
          $scope.loading=true;
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: subject_URL+"/"+vars,
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
                 url: subject_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         subject_Data.subject_global_getdata().then(function(data)
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
        
        if($scope.subjects.course=="" || $scope.subjects.branch==""
          || $scope.subjects.regulation=="" || $scope.subjects.semister=="" 
           || $scope.subjects.yr=="" || $scope.subjects.subject_code=="" 
           || $scope.subjects.subject_name=="" || $scope.subjects.subject_type=="" 
           || $scope.subjects.subject_credits==""  
          )
        { 
           counter++  
        }
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.x[i].subject_code1=="" || $scope.x[i].subject_name1=="" ||$scope.x[i].subject_type1=="" || $scope.x[i].subject_credits1=="")
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
            url: subject_URL,
            data:{a:$scope.subjects,b:$scope.x},
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
                              $scope.subjects=[];
                                
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.contacts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
        subject_Data.subject_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });  
         
                return response.data;
  
                                            },
          function errorCallback(response) {
       
           $scope.loading=false; 
               $scope.AlertMessage="This Subject is already Added into DB"; 
                 $scope.succ=false;
                 $scope.fail=true; 
                $timeout(function () {  $scope.fail=true;}, 3000);
                      $scope.contacts.splice(0,$scope.x.length);
                            $scope.subjects=[];
           
         
              
          });                
           }
        
    
    }
    
    
    
    var $ctrl = this;
    $ctrl.number_course=0;
    $ctrl.number_course1=0;
    
    $ctrl.getNumber2 = function(num) { 
     
    return new Array(parseInt(num));   
}
    $scope.getRegulations=function()
    {  
    regulations_Data.getbyregulation_course($scope.subjects.course).then(function(data)
        {
           $ctrl.regulations=data;
            
        });  
          branches_Data.getbybranch_course($scope.subjects.course).then(function(data)
        {
           $ctrl.branches=data;
            
        });  
          course_years.no_of_years($scope.subjects.course).then(function(data)
        {
              
              $ctrl.number_course=data[0].years;
              console.log("years"+data[0].years);
        //   $ctrl.years=data[0].years;
             
        }); 
    }
     
      $ctrl.getTimes=function(n){
     return new Array(n);
   };
    $ctrl.courses={};
    $ctrl.regulations={};
    $ctrl.branches={};
    $ctrl.semisters={};
    $ctrl.years=0;
      semister_Data.semister_global_getdata().then(function(data)
        {
           $ctrl.semisters=data;
            
        });
     Data.global_getdata().then(function(data)
        {
           $ctrl.courses=data;
            
        });
        branch_Data.branch_global_getdata().then(function(data)
        {
           $ctrl.branches1=data;
            
        });
      reg_Data.reg_global_getdata().then(function(data)
        {
           $ctrl.regulations1=data;
            
        });
      branches_Data.getbybranch_course($scope.subjects.course).then(function(data)
        {
           $ctrl.branches=data;
            
        });  
    
    
});


app.controller('subject_ModalInstanceCtrl', function ($uibModalInstance,$http, items,regulations_Data,branches_Data,course_years,$timeout,Data,subject_singleData,regulations_Course,branches_Course,semister_Data,subject_Data_numeric) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
    
    $ctrl.number=0; 
$ctrl.getNumber1 = function(num) { 
     
    return new Array(parseInt(num));   
}
 
    $ctrl.subjects={course:'',
                   branch:'',
                    regulation:'',
                    semister:'',
                  yr:''
                   
                   
                   
                   };
    
     
    $ctrl.update={course:'',branch:'',semister:'',regulation:'',yr:'',section:'',subject_code:'',subject_name:'',subject_type:'',subject_credits:''};
    
       $ctrl.getRegulations=function()
    {  
    regulations_Data.getbyregulation_course($ctrl.update.course).then(function(data)
        {
           $ctrl.regulations=data;
            
        });  
          branches_Data.getbybranch_course($ctrl.update.course).then(function(data)
        {
           $ctrl.branches=data;
            
        });  
          course_years.no_of_years($ctrl.update.course).then(function(data)
        {
              
        $ctrl.number =data[0].years;   
              
             
        }); 
         $ctrl.subjects.course=$ctrl.update.course;   
     
    }
     
   
    Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
        $ctrl.courses=$ctrl.thing; 
            
        });
    subject_Data_numeric.subject_global_getdata_numeric($ctrl.s).then(function(data)
        {
           $ctrl.thing=data;
          $ctrl.subjects.course=$ctrl.thing[0].course_id; 
         $ctrl.subjects.branch=$ctrl.thing[0].branch_id; 
         $ctrl.subjects.regulation=$ctrl.thing[0].regulation_id; 
         $ctrl.subjects.semister=$ctrl.thing[0].semister_id; 
         $ctrl.subjects.yr=$ctrl.thing[0].years; 
        
            $ctrl.number=$ctrl.thing[0].years; 
        $ctrl.numerics=$ctrl.thing; 
         $ctrl.update.yr=$ctrl.thing[0].years; 
            
        });
    regulations_Course.getregulations($ctrl.s).then(function(data)
        {
           $ctrl.thing=data;
           $ctrl.regulations=$ctrl.thing;
            
        }); 
        branches_Course.getBranches($ctrl.s).then(function(data)
        {
           $ctrl.thing=data;
           $ctrl.branches=$ctrl.thing;
            
        });
     semister_Data.semister_global_getdata().then(function(data)
        {
           $ctrl.semisters=data;
            
        });
  subject_singleData.single_subject_global_getdata($ctrl.s).then(function(data)
        {
           $ctrl.thing=data;
         $ctrl.update.subject_code=$ctrl.thing[0].subject_code; 
         $ctrl.update.subject_name=$ctrl.thing[0].subject_name; 
         $ctrl.update.subject_type=$ctrl.thing[0].subject_type; 
         $ctrl.update.subject_credits=$ctrl.thing[0].subject_credits; 
      
      
      
        $ctrl.update.course=$ctrl.thing[0].course; 
         $ctrl.update.branch=$ctrl.thing[0].branch; 
         $ctrl.update.regulation=$ctrl.thing[0].regulation; 
         $ctrl.update.semister=$ctrl.thing[0].semister; 
       
         $ctrl.update.months=$ctrl.thing[0].months; 
      
            
        });
    
    
    
        $ctrl.getChangeBranch=function()
    {
        $ctrl.subjects.branch=$ctrl.update.branch;
    };
    
        $ctrl.getChangeRegulation=function()
    {
        $ctrl.subjects.regulation=$ctrl.update.regulation;

    };
        $ctrl.getChangeSemister=function()
    {
        $ctrl.subjects.semister=$ctrl.update.semister;
        //$ctrl.subjects.yr=$ctrl.update.yr;
    };
          $ctrl.getChangeYear=function()
    {
        $ctrl.subjects.yr=$ctrl.update.yr;
    };
  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: subject_URL+"/"+$ctrl.s,
            data:{a:$ctrl.subjects,b:$ctrl.update},
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                        }).then(
          function successCallback(response) {
           // alert(response.data[0].name);
   //$ctrl.thing=response.data;
           $ctrl.AlertMessage="Successfully Updated Records"; 
            $ctrl.succ=true;
               $ctrl.fail=false; 
         $timeout(function () { $ctrl.AlertMessage = ''; $ctrl.succ=false;}, 3000); 
              return response.data.subject;
  
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
app.service('subject_Data_numeric', function($http) {  
    return {subject_global_getdata_numeric:function(id){
   return $http({
  method: 'GET',
  url: subject_URL+"/numeric/"+id,
}).then(function successCallback(response) {return response.data.subject;}, function errorCallback(response) {  return response.data.subject;}); 
    }
 }  
});
app.service('subject_Data', function($http) {  
    return {subject_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: subject_URL,
}).then(function successCallback(response) {return response.data.subject;}, function errorCallback(response) {  return response.data.subject;}); 
    }
 }  
}); 
app.service('regulations_Data', function($http) {  
    return {getbyregulation_course:function(id){
   return $http({
  method: 'GET',
  url: regulation_URL+"/regulations/"+id,
}).then(function successCallback(response) {return response.data.regulation;}, function errorCallback(response) {  return response.data.regulation;}); 
    }
 }  
}); 
app.service('branches_Data', function($http) {  
    return {getbybranch_course:function(id){
   return $http({
  method: 'GET',
  url: branch_URL+"/branches/"+id,
}).then(function successCallback(response) {return response.data.branch;}, function errorCallback(response) {  return response.data.branch;}); 
    }
 }  
}); 
app.service('course_years', function($http) {  
    return {no_of_years:function(id){
   return $http({
  method: 'GET',
  url: course_URL+"/years/"+id,
}).then(function successCallback(response) {return response.data.course;}, function errorCallback(response) {  return response.data.course;}); 
    }
 }  
}); 
app.service('subject_singleData', function($http) {  
    return {single_subject_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: subject_URL+"/"+id,
}).then(function successCallback(response) {return response.data.subject;}, function errorCallback(response) {  return response.data.subject;}); 
    }
 }  
}); 

app.service('regulations_Course', function($http) {  
    return {getregulations:function(id){
   return $http({
  method: 'GET',
  url: subject_URL+"/regulations/"+id,
}).then(function successCallback(response) {return response.data.subject;}, function errorCallback(response) {  return response.data.subject;}); 
    }
 }  
}); 

app.service('branches_Course', function($http) {  
    return {getBranches:function(id){
   return $http({
  method: 'GET',
  url: subject_URL+"/branches/"+id,
}).then(function successCallback(response) {return response.data.subject;}, function errorCallback(response) {  return response.data.subject;}); 
    }
 }  
}); 