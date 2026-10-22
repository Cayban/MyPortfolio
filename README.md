# Kim Ivan Ebora — Portfolio

## Run locally

Use Node.js 22.12+ (or 24 LTS). Extract this folder, open a terminal here, and run:

```sh
npm install
npm run dev
```

Production build: `npm run build`. Preview: `npm run preview`.
Configure your web host to serve index.html for client-side routes such as /projects/realm-keeper.

## This update

- Removed the admin page, authentication helpers, and Firestore content editor connection.
- Projects, experience, and certifications now come from src/content.js.
- Existing experience and certification remain visible.
- Added Realm Keeper as the first project with its own responsive detail page, five selectable feature previews, and itch.io links.
- Realm Keeper screenshots are bundled locally from the owner's itch.io listing.
- Kept visitor reviews and the freelance enquiry flow.
- Updated firestore.rules to disable content-management writes. These rules are provided as source only; deploy them through your Firebase project if you want the hosted database rules updated. No remote rules were changed by this archive update.

The source archive excludes node_modules and Git history. Install dependencies once after extracting. The dist folder contains the production build.
