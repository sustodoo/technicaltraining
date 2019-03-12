odoo.define('college.tour', function(require) {
"use strict";

var Widget = require('web.Widget');
var core = require('web.core');
var Model = require('web.rpc');


var HomePage = Widget.extend({

    start: function() {
       this.$el.append($('<div>').text('Hello dear Odoo user!'));
       console.log(Model)
     },    
});
    core.action_registry.add('ProductsWidget', HomePage); 
});