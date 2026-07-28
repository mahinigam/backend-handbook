import { CompanyInterviewQuestion } from '../types';

const topicAnswer = (company: string, topic: string, flavor: string, difficulty: CompanyInterviewQuestion['difficulty']) => {
  const consistency = topic.match(/payment|ledger|accounting|Spanner|transaction|restore|snapshot|auth|sync/i)
    ? 'strong consistency for the source of truth, with asynchronous projections for read-heavy surfaces'
    : 'bounded staleness for read paths, with idempotent writes and explicit reconciliation jobs';
  const storage = topic.match(/video|transcoding|CDN|YouTube|streaming/i)
    ? 'object storage for large immutable blobs, metadata in a relational or wide-column store, and CDN-aware cache keys'
    : topic.match(/location|traffic|Maps|ETA|surge|matchmaking/i)
      ? 'geospatial indexes, time-windowed event tables, and hot-key protection for dense regions'
      : topic.match(/Spark|Lake|pipeline|stream|ML|GPU|LLM|inference/i)
        ? 'append-only event logs, columnar analytical storage, and separate online-serving materialized views'
        : 'a relational core for invariants, Redis or Memcached for hot reads, and Kafka-backed event streams for fan-out';

  return `Start by separating the user-visible workflow from the correctness boundary for ${topic}. The first design should define the write path, read path, ownership model, and failure semantics before choosing services. For ${company}, the important constraint is ${flavor}; that changes where we spend complexity.

The baseline design uses an API gateway, stateless application workers, a durable primary data store, a cache for hot reads, and an event log for downstream processing. At ${difficulty} difficulty, the key move is to identify which operation must be linearizable and which operations can be eventually consistent. For this prompt, I would use ${consistency}.

The data model should make retries safe. Client-generated idempotency keys, monotonically increasing versions, and immutable event records prevent duplicate work when mobile clients, job workers, or cross-region replication retry after timeouts. The storage layer should use ${storage}.

Scale the system by partitioning around the dominant access pattern: tenant, account, region, object id, or time bucket depending on the workload. Reads should be served from cache or precomputed projections, while writes remain narrow and auditable. Backpressure is mandatory: queues, rate limits, admission control, and degradation modes protect the correctness path during spikes.

A staff-level answer closes with operations: SLOs, saturation metrics, replay plans, schema evolution, privacy controls, disaster recovery, and a migration path from the simple architecture to the partitioned architecture without a flag-day rewrite.`;
};

const topicMechanics = (topic: string) => {
  if (topic.match(/payment|ledger|accounting|exchange|payout|fraud/i)) {
    return `The critical primitive is an append-only financial event log backed by database constraints. A ledger entry should be immutable, double-entry balanced, and linked to an idempotency record. Authorization and capture workflows should use explicit state machines so retries cannot skip states. Reconciliation jobs compare internal ledger state with processor settlement files, while risk scoring runs asynchronously and never mutates historical facts.`;
  }

  if (topic.match(/video|transcoding|CDN|streaming|YouTube/i)) {
    return `The critical primitive is a content pipeline with immutable artifacts. Upload creates a durable object and metadata row, workers transcode into renditions, and manifests point clients to the right bitrate ladder. CDN cache keys must include content version and entitlement state. Hot content benefits from edge prewarming, while cold content relies on object storage and background repair jobs.`;
  }

  if (topic.match(/location|traffic|Maps|ETA|surge|matching|driver/i)) {
    return `The critical primitive is a time-bucketed geospatial stream. Producers send compact location events, ingestion validates freshness and identity, and consumers update geohash or S2-cell indexes. Matching and ETA services read region-local state, while pricing models consume aggregated supply-demand windows. The design must defend against hot cells, stale GPS points, and region failover.`;
  }

  if (topic.match(/Spark|Delta|Lake|pipeline|stream|ML|GPU|LLM|inference|prompt|model/i)) {
    return `The critical primitive is workload isolation. Batch, streaming, and online-serving paths need different latency and cost envelopes. The control plane schedules jobs, tracks lineage, and applies quotas; the data plane executes work close to storage or accelerators. Caches, admission control, and preemption policies protect expensive compute pools from noisy neighbors.`;
  }

  if (topic.match(/collaboration|Docs|Confluence|Trello|chat|Teams|workflow/i)) {
    return `The critical primitive is convergent collaboration state. Realtime sessions need presence, ordering, and conflict handling, while durable storage needs compact checkpoints plus an operation log. WebSocket fan-out should be separated from document authority. Offline clients require version vectors or CRDT/OT-style transforms, plus server-side compaction.`;
  }

  return `The critical primitive is a durable command path with observable asynchronous fan-out. The API validates intent and writes a compact source-of-truth record; workers consume events to update projections, indexes, notifications, and analytics. Kafka-style partitioning gives order within an aggregate, while retry topics and dead-letter queues make failures inspectable.`;
};

const topicFollowUps = (topic: string) => [
  `Which single invariant for ${topic} must never be violated, even during retries or failover?`,
  `What partition key would you choose for ${topic}, and how would you handle the hottest partition?`,
  `Which read model can be stale, and what user-visible contract would you publish for that staleness?`,
  `How would you migrate the first single-region version of ${topic} to multi-region without downtime?`
];

const topicCodeSnippet = (topic: string, includeCode: boolean) => includeCode ? `def handle_command(command_id: str, aggregate_id: str, payload: dict) -> dict:
    """Idempotent command handler sketch for ${topic}."""
    existing = db.fetch_one("select result from idempotency_keys where key = %s", [command_id])
    if existing:
        return existing["result"]

    with db.transaction() as tx:
        version = tx.fetch_value(
            "select version from aggregates where id = %s for update",
            [aggregate_id],
        )
        event = build_domain_event(payload=payload, previous_version=version)
        tx.execute(
            "insert into domain_events(aggregate_id, version, body) values (%s, %s, %s)",
            [aggregate_id, version + 1, event],
        )
        tx.execute(
            "insert into idempotency_keys(key, aggregate_id, result) values (%s, %s, %s)",
            [command_id, aggregate_id, event],
        )

    event_bus.publish("domain.events", event)
    return event` : undefined;

const generateMockQuestions = (company: CompanyInterviewQuestion['company'], count: number, startIdx: number, flavor: string, topics: string[]): CompanyInterviewQuestion[] => {
  const result: CompanyInterviewQuestion[] = [];
  const categories: CompanyInterviewQuestion['category'][] = ['System Design', 'Backend Design', 'Distributed Systems', 'Database Design'];
  const difficulties: CompanyInterviewQuestion['difficulty'][] = ['Medium', 'Hard', 'Staff'];

  for (let i = 0; i < count; i++) {
    const topic = topics[i % topics.length];
    const category = categories[i % categories.length];
    const difficulty = difficulties[i % difficulties.length];

    result.push({
      id: `interview-${company.toLowerCase()}-${startIdx + i}`,
      company,
      title: `Design ${topic} (Part ${Math.floor(i / topics.length) + 1})`,
      category,
      difficulty,
      problemStatement: `The candidate is asked to design ${topic}. The system must handle immense scale characteristic of ${company}. It needs to support millions of concurrent users and provide low latency. The solution should align with ${company}'s specific challenges: ${flavor}.`,
      firstPrinciplesAnswer: topicAnswer(company, topic, flavor, difficulty),
      internalArchitectureExplanation: topicMechanics(topic),
      codeSnippet: topicCodeSnippet(topic, i % 2 === 0),
      followUpQuestions: topicFollowUps(topic),
      interviewerRatingCriteria: {
        juniorPass: "Identifies basic components and data models. Can draw a simple monolithic or basic microservices diagram.",
        seniorPass: "Addresses scalability bottlenecks. Chooses appropriate database and caching layers. Understands tradeoffs.",
        staffPass: "Dives deep into internal mechanics (e.g., MVCC, consensus). Discusses advanced deployment, monitoring, and failure recovery."
      }
    });
  }
  return result;
};

export const volume8Interviews: CompanyInterviewQuestion[] = [
  ...generateMockQuestions('Google', 20, 1, 'Focus on scale (billions of users), distributed systems, Spanner/Bigtable/MapReduce references', ["Google Maps real-time traffic", "YouTube video processing pipeline", "Google Docs collaboration", "Spanner TrueTime and external consistency", "distributed cron scheduler"]),
  ...generateMockQuestions('Microsoft', 15, 1, 'Focus on Azure services, enterprise patterns, backward compatibility', ["Active Directory sync", "Azure CosmosDB replication", "Teams real-time chat", "Xbox Live matchmaking", "Office 365 backward compatibility"]),
  ...generateMockQuestions('Amazon', 20, 1, 'Focus on DynamoDB, SQS, Lambda, leadership principles in design', ["product recommendation engine", "DynamoDB single-table design", "order processing pipeline", "package tracking system", "AWS Lambda cold start"]),
  ...generateMockQuestions('Stripe', 20, 1, 'Focus on financial systems, idempotency, exactly-once, PCI compliance', ["idempotent payment processing", "ledger system for double-entry accounting", "webhook delivery with exactly-once semantics", "multi-currency exchange rate service", "fraud detection pipeline"]),
  ...generateMockQuestions('Uber', 15, 1, 'Focus on real-time systems, geospatial, surge pricing, marketplace', ["real-time driver location tracking", "surge pricing algorithm", "ride matching system", "ETA estimation service", "driver payout system"]),
  ...generateMockQuestions('Databricks', 15, 1, 'Focus on data pipelines, Spark, lakehouse, ML infrastructure', ["data pipeline orchestration", "Spark query optimizer", "Delta Lake ACID transactions", "ML model serving infrastructure", "stream processing engine"]),
  ...generateMockQuestions('Atlassian', 15, 1, 'Focus on collaboration tools, eventual consistency, plugin architecture', ["Jira ticket workflow engine", "Confluence real-time collaboration", "Bitbucket CI/CD pipeline", "Trello board sync", "Atlassian Forge plugin architecture"]),
  ...generateMockQuestions('Netflix', 15, 1, 'Focus on streaming, microservices, chaos engineering, content delivery', ["video transcoding pipeline", "Kafka zero-copy mechanics", "recommendation engine", "chaos engineering framework", "CDN architecture (Open Connect)"]),
  ...generateMockQuestions('Rubrik', 15, 1, 'Focus on backup/restore, data management, storage systems, deduplication', ["backup/restore scheduling", "data deduplication engine", "ransomware detection", "cloud archival system", "snapshot consistency"]),
  ...generateMockQuestions('OpenAI', 20, 1, 'Focus on AI inference serving, GPU scheduling, model serving, API rate limiting', ["LLM inference serving system", "token-based API rate limiting", "model A/B testing framework", "prompt caching for repeated queries", "GPU cluster scheduler"])
];
