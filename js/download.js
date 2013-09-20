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

var ipProObjCount = 2;
    $("#input_form").on("click", "#add_input_obj", function() {
        $('#head_ipProObj').clone()
                .insertAfter('#head_ipProObj').trigger('create');
        ipProObjCount++;
    });

    var opCount = 2;
    $("#input_form").on("click", "#add_output_param", function() {
        var maincontent = loadParam('OP', '01', opCount);
        opCount++;
        $('#output_param > thead').append(maincontent).trigger("create");
    });

    var opProCount = 2;
    $("#input_form").on("click", "#add_output_obj", function() {
        var maincontent = loadParam('OP_PRO', '01', opProCount);
        opProCount++;
        $('#output_obj > thead').append(maincontent).trigger("create");
    });
    
    var ipCount = 2;
    $("#input_form").on("click", "#add_input_param", function() {
        $('#input_param tr').eq(1).clone().find('input').val('').end()
                .appendTo('#input_param > tbody')
                .find('*[name]')
                .each(function() {
            $(this).attr("name", (function() {
                return $(this).attr("name").slice(0, 10) + ipCount + $(this).attr("name").slice(11);
            }));
        });
        ipCount++;
    });

    var ipProCount = 2;
    $("#input_form").on("click", "#add_input_obj_param", function() {
        $('#input_obj tr').eq(1).clone().find('input').val('').end()
                .appendTo('#input_obj > tbody')
                .find('*[name]')
                .each(function() {
            $(this).attr("name", (function() {
                return $(this).attr("name").slice(0, 10) + ipProCount + $(this).attr("name").slice(11);
            }));
        });
        ipProCount++;
    });

    var num_q = 2;
    $("#add_example_req").click(function() {
        var maincontent = '<hr><fieldset><legend>Example ' + num_q + '</legend><input type="text" placeholder="Example Type e.g. JSON" />';
        maincontent += '<textarea placeholder="e.g. PUT /v1/subscribers/privacy HTTP/1.1"></textarea></fieldset> ';
        num_q = num_q + 1;
        $('#example_req').append(maincontent).trigger("create");
    });

    var num_resp = 2;
    $("#add_example_resp").click(function() {
        var maincontent = '<hr><fieldset><legend>Example ' + num_resp + '</legend><input type="text" placeholder="Example Type e.g. JSON" />';
        maincontent += '<textarea placeholder="e.g. PUT /v1/subscribers/privacy HTTP/1.1"></textarea></fieldset> ';
        num_resp = num_resp + 1;
        $('#example_resp').append(maincontent).trigger("create");
    });
