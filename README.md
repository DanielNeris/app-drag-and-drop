
# File Manager Frontend

This is the frontend for the file management system. It allows users to upload, view, and organize files with an intuitive interface.

---

## **Requirements**

- Node.js (>= 18.x)
- Yarn or npm

---

## **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/file-manager-frontend.git
   cd file-manager-frontend
   ```

2. **Configure environment variables:**
   Create a `.env` file based on the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   VITE_API_URL=http://localhost:3333
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

---

## **Running the Application**

- **Development mode:**
  ```bash
  npm run dev
  ```
- **Production build:**
  ```bash
  npm run build
  npm run preview
  ```

---

## **Features**

- **File Uploads:** Drag and drop interface for uploading images and videos.
- **File Organization:** List and manage uploaded files.
- **Shareable Links:** Generate and use shareable links for public file access.
- **Authentication:** User login and registration.

---

## **Folder Structure**

### **Frontend**
```
src/
├── components/       # Reusable UI components
├── contexts/         # Context providers for state management
├── hooks/            # Custom hooks
├── pages/            # Application pages (e.g., Login, Files)
├── services/         # API interaction logic
├── styles/           # Global styles
└── main.tsx          # Application entry point
```

### **Backend**
```
src/
├── db/               # Database schema and migrations
├── routes/           # API route handlers
├── services/         # Business logic
├── utils/            # Utility functions
└── server.ts         # Application entry point
```

---

Now you're ready to run both the API and the frontend! 🎉
