import { Box, CssBaseline } from "@mui/material";
import TopBar from "../components/Header/TopBar";
import MainHeader from "./../components/Header/MainHeader";
import HeaderLinks from "./../components/Header/HeaderLinks";
import { Outlet } from "react-router-dom";

function WebSite() {
  return (
    <Box>
      <CssBaseline />
      {/* Start Header */}
      <TopBar />
      <MainHeader />
      <HeaderLinks />
      {/* end Header */}
      {/* Show WebSite Pages */}
      <Outlet />
    </Box>
  );
}

export default WebSite;
