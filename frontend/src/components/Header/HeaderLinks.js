import {
  Box,
  Container,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import WindowIcon from "@mui/icons-material/Window";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import ElectricBikeOutlinedIcon from "@mui/icons-material/ElectricBikeOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import HeaderLinksCom from "./HeaderLinksCom";
import { AuthUser } from "../../context/CurrentUser";
function HeaderLinks() {
  const user = useContext(AuthUser);
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const isSmallScreen = useMediaQuery("(max-width:1200px)");
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  return (
    user.user.username && (
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              width: 222,
              backgroundColor: theme.palette.myColor.main,
              color: theme.palette.text.secondary,
            }}
          >
            <WindowIcon />
            <Typography sx={{ padding: 0, textTransform: "capitalize", mx: 1 }}>
              Categories
            </Typography>
            <Box flexGrow={1} />
            <KeyboardArrowRightOutlinedIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              ".MuiPaper-root": {
                width: 222,
                backgroundColor: theme.palette.myColor.main,
              },
            }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ElectricBikeOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Bikes</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ElectricBoltOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Electronics</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <MenuBookOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Bokes</ListItemText>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <SportsEsportsOutlinedIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Games</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
        {isLargeScreen && (
          <Stack direction={"row"} alignItems={"center"} gap={4}>
            <HeaderLinksCom title={"Home"} />
            <HeaderLinksCom title={"About Us"} />
            <HeaderLinksCom title={"Pages"} />
            <HeaderLinksCom title={"Services"} />
            <HeaderLinksCom title={"User Account"} />
            <HeaderLinksCom title={"Mega Menu"} />
            <HeaderLinksCom title={"Contact Us"} />
          </Stack>
        )}
        {isSmallScreen && (
          <IconButton onClick={toggleDrawer("top", true)}>
            <MenuIcon />
          </IconButton>
        )}
        <Drawer
          anchor={"top"}
          open={state["top"]}
          onClose={toggleDrawer("top", false)}
          sx={{
            ".MuiPaper-root.MuiDrawer-paperAnchorTop": {
              height: "100%",
            },
            ".MuiPaper-root.css-ia8uo8-MuiPaper-root-MuiDrawer-paper": {
              height: "100%",
            },
          }}
        >
          <Box
            sx={{
              width: 450,
              mt: 6,
              mx: "auto",
              position: "relative",
              pt: 6,
            }}
          >
            <IconButton
              onClick={toggleDrawer("top", false)}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                transition: "0.3s",
                "&:hover": { color: "red", rotate: "90deg" },
              }}
            >
              <CloseIcon />
            </IconButton>
            {["Home", "About Us", "Pages", "Services", "Contact Us"].map(
              (item, index) => {
                return (
                  <Accordion
                    elevation={0}
                    sx={{ bgcolor: "initial", ".MuiList-root": { pt: 0 } }}
                    key={index}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{item}</Typography>
                    </AccordionSummary>
                    <List sx={{ py: 0, my: 0 }}>
                      <ListItem sx={{ py: 0, my: 0 }}>
                        <ListItemButton>
                          <ListItemText primary="Link 1" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>
                          <ListItemText primary="Link 2" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem>
                        <ListItemButton>
                          <ListItemText primary="Link 3" />
                        </ListItemButton>
                      </ListItem>
                    </List>
                  </Accordion>
                );
              }
            )}
          </Box>
        </Drawer>
      </Container>
    )
  );
}

export default HeaderLinks;
