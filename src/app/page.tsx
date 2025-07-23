
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Coder Blog</title>
        <meta
          name="keywords"
          content="coder, programming, nextjs, tailwindcsscoding, programming, blog, technology, JavaScript, React"
        />
        <meta
          name="description"
          content="A blog about coding and technology."
        />
        <meta name="author" content="Zainab Rehman" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="theme-color" content="#000000" />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />  
        {/* <script src='/sc.js'></script> */}
      </Head>

      {/* <Script src="/sc.js" strategy="lazyOnload"></Script> */}

     

      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main>
          <h1 className="font-mono text-6xl font-extrabold ">Coder Blog</h1>
          <span>A Blog For Coder</span>
        </main>
        
      </div>
    </>
  );
}
