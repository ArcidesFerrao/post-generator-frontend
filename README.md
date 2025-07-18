# 📸 Innovante Quote Post Generator

This is a full-stack project that generates quote posts for Instagram using a local LLM (like Gemma) and creates styled images with the Innovante brand. Each post is stored in Firebase for later recall and reuse.

## 🔧 Tech Stack

- **Frontend:** Next.js 14 App Router + Tailwind CSS
- **Backend:** Locally hosted LLM (Gemma:2B)
- **Storage:** Firebase Firestore
- **Utilities:** dom-to-image for post image generation

## 🧠 Features

- 🧾 Generate AI-powered quotes tailored to promote Innovante services
- 🎨 Render beautifully styled quote posts with light/dark themes
- 🧠 Memory: Store and recall previously generated quotes
- 📆 Organized by creation date for easy browsing
- 🔌 Works fully offline with a local LLM

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/ArcidesFerrao/post-generator-frontend.git
cd post-generator-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new project
- Enable Firestore
- Enable Anonymous Auth (or your preferred method)
- Copy your Firebase config and paste it in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 4. Run the local LLM

Ensure you’re running `ollama` with Gemma locally:

```bash
ollama run gemma:2b
```

### 5. Start the development server

```bash
npm run dev
```

---

## 📂 Folder Structure

```
.
├── src/
│   ├── app/           # Next.js pages and routes
│   ├── components/    # Reusable UI components
│   ├── lib/           # Logic for LLM, Firebase, and image generation
│   └── styles/        # Tailwind CSS and global styles
├── public/            # Static files and assets
├── .env.local         # Firebase credentials
├── tailwind.config.js
└── README.md
```

---

## 💡 Future Ideas

- Add sharing directly to Instagram
- Organize posts by category or tags
- Integrate with Innovante Marketplace content planner
- Allow custom user prompts for quote generation

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

### Made by [Arcides Ferrão](https://www.instagram.com/arcidesferrao) for the Innovante Empire
