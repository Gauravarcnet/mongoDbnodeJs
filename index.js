const MongoClient=require('mongodb').MongoClient;
const assert=require('assert');
const dboper=require('./operations');


const url='mongodb://localhost:27017/conFusion';

MongoClient.connect(url,{ useNewUrlParser: true },(err,client)=>{
  assert.equal(err,null);

  console.log("Connected correctly to server");
  const db = client.db("conFusion");
   const collection=db.collection('dishes');
  // collection.insertOne({"name":"dosa","description":"healthy dish"},
  // (err,result)=>{
  //   assert.equal(err,null);
  //
  //   console.log("After insert then:\n");
  //   console.log(result.ops);
  //
  //
  //   collection.find({}).toArray((err,docs)=>{
  //     assert.equal(err,null);
  //
  //     console.log("Find :\n");
  //     console.log(docs);
  //
  //     collection.drop("dishes",(err,result)=>{
  //       assert.equal(err,null);
  //
  //       client.close();
  //
  //     });
  //   });
  // });
    dboper.insertDocument(db,{name:"Vadount",description:"test"},"dishes",(result)=>{
      console.log("insert document:/n",result.ops);

      dboper.findDocuments(db,"dishes",(docs)=>{
        console.log("found documents:/n",docs);

        dboper.updateDocument(db,{name:"Vadount"},{description:"updated test"},"dishes",(result)=>{
          console.log("Updated documents:/n",result.result);

          dboper.findDocuments(db,"dishes",(docs)=>{
            console.log("found documents:/n",docs);
            collection.drop("dishes",(result)=>{
              console.log("Dropped collection");
              client.close();

            });

        });
      });
    });
  });


});
