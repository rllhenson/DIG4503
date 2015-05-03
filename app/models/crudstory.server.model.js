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
		required: 'Please fill Crudstory Title',
		trim: true
	},
	story: {
		type: String,
		default: '',
		required: 'Please fill Crudstory Story',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	updated: {
		type: Date,
		default: Date.now
	},
	// this needs to be an array
	user: [{
		type: Schema.ObjectId,
		ref: 'User'
	}],
});

mongoose.model('Crudstory', CrudstorySchema);