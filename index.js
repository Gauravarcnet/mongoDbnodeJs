const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');

const url='mongodb://localhost:27017/conFusion';

MongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
  assert.equal(err,null);

  console.log("Connected correctly to server");

  const db = client.db("conFusion");
  const collection=db.collection('dishes');
  collection.insertOne({"name":"dosa","description":"healthy dish"},
  (err,result)=>{
    assert.equal(err,null);

    console.log("After insert then:\n");
    console.log(result.ops);


    collection.find({}).toArray((err,docs)=>{
      assert.equal(err,null);

      console.log("Find :\n");
      console.log(docs);

      collection.drop("dishes",(err,result)=>{
        assert.equal(err,null);

        client.close();

      });
    });
  });
});
