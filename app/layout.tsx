import "@styles/globals.css";

import NavBar from "@components/global/NavBar";
import Footer from "@components/global/Footer";

export const metadata = {
  title: "Industry 4.0",
  description: "Discover Industry 4.0 world",
};

const RootLayout = ({ children }: any) => {
  return (
    <html lang="en">
      <body>
        <header>
          <NavBar />
        </header>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <div className="h-24"></div>
          {children}
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
};

export default RootLayout;
