// import { db } from '@vercel/postgres';

// const client = await db.connect();

// async function seedUsers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS profiles (
//       wallet VARCHAR(44) NOT NULL UNIQUE,
//       name VARCHAR(255) NOT NULL,
//       twitter TEXT,
//       telegram TEXT,
//       about TEXT
//     );
//   `;


//   // return client.sql`
//   //   INSERT INTO profiles (wallet, name, twitter)
//   //   VALUES (${profile.wallet}, ${profile.name}, ${profile.telegram});
//   // `;

// }


// async function seedCustomers() {
//   // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   // await client.sql`
//   //   CREATE TABLE IF NOT EXISTS events (
//   //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   //     title VARCHAR(255) NOT NULL,
//   //     description TEXT NOT NULL,
//   //     event_addresss VARCHAR(44) NOT NULL UNIQUE
//   //   );
//   // `;

//   // const insertedCustomers = await Promise.all(
//   //   customers.map(
//   //     (customer) => client.sql`
//   //       INSERT INTO customers (id, name, email, image_url)
//   //       VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//   //       ON CONFLICT (id) DO NOTHING;
//   //     `,
//   //   ),
//   // );

//   // return insertedCustomers;
// }

// async function seedRevenue() {
//   // await client.sql`
//   //   CREATE TABLE IF NOT EXISTS communities (
//   //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   //     name VARCHAR(255) NOT NULL UNIQUE,
//   //     description TEXT NOT NULL,
//   //     community_addresss VARCHAR(44) NOT NULL UNIQUE
//   //   );
//   // `;

//   // const insertedRevenue = await Promise.all(
//   //   revenue.map(
//   //     (rev) => client.sql`
//   //       INSERT INTO revenue (month, revenue)
//   //       VALUES (${rev.month}, ${rev.revenue})
//   //       ON CONFLICT (month) DO NOTHING;
//   //     `,
//   //   ),
//   // );

//   // return insertedRevenue;
// }

// export async function GET() {
  
//   try {
//     await client.sql`BEGIN`;
//     await seedUsers();
//     await seedCustomers();
//     await seedRevenue();
//     await client.sql`COMMIT`;

//     return Response.json({ message: 'Database seeded successfully' });
//   } catch (error) {
//     await client.sql`ROLLBACK`;
//     console.log(error)
//     return Response.json({ error }, { status: 500 });
//   }
// }