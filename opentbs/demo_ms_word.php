<?php

// Include classes
include_once('tbs_class.php'); // Load the TinyButStrong template engine
include_once('../tbs_plugin_opentbs.php'); // Load the OpenTBS plugin

// Initalize the TBS instance
$TBS = new clsTinyButStrong; // new instance of TBS
$TBS->Plugin(TBS_INSTALL, OPENTBS_PLUGIN); // load the OpenTBS plugin

// ------------------------------
// Prepare some data for the demo
// ------------------------------

// API name
$apiname = (isset($_POST[':ops1_api_name'])) ? $_POST[':ops1_api_name'] : '';
$apiname = trim(''.$apiname);
if ($apiname=='') $apiname = "(No API Name)";
$yourname ='';
//Version 
$version = (isset($_POST[':ops1_version'])) ? $_POST[':ops1_version'] : '';
$version = trim(''.$version);
if ($version=='') $version = "(No Version)";

//status
$status = (isset($_POST[':ops1status'])) ? $_POST[':ops1status'] : '';
$status = trim(''.$status);
if ($status=='') $status = "(No Status)";

$q = 1;
$data = array();
do{ 
     $data[] = array('opname'=> $_POST[":ops".$q."_name"], 
                      'url'=> $_POST[":ops".$q."_url"], 
                     'verb'=>'Hill', 
                     'type'=>'1523d');
      $q++;
      }while(isset($_POST[":ops".$q."_name"]));
// Other single data items
$x_num = 3152.456;
$x_pc = 0.2567;
$x_dt = mktime(13,0,0,2,15,2010);
$x_bt = true;
$x_bf = false;
$x_delete = 1;

// -----------------
// Load the template
// -----------------

$template = 'demo_ms_word.docx';
$TBS->LoadTemplate($template); // Also merge some [onload] automatic fields (depends of the type of document).


// Merge data in the body of the document
$TBS->MergeBlock('a,b', $data);


// Define the name of the output file
$save_as = (isset($_POST['save_as']) && (trim($_POST['save_as'])!=='') && ($_SERVER['SERVER_NAME']=='localhost')) ? trim($_POST['save_as']) : '';
$output_file_name = str_replace('.', '_'.date('Y-m-d').$save_as.'.', $template);
if ($save_as==='') {
	// Output the result as a downloadable file (only streaming, no data saved in the server)
	$TBS->Show(OPENTBS_DOWNLOAD, $output_file_name); // Also merges all [onshow] automatic fields.
} else {
	// Output the result as a file on the server
	$TBS->Show(OPENTBS_FILE+TBS_EXIT, $output_file_name); // Also merges all [onshow] automatic fields.
}
