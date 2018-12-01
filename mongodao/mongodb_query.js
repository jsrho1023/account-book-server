class MongoQuery {
    constructor(mongoDB){
        this.db = mongoDB;
    }

    findOneDoc(collectionName, query, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // find one document (Promise)
        return collection.findOne(query, options);
    }

    insertOne(collectionName, document, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // find one document (Promise)
        return collection.insertOne(document, options);
    }

    deleteOne(collectionName, selector, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // find one document (Promise)
        return collection.deleteOne(selector, options);
    }
}

module.exports = MongoQuery;