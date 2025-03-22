# Globus Pointer v2 🌍

- [Documentation](https://your-project-docs-link.com/)
- [Support](https://your-project-support-link.com/)
- [GitHub Repository](https://github.com/your-org/globus-pointer-v2)
- [Twitter](https://twitter.com/your-project-handle)

---

## Project Structure

This project is built using modern web technologies to provide a robust and scalable solution for [describe your project's purpose briefly].

Inside your project, you'll see the following directory structure:

```
├── public/
│   └── ...
└── src/
    ├── components/
    │   └── ...
    └── routes/
        └── ...
```

- `src/routes`: Handles routing and endpoints for the application. Includes layout and page files. Refer to the [routing docs](https://your-routing-docs-link.com/) for more details.

- `src/components`: Contains reusable UI components.

- `public`: Stores static assets like images and other files. See the [Vite public directory](https://vitejs.dev/guide/assets.html#the-public-directory) for more info.

## Add Integrations and Deployment

Use the `bun qwik add` command to add integrations such as Cloudflare, Netlify, or Express Server. You can also enable [Static Site Generation (SSG)](https://your-ssg-docs-link.com/).

```shell
bun qwik add
```

## Development

Development mode uses [Vite's development server](https://vitejs.dev/). The `dev` command will enable server-side rendering (SSR) during development.

```shell
npm start # or `bun start`
```

> Note: During development, Vite may request a significant number of `.js` files. This does not represent the production build.

## Preview

The preview command generates a production build of the client modules, builds `src/entry.preview.tsx`, and runs a local server for testing purposes.

```shell
bun preview
```

## Production

The production build generates optimized client and server modules. It also runs a type check on the source code using TypeScript.

```shell
bun build
```
