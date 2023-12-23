
import NodeCache from "node-cache";

NodeCache.prototype.setByObj = function (obj, val, ttl) {
    const key = JSON.stringify(sortObjectKeys(obj));
    return this.set(key, val, ttl);
};

NodeCache.prototype.getByObj = function (obj) {
    const key = JSON.stringify(sortObjectKeys(obj));
    return this.get(key);
};

NodeCache.prototype.delByObjExact = function (obj) {
    const key = JSON.stringify(sortObjectKeys(obj));
    return this.del(key);
};

NodeCache.prototype.delByQuery = function (criteria) {
    const keysToDelete = filterCacheKeys(this, criteria);
    if (keysToDelete.length === 0) {
        return;
    }
    return this.del(keysToDelete);
};

function filterCacheKeys(cache, criteria) {
    const keys = cache.keys();
    const filteredKeys = keys.filter((key) => {
        const keyData = JSON.parse(key);
        let matches = Object.keys(criteria).every((criteriaKey) => {
            // if (keyData[criteriaKey] instanceof Date || criteria[criteriaKey] instanceof Date) {
            //     return new Date(keyData[criteriaKey]).getTime() === new Date(criteria[criteriaKey]).getTime();
            // }
            return keyData[criteriaKey] === criteria[criteriaKey];
        });
        return matches;
    });
    return filteredKeys;
}

function sortObjectKeys(obj) {
    return Object.keys(obj)
        .sort()
        .reduce((result, key) => {
            result[key] = obj[key];
            return result;
    },{});s
}

export default NodeCache;