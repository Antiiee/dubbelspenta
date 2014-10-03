<html>
<head>
	<title>Dubbelspenta</title>
	<!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">

	<!-- Optional theme -->
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css">

	<!-- Latest compiled and minified JavaScript -->
	<script src="//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>
</head>
<body>
<?php 
if(isset($_POST["enkel"]) || isset($_POST["dubbel"]))
{
	include('config.php');
	$db_con = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']);
	if($_POST["enkel"])
	{
		if(mysqli_query($db_con, "insert into spentor default values")){};
	}
	else if($_POST["dubbel"])
	{
		if(mysqli_query($db_con, "insert into spentor default values")){};
		if(mysqli_query($db_con, "insert into spentor default values")){};
	}
	mysqli_close($db_con);
}
?>
<div class="col-md-12">
	<form action="bought.php" method="post">
		<button name="enkel" class="btn btn-group-lg" action="submit">Enkelspenta</button>
		<button name="dubbel" class="btn btn-group-lg" action="submit">Dubbelspenta</button>
	</form>
</div>
</body>
</html>