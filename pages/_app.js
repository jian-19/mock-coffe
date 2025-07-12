import "style/globals.css";

export default function Main({ Component, pageProps }) {
  return (
    <div className="p-8 bg-slate-600 text-white min-h-dvh">
      <Component {...pageProps} />
    </div>
  );
}
