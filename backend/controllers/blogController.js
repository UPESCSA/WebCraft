import dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";

// CONSTANTS
const SERVER_URI = process.env.SERVER_URI;
const fields = {
  __v: 0,
  createdAt: 0,
  updatedAt: 0,
};

// DATABASE CONTROLLERS

import {
  CREATEBLOGDB,
  READBLOGDB,
  UPDATEBLOGDB,
  DELETEBLOGDB,
} from "./database/blogDatabase.js";

// CONTROLLERS

const createBlog = async (req, res) => {
  try {
    const { blogTitle, blogAuthor, blogContent } = req.body;

    const blogImageURL = `${SERVER_URI}/images/blogs/${req.files["blogImg"][0].filename}`;

    const blog = await CREATEBLOGDB({
      blogTitle,
      blogAuthor,
      blogContent,
      blogImageURL,
    });

    if (blog) {
      console.log("Blog Created", { blog });
      return res.status(StatusCodes.CREATED).send({
        response: "Blog Created",
        blogId: blog._id,
      });
    } else {
      console.log("Error Creating Blog", { error });
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error");
    }
  } catch (error) {
    console.log("Error Creating Blog", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const readBlog = async (req, res) => {
  try {
    const query = !req.query._id ? {} : { _id: req.query.id };
    const blog = await READBLOGDB(query, fields);

    if (blog.length > 0) {
      console.log("Blog Found", { blog });

      return res.status(StatusCodes.OK).send(blog);
    } else {
      console.log("Blog Not Found", { blog });
      return res.status(StatusCodes.NOT_FOUND).send("Blog Not Found");
    }
  } catch (error) {
    console.log("Error Reading Blog", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const updateBlog = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const data = req.body;
    const message = await UPDATEBLOGDB(query, data, fields);
    if (message) {
      console.log("Blog Updated", { message });
      return res.status(StatusCodes.OK).send(message);
    } else {
      console.log("Blog Not Updated", { message });
      return res.status(StatusCodes.NOT_FOUND).send("Blog Not Updated");
    }
  } catch (error) {
    console.log("Error Updating Blog", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const query = { _id: req.query.id };
    const message = await DELETEBLOGDB(query);
    if (message) {
      console.log("Blog Deleted", { message });
      return res.status(StatusCodes.OK).send("Blog Deleted");
    } else {
      console.log("Blog Not Deleted", { message });
      return res.status(StatusCodes.NOT_FOUND).send("Blog Not Deleted");
    }
  } catch (error) {
    console.log("Error Deleting Blog", { error });
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send("Internal Server Error");
  }
};

export {
  createBlog as CREATEBLOG,
  readBlog as READBLOG,
  updateBlog as UPDATEBLOG,
  deleteBlog as DELETEBLOG,
};
