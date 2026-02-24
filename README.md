# React PostgreSQL Tutorial Manager

A full-stack CRUD application for managing tutorials built with PostgreSQL, Express, React, and Node.js.

  ABOUT:   This project was built following a tutorial from Corbado with additional features and improvements added.

## Features

- Create, read, update, and delete tutorials
- Search tutorials by title
- Publish/unpublish status

### CUSTOM ADDITIONS

- Tutorial count feature - Shows number of loaded tutorials
- Search validation with error messages
- "No results found" feedback
- Clear search button
- Remove All validation - Prompts user when trying to delete from an empty list

## Tech Stack

    Frontend:   React, Vite, Tailwind CSS, React Router
    Backend:   Node.js, Express, Sequelize ORM
    Database:   PostgreSQL

## Installation Notes

### Important: Tailwind CSS Installation

When installing Tailwind CSS, use the explicit version with PostCSS:
```bash
npm install -D tailwindcss@3.4.1 postcss autoprefixer
```

  Why this matters:  
  Ensures PostCSS is explicitly installed (better compatibility)
  Locks Tailwind to v3.4.1 (more stable than v4)
  Avoids version conflicts

  Avoid:  
```bash
npm install -D tailwindcss autoprefixer  # Missing postcss, may cause issues
```

## Troubleshooting

  Tailwind CSS not working:  
  Make sure you installed with: `npm install -D tailwindcss@3.4.1 postcss autoprefixer`
  PostCSS must be explicitly included
  Restart dev server after installation

Based on a tutorial from ([Corbado](https://www.corbado.com/blog/react-express-crud-app-postgresql))