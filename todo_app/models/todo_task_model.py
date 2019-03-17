# -*- coding: utf-8 -*-
# Copyright YEAR(2019), AUTHOR(yaseen)
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html).

from odoo import fields, models,api


class TodoTask(models.Model):
	_name = 'todo.task'
	_description = 'To-do Task'
	name = fields.Char('Description', required=True)
	is_done = fields.Boolean('Done?')
	active = fields.Boolean('Active?', default=True)
	user_id = fields.Many2one(
		'res.users',
		string='Responsible',
		default=lambda self: self.env.user)
	team_ids = fields.Many2many('res.partner', string='Team')

	@api.multi
	def do_clear_done(self):
		for task in self:
			task.active = False
			return True
