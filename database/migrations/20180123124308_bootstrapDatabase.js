exports.up = function(knex) {
  return createUsersTable(knex)
    .then(createPostsTable)
    .then(createTagsTable)
    .then(createPostTagsTable)
    .catch(error => {
    	console.log(error);
    	//reject(error); //return Promise indicate the rejected reason.
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('posttags')
    .then(() => {
    	console.log('dropping tags');
    	return knex.schema.dropTableIfExists('tags');
    })
    .then(() => {
    	console.log('dropping posts');
    	return knex.schema.dropTableIfExists('posts');
    })
    .then(() => {
    	console.log('dropping users');
    	return knex.schema.dropTableIfExists('users');
    })
    .catch(error => console.log(error));
};

const createUsersTable = (knex) => {
	console.log('creating users table');

	return new Promise((resolve, reject) => {
		knex.schema
		  .createTable('users', (users) => {
		  	users.increments();
		  	users.string('name', 128).notNullable();
		  	users.timestamp('createdAt').defaultTo(knex.fn.now());

		  	console.log('users table created');
		  	resolve(knex);
		  })
		  .catch(error => reject(error));
	})
}

const createPostsTable = (knex) => {
	console.log('creating posts table');

	return new Promise((resolve, reject) => {
		knex.schema
		  .createTable('posts', (posts) => {
		  	posts.increments();
		  	posts.text('text').notNullable();
		  	posts
		  	  .integer('userId')
		  	  .unsigned()
		  	  .notNullable()
		  	  .references('id')
		  	  .inTable('users');
		  	posts.timestamp('createdAt').defaultTo(knex.fn.now());

		  	console.log('posts table created');
		  	resolve(knex);
		  })
		  .catch(error => reject(error));
	});
}

const createTagsTable = (knex) => {
	console.log('creating tags table');

	return new Promise((resolve, reject) => {
		knex.schema
		  .createTable('tags', (tags) => {
		  	tags.increments();
		  	tags
		  	  .string('tag', 80)
		  	  .notNullable()
		  	  .unique('tag');
		  	tags.timestamp('createdAt').defaultTo(knex.fn.now());

		  	console.log('tags table created');
		  	resolve(knex);
		  })
		  .catch(error => reject(error));
	});
}

const createPostTagsTable = (knex) => {
	console.log('creating posttags table');

	return new Promise((resolve, reject) => {
 		knex.schema
 		  .createTable('posttags', (posttags) => {
 		  	posttags.increments();
 		  	posttags
 		  	  .integer('postId')
 		  	  .unsigned()
 		  	  .notNullable()
 		  	  .references('id')
 		  	  .inTable('posts');
 		  	posttags
 		  	  .integer('tagId')
 		  	  .unsigned()
 		  	  .notNullable()
 		  	  .references('id')
 		  	  .inTable('tags');

 		  	console.log('posttags table created');
 		  	resolve(knex);
 		  })
 		  .catch(error => reject(error));
	});
}
