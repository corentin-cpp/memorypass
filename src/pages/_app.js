import "@/styles/globals.css";
import { AuthProvider } from "@/lib/AuthProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function App({ Component, pageProps }) {
  return (
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
  );
}
