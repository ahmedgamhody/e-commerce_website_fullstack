import {
  Box,
  IconButton,
  useTheme,
  Typography,
  Stack,
  ListItem,
  Container,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import { ModeChange } from "../../context/ModeContext";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import { ExpandMore } from "@mui/icons-material";

const options = ["AR", "EN"];

function TopBar() {
  const theme = useTheme();
  const mode = React.useContext(ModeChange);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "rgb(42,52,70)",
        padding: "4px 0",
      }}
    >
      <Container maxWidth={"xl"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                mr: 2,
                padding: "3px 10px",
                bgcolor: "#D12F57",
                borderRadius: "12px",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              HOT
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "white",
                fontWeight: "300",
                fontSize: "12px",
              }}
            >
              Free Express Shipping
            </Typography>
          </Stack>
          <Stack direction={"row"} alignItems={"center"}>
            <IconButton
              color="inherit"
              size="small"
              sx={{
                width: "30px",
                height: "30px",
              }}
              onClick={() => {
                localStorage.setItem(
                  "mode",
                  theme.palette.mode === "dark" ? "light" : "dark"
                );
                theme.palette.mode === "dark"
                  ? mode.setMode("light")
                  : mode.setMode("dark");
              }}
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon fontSize="small" sx={{ color: "white" }} />
              ) : (
                <Brightness4Icon fontSize="small" sx={{ color: "white" }} />
              )}
            </IconButton>

            <List
              component="nav"
              aria-label="Device settings"
              sx={{ bgcolor: "transparent", p: 0, m: 0 }}
            >
              <ListItem
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClickListItem}
                sx={{
                  "&:hover": { cursor: "pointer" },
                  px: 1,
                  py: 0,
                  width: "60px",
                }}
              >
                <ListItemText
                  sx={{ ".MuiTypography-root": { color: "#FFF" } }}
                  secondary={options[selectedIndex]}
                />
                <ExpandMore sx={{ color: "#FFF" }} />
              </ListItem>
            </List>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                  sx={{ fontSize: "12px", p: "3px 10px", minHeight: "10px" }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>

            <IconButton
              size="small"
              component="a"
              href="https://www.facebook.com/Gamhody159"
              target="_blank"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                },
                width: "30px",
                height: "30px",
              }}
            >
              <FacebookOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component="a"
              href="https://www.instagram.com/ahmed_s_gamhody/"
              target="_blank"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                },
                width: "30px",
                height: "30px",
              }}
            >
              <InstagramIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              component="a"
              href="https://x.com/ahmedgamhody"
              target="_blank"
              sx={{
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "50%",
                },
                width: "30px",
                height: "30px",
              }}
            >
              <XIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default TopBar;
