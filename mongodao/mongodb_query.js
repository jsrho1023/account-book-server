let queryTasks = {};

queryTasks.retrieveAll = function (db, collectionName) {
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

queryTasks.findOneDoc = function (db, collectionName, query, options) {
    // get the documents collection
    const collection = db.collection(collectionName);

    // find one document (Promise)
    return collection.findOne(query, options);
}

queryTasks.insertOne = function (db, collectionName, document, options) {
    // get the documents collection
    const collection = db.collection(collectionName);

    // find one document (Promise)
    return collection.insertOne(document, options);
}

queryTasks.deleteOne = function (db, collectionName, selector, options) {
    // get the documents collection
    const collection = db.collection(collectionName);

    // find one document (Promise)
    return collection.deleteOne(selector, options);
}

module.exports = queryTasks;