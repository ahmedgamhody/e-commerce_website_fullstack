import { KeyboardArrowUp } from "@mui/icons-material";
import { Fab, Zoom } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useCallback } from "react";

const ScrollToTop = () => {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  const scrollToTopFu = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="small"
        aria-label="Scroll back to top"
        onClick={scrollToTopFu}
        sx={{
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 100,
        }}
      >
        <KeyboardArrowUp fontSize="medium" />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;
