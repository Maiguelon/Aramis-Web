import '../style/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main className="px-4 py-6">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
