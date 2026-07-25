# Backend Engineering Handbook

A comprehensive, production-grade guide to backend engineering, distributed systems, architecture, and system design, modeled after the engineering practices of Staff Engineers at organizations such as Google, Uber, Netflix, Stripe, and Amazon.

This repository contains a fully static, offline-capable Single Page Application (SPA) built with React, Vite, and Tailwind CSS. The handbook's content is bundled securely into the application at build time, ensuring rapid load times and robust search capabilities without relying on a backend server.

## Handbook Volumes

The handbook is structured into nine deeply technical volumes containing 56 theoretical chapters and over 190 applied engineering exercises:

1. Volume 1: Python for Backend Engineering - Deep dive into GIL, AsyncIO, PyMalloc, descriptors, and metaprogramming.
2. Volume 2: Backend Architecture - Clean/Hexagonal Architecture, Domain-Driven Design, Monoliths vs. Microservices, and API design.
3. Volume 3: FastAPI Deep Dive - Pydantic V2 Rust engine, ASGI internals, Dependency Injection, and production middleware.
4. Volume 4: Databases - PostgreSQL MVCC internals, B-Trees vs. Hash indexes, and Redis event loop architecture.
5. Volume 5: DevOps & Cloud Infrastructure - Kubernetes Deployments, AWS (Aurora, S3, SQS), GCP (Spanner, BigQuery), and OIDC CI/CD.
6. Volume 6: Distributed Systems - Capacity Planning, CDNs, Circuit Breakers, Consistent Hashing, and Vector Clocks.
7. Volume 7: Staff Engineer Projects - 20 full architecture projects detailing system design, database schemas, and scaling strategies.
8. Volume 8: Company Tech Screens - 170 mock interview questions graded against Junior, Senior, and Staff passing criteria.
9. Volume 9: The 12-Month Roadmap - 32 weeks of structured learning with 160 daily goals and milestones.

## Running Locally

The application utilizes standard Node.js tooling.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Navigate to `http://localhost:5173` to explore the handbook.

## Technology Stack
- Frontend Framework: React 18
- Build Tool: Vite
- Styling: Tailwind CSS
- Data Layer: Strictly typed TypeScript modules (`src/data/`)

## Deployment Instructions

As this application relies entirely on static file serving rather than a Node.js backend, it is optimized for deployment to modern static hosting platforms.

**Vercel / Netlify:**
1. Connect this repository to your Vercel or Netlify dashboard.
2. The platform will automatically detect Vite.
3. The platform will execute `npm run build` and deploy the output located in the `/dist` directory. A `vercel.json` configuration file is included to manage client-side routing.

**Local AI Integration:**
The application includes a client-side integration with the Gemini API (via the `@google/genai` SDK) to act as an AI Tutor. To utilize this feature, click the "AI Tutor" button in the application and provide a valid Google AI Studio API key. The key is securely stored in your browser's local storage.

## Modifying Content

All content is strictly typed according to the definitions in `src/types.ts`. To add or modify chapters, edit the respective TypeScript files located in the `src/data/` directory. Running `npm run build` or `npx tsc --noEmit` will validate the content against the defined schemas, ensuring structural integrity prior to runtime.