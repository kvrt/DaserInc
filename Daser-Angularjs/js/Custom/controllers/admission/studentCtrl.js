

app.controller("studentCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,student_Data,branch_Data,regulations_Data,branches_Data,course_years,semister_Data,section_Data,fileUpload)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
    
    
   $scope.uploadFile = function(){
        var file = $scope.myFile;
        var uploadUrl = "save_form.php";
      //   $scope.x= fileUpload.uploadFileToUrl(file, uploadUrl);
        fileUpload.getdata(file,uploadUrl).then(function(data)
        {
           $scope.datas=data;
            
        });  
 
   };
    
    $scope.personal={
      
            fname:'',
           lname:'',
           gender:'',
           dob:'',
           mobile_no:'',
           mobile_no_a:'',
           email_id:'',
           bgroup:'',
           caste:'',
           subcaste:'',
           religion:'',
           nationality:'',
           father_name:'',
           mother_name:'',
           father_contact:'',
           father_email:'',
           permanent:'',
           temporary:'' 
          
           
       };
    
    
    
    $scope.academic={
      a_number:'',
        roll:'',
        course:'',
        branch:'',
        regulation:'',
        year1:'',
        semister:'',
        section:'',
        a_year:'' ,
         dates:'',
           timestamps:'',
        fpath:'',
        ftype:''
        
    };
    $scope.peducation={
        
        board:'',
        class1:'',
        branch:'',
        year2:'',
        percentage:'',
        name:'',
        i_address:'' 
        
    };
    
       $scope.uploadFile = function(){
        var file = $scope.myFile;
        var uploadUrl = "save_form.php";
      //   $scope.x= fileUpload.uploadFileToUrl(file, uploadUrl);
        fileUpload.getdata(file,uploadUrl).then(function(data)
        {
           $scope.datas=data;
            $scope.personal.fpath=data.fpath;
            $scope.personal.ptype=data.ftype;
            
        });  
 
   };
    
    
    
 
      $scope.contacts = [];

    $scope.addMore = function() {
        
    $scope.contacts.push({
        board1:'',
        class11:'',
        branch1:'',
        year21:'',
        percentage1:'',
        name1:'',
        i_address1:'' 
        
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
    semister_Data.semister_global_getdata().then(function(data)
        {
           $ctrl.semisters=data;
            
        });
    
      section_Data.section_global_getdata().then(function(data)
        {
           $ctrl.sections=data;
            
        });
  
      $scope.getRegulations=function()
    {  
    regulations_Data.getbyregulation_course($scope.academic.course).then(function(data)
        {
           $ctrl.regulations=data;
            
        });  
          branches_Data.getbybranch_course($scope.academic.course).then(function(data)
        {
           $ctrl.branches=data;
            
        });  
          course_years.no_of_years($scope.academic.course).then(function(data)
        {
              
              $scope.number_course=data[0].years;
              console.log("years"+data[0].years);
        //   $ctrl.years=data[0].years;
             
        }); 
    }
      $scope.number_course=0;
      $scope.getNumber2 = function(num) { 
     
    return new Array(parseInt(num));   
}
  $scope.x=$scope.contacts;
   
    
    var date = new Date();
           $scope.academic.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.academic.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
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
      templateUrl: 'views/Admissions_2/popups/student.html',
      controller: 'student_ModalInstanceCtrl',
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
        console.log("indes"+vars);
        
          $scope.loading=true;
      if(confirm("Are you sure?")){
             $scope.item=$http({
                 method: 'DELETE',
                 url: student_URL+"/"+vars,
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
                 url: student_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         student_Data.student_global_getdata().then(function(data)
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
        var counter2=0;
        var counter3=0;
       
        $scope.strl=$scope.x.length;
        
        if( $scope.personal.fname=="" ||
            $scope.personal.lname=="" ||
            $scope.personal.gender=="" ||
            $scope.personal.dob=="" ||
            $scope.personal.mobile_no=="" ||
            $scope.personal.mobile_no_a=="" ||
            $scope.personal.email=="" ||
            $scope.personal.bgroup=="" ||
            $scope.personal.caste=="" ||
            $scope.personal.subcaste=="" ||
            $scope.personal.religion=="" ||
            $scope.personal.nationality=="" ||
            $scope.personal.father_name=="" ||
            $scope.personal.mother_name=="" ||
            $scope.personal.father_contact=="" ||
            $scope.personal.father_email=="" ||
            $scope.personal.permanent=="" ||
            $scope.personal.temporary=="")
        { 
           counter++  
        }
        
        
        
        
        
        if( $scope.academic.a_number=="" ||
            $scope.academic.roll=="" ||
            $scope.academic.course=="" ||
            $scope.academic.branch=="" ||
            $scope.academic.regulation=="" ||
            $scope.academic.year1=="" ||
            $scope.academic.semister=="" ||
            $scope.academic.section=="" ||
            $scope.academic.a_year==""  )
            { 
           counter1++  
            }
         
        
        
        
        if( $scope.peducation.board=="" ||
           $scope.peducation.class1=="" ||
           $scope.peducation.branch=="" ||
           $scope.peducation.year2=="" ||
           $scope.peducation.percentage=="" ||
           $scope.peducation.name=="" ||
           $scope.peducation.i_address=="")
            { 
           counter2++  
            }
           
         
        
        if($scope.strl!=0)
          {
              for(var i=0;i<$scope.strl;i++)
              {
            if($scope.x[i].board1=="" || $scope.x[i].class11=="" ||              
              $scope.x[i].branch1=="" || $scope.x[i].year21=="" || $scope.x[i].percentage1=="" || $scope.x[i].name1=="" || $scope.x[i].i_address1=="")
                {
                    counter3++;
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
            $scope.AlertMessage="Please Enter Academic  Details"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
            else if(counter2!=0)
        {
            $scope.AlertMessage="Please Enter Add More  Details"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
            else if(counter3!=0)
        {
            $scope.AlertMessage="Please Enter Add More  Details"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
    else
           { 
       $scope.item=$http({
            method: 'POST',
            url: student_URL,
            data:{a:$scope.personal,b:$scope.academic,c:$scope.peducation,d:$scope.contacts},
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
                              
                                

             $scope.AlertMessage="Successfully Inserted Records(s)"; 
                $scope.succ=true;
               $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000); 
                        $scope.contacts.splice(0,$scope.x.length);
                    }
           
               
               
             
                          
               
             student_Data.student_global_getdata().then(function(data)
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
                      $scope.contacts.splice(0,$scope.x.length);
                             
                           
           
         student_Data.student_global_getdata().then(function(data)
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
     student_Data.student_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
         
});
app.controller('student_ModalInstanceCtrl', function ($uibModalInstance,$http, items,student_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={student:''};
    $ctrl.msg="abcd";
    
   
      student_singleData.student_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data[0];
            $ctrl.thing1=data.personal_d;
            $ctrl.thing2=data.previous_d;
            
  //  $ctrl.update.student=$ctrl.thing[0].student_name;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: student_URL+"/"+$ctrl.s,
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
              return response.data.student;
  
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
 
app.service('student_Data', function($http) {  
    return {student_global_getdata:function(){
   return $http({
  method: 'GET',
  url: student_URL,
}).then(function successCallback(response) {return response.data.student ;}, function errorCallback(response) {  return response.data.student ;}); 
    }
 }  
});
app.service('section_Data', function($http) {  
    return {section_global_getdata:function(){
   return $http({
  method: 'GET',
  url: section_URL,
}).then(function successCallback(response) {return response.data.section ;}, function errorCallback(response) {  return response.data.section ;}); 
    }
 }  
});

app.service('student_singleData', function($http) {  
    return {student_single_global_getdata:function(id){
   return $http({
  method: 'GET',
  url: student_URL+"/"+id,
}).then(function successCallback(response) {return response.data.student;}, function errorCallback(response) {  return response.data.student;}); 
    }
 }  
});  
  
  app.directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);

// We can write our own fileUpload service to reuse it in the controller
app.service('fileUpload', function($http) {  
    return { getdata:function(file,uploadUrl){
         var fd = new FormData();
         fd.append('file', file);
        
   return  $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         }).then(function successCallback(response) {return response.data;}, function errorCallback(response) {  return response.data;}); 
    }
 }  
});