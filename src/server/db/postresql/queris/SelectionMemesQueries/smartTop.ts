import { MemId } from '../../../IQueries/IMemesQueries/IMemesBaseQueries/Mem';
import { UserId } from '../../../IQueries/IUsersQueries/IUsersBaseQueries/User';

const memesNotInPack = (ignore_memes: MemId[]) =>
    ignore_memes.length
        ? ' AND memes.mem_id NOT IN (' + ignore_memes.join(', ') + ')\n'
        : '';

const joinMemesWithUserTagsRatingAndMinMemRating = (ignore_memes: MemId[]) =>
    '(' +
    '   SELECT memes.mem_id,\n' +
    '       memes.user_id,\n' +
    '       memes.creation_date,\n' +
    '       memes.rating,\n' +
    '       memes.rating_update_time,\n' +
    '       memes_tags.tag\n' +
    '   FROM memes\n' +
    '   INNER JOIN memes_tags\n' +
    '   ON memes.mem_id = memes_tags.mem_id\n' +
    '   WHERE memes.mem_id NOT IN (SELECT mem_id FROM users_watched_memes WHERE user_id = ${user_id})\n' +
    memesNotInPack(ignore_memes) +
    ') memes_tags\n' +
    'LEFT JOIN\n' +
    '(\n' +
    '   SELECT rating as tag_rating,\n' +
    '       rating_update_time as tag_rating_update_time,\n' +
    '       tag as user_tag_rating\n' +
    '   FROM users_tags_rating WHERE user_id = ${user_id}\n' +
    ') user_tags\n' +
    'ON user_tags.user_tag_rating = memes_tags.tag\n' +
    'INNER JOIN\n' +
    '(\n' +
    '   SELECT MIN(rating) as min_rating\n' +
    '   FROM memes\n' +
    ') min_rating\n' +
    'ON true\n';

const memesWithTagsAndMin = (ignore_memes: MemId[]) =>
    'SELECT memes_tags_rating.mem_id,\n' +
    '   memes_tags_rating.user_id,\n' +
    '   memes_tags_rating.creation_date,\n' +
    '   memes_tags_rating.rating,\n' +
    '   memes_tags_rating.rating_update_time,\n' +
    '   memes_tags_rating.tag,\n' +
    '   COALESCE(memes_tags_rating.tag_rating, 0) as tag_rating,\n' +
    '   memes_tags_rating.tag_rating_update_time,\n' +
    '   memes_tags_rating.min_rating\n' +
    'FROM\n' +
    '(\n' +
    joinMemesWithUserTagsRatingAndMinMemRating(ignore_memes) +
    ' ) memes_tags_rating\n';

const memesWithTagRatingSumAndTagCount = (ignore_memes: MemId[]) =>
    'SELECT mem_tag_sum.mem_id,\n' +
    '   mem_tag_sum.user_id,\n' +
    '   mem_tag_sum.creation_date,\n' +
    '   mem_tag_sum.rating,\n' +
    '   mem_tag_sum.rating_update_time,\n' +
    '   mem_tag_sum.min_rating,\n' +
    '   COUNT(mem_tag_sum.tag) as tag_count,\n' +
    '   SUM(mem_tag_sum.tag_rating) as tag_sum\n' +
    'FROM\n' +
    '(\n' +
    memesWithTagsAndMin(ignore_memes) +
    ') mem_tag_sum\n' +
    'GROUP BY mem_id, user_id, creation_date, rating, rating_update_time, min_rating\n';

const memesWithNormalizedRaingAndAverageTagRating = (ignore_memes: MemId[]) =>
    'SELECT user_top_memes_info.mem_id,\n' +
    '   (extract(epoch from now()) - user_top_memes_info.creation_date ) as life_time,\n' +
    '   (\n' +
    '       CASE WHEN min_rating < 0\n' +
    '               then rating + ABS(min_rating) + 1\n' +
    '           else rating end\n' +
    '   ) as rating,\n' +
    '   (\n' +
    '       CASE WHEN tag_count <> 0\n' +
    '                then (tag_sum + ${dynamicRatingModuloConstraint} * tag_count)/tag_count + 1\n' +
    '            else 1 end\n' +
    '   ) as tag_avg\n' +
    'FROM\n' +
    '(\n' +
    memesWithTagRatingSumAndTagCount(ignore_memes) +
    ' ) user_top_memes_info\n';

const smartTop = (ignore_memes: MemId[]) =>
    'SELECT smart_prepared_info.mem_id,\n' +
    '   (rating * tag_avg * ${lifeTimeCoefficient} / life_time) as smart_rating,\n' +
    '    memes_data.mem_data\n' +
    'FROM\n' +
    '(\n' +
    memesWithNormalizedRaingAndAverageTagRating(ignore_memes) +
    ' ) smart_prepared_info\n' +
    'INNER JOIN\n' +
    '(\n' +
    '    SELECT mem_id as memes_mem_id, mem_data FROM memes\n' +
    ') memes_data\n' +
    'ON mem_id = memes_data.memes_mem_id\n' +
    'ORDER BY smart_rating DESC\n' +
    'FETCH FIRST ${count} ROWS ONLY\n';

export default smartTop;

export type SmartTopParameters = {
    count: number;
    lifeTimeCoefficient: number;
    dynamicRatingModuloConstraint: number;
    user_id: UserId;
};
