import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";

describe("<CreateBlogForm /> component", () => {
  test("updates parent state and calls handler onSubmit", () => {
    const createBlog = jest.fn();

    const component = render(<BlogForm setBlogs={createBlog} />);

    const title = component.container.querySelector("#title-input");
    const author = component.container.querySelector("#author-input");
    const url = component.container.querySelector("#url-input");
    const form = component.container.querySelector("#form");

    fireEvent.change(title, {
      target: { value: "New Blog Title" },
    });
    fireEvent.change(author, {
      target: { value: "New Blog Author" },
    });
    fireEvent.change(url, {
      target: { value: "New Blog Url" },
    });
    fireEvent.submit(form);

    // createBlog handler function gets called onSubmit
    expect(createBlog.mock.calls).toHaveLength(1);

    // with the right data
    expect(createBlog.mock.calls[0][0].title).toBe("New Blog Title");
    expect(createBlog.mock.calls[0][0].author).toBe("New Blog Author");
    expect(createBlog.mock.calls[0][0].url).toBe("New Blog Url");
  });
});
