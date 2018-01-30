<?php
include "connectdb.php";

$data=json_decode(file_get_contents("php://input"));

$username=$dbhandle->real_escape_string($data->username);
$password=$dbhandle->real_escape_string($data->pass);

$query="select * from admin_user where username='".$username."' and password='".$password."' ";
$rs=$dbhandle->query($query);

if($row = $rs->fetch_assoc()) {
  $dataa[] = $row;
 print json_encode($dataa);
}
else
{
	echo false;
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