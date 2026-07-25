# The Staff Backend Engineering Handbook

A comprehensive, production-grade guide to backend engineering, distributed systems, architecture, and system design, modeled after the practices of Staff Engineers at companies like Google, Uber, Netflix, Stripe, and Amazon.

This repository is a fully static, offline-capable **Single Page Application (SPA)** built with React, Vite, and Tailwind CSS. The entire handbook content is bundled securely into the application, ensuring blisteringly fast load times and seamless search capabilities without needing a backend.

## 📚 Handbook Volumes

The handbook is divided into 9 deeply technical volumes containing 56 theoretical chapters and over 190 practical applied exercises:

1. **Volume 1: Python for Backend Engineering** - Deep dive into GIL, AsyncIO, PyMalloc, descriptors, and metaprogramming.
2. **Volume 2: Backend Architecture** - Clean/Hexagonal Architecture, DDD, Monoliths vs. Microservices, and API design.
3. **Volume 3: FastAPI Deep Dive** - Pydantic V2 Rust engine, ASGI internals, DI, and production middleware.
4. **Volume 4: Databases** - PostgreSQL MVCC internals, B-Trees vs. Hash indexes, and Redis event loop architecture.
5. **Volume 5: DevOps & Cloud** - K8s Deployments, AWS (Aurora, S3, SQS), GCP (Spanner, BigQuery), and OIDC CI/CD.
6. **Volume 6: Distributed Systems** - Capacity Planning, CDNs, Circuit Breakers, Consistent Hashing, and Vector Clocks.
7. **Volume 7: Staff Engineer Projects** - 20 full architecture projects with diagrams, schemas, and scaling strategies.
8. **Volume 8: Company Tech Screens** - 170 mock interview questions graded for Junior, Senior, and Staff passing criteria.
9. **Volume 9: The 12-Month Roadmap** - 32 weeks of structured learning with 160 daily goals and milestones.

## 🚀 Running Locally

The application uses standard Node.js tooling.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:5173` to explore the handbook.

## 🛠 Tech Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS + Lucide React (Icons)
- **Data Layer:** Strictly typed TypeScript files (`src/data/`)

## 🚢 Deployment (Static Hosting)

Because this app does not require a Node backend to serve API requests (the content is bundled statically), you can deploy it instantly to any static host:

**Vercel / Netlify:**
1. Connect this GitHub repository.
2. The platform will automatically detect Vite.
3. It will run `npm run build` and deploy the `/dist` folder.

**Google Project IDX:**
1. Go to [idx.google.com](https://idx.google.com).
2. Click **Import from GitHub** and paste this repo URL.
3. You can run, edit, and explore the app directly in the cloud with Gemini AI assistance.

## 📝 Modifying Content

All content is heavily strictly typed in `src/types.ts`. To add or modify chapters, edit the respective TypeScript files located in `src/data/`. Running `npm run build` or `npx tsc --noEmit` will instantly validate your new content against the rigid schema, guaranteeing zero rendering errors at runtime.