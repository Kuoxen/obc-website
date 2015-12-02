var keystone = require('keystone');
//var Types = keystone.Field.Types;

/**
 * MailingList Model
 * ==========
 */

var MailingList = new keystone.List('MailingList', {
	map: { name: 'email' },
	autokey: { path: 'slug', from: 'email', unique: true }
});

MailingList.add({
	email: { type: String, required: true },
	timestamp: {type: Number}
});

MailingList.schema.virtual('content.full').get(function() {
	return this.content.extended || this.content.brief;
});

MailingList.defaultColumns = 'email';
MailingList.register();
