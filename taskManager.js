
const { MongoClient } = require('mongodb');

async function main() {

  const uri = "mongodb+srv://wangyiyang7:clR7MmVoZLVz2SL1@cluster0.j4n8d.mongodb.net/";

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('taskManagerDB');
    const collection = db.collection('tasks');

    // Insert document
    const task = {
        title: 'Complete MongoDB CRUD activity',
        description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
        completed: false,
        dueDate: '2024-11-15'
    };

    const insertOneResult = await collection.insertOne(task);
    console.log(`New task created with the following id: ${insertOneResult.insertedId}`);

    // Add three tasks to the task collection.
    const threeTasks = [
        {
            title: 'Complete MongoDB CRUD activity2',
            description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
            completed: false,
            dueDate: '2024-11-16'
        },
        {
            title: 'Complete MongoDB CRUD activity3',
            description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
            completed: false,
            dueDate: '2024-11-17'
        },
        {
            title: 'Complete MongoDB CRUD activity4',
            description: 'Write a Node.js script that performs CRUD operations in MongoDB Atlas',
            completed: false,
            dueDate: '2024-11-18'
        }
    ];

    const insertManyResult = await collection.insertMany(threeTasks);
    console.log(`${insertManyResult.insertedCount} new tasks created with the following ids:`);
    Object.keys(insertManyResult.insertedIds).forEach(key => {
        console.log(`ID: ${insertManyResult.insertedIds[key]}`);
    });

    // retrieve all tasks and print to console
    const retrievedTasks = await collection.find({}).toArray();
    console.log('\nTasks:');
    retrievedTasks.forEach(task => {
        console.log(`Title: ${task.title}`);
        console.log(`Description: ${task.description}`);
        console.log(`Completed: ${task.completed}`);
        console.log(`Due Date: ${task.dueDate}`);
        console.log('---------------------------');
    });

    // update one document completed status to true
    const updateResult = await collection.updateOne({ title: 'Complete MongoDB CRUD activity3' }, 
        {$set: {completed: true}});
    
    // delete a document
    const deleteResult = await collection.deleteOne({"dueDate" : "2024-11-16"});
  } catch (error) {
        console.error('Error performing operations:', error);
    } finally {
    await client.close();
    }
}

main().catch(console.error);


