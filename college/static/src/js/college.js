odoo.define('college.tour', function(require) {
"use strict";

var Widget = require('web.Widget');
var core = require('web.core');
var Model = require('web.rpc');


 var HomePage = Widget.extend({
        start: function() {
            var products = new ProductsWidget(
                this, ["cpu", "mouse", "keyboard", "graphic card", "screen"], "#00FF00");
            products.appendTo(this.$el);
        },
    });

    var ProductsWidget = Widget.extend({
        template: "ProductsWidget",
        init: function(parent, products, color) {
            this._super(parent);
            this.products = products;
            this.color = color;
        },
    });
    core.action_registry.add('ProductsWidget', HomePage); 
});