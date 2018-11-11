import { connect, Types } from "mongoose";

const options = {
  reconnectTries: 30, // Retry up to 30 times
  reconnectInterval: 500 // Reconnect every 500ms
};

// https://github.com/apollographql/apollo-server/issues/1633
const { ObjectId } = Types;
ObjectId.prototype.valueOf = function() {
  return this.toString();
};

const createConnection = () => {
  connect(
    process.env.NODE_ENV === "production"
      ? "mongodb://mongo:27017/accredible"
      : "mongodb://localhost:27017/accredible",
    options
  )
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch(() => {
      console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
      setTimeout(createConnection, 5000);
    });
};

export { createConnection };
