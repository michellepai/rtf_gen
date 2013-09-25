$(document).ready(function() {
    var ls = window.localStorage;
    $('.hide').css('display', 'none');
    
    //need to set opCount sync with the localstorage
    
    if (ls.getItem('1opsCount') !== null) {
        opsCount = ls.getItem('1opsCount');
        for (i = 1; i <= opsCount; i++) {
            if(i!==1){
                $('#op_summary tr').eq(1).clone().find('input').val('').end()
                    .appendTo('#op_summary')
                    .find("*[name]")
                    .each(function() {
                $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(4)),i));
            });
            }
            
            cloneDiv = $('#default_operation').clone();
            cloneDiv.appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('spec_form/spec_form:ops' + i + '_name') + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'operation_' + i)
                    .sisyphus({timeout: 5});
            cloneDiv.find('*[name]').each(function() {
                var new_name = $(this).attr("name").slice(0, 4) + i + $(this).attr("name").slice(5);
                this.name = new_name;
                this.id = new_name;
                console.log('name: ' + this.name + ' id: ' + this.id);
            });
            cloneDiv.find(':button.btn_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
            });
            cloneDiv.find('table.tbl_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;

            });
                               
        }
    }else{
        opsCount=1;
    }
    $('#add_op').click(function() {
        opsCount++;
        $('#op_summary tr').eq(1).clone().find('input').val('').end()
                .appendTo('#op_summary')
                .find("*[name]")
                .each(function() {
            $(this).attr("name", $(this).attr("name").replace(($(this).attr("name").charAt(4)), opsCount));
        });
        cloneDiv = $('#default_operation').clone();
            cloneDiv.appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('spec_form/spec_form:ops' + i + '_name') + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'operation_' + i)
                    .sisyphus({timeout: 5});
            cloneDiv.find('*[name]').each(function() {
                var new_name = $(this).attr("name").slice(0, 4) + i + $(this).attr("name").slice(5);
                this.name = new_name;
                this.id = new_name;
                console.log('name: ' + this.name + ' id: ' + this.id);
            });
            cloneDiv.find(':button.btn_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
            });
            cloneDiv.find('table.tbl_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;

            });
        ls.setItem('1opsCount', opsCount);

    });
    $('#rm_op').click(function() {
        opsCount--;
        $('#op_summary tr').last('tr').remove();
        divToRemove = 'operation_'+(opsCount+1);
        $('#'+divToRemove).remove();
        ls.setItem('1opsCount', opsCount);
        
    });

    
    $('#gen_form').click(function() {
        for (var i = 1; i <= opsCount; i++) {
            cloneDiv = $('#default_operation').clone();
            cloneDiv.appendTo('#input_form')
                    .prepend('<h2>' + ls.getItem('spec_form/spec_form:ops' + i + '_name') + '</h2>')
                    .css('display', 'block')
                    .attr('id', 'operation_' + i)
                    .sisyphus({timeout: 5});
            cloneDiv.find('*[name]').each(function() {
                var new_name = $(this).attr("name").slice(0, 4) + i + $(this).attr("name").slice(5);
                this.name = new_name;
                this.id = new_name;
                console.log('name: ' + this.name + ' id: ' + this.id);
            });
            //change the button name so I can get the button id to match the table id to clone new input row.
            cloneDiv.find(':button.btn_clone').each(function() {
                //console.log('buttn: ' + this.id);
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
                //console.log('buttn new: ' + new_id);
            });
            cloneDiv.find('table.tbl_clone').each(function() {
                var new_id = $(this).attr("id").slice(0, 6) + i + $(this).attr("id").slice(7);
                this.id = new_id;
                //console.log('table: ' + new_id);

            });
        }
    });

    $('#input_form').on('click', '.btn_clone', function() {
        var b_id = $(this).attr('id');
        var t_id = '#t' + b_id.substring(1).replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, "\\$&");
        //console.log(this.id + ' with ' + t_id);
        cloneDiv = $(t_id + ' tr').last('tr').clone().find('input')
                .val('').end()
                .appendTo(t_id);
        console.log('last clone name ' + cloneDiv.find('tr:last'));

        cloneDiv.find('*[name]').each(function() {
            var i = parseInt($(this).attr("name").slice(10, 11)) + 1;
            var new_name = $(this).attr("name").slice(0, 10) + i + $(this).attr("name").slice(11);
            this.name = new_name;
            this.id = new_name;
            //console.log('name: ' + this.name + ' id: ' + this.id);
        });
    });

    $(function() {
        $("form").sisyphus({
            timeout: 3});
    });

    $("#form_op_01_clear").click(function() {
        ls.clear();

        for (key in ls) {
            delete ls[key];
        }
        $('form')[0].reset();
    });
jQuery.download = function(url, data, method){
	//url and data options required
	if( url && data ){ 
		//data can be string of parameters or array/object
		data = typeof data == 'string' ? data : jQuery.param(data);
		//split params into form inputs
		var inputs = '';
		jQuery.each(data.split('&'), function(){ 
			var pair = this.split('=');
			inputs+='<input type="hidden" name="'+ pair[0] +'" value="'+ pair[1] +'" />'; 
		});
		//send request
		jQuery('<form action="'+ url +'" method="'+ (method||'post') +'">'+inputs+'</form>')
		.appendTo('body').submit().remove();
	};
};

//    $('#post_out').submit(function() {
//        $(this).ajaxSubmit({
//            target: '#output'
//        });
//        return false;
//    });
});

