# Next.js 15 Notes

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
- Apply layouts selectively to specific parts of our app.

## 4. Layouts

- A layout is UI that is shared between multiple pages in the app.
- Default export a React component from a layout file. That component takes a children prop, which next will populate with your page content.
- Next automatically create and set the RootLayout file when we first access the root route, even if the layout file has been deleted. It's not an optional file.

### 4.1. Nested Layouts

- We can put layout files in each route that we need.

### 4.2. Multiple Root Layouts

- We achive this using route groups and structuring our page and layouts folders whatever we need.

## 5. Routing Metadata

- The metadata API in next is a powerful feature that lets us define metadata for each page.
- Metadata ennsures our content looks great when it's shared or indexed by search engines.
- Two ways to handle metadata in layout or page files:
  1. Export a static **metadata** object.
  2. Export a dynamic **generateMetadata** function.

### 5.1. Metadata Rules

- Both layout and pase can export metadata. Layout mmetadata applies to all its pages, while page metadata is specific to that page.
- Metadata follows a top-down order, starting from the root level.
- When metadata exists in multiple places along a route, they merge together, with deeper page metadata overriding layout metadata for matching properties.
- We can't use metadata object and generateMetadata function in the same route segment, it is one or the other.
- Metadata won't work in pages that are marked with the 'use client' directive.

### 5.2. Title Metadata

- The title field's primary purpose is to define the document title.
- It can be a string or an object.
- When we use the template approach we have three options:
  1. default: acts as a fallback for any child routes that don't specify their own title.
  2. template: is useful when we want to add consistent prefixes or suffixes to our titles. This property applies to child routes.
  3. absolute: sometimes we might to break free from the template pattern set by parent segments, absolute overrides the parent segments.

## 6. UI Navigation.

### 6.1. Link component navigation

- The `<Link>` component is a React component that extends the HTML `<a>` element, and it's the primary way to navigate between routes in Next. To use it, we'll need to import it from "next/link"
- The component has a "replace" prop that overrides the current history entry instead of adding a new one.

### 6.2. Params and searchParams

- params is a promise that resolves to an object containing the dynamic route parameters (like id).
- searchParams is a promise that resolves to an object containing the query parameters (like filters and sorting).
- While page has access to both params and searchParams, layout only has access to params.

### 6.3. Navigating programmatically

- One way to achive this is using the useRouter hook imported from "next/navigation" inside a client component.
- Another way is usinng the redirect function from "next/navigation".

## 7. Templates.

- Templates are similar to layouts in that they are also UI shared between multiple pages in the app.
- Whenever a user navigates between routes sharinng a template, you get a completely fresh start:
  - a new template component instance is mounted.
  - DOM elements are recreated.
  - state is cleared.
  - effect are re-synchronized.
- We can create a template by exporting default React component from a template file.
- Like layouts, templates need to accept a children prop to render the nested route segments.
- We can use both layout and template files together, in this case the layout renders first and then its children are replaced by template components output.

## 8. Loading.

- loading file help us to create loading states that users see while waiting for content to load in a specific route segment.
- The loading states appear instantly when navigating, letting users know that the application is responsive annd actively loading content.
- Behind the scenes, the loading files automatically wraps the page file and its nested children within a react suspense boudary.
- Benefits:
  1. It gives users immediate feedback when they navigate somewhere new.
     This makes the app feel snappy and responsive, and users know their click actually did something.
  2. Next keeps shared layouts interactive while new content loads.
     Users can still use things like navigation menus or sidebars even if the main content isn't ready yet.

## 8. Error handling.

- We use an error file that must be a client component.
- It automatically wraps route segments and their nested children in a React Error Boundary.
- We can create customm error UIs for specific segments using the file-system hierarchy.
- It isolates errors to affected segments while keeping the rest of the app functional.
- It enables us to attempt to recover from an error without requiring a full page reload.

### 8.1. Error Recovery.

- Take advantange of the reset function prop.
- The reset function tryes to re-render the component that failed on the client-side.
- It is better to try to attempt server side recovery.

### 8.2. Errors in Nested routes.

- Errors always bubble up to find the closest parent error boundary.
- An error file handles errors not just for its own folder, but for all the nested child segments below it too.
- By strategically placing error files at different levels in the route folders, we can control exactly how detailed your error handling gets.
- Where we put the error file makes a huge difference - it determines exactly which parts of the UI get affected when things go wrong.

### 8.3. Errors in layouts.

- The error boundary won't catch errors thrownn in layout files within the samme segment because of how the component hierarchy works.

### 8.4. Global errors.

- Next provides a special filel called "global-error" that goes in the root app directory.
- This is the last line of defennse when something goes catastrophically wrong at the highest level of the app.
- Global error boundary only works in production mode.
- global-error file needs to include its own html and body tags because when this error boundary kicks in it completely replaces the root layout.

## 9. Component hierarchy.

1. layout.tsx
2. template.tsx
3. error.tsx
4. loadind.tsx
5. not-found.tsx
6. page.tsx

```jsx
<Layout>
  <Template>
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<NotFound />}>
          <Page />
        </ErrorBoundary>
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>
```

## 10. Parallel routes.

- Parallel routing is an advanced routing mechanism that lets us render multiple pages simultaneously within the same layout.
- **How to set them up:**
  - Parallel routes in Next are definned using a feature known as "slots".
  - Slots help organize content in a modular way.
  - To create a slot, we use the `@folder` naming.
  - Each defined slot automatically becomes a prop in its corresponding `layout` file.
- **Use cases:**
  - Dashboards with multiple sections.
  - Split-view interfaces.
  - Multi-pane layouts.
  - Complex admin interfaces.
  - Any UI where sections need to operate independently.
- **Benefits:**
  - Parallel routes are great for splitting a layout into manageable slots (especially when different teams work on different parts)
  - Independent route handling:
    - Each slot in the layout, such as users, renenue and notifications, can handle its own loading and error states.
    - This granular control is particularly useful in scenarios where different sections of the page load at varying speeds or encounter unique errors.
  - Sub-navigation:
    - Each slot can essentially function as a mini-application, complete with its own navigation and state management.
    - Users can interact with each section separately, applying filters, sorting data, or navigating through pages without affectinng other parts.
  - Children prop is also an slot.

### 10.1. Unmatched Routes

- **Navigation from the UI:** When navigating through the UI (like clicking links), Next keeps showing whatever was in the unmatched slots before.
- **Page reload:**
  - Next looks for a "default" file in each unmatched slot.
  - This file is critical as it serves as a fallback to render conntent when the framework cannot retrieve a slot's active state from the current URL.
  - Without the file, we'll get a 404 error.
  - Normally the default file is a duplicate of the page, but it could be whatever we want.

### 10.2. Conditional Routes

- Imagine we want to show different content based on whether a user is logged in or not.
- We might want to display a dashboard for authenticated users but show a login page for those who aren't.
- Conditional routes allow us to achieve this while maintaining completely separate code on the same URL.

## 11. Intercepting routes.

- Intercepting routes is an advanced routing mechanism that allows us to load a route from another part of our application within the current layout.
- It's particularly useful when we want to display new content while keeping the user in the same context.

### 11.1. Intercepting routes conventions.

- (.) to match segments on the same level.
- (..) to match segments one level above.
- (..)(..) to match segments two level above.
- (...) to match segments from the root app directory.
