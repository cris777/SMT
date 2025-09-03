<!DOCTYPE html>
<html>
<head>
  <title>Generador de Carnet Estudiantil 2025</title>
  <meta name="description" content="Generador de Carnet Estudiantil 2025">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="js/bootstrap.min.js"></script>
     <script type="text/javascript" src="js/jquery.qrcode.js"></script>
     <script type="text/javascript" src="js/qrcode.js"></script>
   

    <style>
    .qrcode{
        z-index:5;
        margin-top: -43.2rem;
        margin-right: -15rem;
    }
    .imprimir{
        display: block;
        margin-top: 50rem;
    }
  </style>
</head>





<?php

session_name("jwmf"); 
session_start(); 


$title = isset($_POST['title']) ? htmlentities($_POST['title']) : "CARNET ESTUDIANTIL";

$fname = $_POST['fname'] ;
$ename = $_POST['ename'] ;
$faname = $_POST['faname'];
$mname = $_POST['mname'];
$dname = $_POST['dname'];
$nid = $_POST['nid'];
$save = 'images/'.str_replace(" ","_",$faname).'.jpg';
$_SESSION['card']=$save; 
$bgpic = imagecreatefrompng("nid.png");
$textcolor = imagecolorallocate($bgpic,230,200,11);
$infcolor = imagecolorallocate($bgpic,0,0,0);
$stscolor = imagecolorallocate($bgpic,0,0,0);
$ttscolor = imagecolorallocate($bgpic,0,0,0);
$font=__DIR__ ."/fonts/verdana.ttf";
$f2=__DIR__ ."/fonts/sm.ttf";
$f3=__DIR__ ."/fonts/sign.ttf";
$f4=__DIR__ ."/fonts/avro.ttf";
//imagestring($bgpic,7,30,5,$title,$textcolor);
//echo($f4);

imagettftext($bgpic,10, 0,21,260,$infcolor,$font,$fname);
imagettftext($bgpic,10, 0,164,260,$infcolor,$font,$ename);
imagettftext($bgpic,10, 0,21,300,$infcolor,$font,$faname);
imagettftext($bgpic,10, 0,21,340,$infcolor,$font,$mname);
imagettftext($bgpic,10, 0,21,380,$infcolor,$font,$dname);
imagettftext($bgpic,10, 0,21,433,$infcolor,$font,$nid);



$avl = $_FILES['file']['tmp_name'];
if(trim($avl!=""))
{
  $imgi = getimagesize($avl);
  if($imgi[0]>0)
  {
      if($imgi[2]==1)
      {
        $av = imagecreatefromgif($avl);
        imagecopyresized($bgpic, $av,25,110,0,0,100,100,$imgi[0], $imgi[1]);
      }else if($imgi[2]==2)
      {
        $av = imagecreatefromjpeg($avl);
        imagecopyresized($bgpic, $av,25,110,0,0,100,100,$imgi[0], $imgi[1]);
      }else if($imgi[2]==3)
      {
        $av = imagecreatefrompng($avl);
        imagecopyresized($bgpic, $av,25,110,0,0,100,100,$imgi[0], $imgi[1]);
      }
      
  }
}
imagepng($bgpic,$save);
imagedestroy($bgpic);
//header("Location: ".$save); 


?>

<body>
   
   <center>
 <img src="<?php echo($save); ?>"/>
 <div class="qrcode"><img src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&amp;data=https://carnets.sierramindtech.com/<?php echo($save); ?>"/></div>
 <div class="imprimir">
  <button onclick="window.print()">IMPRIMIR CARNET</button><br><br>
  <a href="index.php" style="text-decoration:none;">Volver al Inicio</a></div>
 </center>




</body>

</html>