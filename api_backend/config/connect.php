<?php
$connect = mysqli_connect('localhost', 'root', '', 'rest_api');
mysqli_query($connect, "SET NAMES 'utf8'");
if (!$connect) {                               
  die("Ошибка подключения к БД!");
}