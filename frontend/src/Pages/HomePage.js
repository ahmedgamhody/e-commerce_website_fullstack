import { Box, useTheme } from "@mui/material";
import Hero from "../components/Hero/Hero";
import ProductsSection from "../components/Products/ProductsSection";
import Footer from "../components/Footer/Footer";
import ScrollToTop from "../components/scroll/ScrollButton";

function HomePage() {
  const theme = useTheme();
  return (
    <>
      <Box bgcolor={theme.palette.mainBackground.main}>
        <Hero />
        <ProductsSection />
        <Footer />
      </Box>
      <ScrollToTop />
    </>
  );
}

export default HomePage;
