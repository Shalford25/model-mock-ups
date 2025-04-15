import "./globals.css";
import NavBar from "./components/NavBar";
import {Provider} from "./components/MyContext";

export default function RootLayout({children}) {
  return (
    <html lang="en"  data-lt-installed="true">
      <body className="bg-background text-foreground min-h-screen">
        <Provider>
          <NavBar/>
          {children}
        </Provider>
      </body>
    </html>
  );
}