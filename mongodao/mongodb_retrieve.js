let retrieveTasks = {};

retrieveTasks.retrieveAll = function (db, collectionName) {
    return new Promise(function (resolve, reject) {
        // get the documents collection
        const collection = db.collection(collectionName);
        // find all documents
        collection.find().toArray(function (err, items) {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    });
};

retrieveTasks.findOneDoc = function (db, collectionName, query, options) {
    // get the documents collection
    const collection = db.collection(collectionName);

    // find one document (Promise)
    return collection.findOne(query, options)
}

module.exports = retrieveTasks;