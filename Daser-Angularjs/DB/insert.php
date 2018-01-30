<?php
include "connectdb.php";

$data=json_decode(file_get_contents("php://input"));

//Update code
$btnName=$dbhandle->real_escape_string($data->btnName);
if($btnName=='Insert')
{


$id=$dbhandle->real_escape_string($data->id);
$name=$dbhandle->real_escape_string($data->name);

$query="INSERT INTO student VALUES($id,'".$name."')";

$dbhandle->query($query);


}
   //Else Update code 
	else 
	{

		$id=$dbhandle->real_escape_string($data->id);
        $name=$dbhandle->real_escape_string($data->name);
       	$query="UPDATE student SET studname = '".$name."' WHERE studid=$id ";
       	$dbhandle->query($query);
		
	}

?>