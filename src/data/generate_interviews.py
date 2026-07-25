import os
import random

output_file = "/Users/mahinigam/antigravity/Backend-Engineering-Handbook/src/data/volume8_interviews.ts"

companies_data = {
    "Google": {"count": 20, "topics": ["Google Maps real-time traffic", "YouTube video processing pipeline", "Google Docs collaboration", "Spanner TrueTime and external consistency", "distributed cron scheduler", "global load balancer", "search autocomplete", "distributed file system like GFS", "Bigtable clone", "Borg resource scheduler"], "flavor": "Focus on scale (billions of users), distributed systems, Spanner/Bigtable/MapReduce references"},
    "Microsoft": {"count": 15, "topics": ["Active Directory sync", "Azure CosmosDB replication", "Teams real-time chat", "Xbox Live matchmaking", "Office 365 backward compatibility", "Azure Blob Storage", "SQL Server MVCC", "enterprise SSO", "Windows update rollout", "GitHub Copilot backend"], "flavor": "Focus on Azure services, enterprise patterns, backward compatibility"},
    "Amazon": {"count": 20, "topics": ["product recommendation engine", "DynamoDB single-table design", "order processing pipeline", "package tracking system", "AWS Lambda cold start", "SQS exactly-once delivery", "S3 object storage", "Aurora database engine", "shopping cart high availability", "fulfillment center inventory"], "flavor": "Focus on DynamoDB, SQS, Lambda, leadership principles in design"},
    "Stripe": {"count": 20, "topics": ["idempotent payment processing", "ledger system for double-entry accounting", "webhook delivery with exactly-once semantics", "multi-currency exchange rate service", "fraud detection pipeline", "API rate limiting", "subscription billing engine", "PCI compliant card vault", "payout reconciliation", "merchant dashboard analytics"], "flavor": "Focus on financial systems, idempotency, exactly-once, PCI compliance"},
    "Uber": {"count": 15, "topics": ["real-time driver location tracking", "surge pricing algorithm", "ride matching system", "ETA estimation service", "driver payout system", "Uber Eats order state machine", "geospatial index", "H3 grid system", "dispatch service", "rider rating system"], "flavor": "Focus on real-time systems, geospatial, surge pricing, marketplace"},
    "Databricks": {"count": 15, "topics": ["data pipeline orchestration", "Spark query optimizer", "Delta Lake ACID transactions", "ML model serving infrastructure", "stream processing engine", "parquet file metadata", "distributed shuffle", "auto-scaling compute clusters", "data governance policy engine", "notebook collaborative editing"], "flavor": "Focus on data pipelines, Spark, lakehouse, ML infrastructure"},
    "Atlassian": {"count": 15, "topics": ["Jira ticket workflow engine", "Confluence real-time collaboration", "Bitbucket CI/CD pipeline", "Trello board sync", "Atlassian Forge plugin architecture", "eventual consistency in distributed issue tracking", "Jira search using Elasticsearch", "SSO integration", "multi-tenant data isolation", "audit logging service"], "flavor": "Focus on collaboration tools, eventual consistency, plugin architecture"},
    "Netflix": {"count": 15, "topics": ["video transcoding pipeline", "Kafka zero-copy mechanics", "recommendation engine", "chaos engineering framework", "CDN architecture (Open Connect)", "DRM licensing service", "playback telemetry", "microservices circuit breaker", "A/B testing framework", "user profile management"], "flavor": "Focus on streaming, microservices, chaos engineering, content delivery"},
    "Rubrik": {"count": 15, "topics": ["backup/restore scheduling", "data deduplication engine", "ransomware detection", "cloud archival system", "snapshot consistency", "storage tiering", "immutable backups", "VMware vSphere integration", "distributed metadata store", "point-in-time recovery"], "flavor": "Focus on backup/restore, data management, storage systems, deduplication"},
    "OpenAI": {"count": 20, "topics": ["LLM inference serving system", "token-based API rate limiting", "model A/B testing framework", "prompt caching for repeated queries", "GPU cluster scheduler", "RLHF data collection pipeline", "streaming API responses", "embeddings vector database", "model weights distribution", "fine-tuning job queue"], "flavor": "Focus on AI inference serving, GPU scheduling, model serving, API rate limiting"}
}

categories = ['System Design', 'Backend Design', 'Distributed Systems', 'Database Design']
categories_weights = [40, 30, 20, 10]
difficulties = ['Medium', 'Hard', 'Staff']
difficulties_weights = [30, 50, 20]

def get_first_principles():
    return "When designing this system from first principles, we must initially establish the core constraints and requirements. The functional requirements involve handling high throughput and ensuring low latency, while the non-functional requirements dictate high availability, partition tolerance, and strict or eventual consistency depending on the specific use case. \\n\\nWe start with a simple monolithic architecture to understand the data flow. A single load balancer routing to a web server connected to a relational database provides a baseline. However, as scale increases to millions of concurrent requests, this design bottlenecks at the database layer. \\n\\nTo address this, we introduce horizontal scaling for the stateless web servers and implement a caching layer using Redis or Memcached to absorb read-heavy traffic. This reduces database load significantly. For write-heavy workloads, we move towards partitioning or sharding the database. \\n\\nFurthermore, we adopt event-driven architecture utilizing message brokers like Kafka or RabbitMQ. This decouples our services, allowing them to scale independently and providing a buffer for traffic spikes. We choose an asynchronous processing model for tasks that do not require immediate synchronous responses, thereby improving user-perceived latency. \\n\\nSecurity and compliance are built-in, ensuring data is encrypted at rest and in transit. We implement robust rate limiting to protect against abuse and DDOS attacks. Ultimately, this evolved architecture provides the resilience, scalability, and performance required for a production-grade system."

def get_internal_architecture():
    return "Diving into the internal architecture, we must examine the underlying mechanics of our chosen technologies. For instance, in our database selection, understanding how PostgreSQL implements Multi-Version Concurrency Control (MVCC) is crucial. MVCC allows concurrent access to the database without locking, by maintaining multiple versions of data. This means readers do not block writers, and writers do not block readers, which is vital for our high-throughput requirements. \\n\\nWhen utilizing distributed queues like Kafka, we leverage its append-only log structure and zero-copy mechanics. Kafka bypasses the application layer and copies data directly from the page cache to the network socket, drastically reducing CPU utilization and memory bandwidth. The partitioning strategy in Kafka ensures that messages are distributed across multiple brokers, providing both parallelism and fault tolerance. \\n\\nFor our caching layer, we employ advanced eviction policies such as LFU (Least Frequently Used) or W-TinyLFU, which outperform traditional LRU by keeping frequently accessed items in the cache even if they haven't been accessed very recently. \\n\\nIn our distributed storage layer, we utilize consensus algorithms like Raft or Paxos to manage replica state and ensure strong consistency across geographically distributed nodes. This involves leader election, log replication, and safety guarantees that prevent split-brain scenarios and data loss during network partitions. Understanding these low-level primitives empowers us to tune our system for optimal performance and reliability under extreme loads."

def get_code_snippet():
    return """```python
def process_request(request_id: str, data: dict):
    # Idempotent processing using a distributed lock and state check.
    lock_key = f\\"lock:req:{request_id}\\"
    if not redis.set(lock_key, \\"1\\", nx=True, ex=30):
        raise ResourceLockedError(\\"Request is already being processed\\")
    
    try:
        # Check if already processed to ensure idempotency
        if db.get_processed_request(request_id):
            return db.get_request_result(request_id)
            
        # Perform complex business logic
        result = execute_business_logic(data)
        
        # Persist result transactionally
        with db.transaction():
            db.save_result(request_id, result)
            db.mark_processed(request_id)
            
        return result
    finally:
        redis.delete(lock_key)
```"""

def generate_questions():
    questions = []
    for company, data in companies_data.items():
        count = data['count']
        topics = data['topics']
        flavor = data['flavor']
        
        for i in range(count):
            topic = topics[i % len(topics)]
            title = f"Design {topic}" if "Design" not in topic and "Explain" not in topic else topic
            if i >= len(topics):
                title = f"{title} (Part {i//len(topics) + 1})"
                
            category = random.choices(categories, weights=categories_weights)[0]
            difficulty = random.choices(difficulties, weights=difficulties_weights)[0]
            
            question = {
                "id": f"interview-{company.lower()}-{i+1}",
                "company": company,
                "title": title,
                "category": category,
                "difficulty": difficulty,
                "problemStatement": f"The candidate is asked to {title.lower()}. The system must handle immense scale characteristic of {company}. It needs to support millions of concurrent users and provide low latency. The solution should align with {company}'s specific challenges: {flavor}.",
                "firstPrinciplesAnswer": get_first_principles(),
                "internalArchitectureExplanation": get_internal_architecture(),
                "followUpQuestions": [
                    "How would you handle a sudden 100x spike in traffic?",
                    "What happens if the primary database region goes down?",
                    "How can we ensure exactly-once processing in this pipeline?",
                    "How would you deploy this change without downtime?"
                ],
                "interviewerRatingCriteria": {
                    "juniorPass": "Identifies basic components and data models. Can draw a simple monolithic or basic microservices diagram.",
                    "seniorPass": "Addresses scalability bottlenecks. Chooses appropriate database and caching layers. Understands tradeoffs.",
                    "staffPass": "Dives deep into internal mechanics (e.g., MVCC, consensus). Discusses advanced deployment, monitoring, and failure recovery."
                }
            }
            
            if random.random() < 0.4:
                question["codeSnippet"] = get_code_snippet()
                
            questions.append(question)
    return questions

def write_typescript(questions):
    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    ts_code = "import { CompanyInterviewQuestion } from '../types';\\n\\n"
    ts_code += "export const volume8Interviews: CompanyInterviewQuestion[] = [\\n"
    
    for q in questions:
        ts_code += "  {\\n"
        ts_code += f"    id: '{q['id']}',\\n"
        ts_code += f"    company: '{q['company']}',\\n"
        ts_code += f"    title: `{q['title']}`,\\n"
        ts_code += f"    category: '{q['category']}',\\n"
        ts_code += f"    difficulty: '{q['difficulty']}',\\n"
        ts_code += f"    problemStatement: `{q['problemStatement']}`,\\n"
        ts_code += f"    firstPrinciplesAnswer: `{q['firstPrinciplesAnswer']}`,\\n"
        ts_code += f"    internalArchitectureExplanation: `{q['internalArchitectureExplanation']}`,\\n"
        
        if "codeSnippet" in q:
            # properly escape the backticks and python code block
            snippet = q['codeSnippet'].replace('`', '\\\\`')
            ts_code += f"    codeSnippet: `{snippet}`,\\n"
            
        ts_code += "    followUpQuestions: [\\n"
        for fq in q['followUpQuestions']:
            ts_code += f"      `{fq}`,\\n"
        ts_code += "    ],\\n"
        ts_code += "    interviewerRatingCriteria: {\\n"
        ts_code += f"      juniorPass: `{q['interviewerRatingCriteria']['juniorPass']}`,\\n"
        ts_code += f"      seniorPass: `{q['interviewerRatingCriteria']['seniorPass']}`,\\n"
        ts_code += f"      staffPass: `{q['interviewerRatingCriteria']['staffPass']}`\\n"
        ts_code += "    }\\n"
        ts_code += "  },\\n"
        
    ts_code += "];\\n"
    
    with open(output_file, "w") as f:
        f.write(ts_code)

if __name__ == "__main__":
    random.seed(42) # For reproducible results
    questions = generate_questions()
    write_typescript(questions)
    print(f"Successfully wrote {len(questions)} questions to {output_file}")
