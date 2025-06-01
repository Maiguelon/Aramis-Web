import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Aramís Agency</title>
        <meta name="description" content="Test Tailwind" />
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center">
          ¡Aramís está vivo!
        </h1>
        <p className="mb-4 text-center text-lg text-gray-300 max-w-xl">
          Esto es una prueba de Tailwind. Si ves colores, tipografía limpia y este botón, todo está OK.
        </p>
        <button className="bg-white text-gray-900 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition-all shadow-md">
          Botón de prueba
        </button>
      </main>
    </>
  );
}
