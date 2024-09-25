import {
  Box,
  Button,
  Container,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { styled, useTheme } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import React, { useContext } from "react";
import { ExpandMore } from "@mui/icons-material";
import { AuthUser } from "../../context/CurrentUser";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const options = ["All Categories", "Car", "Clothes", "Electronics"];
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));
const Search = styled("div")(({ theme }) => ({
  flexGrow: 0.4,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "2px solid #777",
  transition: "0.4s",
  "&:hover": {
    border: "2px solid #333",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "260px",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "320px",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#777",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
function MainHeader() {
  const cartState = useSelector((state) => state.cart);

  const nav = useNavigate();
  const user = useContext(AuthUser);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
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
    <Container
      sx={{
        my: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Tooltip title="Home">
        <Stack
          sx={{
            ".MuiContainer-root  ": { color: "balck" },
            textDecoration: "none",
          }}
          component={Link}
          to="./"
          alignItems={"center"}
        >
          <ShoppingCartOutlinedIcon
            sx={{ color: theme.palette.mode === "dark" ? "#FFF" : "#000" }}
          />
          <Typography
            color={theme.palette.mode === "dark" ? "#FFF" : "#000"}
            variant="body1"
            fontWeight={"bold"}
          >
            E-commerce
          </Typography>
        </Stack>
      </Tooltip>
      {user.user.username && (
        <Search
          sx={{
            borderRadius: "22px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
          <div>
            <List
              component="nav"
              aria-label="Device settings"
              sx={{
                bgcolor: theme.palette.myColor.main,
                borderTopRightRadius: "22px",
                borderBottomRightRadius: "22px",
                p: 0,
              }}
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
                }}
              >
                <ListItemText
                  sx={{
                    width: "95px",
                    textAlign: "center",
                    "&:hover": { cursor: "pointer" },
                  }}
                  secondary={options[selectedIndex]}
                />
                <ExpandMore sx={{ fontSize: "18px" }} />
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
                  sx={{ fontSize: "13px" }}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </Search>
      )}

      <Stack direction={"row"} alignItems={"center"} gap={2}>
        {user.user.username && (
          <Box>
            <Tooltip title="Cart">
              <IconButton
                onClick={() => {
                  nav("/cart");
                }}
                aria-label="cart"
              >
                <StyledBadge badgeContent={cartState.length} color="primary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton onClick={handleClickMenu}>
                <PersonIcon />
              </IconButton>
            </Tooltip>

            <Menu
              id="basic-menu"
              anchorEl={anchorElMenu}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                {user.user.username}
              </MenuItem>
              <MenuItem
                component={"button"}
                sx={{ color: "red" }}
                onClick={() => {
                  handleCloseMenu();
                  user.setUser({});
                  nav("/login");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
        {!user.user.username && (
          <Stack direction={"row"} gap={1}>
            <Button
              variant="contained"
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#555555" : "#000",
                color: "#FFF",
              }}
              onClick={() => {
                nav("/login");
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => {
                nav("/register");
              }}
              variant="contained"
            >
              Register
            </Button>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

export default MainHeader;
