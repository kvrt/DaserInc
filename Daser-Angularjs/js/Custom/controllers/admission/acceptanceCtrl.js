

app.controller("acceptanceCtrl",function($scope,$http,$uibModal, $log,$filter,$document,$timeout,Data,$ocLazyLoad,certificate_Data,designation_Data,department_Data,fileUpload,branch_Data,regulations_Data,branches_Data,course_years,semister_Data,section_Data,srch_Data)
              {
  //   $ocLazyLoad.load('js/Custom/controllers/academic/testModule.js');
     $scope.AlertMessage = '';
    $scope.file_name='';
    $scope.file_type='';
    
     $scope.details=0;
$scope.srch={course:'',branch:'',regulation:'',year1:'',semister:'',section:''};
    
    $scope.personal={
      
            fname:'',
           lname:'',
           gender:'',
           dob:'',
           mobile_no:'',
           mobile_no_a:'',
           email_id:'',
           bgroup:'',
           religion:'',
           nationality:'',
           permanent:'',
           temporary:'' ,
        fpath:'',
        ftype:''
        
       };
    
         $scope.uploadFile = function(){
        var file = $scope.myFile;
        var uploadUrl = "save_form.php";
      //   $scope.x= fileUpload.uploadFileToUrl(file, uploadUrl);
        fileUpload.getdata(file,uploadUrl).then(function(data)
        {
           $scope.datas=data;
            $scope.personal.fpath=data.fpath;
            $scope.personal.ftype=data.ftype;
        });  
 
   };
    
   
 
 
      $scope.contacts = [];
      $scope.contacts1 = [];

    $scope.addMore = function() {
        
    $scope.contacts.push({
        board1:'',
        class11:'',
        branch1:'',
        pyear1:'',
        percentage1:'',
        name1:'',
        i_address1:'' 
        
    })
  }
    
    $scope.addMore1 = function() {
        
    $scope.contacts1.push({
      ise1:'',
        design1:'',
        nyrs1:'',
        nmnts1:'',
        exprt1:'',
        pctc1:'',
        oname1:'',
        oaddress1:''
        
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
     $scope.cancel1 = function(index) {
  $scope.contacts1.splice(index,1);
  }
  
    
      $scope.number_course=0;
      $scope.getNumber2 = function(num) { 
     
    return new Array(parseInt(num));   
}
  $scope.x=$scope.contacts;
  $scope.x1=$scope.contacts1;
   
    
    var date = new Date();
           $scope.srch.dates = $filter('date')(new Date(), 'yyyy-MM-dd');
            $scope.srch.timestamps =  $filter('date')(new Date(), 'hh:mm:ss a');
    
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
      templateUrl: 'views/Academics_1/popups/certificate.html',
      controller: 'certificate_ModalInstanceCtrl',
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
                 method: 'POST',
                 url: certificate_URL+"/update/"+vars,
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
                 url: certificate_URL,
                  data:{c:$scope.chks},
                 headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
             }).then(
                 function successCallback(response) {
                   $scope.AlertMessage="Successfully Deleted Records"; 
                $scope.succ=true;
                      $scope.fail=false; 
         $timeout(function () { $scope.AlertMessage = ''; $scope.succ=false;}, 3000);
                     
         certificate_Data.certificate_global_getdata().then(function(data)
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
        var counter4=0;
        var counter5=0;
       
        $scope.strl=$scope.x.length;
        $scope.strl1=$scope.x1.length;
        
        if( $scope.personal.fname=="" ||
            $scope.personal.lname=="" ||
            $scope.personal.gender=="" ||
            $scope.personal.dob=="" ||
            $scope.personal.mobile_no=="" ||
            $scope.personal.mobile_no_a=="" ||
            $scope.personal.email_id=="" ||
            $scope.personal.bgroup=="" ||
            $scope.personal.religion=="" ||
            $scope.personal.nationality=="" ||
            $scope.personal.permanent=="" ||
            $scope.personal.temporary=="")
        { 
           counter++  
        }
        
   
        
        if( $scope.currente.dept=="" ||
            $scope.currente.course=="" ||
            $scope.currente.designation=="" ||
            $scope.currente.ctc=="" ||
            $scope.currente.empid=="" ||
            $scope.currente.dates=="" ||
            $scope.currente.timestamps==""  )
            { 
           counter1++  
            }
         
        
        
        
        if( $scope.peducation.board=="" ||
           $scope.peducation.class1=="" ||
           $scope.peducation.branch=="" ||
           $scope.peducation.pyear=="" ||
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
              $scope.x[i].branch1=="" || $scope.x[i].pyear1=="" || $scope.x[i].percentage1=="" || $scope.x[i].name1=="" || $scope.x[i].i_address1=="")
                {
                    counter3++;
                }
            
              }
          }
        
        
         if( $scope.we.ise=="" ||
           $scope.we.design=="" ||
           $scope.we.nyrs=="" ||
           $scope.we.nmnts=="" ||
           $scope.we.exprt=="" ||
           $scope.we.pctc=="" ||
           $scope.we.oname=="" ||
           $scope.we.oaddress=="")
            { 
           counter4++  
            }
         if($scope.strl1!=0)
          {
              for(var i=0;i<$scope.strl1;i++)
              {
            if( $scope.x1[i].design1=="" ||              
              $scope.x1[i].nyrs1=="" || $scope.x1[i].nmnts1=="" || $scope.x1[i].exprt1=="" || $scope.x1[i].pctc1=="" || $scope.x1[i].oname1=="" || $scope.x1[i].oaddress1=="")
                {
                    counter5++;
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
                else if(counter4!=0)
        {
            $scope.AlertMessage="Please Enter Experience  Details"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
                else if(counter5!=0)
        {
            $scope.AlertMessage="Please Enter Add More  Details work Experience"; 
            $scope.fail=true;  
         window.scrollTo(0,0);
             $scope.loading=false; 
        }
    else
           {
                    window.scrollTo(0,0);
       $scope.item=$http({
            method: 'POST',
            url: certificate_URL,
            data:{a:$scope.currente,b:$scope.personal,c:$scope.peducation,d:$scope.contacts,e:$scope.we,f:$scope.contacts1},
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
                        $scope.contacts1.splice(0,$scope.x1.length);
                        $scope.peducation=[];
                        $scope.personal=[];
                        $scope.currente=[];
                        $scope.we=[];
                    }
           
               
               
             
                          
               
             certificate_Data.certificate_global_getdata().then(function(data)
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
                             
                           
           
         certificate_Data.certificate_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });

          });                
            }
        
    
    }
    
         certificate_Data.certificate_global_getdata().then(function(data)
        {
           $ctrl.tabdata=data;
            
        });
     
   $scope.msg="hello from crud"; 
     
          Data.global_getdata().then(function(data)
        {
           $ctrl.thing=data;
            
        });
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
          
    regulations_Data.getbyregulation_course($scope.srch.course).then(function(data)
        {
           $ctrl.regulations=data;
            
        });  
          branches_Data.getbybranch_course($scope.srch.course).then(function(data)
        {
           $ctrl.branches=data;
            
        });  
          course_years.no_of_years($scope.srch.course).then(function(data)
        {
              
            $scope.number_course=data[0].years;
           //   console.log("years"+data[0].years);
         $ctrl.years=data[0].years;
             
        }); 
    }
      
       $scope.getRollnumbers=function()
        {   
           srch_Data.srch_global_getdata($scope.srch).then(function(data)
            { 
               $scope.srchdata=data;
               
          });
            
       }
         $scope.getStudent1=function(s)
            { 
             var x=0; 
             srch_Data.srch_student1_getdata(s).then(function(data)
                    { 
               $scope.student=data[0]; 
                        console.log("length is"+data.length);
                    x=data.length;
                    if(x)
                    { $scope.details=1; }
                    else
                    { $scope.details=0;}  
                 
                    });
               
            };
       
       $scope.getStudent=function()
       {
           if($scope.srch.roll)
               {
                        $scope.details=1;
                   console.log("abcdd"+$scope.srch.roll);
                    srch_Data.srch_student_getdata($scope.srch.roll).then(function(data)
                    { 
               $scope.student=data[0];
               
                    });
               }
       
           else
               $scope.details=0; 
       };
       
      
});
app.controller('certificate_ModalInstanceCtrl', function ($uibModalInstance,$http, items,certificate_singleData,$timeout,Data) {
  var $ctrl = this;
  $ctrl.s = items;
  $ctrl.selected = {
    item: $ctrl.s
  };
     
    $ctrl.update={certificate:''};
    $ctrl.msg="abcd";
     
   
      certificate_singleData.certificate_single_global_getdata($ctrl.s).then(function(data)
        {
            $ctrl.thing=data;
            
    $ctrl.update.certificate=$ctrl.thing[0].certificate_name;
     
        });

  $ctrl.ok = function () {
      console.log("from data"+$ctrl.update.name+"--sss==="+$ctrl.s);
              $ctrl.ite=$http({
            method: 'POST',
            url: certificate_URL+"/"+$ctrl.s,
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
              return response.data.certificate;
  
                                            },
          function errorCallback(response) {
              //  alert(response.data);
                                            });
      
      
     
      
      console.log($ctrl.ite);
    
    $uibModalInstance.close($ctrl.ite);
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
 
app.service('certificate_Data', function($http) {  
    return {certificate_global_getdata:function(){
   return $http({
  method: 'GET',
  url: certificate_URL,
}).then(function successCallback(response) {return response.data.certificate;}, function errorCallback(response) {  return response.data;}); 
    }
 }  
});
app.service('srch_Data', function($http) {  
    return {srch_global_getdata:function(sd){
   return $http({
  method: 'POST',
    data:{a:sd},  
  url: certificate_URL+"/multiple" 
}).then(function successCallback(response) {
         return response.data.certificate ;}, function errorCallback(response) {  return response.data;}); 
    }, 
            srch_student_getdata:function(sd){
   return $http({
  method: 'GET',
  url: certificate_URL+"/student/"+sd 
}).then(function successCallback(response) {
         return response.data.certificate ;}, function errorCallback(response) {  return response.data;}); 
    },         
   srch_student1_getdata:function(sd){
   return $http({
  method: 'GET',
  url: certificate_URL+"/student1/"+sd 
}).then(function successCallback(response) {
         return response.data.certificate ;}, function errorCallback(response) {  return response.data;}); 
    }                   
 }  
});
 