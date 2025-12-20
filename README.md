# Changelog

Keep track of updates and bug fixes for [kentsitu.com](https://kentsitu.com). General date is used to group small changes together.

### Clean up sections and migrate to Content Collections

_December 20, 2025_

- Update to Next.js 16.0.10.
- Remove Bookmarks section and code.
- Move Changelog to `README.md` file and remove code associating with it.
- Rearrange sidebar to group changelog, contact, and github link together.
- Switch from `Contentlayer` to `Content Collections`.

---

### Move images and videos to R2

_June 28, 2025_

- Move image and video assets to Cloudflare R2 storage.
- Update link and image wrapper component.
- Removed snippets page.

---

### Tailwind 4 and bug fixes

_March 25, 2025_

- Update to Tailwind v4.
- Fix and bring back table of contents feature for Work section.
- Fix home page padding and update dark mode styles.
- Update dynamic og image to display icon.
- Fix copy feature for code snippets, wasn't working.
- Update Contact to use copy instead of opening default mail app.
- Add sonner component from shadcn for copy action.

---

### Update bookmarks page

_February 13, 2025_

- Stop refetching bookmark metadata from API for every user.
- Instead use a script to store metadata in json file.
- Use `husky` to run script when new bookmark is added.

---

### Portfolio 3.0

_February 1, 2025_

Updated to Next.js 15.1.6. Redesigned layout and updated color scheme.
- Refactored repetitive code and removed unused code.
- New layout uses components from shadcn for better state management.
- Added a navigation bar at the top to switch between pages.
- Sidebar now has a toggle to expand and collapse.
- Colors now use css variables for easier theming for light/dark mode (WIP).
- Reorganized content and removed about page.
- Clock moved to upper right with a cool flip animation.
- Building blocks for slides feature (may take a while to complete).

---

### Update work content

_January 23, 2025_

- Add new portfolio piece and slim content down.
- Building blocks for portfolio 3.0.

---

### Added sitemap and updated favicon

_August 23, 2024_

- Added `sitemap.ts` file.
- Fixed sizing issue for favicon.

---

### Bug fix and package manager update

_July 07, 2024_

- Fix infinite scroll bug in Bookmarks tab.
- Change package manager from `npm` to `pnpm`.

---

### Next.js 14

_December 24, 2023_

- Updated from Next.js 13 to 14.
- Fixed some bugs and made content changes.

---

### Table of contents and clock

_July 16, 2023_

- Table of contents now opens with a button, defaults to close.
- Adjusted spacing for sidebar and table of contents.
- Added digital clock and reworded home page.

---

### Dynamic open graph (og) images and infinite scroll

_June 17, 2023_

- Used `@vercel/og` to dynamically populate title and description of Writing post in og image.
- Updated bookmarks page with infinite scroll.

---

### Portfolio 2.0

_May 23, 2023_

Updated to Next.js 13.4 (still some bugs, but usable). Redesigned layout and updated elements.

- Navbar moved to the left side, along with a fixed body area for content - responsive for mobile.
- Design section has expandable tabs (Work & Projects) — experimental feature for now.
- Added fixed table of contents for Work & Project pages.
- Renamed Notes to Writing, Bookmarks and Changelog gets individual tabs, added Snippets tab.
- Bookmarks tab is work in progress.
- Added draft page for work in progress pieces for Writing page.
- Updated button, dark theme, and code block styling.

---

### Added Projects tab and updated styles

_April 14, 20233_

- Added a Projects tab in the navbar to keep work and side projects separate.
- Updated the styling for the navbar and each of its tabs. Made it more consistent across each page.
- Added title of the tab name, along with a short description.

---

### Minor bug fixes and updates

_January 07, 2023_

- Fixed dark mode border bug.
- Fixed hover bug in Safari.
- Fixed home page scroll issue.
- Added video inside iPhone mockup component for `mdx` files.
- Updated Notes page with masonry layout.

---

### Website is live

_January 01, 2023_

Built using Next.js, Tailwind CSS, Typescript, Contentlayer and hosted on Vercel.