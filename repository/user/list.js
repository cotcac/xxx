const mdl = require('../../models');
const redis = require('../../helper/catch');
/**
 * Repository get data from redis 
 * If redis doenst have then get data from database, save to redis.
 * Finally return promise to the controller.
 */
module.exports = async (skip, limit, url) => {
    return new Promise(async (res, rej) => {
        try {
            // check redis
            const cache = await redis.get(url);
            if (cache != null) {
                return res(JSON.parse(cache));
            }
            // at this point we know we dont have on cache. 
            const data = await getDB(skip, limit);
            // save data to cache.
            redis.set(url, JSON.stringify(data), "EX", process.env.CACHE_TIME);
            return res(data);
        } catch (error) {
            return rej(error);
        }
    })

}
/**
 * 
 * @param {*} skip 
 * @param {*} limit 
 * Get data from Database remove the setTimeout when in production.
 */
const getDB = (skip, limit) => {
    return new Promise((res, rej) => {

        mdl.User.findAll({
            offset: skip,
            limit: limit,
        }).then(data => {
            return res(data);
        }).catch(err => {
            return rej(err);
        })

    })

} 