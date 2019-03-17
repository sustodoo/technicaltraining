# -*- coding: utf-8 -*-
# Copyright YEAR(S), AUTHOR(S)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import fields, models

class ResPartner(models.Model):
	_inherit = 'res.partner'
	todo_ids= fields.Many2many(
		'todo.task',
		string="To-do Teams")
