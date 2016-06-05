(function($) {
    // var StashMacro = function() {};
    //
    // StashMacro.prototype.fields = {
    //     "string":{
    //         "title" : function(param, options){
    //             return new AJS.MacroBrowser.Field()
    //         }
    //     }
    // }
    // AJS.MacroBrowser.Macros["stash-macro"]
    function callRest() {
        AJS.$.ajax({
            async: true,
            url: AJS.contextPath() + "/rest/myrestresource/1.0/message",
            dataType: 'json',
            timeout: 10000,
            error: function(xhr, textStatus, errorThrown) {
                console.log("THERE WAS AN ERROR");
            },
            success: function(response) {
                console.log(response);
                var jsOverrides = {
                    "fields" : {
                        "string" : {
                            "name-override" : function(params,options){
                                var field = AJS.MacroBrowser.ParameterFields["string"](params, options);
                                field.setValue(response['value']);
                                console.log( response);
                                return field;
                            }
                        }
                    }
                };
                console.log(jsOverrides);
                AJS.MacroBrowser.setMacroJsOverride("stash-macro", jsOverrides);
            }
        });
    }
    var jsOverrides = {
        
        "fields" : {
            "string" : {
                "name-override" : function(params,options){
                    var field = AJS.MacroBrowser.ParameterFields["string"](params, options);
                    field.setValue("another desiredValue");
                    return field;
                }
            }
        }
    };
    callRest();
    // AJS.MacroBrowser.setMacroJsOverride("stash-macro", jsOverrides);
})(AJS.$);