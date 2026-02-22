---
title: "Getting Started with React"
date: "2024-01-15"
author: "John Doe"
excerpt: "Learn the basics of React and how to build your first component"
tags: ["react", "tutorial", "beginner"]
summary: "A comprehensive introduction to React for beginners"
---

# Getting Started with React

React is a powerful JavaScript library for building user interfaces. In this tutorial, we'll cover the fundamentals of React development.

## What is React?

React is a **declarative**, **efficient**, and **flexible** JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### 1. Components
Components are the building blocks of React applications. They can be functional or class-based.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

### 2. Props
Props are arguments passed into React components. They are read-only and help make components reusable.

### 3. State
State is similar to props, but it is private and fully controlled by the component.

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Setting Up Your First React App

To create a new React application, you can use Vite:

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

## Conclusion

React provides a powerful way to build interactive user interfaces. With its component-based architecture and rich ecosystem, it's an excellent choice for modern web development.

Happy coding! 🚀
