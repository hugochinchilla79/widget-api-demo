// pages/_app.js
import '../css/styles.css'; // ← Aquí van todos tus CSS globales
import 'animate.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
