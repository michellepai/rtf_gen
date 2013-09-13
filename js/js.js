$(document).ready(function() {
    var ls = window.localStorage;

    var opsCount = 2;
    $("#add_op").click(function() {
        var maincontent = '<tr>';
        maincontent += '<td><input type="text" name="op_name-' + opsCount + '" id="op_name-' + opsCount + '" /></td>';
        maincontent += '<td><textarea placeholder="e.g. /subscriber/consent" name="base_url-' + opsCount + '" id="base_url-' + opsCount + '"></textarea></td>';
        maincontent += '<td>';
        maincontent += '<select name="ops_method-' + opsCount + '" id="ops_method-' + opsCount + '" class="form-alpha">';
        maincontent += '<option value="GET" >GET</option>';
        maincontent += '<option value="HEAD" >HEAD</option>';
        maincontent += '<option value="POST" >POST</option>';
        maincontent += '<option value="PUT" >PUT</option>';
        maincontent += '<option value="DELETE" >DELETE</option>';
        maincontent += '</select>';
        maincontent += '</td>';
        maincontent += '<td><input type="text" placeholder="e.g. Method" name="ops_type-' + opsCount + '" id="ops_type-' + opsCount + '" /></td>';
        maincontent += '</tr>';
        $('#op_summary').append(maincontent).trigger("create");
        opsCount++;
    });
    var formCount = 0;
    for (var key in ls) {
        if (key.match('operations/form_name:operationsop_name-'))
            //if(ls.getItem(key)!=='')
            formCount++;
    }

    $('.hide').css('display', 'none');
    $('#gen_form').click(function() {
        alert(formCount);
        $('this').hide();
        //alert(formCount);
        for (var i = 1; i <= formCount; i++) {
            $('#default_operation').clone()
                    .appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('operations/form_name:operationsop_name-' + i) + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'detail_' + i)
                    .sisyphus({timeout: 0})
                    ;
                    
        }

    });

    $('#input_param').append(loadParam('IP', '01', 1)).trigger("create");
    $('#input_obj').append(loadParam('IP_PRO', '01', 1)).trigger("create");
    $('#output_param').append(loadParam('OP', '01', 1)).trigger("create");
    $('#output_obj').append(loadParam('OP_PRO', '01', 1)).trigger("create");

    var ipCount = 2;
    $("#input_form").on("click", "#add_input_param", function() {
        var maincontent = loadParam('IP', '01', ipCount);
        ipCount++;
        $('#input_param > thead').append(maincontent).trigger("create");
    });
    var ipProCount = 2;
    $("#input_form").on("click", "#add_input_obj", function() {
        var maincontent = loadParam('IP_PRO', '01', ipProCount);
        ipProCount++;
        $('#input_obj > thead').append(maincontent).trigger("create");
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



    var key = 0;
    $("#op_summary").on("blur", ".op_name", function() {
        $(this).after(ls.setItem(++key, $.ucfirst($(this).val())));
    });
    $("#pop_form").click(function() {
        var rowCount = $('#op_summary tr').length - 1;
        var maincontent = '<tr>';
        for (i = rowCount + 1; i <= rowCount + 30; i++) {
            ls.setItem(i, ' ');
        }
        for (i = 1; i <= rowCount; i++) {
            maincontent += '<td><input class="op_form_btn" type="button" onclick="form_btn();" value="' + ls.getItem(i) + '" /></td>';
        }
        maincontent += '</tr>';
        $('#forms_btn').html(maincontent).trigger("create");
    });

    $("#forms_btn").on("click", ".op_form_btn", function() {
        window.open('form.html', '_blank');
    });
    (function($) {
        $.ucfirst = function(str) {
            var text = str;
            var parts = text.split(' '),
                    len = parts.length,
                    i, words = [];
            for (i = 0; i < len; i++) {
                var part = parts[i];
                var first = part[0].toUpperCase();
                var rest = part.substring(1, part.length);
                var word = first + rest;
                words.push(word);
            }
            return words.join(' ');
        };
    })(jQuery);
    $(function() {
        $("form").sisyphus({
            timeout: 10});
    });
    $("#form_op_01_clear").click(function() {
        ls.clear();

        for (key in ls) {
            delete ls[key];
        }
        $('#operations')[0].reset();
    });
    $("#form_op_01_sumit").click(function() {
        window.open('output.html', '_blank');
    });

    function loadParam(IO, form_number, counter) {
        var id = IO + form_number + '-' + counter;
        var maincontent = '<tr>';
        maincontent += '<td><input type="text" name="param' + id + '" id="param' + id + '" value="" /></td>';
        maincontent += '<td><input type="text" name="data_type' + id + '" id="data_type' + id + '" /></td>';
        maincontent += '<td>';
        maincontent += '<select id="required" name="req' + id + '" id="req' + id + '"class="form-alpha">';
        maincontent += '<option value="Mandatory" >Mandatory</option>';
        maincontent += '<option value="Optional" >Optional</option>';
        maincontent += '<option value="Conditional" >Conditional</option>';
        maincontent += '</select>';
        maincontent += '</td>';
        maincontent += '<td><textarea name="des' + id + '" id="des' + id + '" ></textarea></td>';
        maincontent += '<td>';
        maincontent += '<select name="location' + id + '" id="location' + id + '" class="form-alpha">';
        maincontent += '<option value="Header" >Header</option>';
        maincontent += '<option value="Body" >Body</option>';
        maincontent += '<option value="Query_param" >Query Parameter</option>';
        maincontent += '<option value="Resource_uri" >Resource URI</option>';
        maincontent += '</select>';
        maincontent += '</td>';
        maincontent += '</tr>';
        return maincontent;
    }
});

