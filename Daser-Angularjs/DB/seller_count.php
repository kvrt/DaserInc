<?php
include "connectdb.php";

$data=json_decode(file_get_contents("php://input"));

//$idss=$dbhandle->real_escape_string($data->dataid);

$query="select * from service_requests ";
$rsa=$dbhandle->query($query);
$d=0;
while($rowa = $rsa->fetch_assoc()) {
  $resulta[] = $rowa;
  $d=1;
}

if($d==1)
{
	
   print json_encode($resulta);

}
else
{
	echo false;
}

  
?>