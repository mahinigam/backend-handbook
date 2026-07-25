import { ProductionMatrixItem } from '../types';

export const productionMatrixData: ProductionMatrixItem[] = [
  {
    topic: 'API Idempotency & Deduplication',
    category: 'API Design & Transactions',
    problem: 'Network retries can execute mutating POST API operations (like payments) multiple times.',
    googleApproach: 'Uses client-provided request ID tokens in gRPC/Protobuf calls with Spanner Paxos atomic commit locks.',
    uberApproach: 'Stores Idempotency Keys in Ringpop/Redis cluster with TTL lock state machine.',
    netflixApproach: 'Uses Zuul Edge Gateway request deduplication filters with Cassandra state storage.',
    stripeApproach: 'Pioneered X-Idempotency-Key HTTP headers with Redis 24-hour response payload caching.',
    startupApproach: 'Uses Redis `SET key val NX EX 60` or PostgreSQL UNIQUE constraint on idempotency_key.',
    keyTradeoff: 'Redis locks are fast but volatile; PostgreSQL UNIQUE constraints are durable but create DB write locks.'
  },
  {
    topic: 'Rate Limiting & Traffic Throttling',
    category: 'Traffic Management',
    problem: 'Sudden traffic spikes or malicious bots can overwhelm backend API microservices.',
    googleApproach: 'Enforces Token Bucket rate limits at Cloud Endpoints edge proxies with global quota servers.',
    uberApproach: 'Uses Redis + Ringpop distributed sliding window rate limiters for rider/driver dispatch APIs.',
    netflixApproach: 'Uses Zuul/Spring Cloud Gateway sliding window rate limiting per API key and client IP.',
    stripeApproach: 'Uses Redis token bucket rate limiting per merchant key with tier-based quota buckets.',
    startupApproach: 'Uses FastAPI `slowapi` extension or simple Redis fixed window counter.',
    keyTradeoff: 'Fixed window is easy to implement but allows 2x burst at window boundaries; Sliding window counter smoothed traffic at higher memory cost.'
  },
  {
    topic: 'Database Scaling & Sharding',
    category: 'Storage Infrastructure',
    problem: 'A single database server runs out of disk I/O, RAM, or connection capacity beyond 1TB data.',
    googleApproach: 'Uses Cloud Spanner (globally distributed relational DB with TrueTime atomic clocks).',
    uberApproach: 'Uses Schemaless (custom key-value storage layer built on top of MySQL nodes).',
    netflixApproach: 'Uses Apache Cassandra for distributed no-single-point-of-failure writes + CockroachDB.',
    stripeApproach: 'Uses sharded PostgreSQL clusters with custom query routing middleware.',
    startupApproach: 'Uses managed PostgreSQL (AWS RDS / Supabase) with read replicas and PgBouncer.',
    keyTradeoff: 'Spanner/Cassandra handle petabytes effortlessly but require abandoning standard SQL joins and ACID semantics (except Spanner).'
  },
  {
    topic: 'Event Streaming & Messaging',
    category: 'Asynchronous Architecture',
    problem: 'Synchronous HTTP microservice calls create tight coupling and cascading system failures.',
    googleApproach: 'Uses Google Cloud Pub/Sub with serverless auto-scaling global message topics.',
    uberApproach: 'Operates massive Apache Kafka clusters streaming trillions of driver location events daily.',
    netflixApproach: 'Streams telemetry and viewing activity through Apache Kafka into Apache Flink real-time analytics.',
    stripeApproach: 'Uses Apache Kafka with strict `acks=all` idempotency for event-driven payment ledger updates.',
    startupApproach: 'Uses RabbitMQ or AWS SQS / Redis Streams for worker queues.',
    keyTradeoff: 'Kafka offers event replayability and high throughput; RabbitMQ offers complex AMQP routing but lower message replay capacity.'
  },
  {
    topic: 'Authentication & Session Management',
    category: 'Security & Identity',
    problem: 'Stateless JWT tokens cannot be revoked, while stateful sessions strain centralized databases.',
    googleApproach: 'Uses short-lived OAuth2 access tokens (5-15 min) with Google Identity Service and Macaroon-style authorization tokens for internal services.',
    uberApproach: 'Uses a custom auth service with short-lived JWTs and a centralized token revocation list stored in Redis for immediate invalidation on account compromise.',
    netflixApproach: 'Uses Zuul edge proxy for token validation and Passport-based identity tokens propagated to all downstream microservices, avoiding repeated auth checks.',
    stripeApproach: 'Uses API keys for merchant authentication and session tokens with hardware security module (HSM) signing for Dashboard sessions; all tokens are logged to an immutable audit trail.',
    startupApproach: 'Uses JWT access tokens (15 min) + refresh tokens (7 days) stored in HTTP-only cookies with Redis-based token blacklisting for logout.',
    keyTradeoff: 'Short-lived JWTs reduce revocation risk but increase auth service load for refresh flows; long-lived tokens are simpler but create security exposure windows.'
  },
  {
    topic: 'Caching Strategy & Invalidation',
    category: 'Performance Optimization',
    problem: 'Database queries become the bottleneck at scale; naive caching leads to stale data, thundering herds, and cache stampedes.',
    googleApproach: 'Uses layered caching: L1 in-process caches (Guava), L2 Memcached clusters, and CDN edge caching. Implements lease-based invalidation to prevent thundering herds.',
    uberApproach: 'Uses Redis Cluster with cache-aside pattern for driver/rider data. Implements dog-pile prevention with Redis locks and pre-warming caches during deployments.',
    netflixApproach: 'Uses EVCache (enhanced Memcached) with zone-aware replication and automatic failover. Implements probabilistic early expiration to prevent stampedes.',
    stripeApproach: 'Uses write-through caching for payment metadata with Redis, coupled with explicit invalidation on payment state transitions to guarantee consistency.',
    startupApproach: 'Uses Redis with cache-aside pattern and reasonable TTLs (60-300s). Implements cache warming on startup and stale-while-revalidate for non-critical data.',
    keyTradeoff: 'Cache-aside is simple but risks stale reads; write-through ensures consistency but doubles write latency. Probabilistic early expiration prevents stampedes but wastes some cache capacity.'
  },
  {
    topic: 'Service Discovery & Load Balancing',
    category: 'Microservice Infrastructure',
    problem: 'In dynamic containerized environments, services scale up/down frequently and IPs change constantly, making static configuration impossible.',
    googleApproach: 'Uses internal DNS-based service discovery with Traffic Director (Envoy-based service mesh) for gRPC load balancing with health checking and outlier detection.',
    uberApproach: 'Built Hyperbahn (TChannel-based service mesh) for service discovery and routing, later migrated to gRPC with client-side load balancing via Ringpop consistent hashing.',
    netflixApproach: 'Pioneered Eureka for service registration/discovery with Ribbon client-side load balancing. Migrated to service mesh with Envoy sidecars for newer services.',
    stripeApproach: 'Uses Consul for service discovery with Envoy proxy sidecars. Implements weighted routing for canary deployments and circuit breaking at the mesh level.',
    startupApproach: 'Uses Kubernetes native service discovery (CoreDNS + kube-proxy) with round-robin load balancing. Adds Nginx Ingress or Traefik for external traffic.',
    keyTradeoff: 'Client-side load balancing (gRPC) reduces proxy hop latency but requires library upgrades across all services; proxy-based (Envoy sidecar) is language-agnostic but adds per-request latency.'
  },
  {
    topic: 'Distributed Tracing & Observability',
    category: 'Operations & Monitoring',
    problem: 'In microservice architectures, a single user request fans out across dozens of services, making debugging failures and latency issues nearly impossible without end-to-end visibility.',
    googleApproach: 'Created Dapper (the original distributed tracing paper). Uses Monarch for metrics, Cloud Trace for spans, and Cloud Logging with structured logs — all correlated by trace ID.',
    uberApproach: 'Built Jaeger (open-sourced, now CNCF project) for distributed tracing. Integrates with M3 (time-series metrics) and custom log aggregation pipelines for full-stack observability.',
    netflixApproach: 'Uses Atlas for real-time metrics dashboards, Mantis for stream processing of telemetry, and custom distributed tracing built into the Zuul/Zuul2 edge proxy layer.',
    stripeApproach: 'Uses Veneur for metrics aggregation with DogStatsD protocol, Lightstep for distributed tracing, and structured JSON logging with per-request trace ID propagation across all Ruby/Go services.',
    startupApproach: 'Uses OpenTelemetry SDK for auto-instrumentation, Grafana for dashboards, Loki for logs, and Tempo for traces. SaaS alternatives: Datadog, New Relic, or Honeycomb.',
    keyTradeoff: 'Self-hosted observability (Prometheus/Grafana/Jaeger) is cost-effective but requires significant operational overhead; SaaS solutions (Datadog) are turnkey but expensive at scale (>$10K/month for mid-tier).'
  },
  {
    topic: 'CI/CD & Deployment Strategy',
    category: 'Developer Productivity',
    problem: 'Manual deployments are error-prone and slow. Without automated testing and progressive rollouts, bad code reaches production and causes outages.',
    googleApproach: 'Uses a monorepo with Blaze/Bazel build system, Forge continuous build, and Borg for deployment. Implements canary analysis with automated rollback based on error rate SLOs.',
    uberApproach: 'Uses a polyrepo model with Buildkite for CI. Implements progressive deployment: 1% canary → 10% → 50% → 100% with automatic rollback on p99 latency regression.',
    netflixApproach: 'Uses Spinnaker (open-sourced) for continuous delivery with red/black (blue/green) deployments. Implements automated canary analysis comparing baseline vs canary metrics.',
    stripeApproach: 'Uses a monorepo with incremental builds. Implements "Deploy Queues" for coordinating multi-service deployments with automated integration tests and staged rollouts.',
    startupApproach: 'Uses GitHub Actions for CI/CD with Docker build, test, and push stages. Deploys to Kubernetes with Helm charts and uses ArgoCD for GitOps-based deployments.',
    keyTradeoff: 'Blue/green deployments waste 2x infrastructure but enable instant rollback; canary deployments are resource-efficient but require sophisticated traffic splitting and metrics analysis.'
  },
  {
    topic: 'Secret Management & Encryption',
    category: 'Security & Compliance',
    problem: 'Hardcoded secrets in code, environment variables, and configuration files create security vulnerabilities and audit failures.',
    googleApproach: 'Uses Tink cryptography library with Cloud KMS for envelope encryption. Secrets are stored in internal Borgmaster configs with automatic rotation and access logging.',
    uberApproach: 'Uses HashiCorp Vault with AppRole authentication for dynamic secret generation. Database credentials are rotated every 24 hours with zero-downtime lease-based access.',
    netflixApproach: 'Uses Lemur for TLS certificate management and custom secret management integrated with Spinnaker deployment pipelines. Implements runtime secret injection, never at build time.',
    stripeApproach: 'Uses HSMs (Hardware Security Modules) for PCI DSS compliance. Implements envelope encryption with automatic key rotation and comprehensive audit logging for all secret access.',
    startupApproach: 'Uses AWS Secrets Manager or GCP Secret Manager with IAM-based access control. For Kubernetes, uses External Secrets Operator to sync cloud secrets into K8s Secrets.',
    keyTradeoff: 'Vault provides maximum flexibility but requires operational expertise; cloud-managed secret services are simpler but create vendor lock-in. HSMs provide highest security but cost $1-5K/month.'
  },
  {
    topic: 'Database Migration & Schema Evolution',
    category: 'Data Management',
    problem: 'Changing database schemas in production with zero downtime is extremely risky — ALTER TABLE locks can block all reads/writes for minutes on large tables.',
    googleApproach: 'Uses online schema change tools that create shadow tables, dual-write during migration, then atomically swap table names. Spanner supports schema changes without downtime natively.',
    uberApproach: 'Uses gh-ost (GitHub Online Schema Migration Tool) for MySQL schema changes. Implements expand/contract pattern: add new column → backfill → migrate reads → drop old column.',
    netflixApproach: 'Uses Cassandra which supports adding columns without locking. For relational databases, implements blue/green schema deployments with dual-write periods.',
    stripeApproach: 'Uses the expand-and-contract pattern rigorously: every migration is backward-compatible, deployed in phases across multiple deploys, with each phase independently rollback-safe.',
    startupApproach: 'Uses Alembic (Python) or Flyway (Java) for versioned migrations. Implements backward-compatible migrations: add nullable columns, backfill with scripts, then add constraints.',
    keyTradeoff: 'Online schema change tools eliminate downtime but double storage during migration; expand/contract is safest but requires multiple coordinated deployments spanning days or weeks.'
  },
  {
    topic: 'Feature Flags & Experimentation',
    category: 'Developer Productivity',
    problem: 'Long-lived feature branches cause merge conflicts, and big-bang releases are risky. Teams need to decouple deployment from feature activation.',
    googleApproach: 'Uses internal experimentation platform that supports A/B testing at massive scale with statistical significance analysis, automatic metric tracking, and gradual rollouts by Google account type.',
    uberApproach: 'Built Piranha (open-sourced) for automatic stale feature flag cleanup. Uses a centralized feature flag service that supports user-level, city-level, and percentage-based targeting.',
    netflixApproach: 'Built and open-sourced Archaius for dynamic configuration. Every feature is behind a feature flag with circuit-breaker integration — if a feature causes errors, the flag automatically disables.',
    stripeApproach: 'Uses internal feature flag system integrated with deploy queues. Every feature flag has a mandatory TTL and owner, with automated alerts when flags exceed their intended lifespan.',
    startupApproach: 'Uses LaunchDarkly, Unleash, or Flagsmith for feature flags. Implements simple boolean flags for kill switches and percentage rollouts for gradual feature launches.',
    keyTradeoff: 'Feature flags provide deployment safety but accumulate technical debt — stale flags clutter code. Companies like Uber/Stripe invest in automated flag cleanup tools to manage this.'
  },
  {
    topic: 'Connection Pooling & Resource Management',
    category: 'Performance Optimization',
    problem: 'Each database connection consumes ~10MB of memory and takes 3-5ms to establish via TCP + TLS handshake. At 1000 RPS, creating per-request connections exhausts database resources.',
    googleApproach: 'Uses Cloud SQL Auth Proxy for managed connection pooling and IAM-based authentication. Internal services use persistent gRPC channels with HTTP/2 multiplexing.',
    uberApproach: 'Uses PgBouncer in transaction-mode pooling in front of PostgreSQL clusters. Maintains pool sizes proportional to CPU cores (2 * cores + 1) per backend worker.',
    netflixApproach: 'Uses connection pooling at the DataSource level (HikariCP for JVM services) with connection validation queries and automatic eviction of stale connections.',
    stripeApproach: 'Uses PgBouncer with custom monitoring that alerts when pool utilization exceeds 70%. Implements connection draining during deployments for zero-downtime rolling restarts.',
    startupApproach: 'Uses SQLAlchemy `create_engine(pool_size=10, max_overflow=20)` with pool pre-ping enabled. Uses PgBouncer when multiple services share the same database.',
    keyTradeoff: 'Transaction-mode pooling maximizes connection reuse but breaks prepared statements and session-level features (LISTEN/NOTIFY, advisory locks). Session-mode is compatible but provides less multiplexing.'
  },
  {
    topic: 'Data Serialization & API Contracts',
    category: 'API Design & Protocols',
    problem: 'As systems grow, incompatible API changes between services cause cascading failures. JSON is human-readable but slow to parse and lacks schema enforcement.',
    googleApproach: 'Uses Protocol Buffers (Protobuf) for all internal communication with strict backward/forward compatibility rules enforced by a central schema registry (buf.build internally).',
    uberApproach: 'Uses Apache Thrift for internal RPC with IDL-defined schemas. Migrated newer services to gRPC/Protobuf. Implements schema evolution rules: never remove fields, only deprecate.',
    netflixApproach: 'Uses JSON for external APIs and Protobuf for internal gRPC communication. Implements schema evolution via API versioning (URL-based) with automatic client SDK generation.',
    stripeApproach: 'Uses JSON for all external APIs with explicit API versioning (date-based: `2023-10-16`). Maintains backward compatibility across 100+ API versions simultaneously using Stripe::APIVersion transforms.',
    startupApproach: 'Uses JSON with Pydantic models for request/response validation. Uses OpenAPI/Swagger for API documentation and client SDK generation.',
    keyTradeoff: 'Protobuf is 3-10x faster than JSON and enforces schema contracts, but requires code generation and is not human-readable. JSON is universal but lacks schema enforcement without additional tooling.'
  },
  {
    topic: 'Background Job Processing',
    category: 'Asynchronous Architecture',
    problem: 'Long-running operations (email sending, image processing, report generation) block request handling threads, causing timeouts and poor user experience.',
    googleApproach: 'Uses Cloud Tasks for managed task queues with automatic retries, rate limiting, and deduplication. Internal systems use Borg-managed worker pools consuming from Pub/Sub.',
    uberApproach: 'Built Cherami (later replaced with Kafka-based Cadence/Temporal) for durable workflow execution. Implements dead-letter queues with automatic retry backoff for failed tasks.',
    netflixApproach: 'Uses Netflix Conductor (open-sourced) for workflow orchestration with JSON-based workflow definitions. Implements compensating transactions for failed multi-step workflows.',
    stripeApproach: 'Uses internal job framework built on Redis-backed queues with exactly-once execution guarantees. Implements idempotent job handlers with Redis-based deduplication.',
    startupApproach: 'Uses Celery with Redis broker for Python backends. Implements task retry with exponential backoff, dead-letter queues, and Flower for monitoring.',
    keyTradeoff: 'Celery/Redis is simple but lacks durability guarantees — Redis OOM can lose jobs. Temporal/Cadence provides durable execution but adds significant operational complexity.'
  },
  {
    topic: 'Log Aggregation & Search',
    category: 'Operations & Monitoring',
    problem: 'Distributed systems generate logs across hundreds of containers. Without centralized aggregation and search, debugging production incidents takes hours instead of minutes.',
    googleApproach: 'Uses Cloud Logging (formerly Stackdriver) with structured JSON logs indexed in real-time. Supports log-based metrics, alerting, and log routing to BigQuery for analytics.',
    uberApproach: 'Uses ELK stack (Elasticsearch, Logstash, Kibana) at massive scale with custom Kafka-based log shipping. Implements log sampling at high-traffic endpoints to control storage costs.',
    netflixApproach: 'Uses Atlas for metrics and a custom log aggregation pipeline feeding into Elasticsearch. Implements tiered log storage: hot (7 days in ES), warm (30 days in S3), cold (90 days in Glacier).',
    stripeApproach: 'Uses structured JSON logging with request-scoped context propagation. Logs are shipped to Splunk with custom dashboards for payment flow debugging and PCI audit compliance.',
    startupApproach: 'Uses Grafana Loki for cost-effective log aggregation (indexes labels only, not full text). Alternatively, uses managed ELK (Elastic Cloud) or Datadog Logs.',
    keyTradeoff: 'Elasticsearch provides powerful full-text search but is expensive to operate at scale (~$5-15K/month for moderate traffic). Loki is 10x cheaper but has limited query capabilities compared to ES.'
  },
  {
    topic: 'Graceful Degradation & Circuit Breaking',
    category: 'Reliability Engineering',
    problem: 'When a downstream dependency fails, requests pile up, threads exhaust, and the failure cascades to the entire system (cascading failure).',
    googleApproach: 'Implements deadline propagation across all gRPC calls — if a request has 2s left in its deadline budget, downstream calls are allocated proportional time budgets, preventing cascading timeouts.',
    uberApproach: 'Uses Hystrix-inspired circuit breakers in Golang services with configurable error rate thresholds. Implements fallback responses (cached data, default values) during circuit-open state.',
    netflixApproach: 'Created Hystrix (now in maintenance mode, successor: Resilience4j). Implements bulkhead pattern: separate thread pools per dependency so one failing service cannot exhaust shared resources.',
    stripeApproach: 'Implements circuit breakers at the HTTP client level with adaptive timeout adjustment based on p99 latency trends. Uses feature flags to quickly disable non-critical features during incidents.',
    startupApproach: 'Uses Python `tenacity` library for retry with exponential backoff and `pybreaker` for circuit breaking. Implements simple timeout-based fallbacks with cached responses.',
    keyTradeoff: 'Thread-pool bulkheads (Hystrix) provide strong isolation but waste resources on idle pools. Semaphore-based isolation is more efficient but provides weaker fault containment.'
  },
  {
    topic: 'Data Replication & Consistency',
    category: 'Distributed Data',
    problem: 'Single-region databases create latency for global users and have no disaster recovery. Multi-region replication introduces consistency challenges — how stale can reads be?',
    googleApproach: 'Cloud Spanner uses TrueTime (GPS + atomic clocks) for externally consistent reads across global regions with <10ms replication lag. Achieves linearizability without sacrificing availability.',
    uberApproach: 'Uses MySQL semi-synchronous replication for critical data (payments) and asynchronous replication for non-critical data (analytics). Accepts eventual consistency for driver location data.',
    netflixApproach: 'Uses Cassandra with tunable consistency: QUORUM writes for critical data, ONE reads for catalog browsing. Accepts that a user might briefly see stale recommendations.',
    stripeApproach: 'Uses synchronous PostgreSQL replication for financial data (zero data loss guarantee). Implements read replicas in each region for read-heavy dashboard queries with <1s staleness.',
    startupApproach: 'Uses AWS RDS with one read replica for read scaling. Implements PostgreSQL streaming replication with automatic failover via AWS Multi-AZ.',
    keyTradeoff: 'Synchronous replication guarantees zero data loss but doubles write latency. Asynchronous replication is faster but can lose committed transactions during failover (RPO > 0).'
  }
];
