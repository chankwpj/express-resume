import mongodb from 'mongodb';

//TODO: migrate this CosmosDB drive
export default class ResumeService {

    constructor() {
        this.connectionString = '';
        this.databaseId = 'Resumes';
        this.collectionId = 'Resumes';
        this.mongoClient = mongodb.MongoClient;
        const self = this;
        const init = async () => {self.collection = await self.connection()};
        init();
    }

    get(version) {
        const self = this;
        return new Promise((resolve, reject) => {
            self.collection.findOne({ id: version }, {}, function (err, doc) {
                err ? reject(err) : resolve(doc);
            });
        });
    }

    connection() {
        const self = this;
        return new Promise((resolve, reject) => {
            self.mongoClient.connect(self.connectionString, { useUnifiedTopology: true }, (err, client) => {
                if (err) {
                    console.error(`Failed to connect database: ${err}`);
                    reject(err);
                } else {
                    console.log('Connected to database');
                    resolve(client.db(self.databaseId).collection(self.collectionId));
                }
            });
        })
    }

}