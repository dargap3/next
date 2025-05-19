# Next.js 15 Notes

## 1. General Concepts

- Next js is a React framework for building full-stack web applications.
- It uses React for building user interfaces but provides additional features that enable you to build production-ready applications, including routing, optimized rendering, data fetching, bundling, compiling, and more.
- Opinions and conventions should be followed to implement these features.

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
- The app Router in Next is built entirely on the RSC architecture.

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

## 12. Route handlers.

- The app router lets us create custom request handlers for our routes using a feature called Route Handlers.
- Unlike pages routes, which give us HTML content, Route Handlers let us build RESTful endpoints with complete control over the response.
- Think of it like building a Node + Express app.
- There is no need to set up and configure a separate server.
- Route handlers are great when making external API requests as well. For example, if we're building an app that needs to talk third-party services.
- Route handlers run server-side, our sensitive info like private keys stays secure and never reaches the browser.
- Route handlers are the equivalent of API routes in Page router.
- Next supports GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS.
- If an unsupported method is called, Next will return a 405 Method Not Allowed response.
- Just like page routes, route handlers must live inside the app folder.
- The file must be called `route` and it must export functions named afther HTPP verbs.
- Watch out for conflicts between page routes and route handlers. In case of conflicts the route handler will take over by default.

### 12.1. Headers in route handlers

- HTTP headers represent the metadata associated with an API request and response.
- **Request Headers:** These are sent by the client, such as a web browser, to the server. They content essential information about the request, which helps the server understand and process it correctly. Some common request headers are:
  - **'User-Agent'** which identifies the browser and operating system to the server.
  - **'Accept'** which indicates the content types like text, video, or image formats that the client can process.
  - **'Authorization'** header used by the client to authenticate itself to the server.
- **Response Headers:** These are sent back from the server to the client. They provide information about the server and the data being sent in the response.
  - **'Content-Type'** header which indicates the media type of the response. It tells the client what the data type of the returned content is, such as text/html for HTML documents, application/json for JSON data, etc.

### 12.2. Cookies in route handlers

- Cookies are small pieces of data that a server sends to a user's web browser.
- The browser can store the cookies and send them back to the same server with future requests.
- Cookies serve three main purposes:
  - managing sessions (like user logins and shopping carts)
  - handling personalization (such as user preferences and themes)
  - tracking (like recording and analyzing user behavior)

### 12.3. Caching in route handlers

- Route handlers are not cached by default but we can opt into caching when using the GET method.
- Caching only works with GET methods.
- When we use dynamic functions like headers() and cookies() or working with the request object in the GET methot, caching won't be applied.
- There's no caching during development.

### 12.4. Middleware

- Middleware in Next is a powerful feature that lets us intercept and control the flow of requests and responses throughout our application.
- It does this at a global level, significantly enhancing features like redirects, URL, rewrites, authentication, headers, cookies, and more.
- Middleware lets us specify paths where it should be active:
  - Custom matcher config.
  - Conditional statements
- Middleware file must be in the src folder.

## 13. Rendering.

- Rendering is the process of transforming the component code we write into user interfaces that users can see and interact with.
- In Next, the tricky part to building a performant application is figuring out whenn and where this transformation should happen.

### 13.1. Rendering in React.

#### 13.1.1. Client-side rendering.

- The approach, where the browser (the client) transforms React components into what we see on screen, that's what we call client-side rendering (CSR).
- CSR became super popular for SPAs.
- **Drawbacks:**
  - **SEO:**
    - When search engines crawl your site,they're mainly looking at HTML content. But with CSR, our initial HTML is basically just an empty div, not great for search engines trying to figure out what the page is about.
    - When we have a lot of nested components making API calls, the meaningful content might load too slowly for search engines to even catch it.
  - **Performance and UX:**
    - The browser (the client) has to do everything: fetch data, build the UI, make everything interactive... that's a lot of work!
    - Users often end up staring at a blank screen or a loading spinner while all this happens.
    - Every time we add a new feature in the app, that JS bundle gets bigger, making users wait even longer.
    - This is especially frustrating for people with slower internet connections.

#### 13.1.2. Server side solutions.

- Search engines can now easily index the server-rendered content, solving our SEO problem.
- Users see actual HTML content right away instead of staring at a blank screen or loading spinner.
- While SSR makes content visible faster it introduces its own complexity around interactivity: the page can't become fully interactive until the JS bundle comprising both react itself and the app code has finished downloading and executing in the browser.
- **Hydration** is a phase where the static HTML page, initially served by the server, is brought to live.

  - During hydration, React takes control in the browser and reconstructs the component tree memory, using the server-rendered HTML as a blueprint.
  - It carefully maps out where all the interactive elements should go, then hooks up the JS logic.
  - This involves initializing application state, adding events handlers as click and mouseover handlers, and setting up all the dynamic features needed for a full interactive user experience.

  ##### 13.1.2.1 Static Site Generation (SSG).

  - SSG happens during build time when we deploy our app to the server. This results in pages that are already rendered and ready to serve. It's perfect for content that stays relatively stable, like blog posts.

  ##### 13.1.2.2 Server Side Rendering (SSR).

  - SSR, renders pages on-demand when users request them. It's ideal for personalizad content like social media feeds where the HTML changes based onn who's logged in.
  - SSR, was a significannt improvement over CSR, providing faster initial page loads and better SEO.
  - **Drawbacks:**

    1. **We have to fetch everything before we can show anything:**

    - Components cannot start rendering and then pause or "wait" while data is still being loaded.
    - If a component needs to fetch data from a database or another source (like an API), this fetching must be completed before the server can begin rendering the page.
    - This can delay the server's response time to the browser, as the server must finish collecting all necessary data before any part of the page can be sent to the client.

    2. **We have to load everything before we can hydrate anything:**

    - For successful hydration, where React adds interactivity to the server-rendered HTML, the component tree in teh browser must exactly mathc the server-generated component tree.
    - This means that all the JS for the components must be loaded on the client before it can start hydrating any of them.

    3. **We have to hydrate everything before we can interact with anything:**

    - React hydrates the component tree in a single pass, meaning once it starts hydrating, it won't stop until it's finished with the entire tree.
    - As a consequence, all components must be hydrated before we can interact with any of them.

    This 3 points at once, create an "all or nothing" waterfall problem that spans from the server to the client, where each issue must be resolved before moving to the next one. This become really inefficient when some parts ot the app are slower than others, as is often the case in real-world apps.

#### 13.1.3. Suspense SSR architecture.

- Use the <Suspense> component to unlock two major SSR features:

  ##### 13.1.3.1. HTML streaming on the server.

  - It solves our first problem, we don't have to fetch everything before you can show anything.
  - If a particular section is slow annd could potentially delay the initial HTML, no problem! It can be seamlessly integrated into the steam later when it's ready.
  - **The other hurdle:**
    - Even with faster HTML delivery, we can't start hydrating until we've loaded all the JS for the required section.
    - If that's a big chunk of code, we're still keeping users waiting from being able to interact the page.
      - To mitigate this, code splitting can be used:
        - It lets us tell our bundler, "these parts of the code aren't urgent, split them into separate scripts."
        - Using `React.lazy` for code splitting separates our required section's code from the core JS bundle.
        - The browser can download React and most of our app's code independently, without getting stuck waiting for that main section's code.

  ##### 13.1.3.2. Selective hydration on the client.

  - By wrapping our required sections in a <Suspense> component, we're not just enabling streaming but also telling React: "it's ok to hydrate other parts of the page before everything's ready". This is what we call "selective hydration" and is a game changer.
  - It allows for the hydration of parts of the page as they become available, even before the rest of the HTML and the JS code are fully downloaded.
  - Thanks to selective hydration, a heavy chunk of JS won't hold up the rest of our page from becoming interactive.
  - Selective hydration also solves our third problem: the necessity to "hydrate everthing to interact with anything".
  - React starts hydrating as soos as it can, which means users can interact with things for example as the header and side navigation without waiting for the main content (considering the main content component is wrapped by a suspense component).
  - This process is managed automatically by React.
  - In scenarios where multiple components are awaiting hydration, React prioritizes hydration based on user interactions.

- **Drawbacks:**

  - First, even though we're streaming JS code to the browser bit by bit, eventually users still end up dowloading the entire code for a webpage.
  - As we keep adding features to our apps, this code keeps growing.
  - This leads to an important question: **do users really need to downnload so much data?**

  - Right now, every React component gets hydrated on the client side, whether it needs innreactivity or not.
  - This means we're using up resources and slowing down load times and time to interactivity by hydrating components that might just be static content.
  - This leads to another question: **should all components be hydrated, even those that don't need interactivity?**

  - Third, even though servers are way better at handling heavy processing, we're still making users' devices do bulk of the JS work.
  - This cann really show things down, specially on less powerful devices.
  - This leads to another important question: **Shouldnn't we be leveraging our servers more?**

#### 13.1.4. React Server Components (RSC).

- RSC represent a new architecture designed by the React team.
- This approach leverages the strengths of both server annd client enviroments to optimize efficiency, load times, and innteractivity.
- The architecture inntroduces a dual-component model.
  - Client components
  - Server components
- This distinction is based not on the components' functionality but rather on their execution enviroment and the specific systems they are designed to interact with.

  ##### 13.1.4.1. Client Components.

  - Client components are the familiar React components we've been using (without Next).
  - They are typically rendered on the client-side (CSR) but, they can also be rendered to HTML on the server (SSR), allowing users to immediately see the page's HTML content rather than a blank screenn.
  - "client components" cann render on the server.
  - Client components primarily operate on the client but can (and should) also run once on the server for better performance.
  - Client components have full access to the client enviroment, such as the browser, allowing them to use state, effects, and event listeners for handling interactivity.
  - They can also access browser-exclusive APIs like geolocation or localStorage allowing us build UI for specific use cases.
  - In fact, the term "Client Component" doesn't signify anything new; it simply helpt differentiate these components from the newly introduced server components.

  ##### 13.1.4.2. Server components.

  - Server components represents a new type of React component specifically designed to operate exclusively on the server.
  - Unlike client components, their code stays on the server and is never downloaded to the client.
  - This design choice offers multiple bennefits to React apps.
  - **Benefits**:
    1. **Smaller budle sizes:**
    - Since server components stay on the server, all their dependencies stay there too.
    - This is fantastic for users with slower connections or less powerful devices since they don'y need to download, parse, and execute that JS.
    - Plus, there's no hydration step, making the app load and become interactive faster.
    2. **Direct access to server-side resources:**
    - Server components can talk directly to databases andn file systems, making data fetching super efficient without any client-side processing.
    - They use the server's power and proximity to data sources to manage compute-intensive rendering tasks.
    3. **Enhanced security:**
    - Since server components run only onn the server, sensitive data and logic, like API keys and tokens, never leave the server.
    4. **Improved data fetching:**
    - Server components allow you to move data fetching to the server, closer to your data source.
    - This can improve performance by reducing time it takes to fetch data needed for rendering, and the number of requests the client needs to make.
    5. **Caching:**
    - When you rennder on the server, you can cache the results and reuse them for different users and requests.
    - This means better performance and lower costs since you're not re-renndering and re-fetching data all the time.
    6. **Faster initial page load and first contentful paint:**
    - By generating HTML on the server, users see the content immediately, no waiting for JS to dowload and execute.
    7. **Improved SEO:**
    - Search engine bots can easily read the server-rendered HTML, making our pages more indexable.
    8. **Efficient streaming:**
    - Server components can split the rendering process into chunks that stream to the client as they're ready.
    - This means users start seeing content faster instead of waiting for the entire page to render on the server.

- Server components handle data fetching and static rendering, while Client components take care of rendering the interactive elements.
- The beauty of this setup is that you get the best of both server and client rendering while using a single lenguage, framework and set of APIs.

- The app Router in Next is built entirely on the RSC architecture.

#### 13.1.5. RSC rendering lyfecycle.

#### 13.1.6. Static rendering.

-

#### 13.1.7. Dynamic rendering.
