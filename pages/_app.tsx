import "../styles.css";
import { Roboto } from "@next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

interface Props {
  Component: React.ComponentType;
  pageProps: Record<string, any>;
}

export default function App({ Component, pageProps }: Props) {
  return (
    <main className={roboto.className}>
      <Component {...pageProps} />
    </main>
  );
}
