import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS": {
      return action.data;
    }
    case "REARRANGE_BLOGS": {
      const blogs = action.data;
      return [...blogs].sort((a, b) => b.likes - a.likes);
    }
    case "UPDATE_BLOGS": {
      return state.concat(action.data);
    }
    case "INCREASE_LIKE": {
      const returnedBlog = action.data;
      let updatedBlogs = state.map((blog) =>
        blog.id !== returnedBlog.id ? blog : returnedBlog
      );
      updatedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes);
      return updatedBlogs;
    }
    case "ADD_COMMENT": {
      const returnedBlog = action.data;
      return state.map((blog) =>
        blog.id !== returnedBlog.id ? blog : returnedBlog
      );
    }
    case "DELETE_BLOG": {
      return state.filter((blog) => blog.id !== action.data);
    }
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const returnedBlogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: [...returnedBlogs].sort((a, b) => b.likes - a.likes),
    });
  };
};

export const updateBlogs = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: "UPDATE_BLOGS",
      data: newBlog,
    });
  };
};

export const rearrangeBlogs = (blogs) => {
  return {
    type: "REARRANGE_BLOGS",
    data: blogs,
  };
};

export const increaseLikeOf = (blog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.incLike(blog);
    dispatch({
      type: "INCREASE_LIKE",
      data: returnedBlog,
    });
  };
};

export const postCommentOn = (id, comment) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.postComment(id, comment);
    dispatch({
      type: "ADD_COMMENT",
      data: returnedBlog,
    });
  };
};

export const deleteBlogOf = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id,
    });
  };
};

export default blogReducer;
