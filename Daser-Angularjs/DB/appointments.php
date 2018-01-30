<?php
include "connectdb.php";

//$data=json_decode(file_get_contents("php://input"));
//$user=$dbhandle->real_escape_string($data->users);
//echo($user."aaaaaaaaaa");


$request = json_decode(file_get_contents("php://input"), true);
/*if( isset($request["users"]) && $request["users"] == "users-data" ){
    echo "It works!";
    exit(0);
}
*/
if( isset($request["appointment_users"]) && $request["appointment_users"] == "users-appointment" )
{
 
//$query="select a.id as id,a.active as active,a.first_name as first_name,a.last_name as last_name,c.name as orgname,a.emailaddress as emailaddress,a.phonenumber as phonenumber,b.address_line1 as address_line1,b.address_line2 as address_line2,b.city as city,b.state as state,b.zip as zip,b.country as country from users a,service_request_address b,organisations c where a.address_id=b.id and a.org_id=c.id and a.signer_type='Seller' and a.active='Y' ";

$query="select * from users ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result[] = $row;
  $d=1;
}


if($d==1)
{
	 print json_encode($result);

}
else
{
	echo false;
}


}
if( isset($request["appointment_address"]) && $request["appointment_address"] == "users-address" )
{
 
	
$query="select * from service_request_address ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result[] = $row;
  $d=1;
}


if($d==1)
{
	 print json_encode($result);

}
else
{
	echo false;
}
	
}
if( isset($request["appointment_service_request"]) && $request["appointment_service_request"] == "users-requests" )
{
 
	
	
	
$query="select * from service_requests ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result[] = $row;
  $d=1;
}


if($d==1)
{
	 print json_encode($result);

}
else
{
	echo false;
}
	
}




if( isset($request["appointment_service_type"]) && $request["appointment_service_type"] == "servicetype" )
{
 
	
	
	
$query="select * from servicetypes ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result[] = $row;
  $d=1;
}


if($d==1)
{
	 print json_encode($result);

}
else
{
	echo false;
}
	
}




if( isset($request["organizations"]) && $request["organizations"] == "org_name" )
{
 
	
	
	
$query="select * from organisations ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result[] = $row;
  $d=1;
}


if($d==1)
{
	 print json_encode($result);

}
else
{
	echo false;
}
	
}





if( isset($request["totalappointments"]) && $request["totalappointments"] == "appointmentstotal" )
{
 
	
	
	
$query="select count(*) as pdata from service_requests ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result = $row['pdata'];
  $d=1;
}


if($d==1)
{
	 echo($result);

}
else
{
	echo 0;
}
	
}





if( isset($request["openappointments"]) && $request["openappointments"] == "appointmentsopen" )
{
 
	
	
	
$query="select count(*) as pdata from service_requests where status='I' ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result = $row['pdata'];
  $d=1;
}


if($d==1)
{
	 echo($result);

}
else
{
	echo 0;
}
	
}



if( isset($request["closedappointments"]) && $request["closedappointments"] == "appointmentsclosed" )
{
 
	
	
	
$query="select count(*) as pdata from service_requests where status='C' ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result = $row['pdata'];
  $d=1;
}


if($d==1)
{
	 echo($result);

}
else
{
	echo 0;
}
	
}

if( isset($request["pendingappointments"]) && $request["pendingappointments"] == "appointmentspending" )
{
 
	
	
	
$query="select count(*) as pdata from service_requests where status='P' ";


$rs=$dbhandle->query($query);
$d=0;
while($row = $rs->fetch_assoc()) {
  $result = $row['pdata'];
  $d=1;
}


if($d==1)
{
	 echo($result);

}
else
{
	echo 0;
}
	
}







    //print json_encode($data);

	//print_r($data);   

/*
}
   //Else Update code 
	else 
	{

		$id=$dbhandle->real_escape_string($data->id);
        $name=$dbhandle->real_escape_string($data->name);
       	$query="UPDATE student SET studname = '".$name."' WHERE studid=$id ";
       	$dbhandle->query($query);
		
	}
*/
?>