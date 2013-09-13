$(document).ready(function() {
    var ls = window.localStorage;
    var title = ls.getItem('form_op_01op_01api_name01');
    //------------------------title-------------------------//
    $(document).attr('title', title);
    $('h1.operation').html('Operation: ' + title).trigger("create");

    //---------------------Version status-------------------//

    function version_status_content(name, version, status) {
        var maincontent = '<tr>';
        maincontent += '<td ><div contenteditable="true">' + name;
        maincontent += '</div></td>';
        maincontent += '<td ><div contenteditable="true">' + version;
        maincontent += '</div></td>';
        maincontent += '<td ><div contenteditable="true">' + status;
        maincontent += '</div></td>';
        maincontent += '</tr>';
        return maincontent;
    }
    var name = title;
    var version = ls.getItem('form_op_01op_01version01');
    var status = ls.getItem('form_op_01op_01status01');
    $('#version').append(version_status_content(name, version, status)).trigger("create");

    //------------------------Counters-----------------------//
    var ops_count = 0;
    var input_param_count = 0;
    var input_PRO_count = 0;
    var output_param_count = 0;
    var output_PRO_count = 0;
    for (var key in ls) {
        if (key.match('form_op_01op_01base_url-'))
            ops_count++;
        if (key.match('form_op_01op_01paramIP01'))
            input_param_count++;
        if (key.match('form_op_01op_01paramIP_PRO01'))
            input_PRO_count++;
        if (key.match('form_op_01op_01paramOP01'))
            output_param_count++;
        if (key.match('form_op_01op_01paramOP_PRO01'))
            output_PRO_count++;
    }
    //---------------------Operation Summary-------------------//
    var ops_name = [];
    var ops_base_url = [];
    var ops_data_type = [];
    var ops_des = [];
    getParamValue('form_op_01op_01op_name', ops_count, ops_name);
    getParamValue('form_op_01op_01base_url', ops_count, ops_base_url);
    getParamValue('form_op_01op_01ops_method', ops_count, ops_data_type);
    getParamValue('form_op_01op_01ops_type', ops_count, ops_des);

    $('#o_op_summary').append(setOps(ops_count, ops_name, ops_base_url, ops_data_type, ops_des)).trigger("create");
    function setOps(count, param, data_type, req, des) {
        var maincontent = '';
        for (var i = 0; i < count; i++) {
            maincontent += '<tr>';
            maincontent += '<td><div contenteditable="true">' + param[i];
            maincontent += '</div></td>';

            maincontent += '<td><div contenteditable="true">' + data_type[i];
            maincontent += '</div></td>';

            maincontent += '<td><div contenteditable="true">' + req[i];
            maincontent += '</div></td>';

            maincontent += '<td><div contenteditable="true">' + des[i];
            maincontent += '</div></td>';
        }
        return maincontent;
    }


    //-------Behavior/ call flow / version impact summary------//
    var op_name = ls.getItem('form_op_01op_01op_name01');
    var behav = ls.getItem('form_op_01op_01function_behavior01');
    var call_flow = ls.getItem('form_op_01op_01call_flow01');
    var summary = ls.getItem('form_op_01op_01impact_summary01');

    $('h2.operation').html('Operation: ' + op_name).trigger("create");
    $('#behav').html(behav).trigger("create");
    $('#call_flow').html(call_flow).trigger("create");
    $('#summary').html(summary).trigger("create");

    //------------Authentication and Authorization-------------//

    function auth(auth, required, scope, desc) {
        var maincontent = '<tr>';
        maincontent += '<td ><div contenteditable="true">' + auth;
        maincontent += '</div></td>';
        maincontent += '<td ><div contenteditable="true">' + required;
        maincontent += '</div></td>';
        maincontent += '<td ><div contenteditable="true">' + scope;
        maincontent += '</div></td>';
        maincontent += '<td ><div contenteditable="true">' + desc;
        maincontent += '</div></td>';
        maincontent += '</tr>';
        return maincontent;
    }
    var aa_auth = ls.getItem('form_op_01op_01authAA01');
    var aa_req = ls.getItem('form_op_01op_01auth_requiredAA01');
    var aa_scope = ls.getItem('form_op_01op_01subs_auth_reqAA01');
    var aa_desc = ls.getItem('form_op_01op_01dscriptionAA01');
    $('#o_auth').append(auth(aa_auth, aa_req, aa_scope, aa_desc)).trigger("create");

    //---------------Representation Formats------------------//

    function formats(req, resp) {
        var maincontent = '<tr>';
        maincontent += '<th>Request</th>';
        maincontent += '<td ><div contenteditable="true">' + req;
        maincontent += '</div></td>';
        maincontent += '</tr>';
        maincontent += '<tr>';
        maincontent += '<th>Response</th>';
        maincontent += '<td ><div contenteditable="true">' + resp;
        maincontent += '</div></td>';
        maincontent += '</tr>';
        return maincontent;
    }
    var reqRF01 = ls.getItem('form_op_01op_01reqRF01');
    var respRF01 = ls.getItem('form_op_01op_01respRF01');
    $('#format').append(formats(reqRF01, respRF01)).trigger("create");

    //------------------------Params field----------------------------//
    function getParamValue(param_type, count, array) {
        for (var i = 0; i < count; i++) {
            array[i] = ls.getItem(param_type + '-' + (i + 1));
        }
    }

    

    //-----------------------IP field-------------------------//

    var IP_param = [];
    var IP_data_type = [];
    var IP_req = [];
    var IP_des = [];
    var IP_loc = [];
    getParamValue('form_op_01op_01paramIP01', input_param_count, IP_param);
    getParamValue('form_op_01op_01data_typeIP01', input_param_count, IP_data_type);
    getParamValue('form_op_01op_01reqIP01', input_param_count, IP_req);
    getParamValue('form_op_01op_01desIP01', input_param_count, IP_des);
    getParamValue('form_op_01op_01locationIP01', input_param_count, IP_loc);
    $('#o_input_param').append(setParams(input_param_count, IP_param, IP_data_type, IP_req, IP_des, IP_loc)).trigger("create");

    //-----------------------IP_PRO field-------------------------//

    var IP_PRO_param = [];
    var IP_PRO_data_type = [];
    var IP_PRO_req = [];
    var IP_PRO_des = [];
    var IP_PRO_loc = [];
    getParamValue('form_op_01op_01paramIP_PRO01', input_PRO_count, IP_PRO_param);
    getParamValue('form_op_01op_01data_typeIP_PRO01', input_PRO_count, IP_PRO_data_type);
    getParamValue('form_op_01op_01reqIP_PRO01', input_PRO_count, IP_PRO_req);
    getParamValue('form_op_01op_01desIP_PRO01', input_PRO_count, IP_PRO_des);
    getParamValue('form_op_01op_01locationIP_PRO01', input_PRO_count, IP_PRO_loc);
    $('#o_input_obj').append(setParams(input_PRO_count, IP_PRO_param, IP_PRO_data_type, IP_PRO_req, IP_PRO_des, IP_PRO_loc)).trigger("create");

    //-----------------------OP field-------------------------//

    var OP_param = [];
    var OP_data_type = [];
    var OP_req = [];
    var OP_des = [];
    var OP_loc = [];
    getParamValue('form_op_01op_01paramOP01', output_param_count, OP_param);
    getParamValue('form_op_01op_01data_typeOP01', output_param_count, OP_data_type);
    getParamValue('form_op_01op_01reqOP01', output_param_count, OP_req);
    getParamValue('form_op_01op_01desOP01', output_param_count, OP_des);
    getParamValue('form_op_01op_01locationOP01', output_param_count, OP_loc);
    $('#o_output_param').append(setParams(output_param_count, OP_param, OP_data_type, OP_req, OP_des, OP_loc)).trigger("create");

    //-----------------------OP_PRO field-------------------------//

    var OP_PRO_param = [];
    var OP_PRO_data_type = [];
    var OP_PRO_req = [];
    var OP_PRO_des = [];
    var OP_PRO_loc = [];
    getParamValue('form_op_01op_01paramOP_PRO01', output_PRO_count, OP_PRO_param);
    getParamValue('form_op_01op_01data_typeOP_PRO01', output_PRO_count, OP_PRO_data_type);
    getParamValue('form_op_01op_01reqOP_PRO01', output_PRO_count, OP_PRO_req);
    getParamValue('form_op_01op_01desOP_PRO01', output_PRO_count, OP_PRO_des);
    getParamValue('form_op_01op_01locationOP_PRO01', output_PRO_count, OP_PRO_loc);
    $('#o_output_obj').append(setParams(output_PRO_count, OP_PRO_param, OP_PRO_data_type, OP_PRO_req, OP_PRO_des, OP_PRO_loc)).trigger("create");


});

