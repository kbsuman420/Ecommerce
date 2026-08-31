# 1-Year SDE-1 Goal → Month 1 Daily Practice Plan

**Method:** Problem → Struggle (20–30 min) → Hint → Try again → Solution (only if truly stuck) → Implement yourself → Log the pattern.

**Daily time budget:** ~2.5–3 hrs
- 45–60 min DSA
- 60–90 min Backend engineering (use your book-store project / MedConnect / course-platform as the lab)
- 15 min Review log

One rest day per week (day 7). Take it — this is a marathon.

Keep a **pattern notebook** — one entry per DSA problem:
```
Problem: ___
Pattern: ___
Trigger: ___
Brute force: ___
Optimal: ___
Why: ___
```

---

## Week 1 — Arrays, Hashing + REST/DB Foundations

### Day 1
**DSA — Two Sum**
- Understand only: what does a hash lookup give you that a nested loop doesn't?
- Try 20–30 min unassisted.
- Hint 1: What do you need to "remember" as you scan the array?
- Hint 2: For each number, what's the one thing you'd need to have already seen?
- If stuck after 2 hints → read solution → close it → re-implement from memory.

**Backend — REST design audit**
- Open your book-store project's `GET /books` and `POST /books` endpoints (or MedConnect's booking endpoints).
- Problem: does the list endpoint support pagination? Filtering? Sorting?
- Don't watch a REST tutorial — try to design pagination query params yourself first (`?page=`, `?limit=`), then check if your API follows REST conventions for status codes and error shapes.

### Day 2
**DSA — Contains Duplicate**
- Struggle first: how would you detect a repeat in O(n)?
- Hint: same "have I seen this before?" trigger as yesterday.

**Backend — Postgres EXPLAIN**
- Problem: pick one query in your project (e.g., search books by title). Run `EXPLAIN ANALYZE` on it.
- Struggle: is it doing a Seq Scan or Index Scan? Why?
- Only after you've looked at the output yourself, learn what an index does and add one.

### Day 3
**DSA — Valid Anagram**
- Hint: what data structure lets you compare "same characters, same counts" without sorting?
- Try both the sort approach and the count-map approach; compare complexity.

**Backend — Input validation**
- Problem: pick one POST endpoint with no validation. What breaks if you send garbage data?
- Try it with Postman first (empty body, wrong types) before reading about validation libraries.
- Then learn just enough about a schema-validation approach (e.g., Zod/Joi) to fix it.

### Day 4
**DSA — Group Anagrams**
- Hint: what would you use as a HashMap *key* to group words with identical letters?
- Struggle before hint: two words are anagrams — what's true about a sorted version of each?

**Backend — Auth review**
- Problem: in your book-store or Uniself login flow, what exactly is stored in the JWT payload? What happens if the token is stolen?
- Don't learn JWT theory cold — inspect your own token payload (jwt.io) first, then ask "what's wrong with this?"

### Day 5
**DSA — Top K Frequent Elements**
- Hint: first count frequencies (HashMap), then think about what structure gives you the "top K" without a full sort.
- Try a full sort solution first (it's fine), then ask: can I avoid sorting everything?

**Backend — Indexing exercise**
- Problem: add a composite index for a query you actually run often (e.g., search by category + status).
- Struggle: guess which columns should be indexed *before* checking `EXPLAIN` again.

### Day 6
**DSA — Weekly mini review**
- Re-solve Day 1 and Day 4 problems from scratch, no notes, timed.
- If either takes >15 min or you blank, that pattern isn't internalized yet — redo tomorrow morning before Day 7 rest.

**Backend — Small build**
- Ship one real improvement to your project using this week's learning: pagination on one list endpoint + one new index.

### Day 7 — Rest

---

## Week 2 — Two Pointers / Sliding Window + Transactions & Auth

### Day 8
**DSA — Valid Palindrome**
- Hint: two pointers from both ends — what condition lets you move each one?
- Struggle with the string first; don't jump to a library function.

**Backend — Race condition**
- Problem: what happens in your order/purchase flow if two users buy the last copy of a book at the same second?
- Try to reason about it on paper before reading about transactions. Where would the bug actually show up?

### Day 9
**DSA — Two Sum II (sorted array)**
- Hint: how does sorting change the two-pointer strategy vs. Day 1's HashMap approach?
- Compare: when would you pick two pointers over a HashMap?

**Backend — Transactions**
- Problem: wrap your purchase logic in a `BEGIN/COMMIT` transaction. What should happen on failure — partial writes or nothing?
- Try writing the transaction yourself before reading Postgres docs on isolation levels.

### Day 10
**DSA — Longest Substring Without Repeating Characters**
- Hint: sliding window — when do you shrink the window from the left?
- Struggle: what triggers a shrink? (Hint: a repeated character inside the window.)

**Backend — Row locking**
- Problem: does your purchase transaction actually prevent overselling, or just prevent corrupted writes?
- Investigate `SELECT ... FOR UPDATE`. Try to break your own logic first with two concurrent requests (Postman or a script) before reading about locks.

### Day 11
**DSA — Minimum Window Substring** (harder — expect to need hints)
- Try 20 min. This one's genuinely hard — don't feel bad using 2–3 hints.
- Hint 1: sliding window again, but track counts of required characters.
- Hint 2: when does the window become "valid"? When do you try to shrink it?

**Backend — Refresh tokens**
- Problem: what happens in your app when the access token expires mid-session? Reproduce it manually.
- Learn refresh-token rotation only after you've felt the actual problem.

### Day 12
**DSA — Max Consecutive Ones III**
- Hint: sliding window with a "budget" (how many 0s can you flip) — sound familiar from Day 11?
- Notice the pattern repeat: this is the same shrink/grow logic as Minimum Window Substring.

**Backend — Password/session security**
- Problem: are passwords hashed with bcrypt/argon2 in your project? Check the actual stored value.
- If already done, instead audit CORS config and cookie flags (`httpOnly`, `secure`, `sameSite`).

### Day 13
**DSA — Weekly review**
- Re-solve Day 8 and Day 10, no notes, timed.
- Write in your notebook: what's the *common trigger* across all sliding-window problems this week?

**Backend — Small build**
- Ship: transaction + row lock on your purchase flow, or a refresh-token fix — whichever you started.

### Day 14 — Rest

---

## Week 3 — Stacks/Linked Lists + Caching & Node Internals

### Day 15
**DSA — Valid Parentheses**
- Hint: what structure naturally matches "most recent open bracket closes first"?
- Struggle with a few examples by hand before coding.

**Backend — Cache candidate**
- Problem: which endpoint in your project is read-heavy and rarely changes (e.g., book listing, categories)?
- Don't learn Redis commands yet — just identify *why* this endpoint is a caching candidate.

### Day 16
**DSA — Min Stack**
- Hint: how do you track the minimum in O(1) without recomputing it on every pop?
- Struggle: what if you kept a second stack alongside the main one?

**Backend — Cache-aside**
- Problem: implement cache-aside for yesterday's endpoint: check Redis → miss → query Postgres → set Redis with a TTL.
- Try writing the flow in plain English first, then code it.

### Day 17
**DSA — Reverse Linked List**
- Hint: you need three pointers (prev, curr, next) — why can't you reverse with just one?
- Struggle by drawing it on paper before coding.

**Backend — Cache invalidation**
- Problem: when a book's price changes, how does your cached version get updated? Reproduce the bug of *not* invalidating first — see stale data yourself.
- Then fix it (invalidate-on-write).

### Day 18
**DSA — Linked List Cycle**
- Hint: two pointers moving at different speeds — why must a cycle make them meet?
- Try to reason about *why* fast/slow pointers must collide before coding.

**Backend — Node event loop**
- Problem: in one of your Express routes, do a CPU-heavy synchronous task (e.g., a big loop) and watch it block other requests.
- Only after seeing it block, learn why the event loop behaves that way and how to avoid blocking it.

### Day 19
**DSA — Merge Two Sorted Lists**
- Hint: this is like merging two sorted arrays — what changes when you can't index directly?
- Struggle with dummy-node technique before looking it up.

**Backend — Logging**
- Problem: if a request fails in production right now, could you tell why from your logs? Check.
- Add structured request/error logging only after confirming the gap yourself.

### Day 20
**DSA — Weekly review**
- Re-solve Day 15 and Day 17, timed, no notes.

**Backend — Small build**
- Ship: Redis cache-aside + invalidation on one real endpoint.

### Day 21 — Rest

---

## Week 4 — Recursion/Binary Search + Queues & Rate Limiting

### Day 22
**DSA — Binary Search (basic)**
- Hint: what do you do with the middle element to decide which half to discard?
- Implement iteratively first, then recursively.

**Backend — Background job need**
- Problem: does creating an order in your app currently wait for the confirmation email to send? Time it.
- Don't learn queues abstractly — feel the actual latency first.

### Day 23
**DSA — Search in Rotated Sorted Array**
- Hint: one half of the array is always properly sorted — how do you tell which half?
- Struggle before hint: pick a rotated example and trace it by hand.

**Backend — Basic queue**
- Problem: move the email send out of the request path using a simple in-process queue or a job library.
- Try designing it yourself: what happens if the worker crashes mid-job? (You don't need a full answer yet — just notice the question.)

### Day 24
**DSA — Fibonacci (recursion → memoization)**
- Hint: draw the recursion tree for `fib(5)` by hand — what's being recomputed?
- Struggle: convert naive recursion to memoized version yourself before reading about DP.

**Backend — Idempotency**
- Problem: if your order-creation request is sent twice (network retry, double-click), does it create two orders?
- Reproduce it, then design a fix (idempotency key) yourself before researching the standard pattern.

### Day 25
**DSA — Climbing Stairs**
- Hint: notice this is structurally identical to yesterday's Fibonacci — same pattern, new wrapper.
- Log this connection in your notebook explicitly.

**Backend — Rate limiting**
- Problem: what stops someone from hammering your login endpoint 1000 times/second right now? (Probably nothing.)
- Try designing a basic limiter yourself (count requests per IP per window) before reading about token-bucket algorithms.

### Day 26
**DSA — Subsets (basic backtracking)**
- Hint: for each element, you make a binary choice — include or exclude. What does that choice tree look like?
- Struggle by listing subsets of `[1,2]` and `[1,2,3]` by hand first.

**Backend — Dead-letter thinking**
- Problem: in your queue from Day 23, what happens if a job fails 5 times in a row? Does it retry forever? Silently vanish?
- Design (on paper) what should happen, before researching dead-letter queues.

### Day 27
**DSA — Month review**
- Re-solve one problem from each week (Two Sum, Longest Substring, Reverse Linked List, Binary Search), timed, no notes.
- Update your pattern notebook: which triggers do you now recognize instantly? Which still need more reps?

**Backend — Ship + document**
- Ship the queue + idempotency + basic rate limiter as a coherent piece.
- Write a short note (for your own resume/portfolio) on the problem you solved and why — this becomes real interview material later.

### Day 28 — Rest / Buffer
- Use this day only if you fell behind. Otherwise, do a light re-read of your pattern notebook.

---

## After Month 1

You'll have:
- ~20 DSA problems internalized across Arrays/Hashing, Two Pointers/Sliding Window, Stacks/Linked Lists, Recursion/Binary Search
- Real backend upgrades shipped to your own projects: pagination, indexing, transactions + row locking, refresh tokens, Redis caching + invalidation, background jobs, idempotency, basic rate limiting

**Month 2 preview** (don't start yet, just so you see the arc): Trees/BFS-DFS + Heaps for DSA, paired with Docker containerization of your stack, basic system-design sketches of your own project (load balancer → API → Redis → Postgres → queue), and your first horizontal-scaling thought experiment ("what breaks at 10x traffic?").

Stick to the loop every day: **Problem → Struggle → Hint → Learn → Build.** Don't let any single day turn into a tutorial-watching day.
