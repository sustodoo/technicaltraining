from odoo import api, fields, models

class UpdateSalary(models.TransientModel):
    _name = 'college.update.salary'
    _description = 'New Description'

    type = fields.Selection(string="Type", selection=[('academic', 'Academic'), ('admin', 'Administrative'),('workers','Workers') ], required=False, )
    addition = fields.Float(string="addition",  required=False, )

    def update(self):
        employee = self.env['college.employee'].search([('type','=',self.type)]) or []
        for emp in employee:
            emp.salary += self.addition*emp.salary/100
