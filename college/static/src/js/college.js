odoo.college = function(instance, local) {
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;

    local.HomePage = instance.Widget.extend({
        start: function() {
            console.log("college Start js ...");
        },
    });

    instance.web.client_actions.add('college.test', 'instance.college.HomePage');
}
