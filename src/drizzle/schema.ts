import {
  boolean,
  decimal,
  index,
  integer,
  pgEnum,
  pgTable,
  real,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"]);

export const UserTable = pgTable(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull().$type<10 | 20 | 30>(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("userRole").default("BASIC").notNull(),
    updatedAt: timestamp("updatedAt")
      .notNull()
      .$default(() => new Date()),
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
      uniqueNameAndAge: uniqueIndex("uniqueNameAndAge").on(
        table.name,
        table.age
      ),
    };
  }
);

export const UserPreferencesTable = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  emailUpdates: boolean("emailUpdates").default(true).notNull(),
  userId: uuid("userId")
    .references(() => UserTable.id, {
      onDelete: "cascade",
      onUpdate: "cascade",
    })
    .notNull(),
});

export const PostTable = pgTable("post", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 3000 }).notNull(),
  averageRating: real("averageRating").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  authorId: uuid("authorId")
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable("category", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const PostCategoryTable = pgTable(
  "postCategory",
  {
    postId: uuid("postId")
      .references(() => PostTable.id)
      .notNull(),
    categoryId: uuid("categoryId")
      .references(() => CategoryTable.id)
      .notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  }
);
