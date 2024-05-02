import React from 'react';
import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to My Next.js App</title>
        <meta name="description" content="Explore the Next.js world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to My Next.js App</h1>
        <p>This is your homepage.</p>
      </main>

      <footer>
        <p>© 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}
