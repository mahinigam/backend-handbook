import { CompanyInterviewQuestion } from '../types';

export const volume8Interviews: CompanyInterviewQuestion[] = [
  {
    id: 'interview-google-1',
    company: 'Google',
    title: 'Design Google Docs Collaborative Editing',
    category: 'System Design',
    difficulty: 'Staff',
    problemStatement: 'Design the backend for a real-time collaborative text editor like Google Docs. The system must support hundreds of concurrent editors on a single document, maintain sub-50ms latency for character echoes, and resolve edit conflicts deterministically even if a user goes offline for hours and reconnects.',
    firstPrinciplesAnswer: 'At its core, collaborative editing requires a mechanism to ensure eventual consistency across all clients without locking the document. We cannot use standard CRUD operations. The foundational primitive here is Operational Transformation (OT) or Conflict-free Replicated Data Types (CRDTs). We must decouple the immediate client-side application of keystrokes from the server-side authoritative ordering.\n\nA naive design might push full document states over WebSockets, which would consume O(N) bandwidth per keystroke and overwrite concurrent edits. Instead, clients emit delta operations (retain, insert, delete). The server acts as the sequencer. When a client sends an operation, the server assigns it a monotonic sequence number, transforms it against any concurrent operations it has already acknowledged, and broadcasts the transformed operation to all other connected clients.',
    internalArchitectureExplanation: 'The architecture involves three primary layers: the Edge WebSocket terminating layer, the Session Sequencing layer, and the Durable Storage layer.\n\n1. **Edge/Routing:** Users connect to an edge load balancer which routes them to a regional WebSocket server. To ensure all users on the same document talk to the same Sequencer, we use a consistent hashing ring or a dedicated routing tier based on Document ID.\n\n2. **Session Sequencer (The core bottleneck):** For a given document, a single authoritative actor (e.g., an Erlang process or a Go goroutine on a specific node) maintains the in-memory document state and the operation log. It receives operations, transforms them, and broadcasts them. To prevent this node from failing and losing state, it tails an append-only log in a distributed datastore (like Spanner or a custom consensus group).\n\n3. **Storage & Compaction:** Storing every keystroke indefinitely is expensive. Background workers periodically snapshot the document state, storing it in an object store (Blobstore), and truncating the operation log in the database. When a client connects, it fetches the latest snapshot and replays the remaining operations from the log.',
    codeSnippet: `// Simplified CRDT/OT Sequencer Logic
class DocumentSequencer {
    private currentVersion: number = 0;
    private operationLog: Operation[] = [];

    // Invoked when a client sends an operation at a specific base version
    public applyOperation(clientId: string, clientVersion: number, op: Operation): Operation {
        let transformedOp = op;
        
        // Transform against all operations the server saw after the client's version
        for (let i = clientVersion; i < this.operationLog.length; i++) {
            transformedOp = OT.transform(transformedOp, this.operationLog[i]);
        }
        
        this.currentVersion++;
        this.operationLog.push(transformedOp);
        
        // Broadcast the transformed operation to all other connected clients
        this.broadcast(clientId, this.currentVersion, transformedOp);
        
        // Persist to distributed log (async)
        this.appendToSpanner(this.currentVersion, transformedOp);
        
        return transformedOp;
    }
}`,
    followUpQuestions: [
      'How do you handle the "Thundering Herd" problem if a document goes viral (e.g., 100,000 viewers, 10 editors)?',
      'What happens if the Session Sequencer node suffers a hard crash? How is the state recovered without losing acknowledged edits?',
      'How do you scale the WebSocket connection layer independently of the Sequencer layer?'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Identifies the need for WebSockets and mentions OT or CRDTs. Can draw a basic client-server pub/sub diagram.',
      seniorPass: 'Separates the stateful Sequencer from stateless WebSocket connections. Discusses storage compaction (snapshots + logs).',
      staffPass: 'Addresses hot-partition issues for read-heavy viral docs (Pub/Sub fanout). Explains the exact failover mechanics and lease mechanisms for the Sequencer node.'
    }
  },
  {
    id: 'interview-stripe-1',
    company: 'Stripe',
    title: 'Design an Idempotent Payment Ledger',
    category: 'Backend Design',
    difficulty: 'Hard',
    problemStatement: 'Design a high-throughput, double-entry payment ledger. The system must process API requests to transfer funds between accounts. It must guarantee exactly-once processing (no double charges) even if the client retries the exact same request due to a network timeout. The ledger must strictly adhere to ACID properties.',
    firstPrinciplesAnswer: 'In financial systems, correctness outweighs latency. The foundational principle is strict idempotency. Every incoming mutation must be uniquely identifiable by an `Idempotency-Key` provided by the client. We cannot simply check if a transaction exists and then insert it, as concurrent retries would result in a race condition.\n\nThe system must employ an atomic state machine. When a request arrives, we attempt to acquire a distributed lock on the idempotency key, or rely on a database unique constraint. The transaction must be recorded using double-entry accounting (sum of debits and credits equals zero) to ensure systemic consistency. Funds are never "deleted", only moved by appending immutable entries.',
    internalArchitectureExplanation: 'The architecture uses an API Gateway, an Idempotency Engine, and a strongly consistent RDBMS (PostgreSQL).\n\n1. **Idempotency Engine:** We use a fast KV store (like Redis) for immediate lock acquisition. We execute \`SETNX (Idempotency-Key) "IN_PROGRESS"\`. If acquired, we proceed. If it exists and is \`COMPLETED\`, we return the cached response. If \`IN_PROGRESS\`, we return a \`409 Conflict\` (retry later).\n\n2. **The ACID Ledger:** We use a relational database with Serializable or Repeatable Read isolation. The core tables are \`Accounts\` and \`Ledger_Entries\`. A transfer involves beginning a transaction, locking both sender and receiver rows (\`SELECT ... FOR UPDATE\`), verifying balances, inserting two ledger entries (one debit, one credit), updating the account balances, and committing.\n\n3. **Event Emittance:** To trigger downstream systems (webhooks, email receipts) without distributed transactions (2PC), we use the Transactional Outbox pattern. We insert an event into an \`Outbox\` table within the same ACID transaction. A background worker (CDC via Debezium) tails the WAL and pushes the event to Kafka with at-least-once delivery.',
    followUpQuestions: [
      'What happens if the Redis idempotency lock expires before the Postgres transaction finishes?',
      'How do you prevent deadlocks when locking two rows in the Accounts table simultaneously?',
      'How does the Transactional Outbox pattern handle Kafka being temporarily unreachable?'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Understands the concept of idempotency keys. Mentions using a relational database with transactions for the ledger.',
      seniorPass: 'Identifies race conditions and uses SETNX or DB constraints. Explains double-entry accounting and row locking.',
      staffPass: 'Avoids deadlocks via lexicographical lock ordering. Uses the Outbox pattern for downstream events. Understands the difference between MVCC and explicit locking.'
    }
  },
  {
    id: 'interview-uber-1',
    company: 'Uber',
    title: 'Design a Real-Time Geospatial Driver Tracking System',
    category: 'System Design',
    difficulty: 'Staff',
    problemStatement: 'Design a system that tracks the real-time locations of 1 million active drivers. Client apps poll for nearby drivers every 5 seconds. The system must efficiently query drivers within a 5km radius and handle bursty traffic during major events (surge pricing zones).',
    firstPrinciplesAnswer: 'The core challenge is balancing an insanely high write volume (1M drivers * 1 ping / 5 sec = 200k writes/sec) with complex spatial read queries. Standard relational databases with B-Tree indexes will melt under this update rate. We must decouple the ingestion of location points from the geospatial indexing.\n\nThe foundational idea is to convert 2D coordinates (Lat/Lon) into 1D strings using spatial indexing algorithms like Geohash, S2 Cells, or H3. This allows us to group drivers into discrete buckets. By updating buckets in a fast, in-memory store, we transform a complex spatial intersection query into a simple prefix or key lookup.',
    internalArchitectureExplanation: '1. **Ingestion & Stream:** Driver apps send location updates to an API Gateway via WebSockets or UDP. These events are dropped immediately into a partitioned Kafka topic keyed by the driver ID. This acts as a shock absorber.\n\n2. **State Processing:** A stream processor (e.g., Flink) reads the Kafka topic. It calculates the driver\'s current S2 cell or Geohash. It then pushes the updated location to an in-memory data grid (like Redis). We can use Redis Geospatial commands (\`GEOADD\`), but at this scale, it\'s often better to maintain custom Hash Maps where the Key is the Geohash bucket and the Value is a dictionary of Driver IDs to their exact coordinates.\n\n3. **Query Path:** When a rider opens the app, a request hits a Location Service. The service determines the rider\'s Geohash, calculates the 8 surrounding neighbor hashes, and performs an O(1) lookup against the Redis cluster for those 9 keys. It then calculates the exact haversine distance in-memory to filter down to the 5km radius.\n\n4. **Surge & Archival:** The stream processor simultaneously aggregates driver density per cell over 1-minute tumbling windows, writing the aggregates to a time-series database to calculate surge pricing. Raw GPS points are written to cold storage (S3) for ML training and route optimization.',
    followUpQuestions: [
      'How do you handle a "hot" Geohash in Redis, like Times Square on New Year\'s Eve, which exceeds the memory or network capacity of a single Redis node?',
      'If a driver goes through a tunnel and loses GPS for 2 minutes, how does the system handle the sudden jump in location upon reconnecting?',
      'Why might you choose Uber\'s H3 (hexagonal grid) over Geohash (rectangular grid) for this specific problem?'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Suggests using a database with spatial extensions (like PostGIS) and indexing lat/lon.',
      seniorPass: 'Identifies that PostGIS will bottleneck on writes. Introduces Geohash/S2 and an in-memory store like Redis. Uses Kafka for ingestion.',
      staffPass: 'Explains specific partitioning strategies for hot zones (sub-dividing cells). Addresses out-of-order events, stream processing watermarks, and differences between grid systems.'
    }
  },
  {
    id: 'interview-netflix-1',
    company: 'Netflix',
    title: 'Design a Global Video CDN Control Plane',
    category: 'Distributed Systems',
    difficulty: 'Hard',
    problemStatement: 'Design the control plane for a global Content Delivery Network (CDN) similar to Netflix Open Connect. The system must determine which movie files are cached on which edge servers (appliances installed inside ISPs). It must push massive video files efficiently without saturating ISP transit links, and intelligently predict content demand.',
    firstPrinciplesAnswer: 'Unlike a generic CDN (like Cloudflare) which caches content on-the-fly via pull mechanisms (cache misses), a video streaming CDN relies heavily on proactive pushing (pre-positioning). Video files are huge (gigabytes) and predictable. The core principle is intelligent, asynchronous scheduling.\n\nWe cannot rely on a single central database to stream bits. Instead, the control plane acts as a brain, running nightly batch jobs. It looks at regional viewing history, ML models for upcoming releases, and available disk space on edge appliances. It then computes an optimal placement matrix and sends metadata commands to the appliances instructing them to download the files.',
    internalArchitectureExplanation: '1. **Demand Prediction:** Data engineers run daily Spark/Hadoop jobs on viewing logs to generate a "Title Popularity Score" per region (e.g., ASNs or ISP networks).\n\n2. **Placement Engine:** A constraint solver takes the popularity scores, the current state of every edge appliance (reported via a lightweight heartbeat), and the file sizes. It calculates the diff: which files need to be evicted and which need to be added to maximize cache hit ratio locally.\n\n3. **Tiered Distribution (The Cascade):** To avoid saturating the origin (AWS S3) when a new blockbuster drops, we use a tiered fill strategy. The origin seeds the file to a few regional Tier 1 caching layers. The edge appliances then download from the Tier 1 caches, or even peer-to-peer from other appliances within the same ISP. This uses a torrent-like protocol or simple HTTP range requests scheduled during off-peak hours (e.g., 2 AM - 6 AM local time).\n\n4. **Client Routing:** When a user hits play, the Netflix API (Control Plane) looks up the user\'s IP, identifies their ISP, checks the placement database to see which healthy appliance holds the specific rendition of the video, and hands the client a direct URL to that specific edge server.',
    followUpQuestions: [
      'What happens if an edge appliance fails permanently? How does the routing layer adapt instantly?',
      'How do you handle a scenario where an ISP limits peering bandwidth to exactly 10Gbps during the night?',
      'How are cache invalidation and versioning handled if a corrupted video file is inadvertently distributed?'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Describes a standard pull-based CDN (CloudFront style). Mentions caching movies closer to the user.',
      seniorPass: 'Recognizes the need for proactive pushing for large video files. Understands tiered distribution to protect the origin.',
      staffPass: 'Discusses constraint solving for placement, off-peak fill windows, BGP routing/ASN awareness for client steering, and appliance health-checking mechanisms.'
    }
  },
  {
    id: 'interview-amazon-1',
    company: 'Amazon',
    title: 'Design an E-Commerce Shopping Cart',
    category: 'Backend Design',
    difficulty: 'Medium',
    problemStatement: 'Design a highly available shopping cart service for a massive e-commerce platform. Users must be able to add items to their cart even during Black Friday spikes. The system must never lose items added to a cart, though occasionally merging items from multiple devices is acceptable. Read and write latency must be extremely low.',
    firstPrinciplesAnswer: 'In a shopping cart system, Availability (A) is strictly prioritized over Consistency (C) in the CAP theorem. If the database is slightly out of sync, we must still allow the user to add an item, or we lose revenue. \n\nBecause we prioritize availability and partition tolerance, we should use an AP data store, such as a Dynamo-style database (Cassandra or DynamoDB). We cannot use a monolithic RDBMS because a single primary node bottleneck will crash during massive traffic spikes. We need a partitioned, leaderless, or highly-available key-value store where we can always write.',
    internalArchitectureExplanation: '1. **Data Modeling:** The database is a NoSQL KV store. The partition key is the \`SessionID\` or \`UserID\`. The value is a serialized blob of the cart state, or a map of ItemID to Quantity. DynamoDB is perfect for this.\n\n2. **Conflict Resolution:** Since a user might add items from their phone and their laptop simultaneously, or a network partition might cause a split-brain write, we will encounter version conflicts. We use Vector Clocks or let the client resolve conflicts. A simpler approach is to treat the cart as a CRDT (Conflict-free Replicated Data Type), specifically a G-Set (Grow-only Set) or a PN-Counter (Positive-Negative Counter) for item quantities. When reading, the backend merges divergent cart states and returns the union to the user.\n\n3. **Performance Optimization:** We front the database with an API Gateway and stateless microservices. Since writes must be durable and fast, we rely on the NoSQL store\'s fast append mechanisms. For reads, we can cache the cart state in a distributed cache like Redis (with a TTL), invalidating or updating the cache asynchronously upon a write.',
    followUpQuestions: [
      'If the cache (Redis) goes down, how does the system gracefully degrade without overwhelming the primary database?',
      'How do you migrate anonymous session carts to a persistent user cart when the user logs in?',
      'Explain how a vector clock prevents a deleted item from magically reappearing during a merge conflict.'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Designs a CRUD API with a relational database. Caches the cart in Redis.',
      seniorPass: 'Chooses a highly scalable NoSQL database. Understands the difference between AP and CP systems. Explains session migration on login.',
      staffPass: 'Deeply understands conflict resolution. Discusses Vector Clocks vs CRDTs for cart merging. Implements circuit breakers and degradation modes.'
    }
  },
  {
    id: 'interview-databricks-1',
    company: 'Databricks',
    title: 'Design a Distributed Log-Structured Storage Engine',
    category: 'Distributed Systems',
    difficulty: 'Staff',
    problemStatement: 'Design the core storage engine for an append-only distributed event log (similar to Kafka or Apache Pulsar). It must support writing 10 GB/sec across a cluster, guarantee strict ordering within a partition, and allow consumers to read from any offset without impacting write performance.',
    firstPrinciplesAnswer: 'A high-throughput distributed log cannot rely on in-place updates or complex indexing (B-Trees). The core principle is sequential I/O. Disk sequential access (even on SSDs) is orders of magnitude faster than random access. \n\nTo achieve this, the system must act as a pure append-only structure. Incoming messages are buffered in memory and flushed to disk as immutable segments. To decouple the serving of historical data from the ingestion of real-time data, we leverage the OS Page Cache and zero-copy data transfer (\`sendfile\`).',
    internalArchitectureExplanation: '1. **Partitioning & Replication:** Topics are divided into Partitions. Each partition has a designated Leader node. Writes go only to the Leader. The Leader replicates the bytes to Follower nodes using a consensus protocol (like Raft or ISR). The write is acknowledged only when a quorum has persisted the data.\n\n2. **Storage Layout:** A partition is not a single massive file. It is broken down into Segments (e.g., 1GB each). The active segment is append-only. Older segments are immutable and memory-mapped. Each segment is accompanied by an Index file that maps logical offsets to physical byte positions on disk. Since offsets are monotonically increasing, binary search on the index is incredibly fast.\n\n3. **Zero-Copy Reads:** When a consumer requests data starting at offset X, the broker uses \`sendfile()\`. This instructs the OS kernel to DMA copy data directly from the disk (or page cache) to the network socket buffer, completely bypassing the application\'s user-space memory. This eliminates CPU bottlenecks and memory pressure, allowing reads to scale independently of writes.\n\n4. **Tiered Storage:** To maintain infinite retention without infinite expensive local NVMe, older immutable segments are asynchronously moved to an object store (S3). The broker acts as a seamless proxy, fetching from S3 if a consumer requests an ancient offset.',
    followUpQuestions: [
      'Explain the mechanics of the Page Cache and why relying on it is better than managing an in-JVM heap cache for an event log.',
      'How does the system ensure data durability if power is lost immediately after a write is acknowledged?',
      'If a node in the cluster starts experiencing a "gray failure" (very slow disk I/O), how do you prevent it from dragging down the entire cluster\'s write throughput?'
    ],
    interviewerRatingCriteria: {
      juniorPass: 'Understands basic publish/subscribe concepts. Proposes storing events in a database table with an auto-incrementing ID.',
      seniorPass: 'Understands sequential I/O, append-only logs, and the concept of segments and offsets. Explains Leader/Follower replication.',
      staffPass: 'Explains Zero-Copy (\`sendfile\`), Page Cache mechanics, Tiered Storage for infinite retention, and tail-latency mitigation for slow replicas.'
    }
  }
];
