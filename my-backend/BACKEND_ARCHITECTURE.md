# Backend Architecture & Folder Design Guide
*Designed for the 4-Week SDE-1 Practice Plan & Scalable Modular Backends*

---

## 1. Request Lifecycle & Architecture

The architecture follows a **Modular Layered Design** (Separation of Concerns). Every request passes through well-defined layers:

```
                  ┌───────────────────────────────────────────────┐
                  │          Incoming HTTP Request                │
                  │   (e.g., GET /api/books?page=1&limit=10)      │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │ 1. GLOBAL & ROUTE MIDDLEWARES                                               │
   │    • Request ID / Logging (`requestId.ts`)                                  │
   │    • Rate Limiter (`rateLimiter.ts`)                                        │
   │    • Authentication / Token Verification (`auth.ts`)                        │
   │    • Schema Input Validation (`validate.ts` + Zod Schema)                   │
   └──────────────────────────────────────┬──────────────────────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │ 2. ROUTE DEFINITION (`books.routes.ts`)                                     │
   │    • Maps URL endpoints + HTTP verbs to controller methods                  │
   └──────────────────────────────────────┬──────────────────────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │ 3. CONTROLLER LAYER (`books.controller.ts`)                                 │
   │    • Parses HTTP request (params, query, body, headers)                     │
   │    • Delegates business operations to the Service layer                     │
   │    • Returns standardized HTTP responses and status codes (200, 201, 400)   │
   └──────────────────────────────────────┬──────────────────────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │ 4. SERVICE LAYER (`books.service.ts`)                                       │
   │    • Pure business logic, computations & orchestrations                     │
   │    • Cache lookups (Redis / In-memory cache-aside)                          │
   │    • Atomic database queries & transaction execution                        │
   └──────────────────────────────────────┬──────────────────────────────────────┘
                                          │
                                          ▼
   ┌─────────────────────────────────────────────────────────────────────────────┐
   │ 5. DATABASE & DATA ACCESS LAYER (`src/prisma/db.ts` & `contract.prisma`)    │
   │    • Executes PostgreSQL queries, joins, indexes, row locks (`FOR UPDATE`)  │
   └─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Complete Project Directory Structure

```text
my-backend/
├── src/
│   ├── config/                         # Environment variables and configuration setup
│   │   └── env.ts                      # Validates process.env (JWT secrets, DB url, port, redis url)
│   │
│   ├── middlewares/                    # Shared express middlewares
│   │   ├── auth.ts                     # JWT verification & token extraction (Day 4, 11)
│   │   ├── validate.ts                 # Generic Zod validation middleware (Day 3)
│   │   ├── rateLimiter.ts              # IP/Token sliding-window rate limiter (Day 25)
│   │   ├── requestId.ts                # Attaches X-Request-ID & sets request context (Day 19)
│   │   └── errorHandler.ts             # Centralized error handler with standard JSON format
│   │
│   ├── modules/                        # Feature-driven domain modules
│   │   │
│   │   ├── books/                      # 📚 Books & Variants Feature (Week 1 & 3)
│   │   │   ├── books.routes.ts         # Route declarations (GET /books, POST /books, etc.)
│   │   │   ├── books.controller.ts     # HTTP request/response handlers
│   │   │   ├── books.service.ts        # Business logic, Prisma queries, caching
│   │   │   ├── books.schema.ts         # Zod validation schemas for query/body
│   │   │   └── books.types.ts          # Module-specific TypeScript types & interfaces
│   │   │
│   │   ├── auth/                       # 🔐 Authentication Module (Days 4, 11, 12)
│   │   │   ├── auth.routes.ts          # /auth/register, /auth/login, /auth/refresh
│   │   │   ├── auth.controller.ts      # Handles login/registration HTTP requests
│   │   │   ├── auth.service.ts         # Password hashing (bcrypt), token rotation
│   │   │   └── auth.schema.ts          # Validation for credentials & passwords
│   │   │
│   │   └── orders/                     # 🛒 Orders & Checkout Module (Days 8-10, 24)
│   │       ├── orders.routes.ts        # POST /orders/checkout
│   │       ├── orders.controller.ts    # Extracts user and idempotency headers
│   │       ├── orders.service.ts       # Atomic transactions & Row locking (FOR UPDATE)
│   │       └── orders.schema.ts        # Order payload validation
│   │
│   ├── queue/                          # ⚡ Background Jobs (Days 22, 23, 26)
│   │   └── jobQueue.ts                 # Asynchronous worker for emails/notifications & DLQ
│   │
│   ├── utils/                          # Cross-cutting utility helpers
│   │   ├── logger.ts                   # Structured JSON logger (Day 19)
│   │   ├── cache.ts                    # Cache-aside helper (Redis / In-memory) (Day 16, 17)
│   │   └── apiResponse.ts              # Consistent JSON envelope helper
│   │
│   ├── prisma/                         # Database contract and ORM client
│   │   ├── contract.prisma             # Data schema, models, relations, indexes
│   │   ├── contract.json               # Compiled contract
│   │   ├── contract.d.ts               # Autogenerated type definitions
│   │   └── db.ts                       # Database client instance
│   │
│   └── app.ts                          # Express application initialization & router mounting
│
├── index.ts                            # Server bootstrap (listen on port)
├── prisma.config.ts                    # Prisma CLI config
├── tsconfig.json                       # TypeScript compiler options
├── package.json                        # Dependencies and scripts
└── .env                                # Environment secrets
```

---

## 3. Detailed Component Responsibilities

### 1. `books.schema.ts` (Validation Layer)
- Defines the structure and constraints for incoming requests using **Zod**.
- Generates static TypeScript types using `z.infer<typeof schema>`.
- Keeps validation rules out of controllers and services.

### 2. `books.routes.ts` (Routing Layer)
- Declares HTTP methods and endpoints (`GET /`, `POST /`, `GET /:id`, `POST /:id/variants`).
- Binds validation middlewares (`validateQuery`, `validateBody`) and auth middlewares to specific routes.
- Connects endpoints directly to controller methods.

### 3. `books.controller.ts` (HTTP Transport Layer)
- Extracts query strings (`page`, `limit`, `category`, `sortBy`, `order`), URL parameters (`id`), and body payloads.
- Calls the corresponding method in `books.service.ts`.
- Formats the HTTP response with appropriate status codes (`200 OK`, `201 Created`, `204 No Content`).
- Delegates unhandled errors to `next(error)`.

### 4. `books.service.ts` (Business Logic & Data Access Layer)
- Calculates pagination offsets (`skip = (page - 1) * limit`, `take = limit`).
- Constructs Prisma query filters (`where`, `orderBy`, `include`).
- Interacts with cache (`cache.get`, `cache.set`, `cache.del`).
- Executes transactions and row-locking logic.

### 5. `src/prisma/contract.prisma` (Data Model Layer)
- Defines entities, relationships, foreign keys, and database indexes (`@@index`).

---

## 4. Code Template for the `books` Module

### A. Validation Schemas (`src/modules/books/books.schema.ts`)
```typescript
import { z } from 'zod';

export const listBooksQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  category: z.string().optional(),
  author: z.string().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['book_title', 'author', 'id']).default('id'),
  order: z.enum(['asc', 'desc']).default('asc'),
});

export const createBookSchema = z.object({
  book_title: z.string().min(1, 'Book title is required'),
  author: z.string().min(1, 'Author is required'),
  publisher: z.string().min(1, 'Publisher is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(1, 'Description is required'),
});

export type ListBooksQuery = z.infer<typeof listBooksQuerySchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
```

### B. Validation Middleware (`src/middlewares/validate.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateQuery = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid query parameters',
          errors: error.flatten().fieldErrors,
        });
      }
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid request body',
          errors: error.flatten().fieldErrors,
        });
      }
      next(error);
    }
  };
};
```

### C. Service Layer (`src/modules/books/books.service.ts`)
```typescript
import { db } from '../../prisma/db';
import { ListBooksQuery, CreateBookInput } from './books.schema';

export class BooksService {
  async listBooks(query: ListBooksQuery) {
    const { page, limit, category, author, search, sortBy, order } = query;
    const skip = (page - 1) * limit;
    const take = limit;

    const where: any = {};

    if (category) {
      where.category = { equals: category };
    }
    if (author) {
      where.author = { equals: author };
    }
    if (search) {
      where.book_title = { contains: search, mode: 'insensitive' };
    }

    const [items, totalCount] = await Promise.all([
      db.orm.public.Books.where(where)
        .orderBy({ [sortBy]: order })
        .offset(skip)
        .limit(take)
        .all(),
      db.orm.public.Books.where(where).count(),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
      data: items,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async createBook(input: CreateBookInput) {
    return await db.orm.public.Books.create(input);
  }
}

export const booksService = new BooksService();
```

### D. Controller Layer (`src/modules/books/books.controller.ts`)
```typescript
import { Request, Response, NextFunction } from 'express';
import { booksService } from './books.service';
import { ListBooksQuery, CreateBookInput } from './books.schema';

export class BooksController {
  async getBooks(req: Request<{}, {}, {}, ListBooksQuery>, res: Response, next: NextFunction) {
    try {
      const result = await booksService.listBooks(req.query);
      return res.status(200).json({
        status: 'success',
        ...result,
      });
    } catch (error) {
      next(error);
    }
  }

  async createBook(req: Request<{}, {}, CreateBookInput>, res: Response, next: NextFunction) {
    try {
      const book = await booksService.createBook(req.body);
      return res.status(201).json({
        status: 'success',
        data: book,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const booksController = new BooksController();
```

### E. Routes Layer (`src/modules/books/books.routes.ts`)
```typescript
import { Router } from 'express';
import { booksController } from './books.controller';
import { validateBody, validateQuery } from '../../middlewares/validate';
import { createBookSchema, listBooksQuerySchema } from './books.schema';

export const booksRouter = Router();

booksRouter.get(
  '/',
  validateQuery(listBooksQuerySchema),
  booksController.getBooks.bind(booksController)
);

booksRouter.post(
  '/',
  validateBody(createBookSchema),
  booksController.createBook.bind(booksController)
);
```

---

## 5. How This Design Solves Future Roadmap Days (Without Refactoring)

| Day & Practice Topic | Where the Code Goes | Why the Architecture Handles It Naturally |
| :--- | :--- | :--- |
| **Day 2: Postgres EXPLAIN & Search** | `contract.prisma` (`@@index([book_title])`) | Indexes are defined in the data contract; the search filter logic in `books.service.ts` leverages it directly. |
| **Day 3: Input Validation** | `middlewares/validate.ts` & `*.schema.ts` | Validation is completely isolated as middleware; controllers never receive invalid types. |
| **Day 4 & 11: JWT Auth & Refresh Tokens** | `modules/auth/` & `middlewares/auth.ts` | Adding authentication simply requires attaching `authMiddleware` to specific routes. |
| **Day 8–10: Transactions & Row Locks** | `modules/orders/orders.service.ts` | Atomic transactions and `SELECT ... FOR UPDATE` are encapsulated in the order service layer. |
| **Day 16–17: Cache-Aside & Invalidation** | `utils/cache.ts` & `books.service.ts` | The service checks the cache helper before querying the database, and invalidates keys on updates. |
| **Day 19: Structured Logging** | `middlewares/requestId.ts` & `utils/logger.ts` | Every request gets an ID propagated through logs without touching business routes. |
| **Day 22–26: Queues, DLQ, Idempotency & Rate Limit** | `queue/jobQueue.ts`, `middlewares/rateLimiter.ts`, `orders.routes.ts` | Background jobs and rate limits plug directly into the middleware and queue pipeline. |
