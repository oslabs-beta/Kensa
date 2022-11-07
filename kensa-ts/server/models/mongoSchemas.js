const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const MongoDB = process.env.MONGO_URI;

// let User, Project, HistoryLog, HistoryLogDev;

mongoose.connect(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connection opened');
  })
  .catch((err) => {
    console.log('Error: ', err);
  });

// mongo db relational is like nested objects
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  }
});
export const User = mongoose.model('User', userSchema);

const projectSchema = new Schema({
  project_name: { type: String, required: true },
  api_key: { type: String, required: true },
  server_url: { type: String },
  // history_log: [historyLogSchema],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  }
});
export const Project = mongoose.model('Project', projectSchema);

const historyLogSchema = new Schema({
  operation_name: { type: String, required: true },
  query_string: { type: String },
  size: { type: String },
  execution_time: { type: Number },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  created_at: { type: Date, default: Date.now },
  success: { type: Boolean }
});
export const HistoryLog = mongoose.model('HistoryLog', historyLogSchema);

const historyLogDevSchema = new Schema({
  operation_name: { type: String, required: true },
  query_string: { type: String },
  size: { type: String },
  execution_time: { type: Number },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  created_at: { type: Date, default: Date.now },
  success: { type: Boolean }
});
export const HistoryLogDev = mongoose.model('HistoryLogDev', historyLogDevSchema);


// export const User = mongoose.model('TestUser', userSchema);

// const Project = mongoose.model('Project', projectSchema);



// const newUser = new User({ username: 'tommy', password: 'a123' });
// const newProject = new Project({
//   project_name: 'Kensa Monitoring App',
//   api_key: '123456789',
//   server_url: 'localhost:3050/graphql',
//   owner: '63675af5b24487bfca4bb211'
// });

// const historyLogSchema = new Schema({
//   operation_name: { type: String, required: true },
//   query_string: { type: String },
//   size: { type: String },
//   execution_time: { type: Number },
//   project_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Project'
//   },
//   created_at: { type: Date, default: Date.now },
//   success: { type: Boolean }
// });

// const newLog = new HistoryLog({
//   operation_name: 'Find_USER_TWO',
//   query_string: 'testtesttest',
//   size: '81b',
//   execution_time: 120,
//   project_id: '63685aac8d2136d5ff8c6608',
//   success: true
// });
// const newLogDev = new HistoryLogDev({
//   operation_name: 'Find_USER',
//   query_string: 'testtesttest',
//   size: '86b',
//   execution_time: 222,
//   project_id: '63685aac8d2136d5ff8c6608',
//   success: true
// });

// newLog.save()
//   .then(data => {
//     console.log('New Dev Log Saved');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// newProject.save()
//   .then(data => {
//     console.log('New Project Created');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

// newUser.save()
//   .then(data => {
//     console.log('New user saved');
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });


