SELECT memes.mem_id,
       memes.user_id,
       memes.creation_date,
       memes.rating,
       memes.rating_update_time,
       memes_tags.tag
FROM memes
INNER JOIN memes_tags
ON memes.mem_id = memes_tags.mem_id
WHERE memes.mem_id NOT IN (SELECT mem_id FROM users_watched_memes WHERE user_id = 1)