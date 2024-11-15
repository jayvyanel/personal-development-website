const connect = require('./db');

async function createEnrollment(enrollment) {
  const db = await connect();
  const result = await db.collection('enrollments').insertOne(enrollment);
  console.log(`New enrollment created with the following id: ${result.insertedId}`);
}

async function getEnrollments() {
  const db = await connect();
  const enrollments = await db.collection('enrollments').find().toArray();
  console.log("Enrollments:", enrollments);
  return enrollments;
}

async function updateEnrollment(id, updatedInfo) {
  const db = await connect();
  const result = await db.collection('enrollments').updateOne({ _id: id }, { $set: updatedInfo });
  console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
}

async function deleteEnrollment(id) {
  const db = await connect();
  const result = await db.collection('enrollments').deleteOne({ _id: id });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}

module.exports = { createEnrollment, getEnrollments, updateEnrollment, deleteEnrollment };
