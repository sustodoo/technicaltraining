// odoo.define('college.tour', function(require) {
//     "use strict";

//     var Widget = require('web.Widget');
//     var core = require('web.core');
//     var Model = require('web.rpc');
//     var ajax = require('web.ajax');
//     var HomePage = Widget.extend({
//         template: "HomePage",
//         start: function() {
//             this.colorInput = new ColorInputWidget(this);
//             this.colorInput.on("change:color", this, this.color_changed);
//             return this.colorInput.appendTo(this.$el);
//         },
//         color_changed: function() {
//             this.$(".oe_color_div").css("background-color", this.colorInput.get("color"));
//         },
//     });


//     var ColorInputWidget = Widget.extend({
//         template: "ColorInputWidget",
//         events: {
//             'change input': 'input_changed'
//         },
//         start: function() {
//             this.input_changed();
//             return this._super();
//         },
//         input_changed: function() {
//             var color = [
//             "#",
//             this.$(".oe_color_red").val(),
//             this.$(".oe_color_green").val(),
//             this.$(".oe_color_blue").val()
//             ].join('');
//             this.set("color", color);
//         },
//     });

//     core.action_registry.add('ProductsWidget', HomePage); 
// });





// odoo.define('r1_widgets', function(require)
// {
//     var registry = require('web.field_registry'),
//         AbstractField = require('web.AbstractField');

//     var FieldMany2OneButtons = AbstractField.extend({
//         className: 'oe_form_field_many2one_buttons',
//         supportedFieldTypes: ['many2one'],
//         init: function()
//         {
//             this._super.apply(this, arguments);
//             this.user_list = {
//                 1: {
//                     name: 'Administrator',
//                 },
//                 4: {
//                     name: 'Demo user',
//                 },
//             };
//         },
//         events: {
//             'click .btn': '_button_clicked',
//         },
//         _render: function()
//         {
//             var self = this;
//             this.$el.empty();
//             _.each(this.user_list, function(description, id)
//             {
//                 self.$el.append(
//                     jQuery('<button>').attr({
//                         'data-id': id,
//                         'class': 'btn btn-default btn-sm',
//                     })
//                     .text(description.name)
//                     .toggleClass(
//                         'btn-primary',
//                         self.value ? self.value.res_id == id : false
//                     )
//                 );
//             });
//             this.$el.find('button').
//                 prop('disabled', this.mode == 'readonly');
//         },
//         _button_clicked: function(e)
//         {
//             this._setValue(
//                 parseInt(jQuery(e.target).attr('data-id'))
//             );
//         },
//     });

//     registry.add('many2one_buttons', FieldMany2OneButtons);

//     return {
//         FieldMany2OneButtons: FieldMany2OneButtons,
//     }
// });

odoo.define('r3_rpc_calls', function(require)
{
    var registry = require('web.field_registry'),
        AbstractField = require('web.AbstractField');

    var FieldMany2OneButtons = AbstractField.extend({
        template: 'FieldMany2OneButtons',
        className: 'oe_form_field_many2one_buttons',
        supportedFieldTypes: ['many2one'],
        events: {
            'click .btn': '_button_clicked',
        },
        willStart: function()
        {
            var deferred = new jQuery.Deferred(),
                self = this;
            self.user_list = {}
            this._rpc({
                model: this.field.relation,
                method: 'search_read',
                fields: ['display_name'],
                domain: this.field.domain,
            })
            .then(function(records)
            {
                _.each(records, function(record)
                {
                    self.user_list[record.id] = record;
                    self.user_list[record.id].name = record.display_name;
                });
                deferred.resolve();
            });
            return jQuery.when(
                this._super.apply(this, arguments),
                deferred
            );
        },
        _render: function()
        {
            this.renderElement();
        },
        _button_clicked: function(e)
        {
            this._setValue(
                parseInt(jQuery(e.target).attr('data-id'))
            );
        },
    });

    registry.add('many2one_buttons', FieldMany2OneButtons);

    return {
        FieldMany2OneButtons: FieldMany2OneButtons,
    }
});