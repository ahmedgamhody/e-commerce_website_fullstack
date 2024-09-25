import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#2B3445",
        py: 1,

        textAlign: "center",
      }}
    >
      <Typography
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        color={"HighlightText"}
        variant="h6"
        sx={{ fontSize: { xs: "13px", md: "16px" } }}
      >
        Designed and developed by
        <Button
          sx={{
            mx: 0.5,
            fontSize: { xs: "13px", md: "16px" },
            textTransform: "capitalize",
            color: "#f03a3a",
          }}
          variant="text"
          component={Link}
          to="https://www.linkedin.com/in/ahmedgamhody/"
          target="_bla"
          color="primary"
        >
          AHMED GAMHODY
        </Button>
        ©2025
      </Typography>
    </Box>
  );
};

export default Footer;
