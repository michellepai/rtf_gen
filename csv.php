<?php

// output headers
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=file.csv');


$list = array (
    array('aaa', 'bbb', 'ccc', 'dddd'),
    array('123', '456', '789'),
    array('"aaa"', '"bbb"')
);

$fp = fopen('php://output','w');


// output data
foreach ($list as $fields) {
    fputcsv($fp, $fields);
}

fclose($fp);
?>