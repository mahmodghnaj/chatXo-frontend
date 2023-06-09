import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="ChatXo"></meta>
        <meta name="description" content="ChatXo"></meta>
        <link rel="icon" href="/svg/logo.svg" type="image/icon type" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script id="change-theme" strategy="beforeInteractive">
          {`(function () {
            try {
              var d = document.documentElement;
              var e = localStorage.getItem("theme");
               e= e.replace(/"/g, '');
              if ((!e && true)) {
                var t = '(prefers-color-scheme: dark)';
                var m = window.matchMedia(t);
                if (m.media !== t || m.matches) {
                  d.setAttribute("data-theme", "dark");
                } else {
                  d.setAttribute("data-theme", "dark");
                }
              } else if (e) {
                d.setAttribute("data-theme", e);
              }
            } catch (e) {}
          })()`}
        </Script>
      </body>
    </Html>
  );
}
