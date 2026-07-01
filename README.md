# 🍽️ Recipe Finder

A simple beginner-friendly web app that lets you browse recipes by type (pizza, pasta, chicken, etc.) and view full recipe details in a modal popup — built with **HTML, CSS, Bootstrap 5, and vanilla JavaScript**.

Powered by the [Forkify API](https://forkify-api.jonas.io/).

## 🔍 Demo

1. Page loads with **Pizza** recipes shown by default.
2. Click any type button (Pasta, Chicken, Cake, Tacos, etc.) to load recipes for that type.
3. Click any recipe card to open a popup with full details: image, servings, cooking time, ingredients, and a link to the full recipe.

## 🛠️ Built With

- HTML5
- CSS3 (custom styling)
- [Bootstrap 5](https://getbootstrap.com/) (layout, buttons, modal, spinner)
- Vanilla JavaScript (`fetch`, `async/await`, DOM manipulation)
- [Forkify API v2](https://forkify-api.jonas.io/) (recipe data)

## ✨ Features

- 🍕 Browse recipes by type/category
- 🔎 Recipe grid with image, title, and publisher
- 📖 Recipe details in a modal (ingredients, servings, cooking time, source link)
- ⏳ Loading spinners for both the recipe list and the modal
- 📱 Fully responsive (Bootstrap grid)

## 📂 Project Structure

```
recipe-app/
├── index.html    # Page structure (types, recipe grid, modal)
├── style.css     # Custom styling on top of Bootstrap
└── app.js     # Fetching data & rendering UI
```

## 🚀 Getting Started

No build tools or installation needed — it's plain HTML/CSS/JS.

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/recipe-finder.git
   ```
2. Open `index.html` in your browser (or use a live server extension in VS Code).

## 🌐 API Reference

This project uses the [Forkify API](https://forkify-api.jonas.io/):

| Endpoint | Description |
|---|---|
| `GET /api/v2/recipes?search=TYPE` | Search recipes by keyword |
| `GET /api/v2/recipes/:id` | Get full details of one recipe |

> Note: The Forkify API only supports a limited list of search words. See the [supported search phrases](https://forkify-api.jonas.io/phrases.html).

## 📸 Screenshots

<img width="1893" height="860" alt="image" src="https://github.com/user-attachments/assets/70bc9f8e-7133-4ef6-91bb-81255fa8ca28" />


## 📝 License

This project is open source and free to use for learning purposes.
