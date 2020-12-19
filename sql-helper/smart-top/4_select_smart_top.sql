SELECT
    smart_prepared_info.mem_id,
    (rating * tag_avg * (24 * 60 * 60 * 1000) / life_time) as smart_rating,
    memes_data.mem_data
FROM
(
    SELECT
        user_top_memes_info.mem_id,
        (extract(epoch from now()) - user_top_memes_info.creation_date ) as life_time,
        (
            CASE WHEN min_rating <= 0
                     then rating + ABS(min_rating) + 1
                 else rating end
        ) as rating,
        (
            CASE WHEN tag_count <> 0
                     then (tag_sum + 10 * tag_count)/tag_count + 1
                 else 1 end
        ) as tag_avg
    FROM
        (
            SELECT mem_tag_sum.mem_id,
                   mem_tag_sum.user_id,
                   mem_tag_sum.creation_date,
                   mem_tag_sum.rating,
                   mem_tag_sum.rating_update_time,
                   mem_tag_sum.min_rating,
                   COUNT(mem_tag_sum.tag) as tag_count,
                   SUM(mem_tag_sum.tag_rating) as tag_sum
            FROM
                (
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
                ) mem_tag_sum
            GROUP BY mem_id, user_id, creation_date, rating, rating_update_time, min_rating
        ) user_top_memes_info
) smart_prepared_info
INNER JOIN
(
    SELECT mem_id as memes_mem_id, mem_data FROM memes
) memes_data
ON mem_id = memes_data.memes_mem_id
ORDER BY smart_rating DESC
