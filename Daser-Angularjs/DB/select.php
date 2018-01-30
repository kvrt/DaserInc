<?php
//database settings
include "connectdb.php";

$query="select * from student";
//$data = array();
$rs=$dbhandle->query($query);

while ($row = $rs->fetch_assoc()) {
  $data[] = $row;
}

	//print_r($data);   
    print json_encode($data);

?>


