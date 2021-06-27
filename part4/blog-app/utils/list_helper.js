// const dummy = (...params) => {
//   return 1;
// };

// const totalLikes = (arr) => {
//   const reducer = (total, item) => {
//     return total + item.likes;
//   };

//   return arr.reduce(reducer, 0);
// };

// const favouriteBlog = (arr) => {
//   const reducer = (selected, item) => {
//     if (item.likes > selected.likes) {
//       selected = item;
//     }

//     return selected;
//   };

//   const result = arr.reduce(reducer);
//   return {
//     title: result.title,
//     author: result.author,
//     likes: result.likes,
//   };
// };

// const mostBlogs = (arr) => {
//   const reducer = (total, item) => {
//     const exists = total.find((obj) => {
//       return obj.author === item.author;
//     });
//     if (exists) {
//       exists.blogs += 1;
//       return total;
//     } else {
//       return total.concat({
//         author: item.author,
//         blogs: 1,
//       });
//     }
//   };

//   const reducedArr = arr.reduce(reducer, []);

//   const singleReducer = (target, item) => {
//     if (item.blogs > target.blogs) {
//       target = item;
//     }

//     return target;
//   };

//   return reducedArr.reduce(singleReducer);
// };

// const mostLikes = (arr) => {
//   const reducer = (total, item) => {
//     const exists = total.find((obj) => {
//       return obj.author === item.author;
//     });
//     if (exists) {
//       exists.likes += item.likes;
//       return total;
//     } else {
//       return total.concat({
//         author: item.author,
//         likes: item.likes,
//       });
//     }
//   };

//   const reducedArr = arr.reduce(reducer, []);

//   const singleReducer = (target, item) => {
//     if (item.likes > target.likes) {
//       target = item;
//     }

//     return target;
//   };

//   return reducedArr.reduce(singleReducer);
// };

// module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };

const Blog = require("../models/blog.js");
const mongoose = require("mongoose");

const initialBlogs = [
  {
    title: "Create an express app",
    author: "tsensei",
    url: "https://www.freecodecamp.com",
    likes: 13,
  },
  {
    title: "Create an mongo app",
    author: "tsenpai",
    url: "https://www.freecodecamp.com",
    likes: 69,
  },
  {
    title: "Create an node app",
    author: "talha",
    url: "https://www.twitter.com",
    likes: 420,
  },
  {
    title: "Create an react app",
    author: "talha",
    url: "https://www.twitter.com",
    likes: 200,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};

const validNonexistingId = async () => {
  const blog = new Blog({
    title: "willbedeletedsoon",
    url: "willbedeletedsoon",
  });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = { initialBlogs, blogsInDb, validNonexistingId };
