class MongoQuery {
    constructor(mongoDB){
        this.db = mongoDB;
    }

    insertOne(collectionName, document, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // insert one document (Promise)
        return collection.insertOne(document, options);
    }

    insertMany(collectionName, documents, options){
        // get the documents collection
        const collection = this.db.collection(collectionName);

        // insert all documents (Promise)
        return collection.insertMany(documents, options);
    }

    findAll(collectionName, query, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);

        // return a cursor for a query that can be used to iterate over results
        return collection.find(query, options);
    }

    findOneDoc(collectionName, query, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // find one document (Promise)
        return collection.findOne(query, options);
    }

    replaceOne(collectionName, document, filter, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // insert or update one document (Promise)
        return collection.replaceOne(filter, document, options);
    }

    deleteOne(collectionName, selector, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // delete one document (Promise)
        return collection.deleteOne(selector, options);
    }

    deleteAll(collectionName, selector, options) {
        // get the documents collection
        const collection = this.db.collection(collectionName);
    
        // delete one document (Promise)
        return collection.deleteMany(selector, options);
    }
}

module.exports = MongoQuery;