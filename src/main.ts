import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

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
  const users = await db.query.UserTable.findMany({
    columns: {
      name: true,
      email: true,
    },
  });
  console.log("Here are the users:", users);
}

main();
