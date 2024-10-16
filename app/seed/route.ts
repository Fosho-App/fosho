import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS profiles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      wallet_address VARCHAR(44) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      twitter TEXT,
      telegram TEXT,
      about_me TEXT,
    );
  `;

 
  // return client.sql`
  //   INSERT INTO users (id, name, email, password)
  //   VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
  //   ON CONFLICT (id) DO NOTHING;
  // `;

}


async function seedCustomers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS events (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      event_addresss VARCHAR(44) NOT NULL UNIQUE
    );
  `;

  // const insertedCustomers = await Promise.all(
  //   customers.map(
  //     (customer) => client.sql`
  //       INSERT INTO customers (id, name, email, image_url)
  //       VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
  //       ON CONFLICT (id) DO NOTHING;
  //     `,
  //   ),
  // );

  // return insertedCustomers;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS communities (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      description TEXT NOT NULL,
      community_addresss VARCHAR(44) NOT NULL UNIQUE
    );
  `;

  // const insertedRevenue = await Promise.all(
  //   revenue.map(
  //     (rev) => client.sql`
  //       INSERT INTO revenue (month, revenue)
  //       VALUES (${rev.month}, ${rev.revenue})
  //       ON CONFLICT (month) DO NOTHING;
  //     `,
  //   ),
  // );

  // return insertedRevenue;
}

export async function GET() {
  
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedCustomers();
    await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}