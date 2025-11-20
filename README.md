# Golden Bean Coffee Website

A simple, playful, and professional coffee shop website built using **HTML**, **CSS**, and **JavaScript**, and deployed with **GitHub Pages**.

This project features:

* A dark theme with **black background**, **gold primary color**, and **white secondary color**
* Smooth fade-in animations
* A clean layout suitable for a modern coffee shop
* A deploy script for managing the **gh-pages** branch

---

## 📁 Project Structure

```
/
├── index.html
├── assets/
│   ├── css/
│   │   └── root.css
│   └── js/
│       └── anim.js
└── deploy.sh
```

---

## 🚀 How to Deploy (GitHub Pages)

This project includes a `deploy.sh` script that:

* Checks if the `gh-pages` branch exists
* Creates it if needed
* Forces `gh-pages` to always match `master`
* Pushes the latest build live

### **Run the deployment script:**

```bash
bash deploy.sh
```

Make sure the script is executable:

```bash
chmod +x deploy.sh
```

---

## 🖥️ Live Demo

After deploying, your site will be available at:

```
[Kindom Coffee Live Demo](https://theekingza.github.io/KingdomCoffee)
```

---

## 🎨 Features

* Gold-on-black modern design
* Smooth scroll animations
* Responsive layout for mobile
* Auto-updating footer year
* Simple navigation

---

## ⚡ Technologies Used

* **HTML5**
* **CSS3** (custom theme + responsive)
* **JavaScript** (animations + UI helpers)
* **GitHub Pages** for hosting

---

## 🧩 How the Animations Work

Animations are powered by:

* `IntersectionObserver` to detect when elements scroll into view
* CSS transitions added dynamically

---

## 📜 License

This project is free to use and modify.

---

## 🙌 Credits

Designed and developed by **Pule Mathikha**.

Feel free to expand this project with new pages, a menu gallery, contact form, or backend integration!
