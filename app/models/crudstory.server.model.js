'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Crudstory Schema
 */
var CrudstorySchema = new Schema({
	title: {
		type: String,
		default: '',
		required: 'Please fill Crudstory title',
		trim: true
	},
	body: {
		type: String,
		default: '',
		required: 'Please fill Crudstory body',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	// this needs to be an array
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	likes: [{
		type: Schema.ObjectId,
		ref: 'User'
	}]
});

mongoose.model('Crudstory', CrudstorySchema);