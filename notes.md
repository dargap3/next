# Next.js Notes

## 1. General Concepts

- Next js is a React framework for buildind full-stack web applications.
- It uses React for building user interfaces but provides additional features that enable you to build production-ready applications, including routing, optimized rendering, data fetching, bundling, compiling, and more.
- Opinions and conventions should be followed to implemennt these features.

## 2. React Server Components

### Server Components

- By default, Next treats all components as server components.
- These components can perform server-side tasks like reading files or fetching data directly from a data base.
- The trade-off is that they can't use React hooks or handle user interactions.
- We can use async components to resolve promises.

### Client Components

- To create a client component, we'll need to add the "use client" directive at the top of your component file.
- While client components can't perform server-side tasks like reading files, they can use hooks and handle user interactions.
- Client components are the traditional React components we're familiar.

## 3. Routing

- Next has a file-system based routing system.
- URLs we can access in the browser are determined by how we organize our files and folder in the code.

### 3.1. Routing conventions

1. All routes must live inside the app folder.
2. Route files must be named either page.js or page.tsx.
3. Each folder represents a segment of the URL path.

### 3.2. Nested routes

- We can create folders inside folders to create nested routes.
- To create dynamic routes, we can wrap the name of the folder in square brackets, i.e. [productsId].
- Every page in the app router receives route parameters through the params prop.
- The type of params is a promise that resolves to an object containing the dynamic segments as key value pairs.

### 3.3. Catch all segments

- Using square brackets with three dots like spread operator, commonly "slug", is a naming convencion of next: [...slug] that helps us to catch all url segments dynamically.
- If we have [[...slug]] it means we have optional catch all segment.

### 3.4. Not found page

- Next includes a basic 404 page by default that is visible when we visite a route that doesn't exist.
- To create a custom global not found page we simply have to create a "not-found" file in the app folder.
- We can also trigger a not found page programmatically using the not found function.
- We can create specific not found pages for different sections of the app, next will use the most specific page it can find.
- Not found page components doesn't recieve props.

### 3.5. File colocation

- A route only becomes publicly accesible when we add a page file to it.
- Even when a route is public with the page file, the browser only gets what is returned by the component and it has to be an default exported react component.

### 3.6. Private folders

- To create a private folder, add an underscore at the start of the folder name: \_lib.
- The folder and all its subfolders are excluded from routing.
- Private folders are useful for:
  - Keeping UI logic separate from routing logic
  - Having a consistent way to organize internal files in the project.
  - Making it easier to group related files in the code editor.
  - Avoiding potential naming conflicts with future next file naming conventions.
- If we actually want an underscore in the URL, use %5F instead. That's just the URL-encoded version of an underscore.

### 3.7. Route groups

- Lets us logically organize our routes and project files without impacting the URL scructure.
- Route groups are actually the only way to share a layout between routes without affecting the URL.
- We should wrap the folder name in parenthesis: (auth.tsx)

## 4. Layouts

- Next automatically create and set the layout file when we first access the root route, even if the layout file has been deleted.
