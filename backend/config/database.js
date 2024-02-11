import mongoose from "mongoose";

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log("[i] DATABASE CONNECTED : 🆗");
    } catch (error) {
      console.log("[i] DATABASE CONNECTED : 😱");
      console.log(error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("[i] DATABASE DISCONNECTED : 🆗");
    } catch (error) {
      console.log("[i] DATABASE DISCONNECTED : 😱");

    }
  }
}

export { Database };
