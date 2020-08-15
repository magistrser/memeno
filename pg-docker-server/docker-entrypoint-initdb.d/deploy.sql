/*
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS vk_users;
DROP TABLE IF EXISTS tags;
DROP table if exists memes;
DROP table if exists memes_tags;
DROP TABLE IF EXISTS users_memes;
DROP TABLE IF EXISTS users_watched_memes;
DROP TABLE IF EXISTS users_users_rating;
DROP TABLE IF EXISTS users_tags_rating;
*/

/*
    ### Users table.
    * auth-type - vk/google/..
 */
CREATE TABLE users (
  user_id INTEGER NOT NULL PRIMARY KEY,
  auth_type TEXT NOT NULL, 
  rating INTEGER DEFAULT 0,
  rating_update_time INTEGER NOT NULL
);

/*
    ### VK users.
    In table `users` column `auth_type` must be equal - `vk`
 */
CREATE TABLE vk_users (
	vk_id INTEGER NOT NULL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    email TEXT,
    full_name TEXT,
    url TEXT,
    photo_url TEXT,
  	FOREIGN KEY(user_id) REFERENCES users(user_id)
);

/*
    ### All tags in app.
 */
CREATE table tags (
  tag TEXT NOT NULL PRIMARY KEY,
  rating INTEGER NOT NULL DEFAULT 0,
  rating_update_time INTEGER NOT NULL
);

/*
    ### All memes in app
 */
create table memes (
  mem_id INTEGER NOT NULL PRIMARY KEY,
  mem_data BYTEA NOT NULL,
  creation_date INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL DEFAULT 0,
  rating_update_time INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(user_id)
);

/*
    ### Table of tags for mem.
    All memes in one table
 */
create table memes_tags (
  mem_id INTEGER NOT NULL,
  tag TEXT NOT NULL,
  PRIMARY KEY(mem_id, tag),
  FOREIGN KEY(mem_id) REFERENCES memes(mem_id),
  FOREIGN KEY(tag) REFERENCES tags(tag)
);

/*
    ### Table of memes created by user
    All users in one table
 */
CREATE TABLE users_memes (
  user_id INTEGER NOT NULL,
  mem_id INTEGER NOT NULL,
  PRIMARY KEY(user_id, mem_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(mem_id) REFERENCES memes(mem_id)
);

/*
    ### Table of memes watched by user
    All users in one table
 */
CREATE TABLE users_watched_memes (
  user_id INTEGER NOT NULL,
  mem_id INTEGER NOT NULL,
  is_like INTEGER NOT NULL,
  watched_time INTEGER NOT NULL,
  PRIMARY KEY(user_id, mem_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(mem_id) REFERENCES memes(mem_id)
);

/*
    ### Table of users user rating
    The rating of `second_user_id` for `user_id`
    All users in one table
 */
CREATE TABLE users_users_rating (
  user_id INTEGER NOT NULL,
  second_user_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  rating_update_time INTEGER NOT NULL,
  PRIMARY KEY(user_id, second_user_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(second_user_id) REFERENCES users(user_id)
);

/*
    ### Table of tags user rating
    The rating of `tag` for `user_id`
    All users in one table
 */
CREATE TABLE users_tags_rating (
  user_id INTEGER NOT NULL,
  tag TEXT NOT NULL,
  rating INTEGER NOT NULL,
  rating_update_time INTEGER NOT NULL,
  PRIMARY KEY(user_id, tag),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(tag) REFERENCES tags(tag)
);
