$(document).ready(function() {
    var ls = window.localStorage;
    var opsCount = 2;
    $('#add_op').click(function() {
        $('#op_summary tr').eq(1).clone().find('input').val('').end()
                .appendTo('#op_summary').trigger('creat')
                .find("*[name]")
                //.andSelf()
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(4)), opsCount));
        });
        opsCount++;
    });

    var formCount = 0;
    for (var key in ls) {
        if (key.match('operations/form_name:operations:ops1'))
            formCount++;
    }
    
    formCount = (formCount-3)/4;
    
    $('.hide').css('display', 'none');
    $('#gen_form').click(function() {
        $('this').hide();
        alert(formCount);
        for (var i = 1; i <= formCount; i++) {
            $('#default_operation').clone()
                    .appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('operations/form_name:operations:ops' + i +'_name') + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'detail_' + i)
                    .sisyphus({timeout: 0});
        }
    });
    
    var ipCount = 2;
    $('#add_op').click(function() {
        $('#op_summary tr').eq(1).clone().find('input').val('').end()
                .appendTo('#op_summary').trigger('creat')
                .find("*[name]")
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(4)), opsCount));
        });
        opsCount++;
    });


    $ids = $('form input[id]').map(function() {
        return this.id;
    }).get();

 var ipCount = 2;
    $("#input_form").on("click", "#add_input_param", function() {
        $('#input_param tr').eq(1).clone().find('input').val('').end()
                .appendTo('#input_param > thead').trigger('creat')
                .find("*[name]")
                .andSelf()
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(9)), ipCount));
        });
        ipCount++;
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

