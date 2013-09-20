$(document).ready(function() {
    var ls = window.localStorage;
    var opsCount = 2;
    $('#add_op').click(function() {
        $('#op_summary tr').eq(1).clone().find('input').val('').end()
                .appendTo('#op_summary')
                .find("*[name]")
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(4)), opsCount));
        });
        opsCount++;
    });

//need to find a way to perform better ops count

    $('.hide').css('display', 'none');
    $('#gen_form').click(function() {
        for (var i = 1; i <= 4; i++) {
            cloneDiv = $('#default_operation').clone();
            cloneDiv.appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('operations/form_name:operations:ops' + i + '_name') + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'detail_' + i)
                    .sisyphus({timeout: 5});
            cloneDiv.find('*[name]').each(function() {
                var new_name = $(this).attr("name").slice(0, 4) + i + $(this).attr("name").slice(5);
                this.name = new_name;
                this.id = new_name;
                console.log('name: ' + this.name + ' id: ' + this.id);
            });
            //change the button name so I can get the button id to match the table id to clone new input row.
            cloneDiv.find(':button.btn_clone').each(function() {
                console.log('buttn: ' + this.id);
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
                console.log('buttn new: ' + new_id);
            });
            cloneDiv.find('table.tbl_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
                console.log('table: ' + new_id);

            });
        }
    });

    //here doesn't clone....
    $('#input_form').on('click', '.btn_clone', function() {
        var b_id = $(this).attr('id');
        var t_id = '#t' + b_id.substring(1).replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
        console.log(this.id + ' with ' + t_id);
        $(t_id + ' tr').eq(1).clone().find('input')
                .val('').end()
                .appendTo(t_id);
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
            timeout: 1000});
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

});

