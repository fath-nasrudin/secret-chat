const User = require('../src/models/user.model');
const Message = require('../src/models/message.model');
const userData = require('./user.data');
const messageData = require('./message.data');
const hasher = require('../src/utils/hasher');
const mongoose = require('mongoose');

const args = process.argv.slice(2);

async function main() {
  const mongodb_uri = args[0];
  console.log('try to connect');
  await mongoose.connect(mongodb_uri);
  console.log('success connect');

  console.log('populating dbs');
  await createUsers();
  await createMessages();
  await mongoose.disconnect();
}

main().catch(err => console.log(err));

async function createUsers () {
  await Promise.all([
    createUser(userData[0], 0),
    createUser(userData[1], 1),
    createUser(userData[2], 2),
  ])
}


async function createMessages () {
  messageData[0].userId = users[0];
  messageData[1].userId = users[1];
  messageData[2].userId = users[2];
  messageData[3].userId = users[0];
  messageData[4].userId = users[1];
  messageData[5].userId = users[2];

  await Promise.all([
    createMessage(messageData[0], 0),
    createMessage(messageData[1], 1),
    createMessage(messageData[2], 2),
    createMessage(messageData[3], 3),
    createMessage(messageData[4], 4),
    createMessage(messageData[5], 5),
  ])
}

const users = [];
const messages = [];

async function  createUser (data, index) {
  const { first_name, last_name, username, password} = data;
  try {
    const hashedPassword = await hasher.hash(password);

    const user = new User({
      first_name,
      last_name,
      username,
      password: hashedPassword,
    })
    users[index] = user;
    await user.save();
    console.log(`${user.username} has created`);
  } catch (error) {
    console.log(error)
  }
};

async function createMessage (data, index) {
  const message = new Message({
    user: data.userId,
    text: data.text,
  })

  try {
    await message.save();
    messages[index] = message;
    console.log(`message ${index} has created`)
  } catch (error) {
    console.log(error)
  }
}
