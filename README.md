# Backend Engineering Handbook

A comprehensive guide to backend engineering, distributed systems, architecture, and system design, modeled after the engineering practices of Staff Engineers at organizations such as Google, Uber, Netflix, Stripe, and Amazon.

This repository contains a React, Vite, and Tailwind CSS handbook app with its core content bundled into typed TypeScript modules. It can run locally through the included Express/Vite server, and the production build serves the compiled SPA with optional Gemini-powered tutor endpoints.

## Handbook Volumes

The handbook is structured into nine volumes containing 56 core textbook chapters, 83 applied exercises, 20 production-system project briefs, 170 interview-practice prompts, and a 32-week learning roadmap:

1. Volume 1: Python for Backend Engineering - Deep dive into GIL, AsyncIO, PyMalloc, descriptors, and metaprogramming.
2. Volume 2: Backend Architecture - Clean/Hexagonal Architecture, Domain-Driven Design, Monoliths vs. Microservices, and API design.
3. Volume 3: FastAPI Deep Dive - Pydantic V2 Rust engine, ASGI internals, Dependency Injection, and production middleware.
4. Volume 4: Databases - PostgreSQL MVCC internals, B-Trees vs. Hash indexes, and Redis event loop architecture.
5. Volume 5: DevOps & Cloud Infrastructure - Kubernetes Deployments, AWS (Aurora, S3, SQS), GCP (Spanner, BigQuery), and OIDC CI/CD.
6. Volume 6: Distributed Systems - Capacity Planning, CDNs, Circuit Breakers, Consistent Hashing, and Vector Clocks.
7. Volume 7: Staff Engineer Projects - 20 full architecture projects detailing system design, database schemas, and scaling strategies.
8. Volume 8: Company Tech Screens - 170 structured interview-practice prompts graded against Junior, Senior, and Staff passing criteria.
9. Volume 9: The 8-Month Roadmap - 32 weeks of structured learning with 160 daily goals and milestones.

## Running Locally

The application utilizes standard Node.js tooling.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Navigate to `http://localhost:3000` to explore the handbook.

## Technology Stack
- Frontend Framework: React 19
- Build Tool: Vite
- Styling: Tailwind CSS
- Local Server: Express with Vite middleware in development
- Data Layer: Strictly typed TypeScript modules (`src/data/`)

## Deployment Instructions

The production build emits a Vite SPA and a bundled Express server. It can be deployed as a Node-backed app, or adapted to static hosting if the optional `/api/ai/*` tutor endpoints are removed.

**Vercel / Netlify:**
1. Connect this repository to your Vercel or Netlify dashboard.
2. The platform will automatically detect Vite.
3. The platform will execute `npm run build` and deploy the output located in the `/dist` directory. A `vercel.json` configuration file is included for client-side routing.

**Local AI Integration:**
The application includes a client-side integration with the Gemini API (via the `@google/genai` SDK) to act as an AI Tutor. To utilize this feature, click the "AI Tutor" button in the application and provide a valid Google AI Studio API key. The key is securely stored in your browser's local storage.

## Modifying Content

All content is strictly typed according to the definitions in `src/types.ts`. To add or modify chapters, edit the respective TypeScript files located in the `src/data/` directory. Running `npm run build` or `npx tsc --noEmit` will validate the content against the defined schemas, ensuring structural integrity prior to runtime.
