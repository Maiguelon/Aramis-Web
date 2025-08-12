// pages/_app.jsx
import '../style/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-primary flex flex-col"> {/* fondo y alto total */}
      <Header />
      <main className="flex-1"> {/* sin padding global */}
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
}

