$(document).ready(function() {
    var ls_head = 'operations/form_name';
    var ls = window.localStorage;
    var content = '';
    var api_name = getLs(ls_head, ':ops1_api_name');
    var api_version = getLs(ls_head, ':ops1_version');
    var status = getLs(ls_head, ':ops1status');
    
    $('#btn_download').click(function() {
//        content = '<h1>'+api_name +'</h1>';
//        content += '<h2>Version: '+api_version +'</h2>';
//        content += '<h2>Status: '+status +'</h2>';
        content = $('#input_form').innerHTML;
        download('test.html', content);
    });
});
function getLs(head, name){
    window.localStorage.getItem(head+name);
}
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
    
}
