SELECT memes_tags_rating.mem_id,
       memes_tags_rating.user_id,
       memes_tags_rating.creation_date,
       memes_tags_rating.rating,
       memes_tags_rating.rating_update_time,
       memes_tags_rating.tag,
       COALESCE(memes_tags_rating.tag_rating, 0) as tag_rating,
       memes_tags_rating.tag_rating_update_time,
       memes_tags_rating.min_rating
FROM
(
	(
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
    ) memes_tags
    LEFT JOIN
    (
    	SELECT rating as tag_rating,
        rating_update_time as tag_rating_update_time,
        tag as user_tag_rating
        FROM users_tags_rating WHERE user_id = 1
    ) user_tags
    ON user_tags.user_tag_rating = memes_tags.tag
    INNER JOIN
    (
    	SELECT MIN(rating) as min_rating
        FROM memes
    ) min_rating
    ON true
) memes_tags_rating