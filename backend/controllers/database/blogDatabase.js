import { BLOGMODEL } from "../../models/blogModel.js";

// DATABASE OPERATIONS

const createBlogDB = async (data) => {
  try {
    const result = await BLOGMODEL(data).save();
    if (result !== null) {
      console.log("Blog Created", { userId: result._id });
      return result;
    } else {
      console.log("Blog Not Created", { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log("Error Creating Blog", (data, error));
    return false;
  }
};

const readBlogDB = async (query, fields) => {
  try {
    const result = await BLOGMODEL.find(query).select(fields);
    if (result.length > 0) {
      console.log("Blog Read");
      return result;
    } else {
      console.log("Blog Not Read");
      return false;
    }
  } catch (error) {
    console.log("Error Reading Blog", {
      query,
      error,
    });
    return false;
  }
};

const updateBlogDB = async (query, data, fields) => {
  try {
    const result = await BLOGMODEL.findOneAndUpdate(query, data, {
      new: true,
    }).select(fields);
    if (result) {
      console.log("Blog Updated", { userId: result });
      return result;
    } else {
      console.log("Blog Not Updated", { userId: result });
      return false;
    }
  } catch (error) {
    console.log("Error Updating Blog", (query, data, error));
    return false;
  }
};

const deleteBlogDB = async (query) => {
  try {
    const result = await BLOGMODEL.findOneAndDelete(query);

    if (result) {
      console.log("Blog Updated", { userId: result._id });
      return result;
    } else {
      console.log("Blog Not Deleted", { userId: result._id });
      return false;
    }
  } catch (error) {
    console.log("Error Deleting Blog", (query, error));
    return false;
  }
};

// EXPORTING MODULES

export {
  createBlogDB as CREATEBLOGDB,
  readBlogDB as READBLOGDB,
  updateBlogDB as UPDATEBLOGDB,
  deleteBlogDB as DELETEBLOGDB,
};
