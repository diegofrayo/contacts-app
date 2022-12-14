# contacts-app

App for learning purposes

## Setup

1. Clone the repo: `git clone https://github.com/diegofrayo/contacts-app.git`
1. `cd vanilla-js`
1. Install dependencies: `npm install`
1. Build the project: `npm run build`
1. Start a watcher to compile sass/ts files when any file of these types change: `npm run watch`
1. Open the app on the browser: `npm run dev` or open `public/index.html` using **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**

## Live demo

- Production:  **[demo-contacts-app.vercel.app](https://demo-contacts-app.vercel.app)**
- Development: **[demo-contacts-app-preview.vercel.app](https://demo-contacts-app-preview.vercel.app)**

## Important features

- strategy pattern for data management | **[Example 1](https://github.com/diegofrayo/contacts-app/tree/main/src/modules/data/contacts)** - **[Example 2](https://github.com/diegofrayo/contacts-app/tree/main/src/modules/events-manager)**
- singleton pattern to recreate a simple library to render components inspired in **[React](https://es.reactjs.org/)** | **[Source code](https://github.com/diegofrayo/contacts-app/blob/main/src/lib/ryakt.ts)**
- **[sass](https://sass-lang.com/documentation)** to recreate a small version of **[Tailwind CSS](https://tailwindcss.com/docs/installation)** | **[Source code](https://github.com/diegofrayo/contacts-app/tree/main/src/styles/fw)**
- **[zod](https://github.com/colinhacks/zod)** for models validations
