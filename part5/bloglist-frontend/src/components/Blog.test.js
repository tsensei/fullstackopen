import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders blog title and author by default", () => {
  const blog = {
    title: "Hello world",
    author: "tsensei",
    url: "www.google.com",
    likes: 500,
    user: {
      username: "haru",
    },
  };

  const component = render(<Blog blog={blog} />);

  component.debug();

  expect(component.container).toHaveTextContent("Hello world");
  expect(component.container).toHaveTextContent("tsensei");
  expect(component.container).not.toHaveTextContent(500);
  expect(component.container).not.toHaveTextContent("haru");
});

test("url and number of likes shown when button clicked", () => {
  const blog = {
    title: "Hello world",
    author: "tsensei",
    url: "www.google.com",
    likes: 500,
    user: {
      username: "haru",
    },
  };

  const component = render(<Blog blog={blog} />);

  const button = component.container.querySelector("button");

  fireEvent.click(button);

  expect(component.container).toHaveTextContent("Hello world");
  expect(component.container).toHaveTextContent("tsensei");
  expect(component.container).toHaveTextContent(500);
  expect(component.container).toHaveTextContent("www.google.com");
});

test("when like is clicked twice, update handler is called twice", () => {
  const blog = {
    title: "Hello world",
    author: "tsensei",
    url: "www.google.com",
    likes: 500,
    user: {
      username: "haru",
    },
  };
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} setNeedUpdate={mockHandler} />);

  const button = component.container.querySelector("button");

  fireEvent.click(button);
  component.debug();

  const likeBtn = component.getByText("like");

  fireEvent.click(likeBtn);
  fireEvent.click(likeBtn);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
