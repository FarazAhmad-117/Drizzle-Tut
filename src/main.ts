import { asc, desc, sql } from "drizzle-orm";
import { db } from "./drizzle/db";
import { UserPreferencesTable, UserTable } from "./drizzle/schema";

async function main() {
  console.log("Running.....");

  // const user = await db
  //   .insert(UserTable)
  //   .values([
  //     {
  //       name: "Ali Ahmad",
  //       age: 20,
  //       email: "aliahmad@gmail.com",
  //     },
  //     {
  //       name: "Asif Akbar",
  //       age: 30,
  //       email: "assifakbar@gmail.com",
  //     },
  //   ])
  //   .returning({
  //     id: UserTable.id,
  //     email: UserTable.email,
  //   });

  // console.log("User is", user);

  // const users = await db.query.UserTable.findMany();
  // console.log("Users:", users);

  // Getting the data
  // const users = await db.query.UserTable.findMany({
  //   columns: {
  //     name: true,
  //     email: true,
  //   },
  // });

  // await db.insert(UserPreferencesTable).values([
  //   {
  //     userId: "086a4050-9483-4c6e-ab7e-9314ab82c91d",
  //     emailUpdates: true,
  //   },
  //   {
  //     userId: "3ecf28db-b16e-46f9-98fd-af354582a4b7",
  //     emailUpdates: false,
  //   },
  // ]);

  const users = await db.query.UserTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
    },
    extras: {
      lowerCaseName: sql<string>`lower(${UserTable.name})`.as("lowercaseName"),
      upperCaseName: sql<string>`upper(${UserTable.name})`.as("uppercaseName"),
      emailLength: sql<number>`length(${UserTable.email})`.as("emailLength"),
    },
    // limit: 1,
    // offset: 1,
    with: {
      preferences: true,
      posts: {
        relationName: "author",
        columns: {
          id: true,
          title: true,
          content: true,
        },
      },
    },
    orderBy: desc(UserTable.name),
  });
  console.log("Here are the users:", users);
}

main();
