odoo.define('college.tour', function(require) {
    "use strict";

    var Widget = require('web.Widget');
    var core = require('web.core');
    var Model = require('web.rpc');
    var ajax = require('web.ajax');
    var HomePage = Widget.extend({
        template: "HomePage",
        start: function() {
            this.colorInput = new ColorInputWidget(this);
            this.colorInput.on("change:color", this, this.color_changed);
            return this.colorInput.appendTo(this.$el);
        },
        color_changed: function() {
            this.$(".oe_color_div").css("background-color", this.colorInput.get("color"));
        },
    });


    var ColorInputWidget = Widget.extend({
        template: "ColorInputWidget",
        events: {
            'change input': 'input_changed'
        },
        start: function() {
            this.input_changed();
            return this._super();
        },
        input_changed: function() {
            var color = [
            "#",
            this.$(".oe_color_red").val(),
            this.$(".oe_color_green").val(),
            this.$(".oe_color_blue").val()
            ].join('');
            this.set("color", color);
        },
    });

    core.action_registry.add('ProductsWidget', HomePage); 
});