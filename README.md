# 📊 Work Tracker - Kanban Board

A clean, minimalist task tracking application with a cyberpunk-inspired design. Perfect for managing work projects, personal goals, and everything in between.

![Tracker Preview](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

- 🎯 **Multiple Projects** - Organize tasks across different projects
- 📋 **Kanban Board** - Visual workflow with To Do, In Progress, and Done columns
- 🏷️ **Rich Task Details** - Track deadlines, priorities, categories, and notes
- 🎨 **Dark Theme** - Eye-friendly cyberpunk aesthetic
- 💾 **Auto-Save** - All data persists in browser localStorage
- 📱 **Responsive** - Works on desktop, tablet, and mobile
- 🖱️ **Drag & Drop** - Move tasks between columns effortlessly
- ⚡ **No Backend Required** - Pure client-side application

---

## 🚀 Quick Start

### Option 1: Run Locally

1. **Clone the repository**
```bash
git clone https://github.com/YOUR-USERNAME/work-tracker.git
cd work-tracker
```

2. **Start a local server**
```bash
# Using Python (Mac/Linux)
python3 -m http.server 8000

# Using Python (Windows)
python -m http.server 8000

# Using Node.js
npx http-server
```

3. **Open in browser**
```
http://localhost:8000
```

### Option 2: Direct File Access

Simply double-click `index.html` to open in your browser.

---

## 📖 How to Use

### Creating Projects

1. Click **"+ NEW PROJECT"** button in the top-right corner
2. Enter your project name (e.g., "Q1 Goals", "Client Work", "Personal")
3. Click **"Create"**

### Adding Tasks

1. Click **"+ ADD TASK"** within any project
2. Fill in task details:
   - **Task Name** - What needs to be done
   - **Status** - Choose To Do / In Progress / Done
   - **Deadline** - Optional due date
   - **Priority** - High / Medium / Low
   - **Category/Tag** - For organization (e.g., "Finance", "Personal")
   - **Notes** - Additional details
3. Click **"Add Task"**

### Managing Tasks

**Move Tasks Between Columns:**
- **Drag & Drop** - Click and drag tasks to different columns
- **Move Buttons** - Click arrow buttons at the bottom of each task card
  - `→ In Progress` - Move to In Progress
  - `→ Done` - Mark as complete
  - `← To Do` - Move back to To Do

**Delete Tasks:**
- Click the **×** button in the top-right corner of any task card

**Delete Projects:**
- Click the **"DELETE"** button in the project header
- Confirms before deletion (all tasks will be removed)

---

## 🎨 Features Breakdown

### Priority Levels
- 🔴 **High** - Red badge
- 🟡 **Medium** - Yellow badge  
- 🔵 **Low** - Blue badge

### Task Information Displayed
- Task name (bold)
- Category tag (green badge)
- Priority level (color-coded)
- Due date (if set)
- Notes (italic text)
- Quick action buttons

### Kanban Columns
- **To Do** (Red) - Tasks not started
- **In Progress** (Yellow) - Active tasks
- **Done** (Green) - Completed tasks

---

## 💾 Data Storage

- All data is stored in **browser localStorage**
- Data persists between sessions
- Each browser stores its own data
- **Backup tip**: Export your data periodically (use browser dev tools to copy localStorage)

### Data Limitations
- Data is browser-specific (Chrome data ≠ Safari data)
- Clearing browser data will delete your tasks
- Not synced across devices

---

## 🛠️ Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with custom properties
- **Vanilla JavaScript** - Logic and interactivity
- **localStorage API** - Data persistence

No frameworks, no dependencies, no build process!

---

## 📁 Project Structure

```
work-tracker/
├── index.html      # Main HTML structure
├── style.css       # All styling and theme
├── script.js       # Application logic
└── README.md       # This file
```

---

## 🌐 Deploy Your Own

### GitHub Pages (Free Hosting)

1. Fork this repository
2. Go to **Settings → Pages**
3. Select **main** branch as source
4. Your tracker will be live at: `https://YOUR-USERNAME.github.io/work-tracker/`

### Netlify (One-Click Deploy)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag the entire folder
3. Get instant live URL

### Vercel / Render

Similar drag-and-drop deployment available on both platforms.

---

## 🎯 Use Cases

- **Work Projects** - Track client deliverables and internal tasks
- **Job Search** - Manage applications, interviews, and follow-ups
- **Personal Goals** - Organize fitness, learning, or home projects
- **Study Plans** - Track assignments, readings, and exam prep
- **Content Creation** - Plan blog posts, videos, or social media
- **Event Planning** - Coordinate tasks for events or trips

---

## 🔒 Privacy & Security

- ✅ No data sent to external servers
- ✅ No tracking or analytics
- ✅ No account required
- ✅ Runs 100% locally in your browser
- ✅ Your data never leaves your device

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙋 Support

If you encounter issues:
1. Check that JavaScript is enabled in your browser
2. Try a different browser (Chrome, Firefox, Safari, Edge)
3. Clear browser cache and reload
4. Open browser console (F12) to check for errors

---

## 🎨 Customization

Want to change the look? Edit `style.css`:
- Colors are defined in CSS variables at the top
- Change `--accent` for a different theme color
- Modify `--bg-primary` for background color

---

## ⭐ Show Your Support

If you find this tracker useful, give it a ⭐️ on GitHub!

---

**Made with ☕ for productivity enthusiasts**