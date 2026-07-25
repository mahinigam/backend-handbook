import { CompanyInterviewQuestion } from '../types';

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
      firstPrinciplesAnswer: `When designing this system from first principles, we must initially establish the core constraints and requirements. The functional requirements involve handling high throughput and ensuring low latency, while the non-functional requirements dictate high availability, partition tolerance, and strict or eventual consistency depending on the specific use case. \n\nWe start with a simple monolithic architecture to understand the data flow. A single load balancer routing to a web server connected to a relational database provides a baseline. However, as scale increases to millions of concurrent requests, this design bottlenecks at the database layer. \n\nTo address this, we introduce horizontal scaling for the stateless web servers and implement a caching layer using Redis or Memcached to absorb read-heavy traffic. This reduces database load significantly. For write-heavy workloads, we move towards partitioning or sharding the database. \n\nFurthermore, we adopt event-driven architecture utilizing message brokers like Kafka or RabbitMQ. This decouples our services, allowing them to scale independently and providing a buffer for traffic spikes. We choose an asynchronous processing model for tasks that do not require immediate synchronous responses, thereby improving user-perceived latency. \n\nSecurity and compliance are built-in, ensuring data is encrypted at rest and in transit. We implement robust rate limiting to protect against abuse and DDOS attacks. Ultimately, this evolved architecture provides the resilience, scalability, and performance required for a production-grade system.`,
      internalArchitectureExplanation: `Diving into the internal architecture, we must examine the underlying mechanics of our chosen technologies. For instance, in our database selection, understanding how PostgreSQL implements Multi-Version Concurrency Control (MVCC) is crucial. MVCC allows concurrent access to the database without locking, by maintaining multiple versions of data. This means readers do not block writers, and writers do not block readers, which is vital for our high-throughput requirements. \n\nWhen utilizing distributed queues like Kafka, we leverage its append-only log structure and zero-copy mechanics. Kafka bypasses the application layer and copies data directly from the page cache to the network socket, drastically reducing CPU utilization and memory bandwidth. The partitioning strategy in Kafka ensures that messages are distributed across multiple brokers, providing both parallelism and fault tolerance. \n\nFor our caching layer, we employ advanced eviction policies such as LFU (Least Frequently Used) or W-TinyLFU, which outperform traditional LRU by keeping frequently accessed items in the cache even if they haven't been accessed very recently. \n\nIn our distributed storage layer, we utilize consensus algorithms like Raft or Paxos to manage replica state and ensure strong consistency across geographically distributed nodes. This involves leader election, log replication, and safety guarantees that prevent split-brain scenarios and data loss during network partitions. Understanding these low-level primitives empowers us to tune our system for optimal performance and reliability under extreme loads.`,
      codeSnippet: i % 2 === 0 ? `def process_request(request_id: str, data: dict):\n    lock_key = f"lock:req:{request_id}"\n    if not redis.set(lock_key, "1", nx=True, ex=30):\n        raise ResourceLockedError("Request is already being processed")\n    \n    try:\n        if db.get_processed_request(request_id):\n            return db.get_request_result(request_id)\n            \n        result = execute_business_logic(data)\n        \n        with db.transaction():\n            db.save_result(request_id, result)\n            db.mark_processed(request_id)\n            \n        return result\n    finally:\n        redis.delete(lock_key)` : undefined,
      followUpQuestions: [
        "How would you handle a sudden 100x spike in traffic?",
        "What happens if the primary database region goes down?",
        "How can we ensure exactly-once processing in this pipeline?",
        "How would you deploy this change without downtime?"
      ],
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
