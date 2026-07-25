import { RoadmapWeek } from '../types';

export const volume9Roadmap: RoadmapWeek[] = [
  {
    weekNumber: 1,
    volumeReference: 'Volume 1',
    title: 'CPython Internals, Object Model & Descriptors',
    theme: 'Deep dive into Python\'s C-level implementation and advanced object protocols. Understand how variables, references, and attributes are managed.',
    dailyGoals: [
      { day: 1, title: 'CPython Architecture', task: 'Study the CPython compilation pipeline. Inspect bytecode using the `dis` module and understand the evaluation loop in `ceval.c`.' },
      { day: 2, title: 'The Object Model', task: 'Examine `PyObject` and reference counting mechanics. Implement a custom C extension to track object allocation.' },
      { day: 3, title: 'Dunder Methods', task: 'Implement advanced dunder methods (`__new__`, `__getattribute__`, `__dir__`). Build a dynamic proxy class that intercepts attribute access.' },
      { day: 4, title: 'Descriptor Protocol', task: 'Read up on `__get__`, `__set__`, and `__delete__`. Write custom descriptors for strong type enforcement and lazy evaluation.' },
      { day: 5, title: 'Slots and Memory Optimization', task: 'Compare memory footprints of standard classes vs `__slots__`. Refactor a large dataset class to use slots and measure memory savings.' }
    ],
    milestoneProject: 'Build a lightweight ORM using descriptors to map class attributes to database columns with type validation.',
    recommendedResources: [
      { title: 'Fluent Python', type: 'Book', authorOrSource: 'Luciano Ramalho' },
      { title: 'Python Data Model Documentation', type: 'Doc', authorOrSource: 'Python Software Foundation' },
      { title: 'CPython Internals', type: 'Book', authorOrSource: 'Anthony Shaw' }
    ]
  },
  {
    weekNumber: 2,
    volumeReference: 'Volume 1',
    title: 'Decorators, Metaprogramming & Advanced Typing',
    theme: 'Explore dynamic class creation, decorators, and static typing in Python. Master metaprogramming techniques to write DRY and extensible code.',
    dailyGoals: [
      { day: 1, title: 'Function Decorators', task: 'Write parametric decorators and use `functools.wraps`. Implement a retry decorator with exponential backoff.' },
      { day: 2, title: 'Class Decorators', task: 'Create class decorators for auto-registering plugins. Understand the difference between class decorators and metaclasses.' },
      { day: 3, title: 'Metaclasses', task: 'Implement a custom metaclass by overriding `__new__` and `__init__`. Use it to enforce singleton patterns and interface constraints.' },
      { day: 4, title: 'Advanced Typing', task: 'Study `TypeVar`, `Generic`, `Protocol`, and `Callable`. Annotate a complex data processing pipeline with strict types.' },
      { day: 5, title: 'Mypy and Type Checking', task: 'Configure `mypy` for a project. Resolve complex type errors involving structural subtyping and contravariance.' }
    ],
    milestoneProject: 'Develop a dependency injection framework using decorators, metaclasses, and type annotations for auto-wiring.',
    recommendedResources: [
      { title: 'Robust Python', type: 'Book', authorOrSource: 'Patrick Viafore' },
      { title: 'Architecture Patterns with Python', type: 'Book', authorOrSource: 'Harry Percival & Bob Gregory' },
      { title: 'Python Type Hints (PEP 484)', type: 'Doc', authorOrSource: 'Guido van Rossum' }
    ]
  },
  {
    weekNumber: 3,
    volumeReference: 'Volume 1',
    title: 'Memory Management, GC & GIL Mechanics',
    theme: 'Understand how Python manages memory. Explore the Garbage Collector, the Global Interpreter Lock, and how to optimize memory usage.',
    dailyGoals: [
      { day: 1, title: 'Reference Counting', task: 'Analyze cyclic references and how they break reference counting. Use the `sys` module to inspect refcounts.' },
      { day: 2, title: 'Garbage Collection', task: 'Study generational garbage collection in Python. Use the `gc` module to identify memory leaks and unreachable objects.' },
      { day: 3, title: 'The GIL Explained', task: 'Read about the Global Interpreter Lock. Write a CPU-bound multi-threaded script and observe the impact of the GIL.' },
      { day: 4, title: 'Bypassing the GIL', task: 'Use `multiprocessing` to achieve true parallelism. Share data between processes using `Array`, `Value`, and `Manager`.' },
      { day: 5, title: 'Memory Profiling', task: 'Profile memory usage with `tracemalloc` and `memory_profiler`. Optimize a memory-hungry script to use iterators and generators.' }
    ],
    milestoneProject: 'Create a high-performance data processing pipeline using `multiprocessing` that effectively bypasses the GIL and tracks memory usage.',
    recommendedResources: [
      { title: 'High Performance Python', type: 'Book', authorOrSource: 'Micha Gorelick & Ian Ozsvald' },
      { title: 'Understanding the GIL', type: 'Video', authorOrSource: 'David Beazley' },
      { title: 'Python Garbage Collection', type: 'Doc', authorOrSource: 'Python Developer Guide' }
    ]
  },
  {
    weekNumber: 4,
    volumeReference: 'Volume 1',
    title: 'AsyncIO, Concurrency & Performance Profiling',
    theme: 'Master asynchronous programming with AsyncIO. Learn to profile and optimize concurrent IO-bound applications.',
    dailyGoals: [
      { day: 1, title: 'Event Loop Basics', task: 'Understand the AsyncIO event loop. Write basic coroutines using `async` and `await` and schedule tasks.' },
      { day: 2, title: 'Concurrency vs Parallelism', task: 'Compare `asyncio`, `threading`, and `multiprocessing` for IO-bound vs CPU-bound tasks.' },
      { day: 3, title: 'Advanced AsyncIO', task: 'Implement asynchronous context managers and iterators. Handle timeouts and cancellation using `asyncio.wait` and `gather`.' },
      { day: 4, title: 'Async Profiling', task: 'Profile async code using `cProfile` and `Yappi`. Identify blocking calls that are starving the event loop.' },
      { day: 5, title: 'Performance Tuning', task: 'Optimize an async web scraper by tuning connection pools and concurrency limits with `asyncio.Semaphore`.' }
    ],
    milestoneProject: 'Build a highly concurrent asynchronous web crawler that respects rate limits, handles retries, and stores data efficiently.',
    recommendedResources: [
      { title: 'Using Asyncio in Python', type: 'Book', authorOrSource: 'Caleb Hattingh' },
      { title: 'Fear and Awaiting in AsyncIO', type: 'Video', authorOrSource: 'David Beazley' },
      { title: 'AsyncIO documentation', type: 'Doc', authorOrSource: 'Python Software Foundation' }
    ]
  },
  {
    weekNumber: 5,
    volumeReference: 'Volume 2',
    title: 'SOLID Principles & Design Patterns',
    theme: 'Apply object-oriented design principles to Python backend architecture. Learn classical design patterns adapted for dynamic languages.',
    dailyGoals: [
      { day: 1, title: 'Single Responsibility', task: 'Refactor a monolithic class into smaller, focused classes. Write tests to verify isolated responsibilities.' },
      { day: 2, title: 'Open/Closed Principle', task: 'Implement the Strategy and Factory patterns to make a system extensible without modifying existing code.' },
      { day: 3, title: 'Liskov Substitution', task: 'Analyze inheritance hierarchies for LSP violations. Refactor using composition and interfaces (`Protocol`).' },
      { day: 4, title: 'Interface Segregation', task: 'Design focused interfaces for a plugin system. Avoid fat interfaces that force unused method implementations.' },
      { day: 5, title: 'Dependency Inversion', task: 'Invert dependencies in an application by programming to interfaces. Implement a basic IoC container.' }
    ],
    milestoneProject: 'Refactor a poorly designed legacy codebase by applying all five SOLID principles and introducing appropriate design patterns.',
    recommendedResources: [
      { title: 'Clean Architecture', type: 'Book', authorOrSource: 'Robert C. Martin' },
      { title: 'Design Patterns: Elements of Reusable Object-Oriented Software', type: 'Book', authorOrSource: 'Erich Gamma et al.' },
      { title: 'Head First Design Patterns', type: 'Book', authorOrSource: 'Eric Freeman' }
    ]
  },
  {
    weekNumber: 6,
    volumeReference: 'Volume 2',
    title: 'Repository Pattern, Service Layer & DI',
    theme: 'Separate domain logic from infrastructure concerns. Implement the Repository and Service Layer patterns for decoupled architectures.',
    dailyGoals: [
      { day: 1, title: 'Domain Modeling', task: 'Define rich domain models with business logic embedded in entities and value objects.' },
      { day: 2, title: 'The Repository Pattern', task: 'Implement an abstract repository for data access. Write a concrete SQLAlchemy repository implementation.' },
      { day: 3, title: 'The Service Layer', task: 'Create a service layer to orchestrate use cases. Map external requests to domain operations and repositories.' },
      { day: 4, title: 'Unit of Work', task: 'Implement the Unit of Work pattern to manage database transactions and ensure atomicity across operations.' },
      { day: 5, title: 'Dependency Injection', task: 'Wire the domain, repository, and service layers together using a DI framework like `Dependency Injector`.' }
    ],
    milestoneProject: 'Build a modular backend service where the database can be swapped out purely by injecting a different repository implementation.',
    recommendedResources: [
      { title: 'Architecture Patterns with Python', type: 'Book', authorOrSource: 'Harry Percival & Bob Gregory' },
      { title: 'Domain-Driven Design', type: 'Book', authorOrSource: 'Eric Evans' },
      { title: 'Implementing Domain-Driven Design', type: 'Book', authorOrSource: 'Vaughn Vernon' }
    ]
  },
  {
    weekNumber: 7,
    volumeReference: 'Volume 2',
    title: 'Clean/Hexagonal Architecture & DDD',
    theme: 'Master advanced architectural patterns like Ports and Adapters. Dive deeper into Domain-Driven Design concepts like Aggregates and Events.',
    dailyGoals: [
      { day: 1, title: 'Ports and Adapters', task: 'Design primary and secondary ports for a system. Implement HTTP adapters and database adapters.' },
      { day: 2, title: 'Hexagonal Architecture', task: 'Refactor an existing application into a strict Hexagonal architecture. Enforce dependency rules using linters.' },
      { day: 3, title: 'Aggregates', task: 'Identify transaction boundaries in a domain. Design aggregates and enforce consistency rules within them.' },
      { day: 4, title: 'Domain Events', task: 'Implement a basic event bus. Publish domain events from aggregates and handle them asynchronously.' },
      { day: 5, title: 'Event-Driven Architecture', task: 'Integrate a message broker (like RabbitMQ) to distribute domain events to external bounded contexts.' }
    ],
    milestoneProject: 'Architect an e-commerce checkout system using Hexagonal Architecture, with strict separation between domain logic and web frameworks.',
    recommendedResources: [
      { title: 'Clean Architecture', type: 'Book', authorOrSource: 'Robert C. Martin' },
      { title: 'Implementing Domain-Driven Design', type: 'Book', authorOrSource: 'Vaughn Vernon' },
      { title: 'Building Microservices', type: 'Book', authorOrSource: 'Sam Newman' }
    ]
  },
  {
    weekNumber: 8,
    volumeReference: 'Volume 2',
    title: 'Monoliths, Microservices & Advanced API Design',
    theme: 'Evaluate architectural trade-offs between monoliths and microservices. Design robust, versioned, and scalable APIs.',
    dailyGoals: [
      { day: 1, title: 'Monolithic Architecture', task: 'Design a modular monolith. Establish strict boundaries between modules using Python packages and import rules.' },
      { day: 2, title: 'Microservice Extraction', task: 'Identify a bounded context suitable for extraction. Plan the database splitting and data migration strategy.' },
      { day: 3, title: 'REST API Best Practices', task: 'Design a RESTful API with proper HTTP methods, status codes, hypermedia (HATEOAS), and resource naming.' },
      { day: 4, title: 'GraphQL & gRPC', task: 'Compare REST with GraphQL and gRPC. Implement a simple gRPC service using Protocol Buffers and Python.' },
      { day: 5, title: 'API Gateway Pattern', task: 'Design an API Gateway to route requests, handle authentication, and aggregate responses from multiple microservices.' }
    ],
    milestoneProject: 'Design an API contract and architecture document for a system transitioning from a monolithic backend to modular microservices.',
    recommendedResources: [
      { title: 'Microservices Patterns', type: 'Book', authorOrSource: 'Chris Richardson' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' },
      { title: 'REST in Practice', type: 'Book', authorOrSource: 'Jim Webber' }
    ]
  },
  {
    weekNumber: 9,
    volumeReference: 'Volume 3',
    title: 'FastAPI Architecture, ASGI & Pydantic V2',
    theme: 'Master the FastAPI framework. Understand its underlying ASGI server (Uvicorn), routing mechanisms, and data validation with Pydantic V2.',
    dailyGoals: [
      { day: 1, title: 'ASGI and Uvicorn', task: 'Study the ASGI specification. Write a raw ASGI application and run it with Uvicorn to understand request handling.' },
      { day: 2, title: 'FastAPI Routing', task: 'Design a modular FastAPI application using `APIRouter`. Structure the project for scalability and maintainability.' },
      { day: 3, title: 'Pydantic V2 Models', task: 'Create complex Pydantic V2 models with custom validators, nested schemas, and computed fields.' },
      { day: 4, title: 'Dependency Injection', task: 'Utilize FastAPI\'s dependency injection system for database sessions, configuration, and shared logic.' },
      { day: 5, title: 'Exception Handling', task: 'Implement global exception handlers. Standardize API error responses across the entire application.' }
    ],
    milestoneProject: 'Build a robust FastAPI scaffolding project featuring structured routing, Pydantic data validation, and global error handling.',
    recommendedResources: [
      { title: 'FastAPI Documentation', type: 'Doc', authorOrSource: 'Sebastián Ramírez' },
      { title: 'Pydantic V2 Documentation', type: 'Doc', authorOrSource: 'Samuel Colvin' },
      { title: 'ASGI Specification', type: 'Doc', authorOrSource: 'Django Software Foundation' }
    ]
  },
  {
    weekNumber: 10,
    volumeReference: 'Volume 3',
    title: 'Authentication (JWT, OAuth2, RBAC)',
    theme: 'Secure FastAPI applications using modern authentication and authorization protocols. Implement Role-Based Access Control.',
    dailyGoals: [
      { day: 1, title: 'Password Hashing', task: 'Implement secure password hashing using Passlib and bcrypt. Design secure user registration endpoints.' },
      { day: 2, title: 'JWT Authentication', task: 'Generate and validate JSON Web Tokens (JWT). Implement access and refresh token flows securely.' },
      { day: 3, title: 'OAuth2 with FastAPI', task: 'Integrate FastAPI\'s OAuth2 tools. Build a login endpoint that issues tokens compatible with Swagger UI.' },
      { day: 4, title: 'Role-Based Access Control', task: 'Design a middleware or dependency to enforce RBAC. Restrict endpoints based on user roles and permissions.' },
      { day: 5, title: 'Third-Party SSO', task: 'Integrate a third-party SSO provider (e.g., Google or GitHub) using OAuth2 authorization code flow.' }
    ],
    milestoneProject: 'Implement a secure authentication service with JWTs, refresh tokens, and granular role-based endpoint protection in FastAPI.',
    recommendedResources: [
      { title: 'RFC 7519 (JWT)', type: 'RFC', authorOrSource: 'IETF' },
      { title: 'RFC 6749 (OAuth2)', type: 'RFC', authorOrSource: 'IETF' },
      { title: 'OAuth 2.0 in Action', type: 'Book', authorOrSource: 'Justin Richer' }
    ]
  },
  {
    weekNumber: 11,
    volumeReference: 'Volume 3',
    title: 'WebSockets, Streaming & Background Tasks',
    theme: 'Handle real-time communication, data streaming, and asynchronous background processing within FastAPI.',
    dailyGoals: [
      { day: 1, title: 'WebSockets Basics', task: 'Implement a WebSocket endpoint in FastAPI. Handle client connections, disconnections, and message echoing.' },
      { day: 2, title: 'Real-Time Broadcasting', task: 'Build a ConnectionManager to broadcast messages to multiple WebSocket clients simultaneously.' },
      { day: 3, title: 'Streaming Responses', task: 'Implement streaming endpoints using `StreamingResponse`. Stream a large file or dynamic generated data chunk by chunk.' },
      { day: 4, title: 'Server-Sent Events', task: 'Implement SSE (Server-Sent Events) for unidirectional real-time data flow from server to client.' },
      { day: 5, title: 'Background Tasks', task: 'Use FastAPI\'s `BackgroundTasks` for simple async jobs. Integrate Celery or ARQ for robust task queues.' }
    ],
    milestoneProject: 'Develop a real-time chat application with WebSockets and a background task processor that generates chat summaries.',
    recommendedResources: [
      { title: 'FastAPI WebSockets', type: 'Doc', authorOrSource: 'Sebastián Ramírez' },
      { title: 'RFC 6455 (WebSocket)', type: 'RFC', authorOrSource: 'IETF' },
      { title: 'Celery Documentation', type: 'Doc', authorOrSource: 'Ask Solem' }
    ]
  },
  {
    weekNumber: 12,
    volumeReference: 'Volume 3',
    title: 'Testing, Caching & Production Deployment',
    theme: 'Ensure application reliability through comprehensive testing. Optimize performance with caching and prepare for production deployment.',
    dailyGoals: [
      { day: 1, title: 'Pytest and TestClient', task: 'Write unit and integration tests using `pytest` and FastAPI\'s `TestClient`. Mock database interactions.' },
      { day: 2, title: 'Async Testing', task: 'Configure `pytest-asyncio` for testing async endpoints. Use async database drivers in test teardowns.' },
      { day: 3, title: 'Caching Strategies', task: 'Implement in-memory caching and distributed caching with Redis. Use decorators to cache API responses.' },
      { day: 4, title: 'Dockerizing FastAPI', task: 'Write a multi-stage Dockerfile for FastAPI. Optimize the image size and configure for production (gunicorn/uvicorn).' },
      { day: 5, title: 'Production Monitoring', task: 'Integrate Prometheus metrics and OpenTelemetry tracing into the FastAPI application.' }
    ],
    milestoneProject: 'Deploy a fully tested, containerized FastAPI application with Redis caching, Prometheus metrics, and tracing enabled.',
    recommendedResources: [
      { title: 'Python Testing with pytest', type: 'Book', authorOrSource: 'Brian Okken' },
      { title: 'Docker Deep Dive', type: 'Book', authorOrSource: 'Nigel Poulton' },
      { title: 'Prometheus Up & Running', type: 'Book', authorOrSource: 'Brian Brazil' }
    ]
  },
  {
    weekNumber: 13,
    volumeReference: 'Volume 4',
    title: 'Advanced SQL — CTEs, Window Functions, Optimization',
    theme: 'Level up SQL skills with advanced querying techniques and performance optimization strategies.',
    dailyGoals: [
      { day: 1, title: 'Common Table Expressions', task: 'Write recursive CTEs to query hierarchical data (e.g., organizational charts or category trees).' },
      { day: 2, title: 'Window Functions', task: 'Use `OVER`, `PARTITION BY`, `RANK`, and `LEAD/LAG` to calculate running totals and moving averages.' },
      { day: 3, title: 'Execution Plans', task: 'Analyze SQL query execution plans using `EXPLAIN ANALYZE`. Identify bottlenecks like sequential scans.' },
      { day: 4, title: 'Indexing Strategies', task: 'Create B-Tree, Hash, and partial indexes. Understand the impact of index selectivity on query performance.' },
      { day: 5, title: 'Query Optimization', task: 'Rewrite complex, slow queries. Optimize JOINs and minimize subquery execution costs.' }
    ],
    milestoneProject: 'Optimize a provided slow database schema and query set, demonstrating improvements using `EXPLAIN ANALYZE` reports.',
    recommendedResources: [
      { title: 'SQL Performance Explained', type: 'Book', authorOrSource: 'Markus Winand' },
      { title: 'The Art of SQL', type: 'Book', authorOrSource: 'Stephane Faroult' },
      { title: 'PostgreSQL Documentation: EXPLAIN', type: 'Doc', authorOrSource: 'PostgreSQL Global Development Group' }
    ]
  },
  {
    weekNumber: 14,
    volumeReference: 'Volume 4',
    title: 'PostgreSQL Internals — MVCC, WAL, Vacuum',
    theme: 'Understand the internal architecture of PostgreSQL to operate it reliably at scale.',
    dailyGoals: [
      { day: 1, title: 'MVCC Architecture', task: 'Study Multi-Version Concurrency Control. Understand how Postgres handles concurrent transactions without locking.' },
      { day: 2, title: 'Write-Ahead Logging (WAL)', task: 'Explore the WAL mechanism. Configure WAL archiving for point-in-time recovery (PITR).' },
      { day: 3, title: 'Vacuuming and Autovacuum', task: 'Analyze bloat caused by MVCC. Configure autovacuum settings to maintain database health efficiently.' },
      { day: 4, title: 'Transaction Isolation', task: 'Test different isolation levels (Read Committed, Repeatable Read, Serializable) and observe phenomena like phantom reads.' },
      { day: 5, title: 'Replication', task: 'Set up streaming replication between a primary and replica PostgreSQL instance.' }
    ],
    milestoneProject: 'Configure a highly available PostgreSQL cluster with streaming replication, WAL archiving, and tuned autovacuum settings.',
    recommendedResources: [
      { title: 'Database Internals', type: 'Book', authorOrSource: 'Alex Petrov' },
      { title: 'PostgreSQL High Performance', type: 'Book', authorOrSource: 'Gregory Smith' },
      { title: 'PostgreSQL Architecture', type: 'Blog', authorOrSource: 'Interdb.jp' }
    ]
  },
  {
    weekNumber: 15,
    volumeReference: 'Volume 4',
    title: 'Redis Internals — Data Structures, Persistence, Cluster',
    theme: 'Master Redis data structures and understand its persistence and clustering mechanisms for high-performance caching.',
    dailyGoals: [
      { day: 1, title: 'Advanced Data Structures', task: 'Implement rate limiting using Sorted Sets and geospatial queries using Redis GEO features.' },
      { day: 2, title: 'Redis Persistence', task: 'Compare RDB snapshots and AOF (Append Only File). Configure hybrid persistence for optimal safety and performance.' },
      { day: 3, title: 'Memory Optimization', task: 'Analyze Redis memory usage using `MEMORY STATS`. Configure eviction policies (e.g., `allkeys-lru`).' },
      { day: 4, title: 'Redis Sentinel', task: 'Set up Redis Sentinel for high availability and automatic failover in a primary-replica topology.' },
      { day: 5, title: 'Redis Cluster', task: 'Deploy a Redis Cluster. Understand data sharding, hash slots, and horizontal scaling capabilities.' }
    ],
    milestoneProject: 'Build a highly available Redis setup and implement a distributed rate limiter and session store leveraging advanced data structures.',
    recommendedResources: [
      { title: 'Redis in Action', type: 'Book', authorOrSource: 'Josiah L. Carlson' },
      { title: 'Redis Documentation', type: 'Doc', authorOrSource: 'Redis Labs' },
      { title: 'Distributed Systems with Node.js', type: 'Book', authorOrSource: 'Thomas Hunter II' }
    ]
  },
  {
    weekNumber: 16,
    volumeReference: 'Volume 4',
    title: 'MongoDB Internals & Database Selection',
    theme: 'Explore document-oriented databases with MongoDB. Learn how to choose the right database for the right workload.',
    dailyGoals: [
      { day: 1, title: 'Document Modeling', task: 'Design schemaless data models. Understand embedding vs referencing based on access patterns.' },
      { day: 2, title: 'MongoDB Indexes', task: 'Create compound, text, and geospatial indexes in MongoDB. Analyze query performance with `.explain()`.' },
      { day: 3, title: 'Aggregation Framework', task: 'Build complex data transformation pipelines using the MongoDB Aggregation Framework.' },
      { day: 4, title: 'Replica Sets & Sharding', task: 'Understand MongoDB\'s high availability via Replica Sets and horizontal scaling via Sharding.' },
      { day: 5, title: 'Polyglot Persistence', task: 'Analyze architectural scenarios. Design a system that uses Postgres for transactions, Redis for caching, and Mongo for documents.' }
    ],
    milestoneProject: 'Design and implement a multi-database architecture utilizing PostgreSQL, Redis, and MongoDB for specialized workloads.',
    recommendedResources: [
      { title: 'MongoDB: The Definitive Guide', type: 'Book', authorOrSource: 'Shannon Bradshaw' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' },
      { title: 'NoSQL Distilled', type: 'Book', authorOrSource: 'Pramod J. Sadalage' }
    ]
  },
  {
    weekNumber: 17,
    volumeReference: 'Volume 5',
    title: 'Linux Internals & Networking',
    theme: 'Build a strong foundation in Linux systems and networking concepts essential for backend engineers.',
    dailyGoals: [
      { day: 1, title: 'Linux Process Model', task: 'Understand processes, threads, and IPC (Inter-Process Communication). Use `strace` to trace system calls.' },
      { day: 2, title: 'File Systems', task: 'Explore the VFS (Virtual File System), inodes, and file descriptors. Analyze disk I/O performance.' },
      { day: 3, title: 'TCP/IP Stack', task: 'Trace a packet through the OSI model. Understand TCP handshakes, windowing, and congestion control.' },
      { day: 4, title: 'DNS and HTTP', task: 'Manually query DNS using `dig`. Analyze HTTP traffic using `tcpdump` and Wireshark.' },
      { day: 5, title: 'Network Namespaces', task: 'Create and connect Linux network namespaces. Understand the foundation of container networking.' }
    ],
    milestoneProject: 'Write a low-level network monitoring tool in Python using raw sockets to capture and analyze TCP/IP traffic.',
    recommendedResources: [
      { title: 'The Linux Programming Interface', type: 'Book', authorOrSource: 'Michael Kerrisk' },
      { title: 'Systems Performance', type: 'Book', authorOrSource: 'Brendan Gregg' },
      { title: 'TCP/IP Illustrated', type: 'Book', authorOrSource: 'W. Richard Stevens' }
    ]
  },
  {
    weekNumber: 18,
    volumeReference: 'Volume 5',
    title: 'Docker Internals & Production Containers',
    theme: 'Understand how containers work under the hood using namespaces and cgroups. Build production-ready Docker images.',
    dailyGoals: [
      { day: 1, title: 'cgroups and namespaces', task: 'Create a rudimentary container from scratch using `unshare` and `cgroups` in Linux.' },
      { day: 2, title: 'Image Layers', task: 'Analyze Docker image layers. Optimize a Dockerfile to maximize cache utilization and reduce image size.' },
      { day: 3, title: 'Security and Privileges', task: 'Run rootless Docker containers. Understand capabilities and seccomp profiles for container security.' },
      { day: 4, title: 'Docker Compose', task: 'Write a complex `docker-compose.yml` for a multi-service stack with custom networks and volumes.' },
      { day: 5, title: 'Container Orchestration Prep', task: 'Understand the limitations of raw Docker and the need for orchestration systems like Kubernetes.' }
    ],
    milestoneProject: 'Develop an optimized, rootless Docker image for a backend application and deploy it locally with dependent services via Compose.',
    recommendedResources: [
      { title: 'Docker Deep Dive', type: 'Book', authorOrSource: 'Nigel Poulton' },
      { title: 'Container Security', type: 'Book', authorOrSource: 'Liz Rice' },
      { title: 'The Google File System', type: 'Paper', authorOrSource: 'Sanjay Ghemawat' }
    ]
  },
  {
    weekNumber: 19,
    volumeReference: 'Volume 5',
    title: 'Kubernetes Architecture & Production Deployments',
    theme: 'Master Kubernetes architecture and deploy scalable applications to a cluster.',
    dailyGoals: [
      { day: 1, title: 'Cluster Architecture', task: 'Study the Control Plane components (API server, etcd, scheduler, controller manager) and Worker Nodes (kubelet).' },
      { day: 2, title: 'Pods and Deployments', task: 'Write manifests for Pods and Deployments. Configure rolling updates and rollback strategies.' },
      { day: 3, title: 'Services and Ingress', task: 'Expose applications using ClusterIP, NodePort, and LoadBalancer services. Configure an Ingress controller.' },
      { day: 4, title: 'ConfigMaps and Secrets', task: 'Manage configuration and sensitive data dynamically using ConfigMaps and Kubernetes Secrets.' },
      { day: 5, title: 'StatefulSets', task: 'Deploy a stateful application (like a database) using StatefulSets and Persistent Volumes (PV/PVC).' }
    ],
    milestoneProject: 'Deploy a multi-tier application to a local Minikube/Kind cluster with proper Ingress, ConfigMaps, and persistent storage.',
    recommendedResources: [
      { title: 'Kubernetes Up & Running', type: 'Book', authorOrSource: 'Kelsey Hightower' },
      { title: 'Kubernetes in Action', type: 'Book', authorOrSource: 'Marko Luksa' },
      { title: 'The Kubernetes API', type: 'Doc', authorOrSource: 'CNCF' }
    ]
  },
  {
    weekNumber: 20,
    volumeReference: 'Volume 5',
    title: 'Cloud Services (AWS/GCP) & CI/CD',
    theme: 'Leverage cloud provider services and automate deployments using Continuous Integration and Continuous Deployment pipelines.',
    dailyGoals: [
      { day: 1, title: 'IAM & Security', task: 'Configure IAM roles and policies on AWS/GCP adhering to the principle of least privilege.' },
      { day: 2, title: 'Compute & Storage', task: 'Provision EC2/GCE instances and configure S3/GCS buckets. Set up lifecycle policies for storage.' },
      { day: 3, title: 'Infrastructure as Code', task: 'Write Terraform scripts to provision a VPC, subnets, and a managed database (RDS/Cloud SQL).' },
      { day: 4, title: 'CI Pipelines', task: 'Create a GitHub Actions workflow to run linting, testing, and Docker image building on every push.' },
      { day: 5, title: 'CD Pipelines', task: 'Extend the workflow to continuously deploy the built container image to a cloud Kubernetes cluster (EKS/GKE).' }
    ],
    milestoneProject: 'Provision cloud infrastructure using Terraform and implement a fully automated CI/CD pipeline deploying to Kubernetes.',
    recommendedResources: [
      { title: 'Terraform: Up & Running', type: 'Book', authorOrSource: 'Yevgeniy Brikman' },
      { title: 'Infrastructure as Code', type: 'Book', authorOrSource: 'Kief Morris' },
      { title: 'AWS Well-Architected Framework', type: 'Doc', authorOrSource: 'Amazon Web Services' }
    ]
  },
  {
    weekNumber: 21,
    volumeReference: 'Volume 6',
    title: 'Security — OWASP, JWT, OAuth2, Encryption',
    theme: 'Implement robust security practices, mitigate common vulnerabilities, and master modern authentication protocols.',
    dailyGoals: [
      { day: 1, title: 'OWASP Top 10', task: 'Analyze common vulnerabilities like SQL Injection, XSS, and CSRF. Implement mitigations in a web framework.' },
      { day: 2, title: 'Cryptography Basics', task: 'Understand symmetric vs asymmetric encryption, hashing, and salting. Use the `cryptography` library in Python.' },
      { day: 3, title: 'TLS/SSL Deep Dive', task: 'Study the TLS handshake. Generate self-signed certificates and configure a reverse proxy to enforce HTTPS.' },
      { day: 4, title: 'OAuth2 and OIDC', task: 'Implement an OAuth2 authorization server and OpenID Connect for federated identity management.' },
      { day: 5, title: 'Secret Management', task: 'Integrate HashiCorp Vault to manage application secrets dynamically, avoiding hardcoded credentials.' }
    ],
    milestoneProject: 'Audit and secure a vulnerable web application, implementing TLS, robust authentication, and fixing OWASP vulnerabilities.',
    recommendedResources: [
      { title: 'Web Security for Developers', type: 'Book', authorOrSource: 'Malcolm McDonald' },
      { title: 'Real-World Cryptography', type: 'Book', authorOrSource: 'David Wong' },
      { title: 'OAuth 2.0 in Action', type: 'Book', authorOrSource: 'Justin Richer' }
    ]
  },
  {
    weekNumber: 22,
    volumeReference: 'Volume 6',
    title: 'Message Queues — RabbitMQ, Kafka, SQS',
    theme: 'Architect asynchronous and event-driven systems using message brokers and event streaming platforms.',
    dailyGoals: [
      { day: 1, title: 'Message Queue Basics', task: 'Understand point-to-point and pub/sub messaging patterns. Compare AMQP (RabbitMQ) vs log-based (Kafka).' },
      { day: 2, title: 'RabbitMQ Routing', task: 'Implement fanout, direct, and topic exchanges in RabbitMQ using Python (Pika). Handle message acknowledgments.' },
      { day: 3, title: 'Kafka Architecture', task: 'Study Kafka topics, partitions, and consumer groups. Understand the role of ZooKeeper/KRaft.' },
      { day: 4, title: 'Stream Processing', task: 'Write a Kafka producer and a consumer group in Python. Handle partition rebalancing and exactly-once semantics.' },
      { day: 5, title: 'Cloud Queues (SQS/SNS)', task: 'Integrate AWS SQS and SNS for serverless asynchronous messaging and fanout patterns.' }
    ],
    milestoneProject: 'Build an event-driven microservices architecture where services communicate exclusively via RabbitMQ and Kafka.',
    recommendedResources: [
      { title: 'Kafka: The Definitive Guide', type: 'Book', authorOrSource: 'Gwen Shapira' },
      { title: 'Enterprise Integration Patterns', type: 'Book', authorOrSource: 'Gregor Hohpe' },
      { title: 'RabbitMQ in Action', type: 'Book', authorOrSource: 'Alvaro Videla' }
    ]
  },
  {
    weekNumber: 23,
    volumeReference: 'Volume 6',
    title: 'Distributed Systems Theory — CAP, Consensus, CRDTs',
    theme: 'Understand the fundamental theories and trade-offs required to design robust distributed systems.',
    dailyGoals: [
      { day: 1, title: 'CAP Theorem & PACELC', task: 'Analyze the trade-offs between consistency, availability, and partition tolerance in distributed databases.' },
      { day: 2, title: 'Time and Clocks', task: 'Study vector clocks, Lamport timestamps, and physical clock synchronization (NTP, TrueTime) in distributed systems.' },
      { day: 3, title: 'Consensus Algorithms', task: 'Understand Paxos and Raft. Simulate a leader election process and log replication using a Raft visualization.' },
      { day: 4, title: 'Data Replication', task: 'Compare synchronous and asynchronous replication. Study leaderless replication and read repairs (Dynamo-style).' },
      { day: 5, title: 'CRDTs', task: 'Explore Conflict-free Replicated Data Types. Implement a simple counter CRDT in Python.' }
    ],
    milestoneProject: 'Write a design document for a globally distributed key-value store, detailing its replication, clock, and consensus mechanisms.',
    recommendedResources: [
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' },
      { title: 'Dynamo: Amazon Highly Available Key-Value Store', type: 'Paper', authorOrSource: 'Werner Vogels' },
      { title: 'Raft: In Search of an Understandable Consensus Algorithm', type: 'Paper', authorOrSource: 'Diego Ongaro' }
    ]
  },
  {
    weekNumber: 24,
    volumeReference: 'Volume 6',
    title: 'Observability — Logging, Metrics, Tracing, SRE',
    theme: 'Implement comprehensive observability to monitor system health, trace bottlenecks, and apply SRE practices.',
    dailyGoals: [
      { day: 1, title: 'Structured Logging', task: 'Implement structured JSON logging. Aggregate logs centrally using the ELK stack (Elasticsearch, Logstash, Kibana).' },
      { day: 2, title: 'Metrics Collection', task: 'Define SLIs, SLOs, and SLAs. Instrument code to expose RED metrics (Rate, Errors, Duration) via Prometheus.' },
      { day: 3, title: 'Distributed Tracing', task: 'Integrate OpenTelemetry. Propagate trace contexts across microservice boundaries and visualize in Jaeger.' },
      { day: 4, title: 'Alerting', task: 'Configure Prometheus Alertmanager. Define actionable alerts based on SLO burn rates, avoiding alert fatigue.' },
      { day: 5, title: 'Incident Response', task: 'Study Site Reliability Engineering (SRE) practices. Conduct a simulated incident response and write a blameless post-mortem.' }
    ],
    milestoneProject: 'Instrument a microservices application with structured logging, Prometheus metrics, and distributed tracing via OpenTelemetry.',
    recommendedResources: [
      { title: 'Site Reliability Engineering', type: 'Book', authorOrSource: 'Niall Richard Murphy' },
      { title: 'Distributed Systems Observability', type: 'Book', authorOrSource: 'Cindy Sridharan' },
      { title: 'The Google SRE Book', type: 'Book', authorOrSource: 'Betsy Beyer' }
    ]
  },
  {
    weekNumber: 25,
    volumeReference: 'Volume 7',
    title: 'Payment Gateway & Rate Limiter Projects',
    theme: 'Design and implement robust, transactional, and high-performance backend systems focusing on payments and API limits.',
    dailyGoals: [
      { day: 1, title: 'Payment API Design', task: 'Design a REST API for processing payments, supporting idempotency keys to prevent double-charging.' },
      { day: 2, title: 'Transactional Integrity', task: 'Implement distributed transactions or the Saga pattern for a multi-step payment and inventory deduction flow.' },
      { day: 3, title: 'Webhook Handling', task: 'Build a secure webhook receiver for Stripe events. Verify signatures and handle events asynchronously.' },
      { day: 4, title: 'Rate Limiter Design', task: 'Design a scalable rate limiter using Redis (Token Bucket or Sliding Window Log algorithms).' },
      { day: 5, title: 'Rate Limiter Implementation', task: 'Implement the rate limiter as a FastAPI dependency, applying different limits based on user tiers.' }
    ],
    milestoneProject: 'Deliver a production-ready Payment Gateway integration with secure webhooks and a distributed Redis-based rate limiter.',
    recommendedResources: [
      { title: 'Stripe API Documentation', type: 'Doc', authorOrSource: 'Stripe' },
      { title: 'System Design Interview', type: 'Book', authorOrSource: 'Alex Xu' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' }
    ]
  },
  {
    weekNumber: 26,
    volumeReference: 'Volume 7',
    title: 'Collaborative Editor & Task Queue Projects',
    theme: 'Build real-time collaborative applications and robust asynchronous task processing systems.',
    dailyGoals: [
      { day: 1, title: 'Operational Transformation', task: 'Study algorithms for real-time collaboration (OT or CRDTs). Choose an approach for a text editor.' },
      { day: 2, title: 'WebSocket Sync', task: 'Implement a WebSocket server to broadcast document delta updates to connected clients in real-time.' },
      { day: 3, title: 'Task Queue Design', task: 'Design a scalable distributed task queue architecture relying on Redis or RabbitMQ.' },
      { day: 4, title: 'Worker Implementation', task: 'Build robust worker processes that handle retries, dead-letter queues, and graceful shutdowns.' },
      { day: 5, title: 'Job Scheduling', task: 'Implement a cron-like scheduler to trigger recurring background jobs across the worker pool.' }
    ],
    milestoneProject: 'Implement a real-time collaborative text editor backend and a custom distributed task queue framework in Python.',
    recommendedResources: [
      { title: 'Real-Time Collaboration Algorithms', type: 'Paper', authorOrSource: 'Various Authors' },
      { title: 'Designing Distributed Systems', type: 'Book', authorOrSource: 'Brendan Burns' },
      { title: 'Celery Architecture', type: 'Doc', authorOrSource: 'Ask Solem' }
    ]
  },
  {
    weekNumber: 27,
    volumeReference: 'Volume 7',
    title: 'Vector Search & Log Analytics Projects',
    theme: 'Tackle data-intensive backend challenges involving high-dimensional search and massive log ingestion.',
    dailyGoals: [
      { day: 1, title: 'Vector Embeddings', task: 'Generate vector embeddings for text using an open-source model. Store them in a specialized Vector DB (e.g., Pinecone/Milvus).' },
      { day: 2, title: 'Semantic Search API', task: 'Build a FastAPI endpoint that performs K-Nearest Neighbors (KNN) search over embeddings for semantic retrieval.' },
      { day: 3, title: 'Log Ingestion Pipeline', task: 'Design a high-throughput log ingestion pipeline using Kafka to buffer incoming analytical events.' },
      { day: 4, title: 'Stream Aggregation', task: 'Write a Kafka consumer that aggregates log metrics (e.g., error rates per minute) and writes to a time-series database.' },
      { day: 5, title: 'Analytics Dashboard API', task: 'Expose aggregated log metrics via a GraphQL API to power an analytics dashboard.' }
    ],
    milestoneProject: 'Build a semantic search engine using Vector Databases and a high-throughput event logging and aggregation pipeline.',
    recommendedResources: [
      { title: 'Vector Database Internals', type: 'Blog', authorOrSource: 'Milvus Engineering' },
      { title: 'Kafka: The Definitive Guide', type: 'Book', authorOrSource: 'Gwen Shapira' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' }
    ]
  },
  {
    weekNumber: 28,
    volumeReference: 'Volume 7',
    title: 'Flash Sale & Multi-Tenant SaaS Projects',
    theme: 'Solve concurrency challenges at extreme scale and architect secure, multi-tenant B2B applications.',
    dailyGoals: [
      { day: 1, title: 'Flash Sale Concurrency', task: 'Identify bottlenecks during a flash sale. Implement Redis-based distributed locks to prevent inventory overselling.' },
      { day: 2, title: 'Queue-Based Load Leveling', task: 'Absorb flash sale traffic bursts by placing orders into a message queue for asynchronous processing.' },
      { day: 3, title: 'Multi-Tenancy Models', task: 'Compare multi-tenancy architectures: shared database vs isolated schemas vs isolated databases.' },
      { day: 4, title: 'Tenant Routing', task: 'Implement middleware to extract the tenant ID from the request and route database queries dynamically.' },
      { day: 5, title: 'Data Isolation', task: 'Enforce strict data isolation between tenants using Row-Level Security (RLS) in PostgreSQL.' }
    ],
    milestoneProject: 'Architect a flash sale order processing system that handles extreme concurrency, and a multi-tenant SaaS backend with strict data isolation.',
    recommendedResources: [
      { title: 'PostgreSQL Row-Level Security', type: 'Doc', authorOrSource: 'PostgreSQL Global Development Group' },
      { title: 'System Design Interview', type: 'Book', authorOrSource: 'Alex Xu' },
      { title: 'Scaling Instagram Infrastructure', type: 'Video', authorOrSource: 'Lisa Guo' }
    ]
  },
  {
    weekNumber: 29,
    volumeReference: 'Volume 8',
    title: 'System Design Foundations & Google/Amazon Prep',
    theme: 'Prepare for top-tier tech company system design interviews focusing on massive scale and reliability.',
    dailyGoals: [
      { day: 1, title: 'System Design Framework', task: 'Master a structured approach to system design interviews: Requirements, Estimations, High-level, Deep Dive.' },
      { day: 2, title: 'Capacity Estimation', task: 'Practice back-of-the-envelope calculations for storage, bandwidth, and compute requirements.' },
      { day: 3, title: 'Design a URL Shortener', task: 'Architect a bit.ly clone. Focus on hash collisions, database sharding, and caching strategies.' },
      { day: 4, title: 'Design Google Drive', task: 'Architect a scalable file storage service. Discuss block storage, metadata databases, and sync protocols.' },
      { day: 5, title: 'Design an E-commerce Store', task: 'Architect an Amazon-like store. Focus on product search, inventory management, and cart consistency.' }
    ],
    milestoneProject: 'Complete 3 full mock system design interviews focusing on hyper-scale consumer applications (Google/Amazon style).',
    recommendedResources: [
      { title: 'System Design Interview – An Insider\'s Guide', type: 'Book', authorOrSource: 'Alex Xu' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' },
      { title: 'Grokking the System Design Interview', type: 'Doc', authorOrSource: 'Design Gurus' }
    ]
  },
  {
    weekNumber: 30,
    volumeReference: 'Volume 8',
    title: 'Backend Design Deep Dives & Stripe/Uber Prep',
    theme: 'Focus on complex backend architectures, financial consistency, and real-time geospatial challenges.',
    dailyGoals: [
      { day: 1, title: 'Design a Payment System', task: 'Architect a Stripe-like payment gateway. Focus on idempotency, distributed transactions, and reconciliation.' },
      { day: 2, title: 'Design a Rate Limiter', task: 'Design a distributed rate limiter. Discuss Token Bucket vs Sliding Window and Redis atomic operations.' },
      { day: 3, title: 'Design Uber/Lyft', task: 'Architect a ride-sharing service. Focus on geospatial indexing (QuadTrees, Geohash) and real-time dispatch.' },
      { day: 4, title: 'Design a Proximity Service', task: 'Design a Yelp-like location search. Optimize geospatial queries and handle highly dense regions.' },
      { day: 5, title: 'API Design Interviews', task: 'Practice designing clean, extensible API contracts for public-facing developer platforms.' }
    ],
    milestoneProject: 'Complete 3 full mock backend design interviews focusing on payments and real-time geospatial tracking (Stripe/Uber style).',
    recommendedResources: [
      { title: 'System Design Interview – Volume 2', type: 'Book', authorOrSource: 'Alex Xu & Sahn Lam' },
      { title: 'Uber Engineering Blog', type: 'Blog', authorOrSource: 'Uber' },
      { title: 'Stripe Engineering Blog', type: 'Blog', authorOrSource: 'Stripe' }
    ]
  },
  {
    weekNumber: 31,
    volumeReference: 'Volume 8',
    title: 'Distributed Systems Questions & Netflix/Databricks Prep',
    theme: 'Tackle hardcore distributed systems problems, streaming analytics, and highly available architectures.',
    dailyGoals: [
      { day: 1, title: 'Design a Message Queue', task: 'Architect a Kafka-like system. Discuss partitions, leader election, and disk I/O optimization.' },
      { day: 2, title: 'Design a Video Streaming Platform', task: 'Architect a Netflix clone. Focus on CDN architecture, video transcoding, and adaptive bitrate streaming.' },
      { day: 3, title: 'Design a Distributed Cache', task: 'Architect a Memcached/Redis clone. Discuss consistent hashing, LRU eviction, and gossip protocols.' },
      { day: 4, title: 'Design a Log Aggregator', task: 'Architect a Datadog-like log aggregator. Discuss inverted indexes, time-series storage, and querying.' },
      { day: 5, title: 'Consensus and Leader Election', task: 'Deep dive into interview questions focusing on Paxos, Raft, and handling split-brain scenarios.' }
    ],
    milestoneProject: 'Complete 3 full distributed systems interviews focusing on data streaming, consensus, and media delivery (Netflix/Databricks style).',
    recommendedResources: [
      { title: 'Netflix Tech Blog', type: 'Blog', authorOrSource: 'Netflix' },
      { title: 'The Google File System', type: 'Paper', authorOrSource: 'Sanjay Ghemawat' },
      { title: 'Designing Data-Intensive Applications', type: 'Book', authorOrSource: 'Martin Kleppmann' }
    ]
  },
  {
    weekNumber: 32,
    volumeReference: 'Volume 8',
    title: 'Mock Interviews, Behavioral Prep & Final Review',
    theme: 'Finalize interview preparation with behavioral questions, resume reviews, and comprehensive mock interviews.',
    dailyGoals: [
      { day: 1, title: 'Behavioral Questions (STAR)', task: 'Prepare stories for "Tell me about a time you..." using the Situation, Task, Action, Result method.' },
      { day: 2, title: 'Leadership Principles', task: 'Map your experiences to Amazon\'s Leadership Principles. Practice delivering concise, impactful answers.' },
      { day: 3, title: 'Coding Interview Review', task: 'Review essential Data Structures and Algorithms specifically tailored for backend engineering roles.' },
      { day: 4, title: 'Full Loop Mock Interview', task: 'Conduct a full 4-hour mock interview loop (Coding, System Design, Behavioral) with a peer.' },
      { day: 5, title: 'Resume & Negotiation', task: 'Finalize backend engineering resume. Review offer negotiation strategies and compensation structures.' }
    ],
    milestoneProject: 'Successfully complete a full 4-5 round mock interview loop and have a polished, interview-ready resume.',
    recommendedResources: [
      { title: 'Cracking the Coding Interview', type: 'Book', authorOrSource: 'Gayle Laakmann McDowell' },
      { title: 'Staff Engineer: Leadership beyond the management track', type: 'Book', authorOrSource: 'Will Larson' },
      { title: 'Amazon Leadership Principles', type: 'Doc', authorOrSource: 'Amazon' }
    ]
  }
];
