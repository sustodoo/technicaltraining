# -*- coding: utf-8 -*-

from odoo import models, fields, api

class College(models.Model):
    _name = 'college.college'

    name = fields.Char('Name')
    code = fields.Char(string="Code", required=False, )
    dean_id = fields.Many2one(comodel_name="college.employee", string="Dean", required=False, )


class Employee(models.Model):
    _name = 'college.employee'

    name = fields.Char('Name')
    code = fields.Char('Code')
    type = fields.Selection(string="Type", selection=[('academic', 'Academic'), ('admin', 'Administrative'),('workers','Workers') ], required=False, )
    hiring_date = fields.Date(string="Hiring Date", required=False, )
    collage_id =fields.Many2one(comodel_name="college.college", string="College", required=False, )


