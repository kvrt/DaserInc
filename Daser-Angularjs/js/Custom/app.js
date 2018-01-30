var app=angular.module("sync",[ 'ngRoute','ngAnimate', 'ngSanitize','ui.bootstrap','oc.lazyLoad']);

 var course_URL = "http://localhost:2426/Synchronize_4.0/api/course";
var regulation_URL = "http://localhost:2426/Synchronize_4.0/api/regulation";
var branch_URL = "http://localhost:2426/Synchronize_4.0/api/branch";
var semister_URL = "http://localhost:2426/Synchronize_4.0/api/semister";
var section_URL = "http://localhost:2426/Synchronize_4.0/api/section";
var designation_URL = "http://localhost:2426/Synchronize_4.0/api/designation";
var subject_URL = "http://localhost:2426/Synchronize_4.0/api/subject";
var building_URL = "http://localhost:2426/Synchronize_4.0/api/building";
var aboutus_URL = "http://localhost:2426/Synchronize_4.0/api/aboutus";
var room_URL = "http://localhost:2426/Synchronize_4.0/api/room";
var department_URL = "http://localhost:2426/Synchronize_4.0/api/department";
var academic_URL = "http://localhost:2426/Synchronize_4.0/api/academic";

/*
admissions urls
*/
var student_URL = "http://localhost:2426/Synchronize_4.0/api/student";
var staff_URL = "http://localhost:2426/Synchronize_4.0/api/staff";
var certificate_URL = "http://localhost:2426/Synchronize_4.0/api/certificate";



/*
swami urls:

 var course_URL = "http://localhost:2426/Synchronize_4.0/api/course";
var regulation_URL = "http://localhost:2426/Synchronize_4.0/api/regulation";
var branch_URL = "http://localhost:2426/Synchronize_4.0/api/branch";
var semister_URL = "http://localhost:2426/Synchronize_4.0/api/semister";
var section_URL = "http://localhost:2426/Synchronize_4.0/api/section";
var designation_URL = "http://localhost:2426/Synchronize_4.0/api/designation";
var subject_URL = "http://localhost:2426/Synchronize_4.0/api/subject";
var building_URL = "http://localhost:2426/Synchronize_4.0/api/building";
var aboutus_URL = "http://localhost:2426/Synchronize_4.0/api/aboutus";
var room_URL = "http://localhost:2426/Synchronize_4.0/api/room";
var department_URL = "http://localhost:2426/Synchronize_4.0/api/department";
var academic_URL = "http://localhost:2426/Synchronize_4.0/api/academic";

//admissions urls

var student_URL = "http://localhost:2426/Synchronize_4.0/api/student";
var staff_URL = "http://localhost:2426/Synchronize_4.0/api/staff";
var certificate_URL = "http://localhost:2426/Synchronize_4.0/api/certificate";

*/

/*
yesu urls:
  var course_URL = "http://localhost/Synchronize/api/course";
var regulation_URL = "http://localhost/Synchronize/api/regulation";
var branch_URL = "http://localhost/Synchronize/api/branch";
var semister_URL = "http://localhost/Synchronize/api/semister";
var section_URL = "http://localhost/Synchronize/api/section";
var designation_URL = "http://localhost/Synchronize/api/designation";
var subject_URL = "http://localhost/Synchronize/api/subject";
var building_URL = "http://localhost/Synchronize/api/building";
var aboutus_URL = "http://localhost/Synchronize/api/aboutus";
var room_URL = "http://localhost/Synchronize/api/room";
var department_URL = "http://localhost/Synchronize/api/department";
var academic_URL = "http://localhost/Synchronize/api/academic";


//admissions urls

var student_URL = "http://localhost/Synchronize/api/student";
var staff_URL = "http://localhost/Synchronize/api/staff";
var certificate_URL = "http://localhost/Synchronize/api/certificate";


*/




app.config(function($routeProvider,$locationProvider){
	
	$locationProvider.hashPrefix('');
	$routeProvider
	.when("/",{
		templateUrl:'views/Academics_1/mainbody.html'
	})
	.when("/academic/academic",{
		templateUrl:'views/Academics_1/academic.html'
	})
	.when("/academic/aboutus",{
		templateUrl:'views/Academics_1/aboutus.html'
	})
	.when("/academic/building",{
		templateUrl:'views/Academics_1/building.html'
	})
	.when("/academic/rooms",{
		templateUrl:'views/Academics_1/rooms.html'
	})
	.when("/academic/departments",{
		templateUrl:'views/Academics_1/dept.html'
	})
	.when("/academic/course",{
		templateUrl:'views/Academics_1/courses.html'
	})
	.when("/academic/regulation",{
		templateUrl:'views/Academics_1/regulations.html'
	})
	.when("/academic/branch",{
		templateUrl:'views/Academics_1/branches.html'
	})
	.when("/academic/semister",{
		templateUrl:'views/Academics_1/semisters_practice.html'
	})
	/*.when("/academic/semister_practice",{
		templateUrl:'views/Academics_1/semisters_practice.html'
	})*/
	.when("/academic/section",{
		templateUrl:'views/Academics_1/sections.html'
	})
	.when("/academic/designation",{
		templateUrl:'views/Academics_1/designations.html'
	})
	.when("/academic/subjects",{
		templateUrl:'views/Academics_1/subject.html'
	})
	
	// admissions
	
	.when("/admissions/student",{
		templateUrl:'views/Admissions_2/student.html'
	})
	.when("/admissions/staff",{
		templateUrl:'views/Admissions_2/staff.html'
	})
	.when("/admissions/reports/student",{
		templateUrl:'views/Admissions_2/stu_reports.html'
	})
	.when("/admissions/reports/staff",{
		templateUrl:'views/Admissions_2/staff_reports.html'
	})
	.when("/admissions/accept",{
		templateUrl:'views/Admissions_2/acceptance.html'
	})
	.when("/admissions/issue",{
		templateUrl:'views/Admissions_2/issued.html'
	})
	.when("/admissions/reports/accept",{
		templateUrl:'views/Admissions_2/accept_reports.html'
	})
	.when("/admissions/reports/issue",{
		templateUrl:'views/Admissions_2/issue_reports.html'
	})
	
	// Fee management
	
	.when("/fee/setup",{
		templateUrl:'views/Fee_3/fee_setup.html'
	})
	.when("/fee/collection",{
		templateUrl:'views/Fee_3/fee_collection.html'
	})
	.when("/fee/receipts",{
		templateUrl:'views/Fee_3/fee_receipts.html'
	})
	
	// Time Table Management
	
	.when("/tt/periods-setup",{
		templateUrl:'views/time-table_4/p_setup.html'
	})
	.when("/tt/faculty/subject-allocation",{
		templateUrl:'views/time-table_4/s_alloc.html'
	})
	.when("/tt/faculty/create-tt",{
		templateUrl:'views/time-table_4/faculty_tt.html'
	})
	.when("/tt/faculty/reports/subjects-allocation",{
		templateUrl:'views/time-table_4/reports_sub_alloc.html'
	})
	.when("/tt/faculty/reports/tt",{
		templateUrl:'views/time-table_4/tt_reports.html'
	})
	.when("/tt/weekdays-setup",{
		templateUrl:'views/time-table_4/weekdays_setup.html'
	})
	.when("/tt/student/create-tt",{
		templateUrl:'views/time-table_4/student_tt.html'
	})
	.when("/tt/student/tt",{
		templateUrl:'views/time-table_4/student_view_tt.html'
	})
	
	//Attendance Management
	
	.when("/attendance/staff",{
		templateUrl:'views/attendance_5/staff_attendance.html'
	})
	.when("/attendance/view-staff",{
		templateUrl:'views/attendance_5/view_staff_attendance.html'
	})
	.when("/attendance/student",{
		templateUrl:'views/attendance_5/student_attendance.html'
	})
	.when("/attendance/view-student",{
		templateUrl:'views/attendance_5/view_student_attendance.html'
	})
	
	//Leave Management
	
	.when("/leave/category",{
		templateUrl:'views/leave_6/lv_category.html'
	})
	.when("/leave/request",{
		templateUrl:'views/leave_6/lv_request.html'
	})
	.when("/leave/status",{
		templateUrl:'views/leave_6/lv_status.html'
	})
	.when("/leave/permissions",{
		templateUrl:'views/leave_6/lv_permissions.html'
	})
	.when("/leave/reports",{
		templateUrl:'views/leave_6/lv_reports.html'
	})
	
	
	// HR / Payroll
	
	.when("/payroll/earning",{
		templateUrl:'views/Payroll_7/pay_earnings.html'
	})
	.when("/payroll/deductions",{
		templateUrl:'views/Payroll_7/pay_deductions.html'
	})
	.when("/payroll/generate",{
		templateUrl:'views/Payroll_7/pay_generate.html'
	})
	.when("/payroll/payslips",{
		templateUrl:'views/Payroll_7/pay_payslips.html'
	})
	
	
	// Examination Department
	
	.when("/examination/category",{
		templateUrl:'views/Exam_8/exam_category.html'
	})
	.when("/examination/tt",{
		templateUrl:'views/Exam_8/exam_tt.html'
	})
	.when("/examination/hall-allocation",{
		templateUrl:'views/Exam_8/exam_hall_allocation.html'
	})
	.when("/examination/invigilation",{
		templateUrl:'views/Exam_8/exam_invigilation.html'
	})
	.when("/examination/exam-attendance",{
		templateUrl:'views/Exam_8/exam_attendance.html'
	})
	.when("/examination/marks-entry",{
		templateUrl:'views/Exam_8/exam_marks_entry.html'
	})
	
	.when("/examination/reports/tt",{
		templateUrl:'views/Exam_8/exam_tt_reports.html'
	})
	.when("/examination/reports/hall-allocation",{
		templateUrl:'views/Exam_8/exam_reports_hall_allocation.html'
	})
	.when("/examination/reports/invigilation-dutty",{
		templateUrl:'views/Exam_8/exam_reports_invigilation.html'
	})
	.when("/examination/reports/exam-attendance",{
		templateUrl:'views/Exam_8/exam_reports_attendance.html'
	})
	.when("/examination/reports/marks",{
		templateUrl:'views/Exam_8/exam_reports_marks.html'
	})
	
	
	// Library
	
	.when("/library/setup",{
		templateUrl:'views/Library_9/library_setup.html'
	})
	.when("/library/book-category",{
		templateUrl:'views/Library_9/library_book_category.html'
	})
	.when("/library/add-books",{
		templateUrl:'views/Library_9/library_add_book.html'
	})
	.when("/library/issue-books",{
		templateUrl:'views/Library_9/library_issue_book.html'
	})
	.when("/library/return-renwal",{
		templateUrl:'views/Library_9/library_return.html'
	})
	.when("/library/reserved-book",{
		templateUrl:'views/Library_9/library_reserved_book.html'
	})
	.when("/library/reports/books",{
		templateUrl:'views/Library_9/library_reports_book.html'
	})
	.when("/library/reports/issued-books",{
		templateUrl:'views/Library_9/library_reports_issuebook.html'
	})
	.when("/library/reports/available-books",{
		templateUrl:'views/Library_9/library_reports_available.html'
	})
	.when("/library/reports/renewal-books",{
		templateUrl:'views/Library_9/library_reports_renewalbook.html'
	})
	
	// Notice Board
	
	.when("/notice/board",{
		templateUrl:'views/Noticeboard_10/notice_board.html'
	})
	.when("/notice/events",{
		templateUrl:'views/Noticeboard_10/notice_events.html'
	})
	.when("/notice/career",{
		templateUrl:'views/Noticeboard_10/notice_career.html'
	})
	.when("/notice/placements",{
		templateUrl:'views/Noticeboard_10/notice_placements.html'
	})
	.when("/notice/reports",{
		templateUrl:'views/Noticeboard_10/notice_reports.html'
	})
	
	
	// Sports
	
	.when("/sports/details",{
		templateUrl:'views/Sports_11/sports_details.html'
	})
	.when("/sports/allocation",{
		templateUrl:'views/Sports_11/sports_allocation.html'
	})
	.when("/sports/reports",{
		templateUrl:'views/Sports_11/sports_reports.html'
	})
	
	// Material Upload
	
	.when("/materials/type",{
		templateUrl:'views/Material_12/material_type.html'
	})
	.when("/materials/upload-material",{
		templateUrl:'views/Material_12/material_upload.html'
	})
	.when("/materials/reports",{
		templateUrl:'views/Material_12/material_reports.html'
	})
	
	// Complaint - Suggestions
	
	
	.when("/complaint/type",{
		templateUrl:'views/suggestions_13/complaint_type.html'
	})
	.when("/complaint/add-complaint",{
		templateUrl:'views/suggestions_13/complaint.html'
	})
	.when("/complaint/view-complaint",{
		templateUrl:'views/suggestions_13/complaint_view.html'
	})
	.when("/suggestion/add-suggestion",{
		templateUrl:'views/suggestions_13/suggestion.html'
	})
	.when("/suggestion/view-suggestion",{
		templateUrl:'views/suggestions_13/suggestion_view.html'
	})

	
	
	.otherwise({
		redirectTo:'error.html'
	});
	
});


app.controller("navbara",function($scope){
	 
	// $scope.show_M=true;
	$scope.mm=function()
	{ 
		$scope.show_M=false;
		
		
	}
	
	
	
	$scope.showmenu=function()
	{ 
		$scope.show_M=true;
		console.log($scope.show_M);
		
	}
	// Admissions
	$scope.admission=function()
	{
		$scope.admin=true;
		$scope.academi=true;
		$scope.hide_3=false;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;

		
	}
	// Academic 
	$scope.acd=function()
	{
		$scope.admin=false;
		$scope.academi=false;
		$scope.hide_3=false;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;

		
	}
	
	// Fee Management
	$scope.m3=function()
	{
		$scope.hide_3=true;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// Time Table Management
	$scope.m4=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=true;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	
	// Attendance
	$scope.m5=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=true;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	// Leave Management
	$scope.m6=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=true;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// HR / Payroll
	$scope.m7=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=true;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// Examination Department
	$scope.m8=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=true;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// Library
	$scope.m9=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=true;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// Notice Board
	$scope.m10=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=true;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	
	// sports
	$scope.m11=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=true;
		$scope.hide_12=false;
		$scope.hide_13=false;
			
	}
	// Materials upload
	$scope.m12=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=true;
		$scope.hide_13=false;
			
	}
	// Complaints / Suggestion
	$scope.m13=function()
	{
		$scope.hide_3=false;
		$scope.admin=false;
		$scope.academi=true;
		$scope.hide_4=false;
		$scope.hide_5=false;
		$scope.hide_6=false;
		$scope.hide_7=false;
		$scope.hide_8=false;
		$scope.hide_9=false;
		$scope.hide_10=false;
		$scope.hide_11=false;
		$scope.hide_12=false;
		$scope.hide_13=true;
			
	}
	
	
	
	/*$scope.menu=function()
	{  
				$scope.sa=false;
				$scope.sa1=true;
				
				console.log("hello from menu2"+$scope.sa1);
		 
	}*/
	
});