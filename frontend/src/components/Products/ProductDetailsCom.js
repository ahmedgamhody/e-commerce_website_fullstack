import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import ImageGallery from "react-image-gallery";
import React, { useContext, useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { addToCart } from "../../RTK/slices/CartSlice";
import { AuthUser } from "../../context/CurrentUser";
import { useNavigate } from "react-router-dom";
function ProductDetailsCom({ pro }) {
  const [productImages, setProductImages] = useState([]);
  const dispatch = useDispatch();
  const user = useContext(AuthUser);
  const nav = useNavigate();
  const baseURL = "http://localhost:1337";
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  useEffect(() => {
    if (pro.productImg?.data) {
      const images = pro.productImg.data.map((img) => ({
        original: `${baseURL}${img.attributes.url}`,
        thumbnail: `${baseURL}${img.attributes.formats.thumbnail.url}`,
      }));
      setProductImages(images);
    }
  }, [pro.productImg]);
  return (
    <Box
      sx={{
        borderRadius: "12px",
      }}
    >
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ ".MuiPaper-root": { minWidth: "350px" } }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          sx={{ fontSize: "14px", padding: "8px" }}
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {`Product added to cart successfully  `}
        </Alert>
      </Snackbar>
      <Grid alignItems={"center"} container spacing={3} p={2}>
        <Grid item xs={12} md={5} lg={5}>
          <ImageGallery items={productImages} showPlayButton={false} />
        </Grid>
        <Grid item xs={12} md={7} lg={7}>
          <Box
            sx={{ textAlign: { xs: "center", lg: "left", md: "left" } }}
            py={{ xs: 1, sm: 3 }}
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            justifyContent={{
              xs: "center",
              md: "start",
              lg: "start",
              xl: "start",
            }}
            alignItems={{
              xs: "center",
              md: "start",
              lg: "start",
              xl: "start",
            }}
          >
            <Typography variant="h5">{pro.productTitle}</Typography>
            <Typography
              my={0.4}
              fontSize={"22px"}
              color={"crimson"}
              variant="h6"
            >
              {pro.productPrice}$
            </Typography>
            <Typography variant="body1">{pro.productDescription}</Typography>
            <Button
              sx={{
                textTransform: "capitalize",
                width: "40%",
              }}
              variant="contained"
              onClick={() => {
                if (user.user.username) {
                  dispatch(addToCart(pro));
                  handleClick();
                } else {
                  nav("/login");
                }
              }}
            >
              <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
              Buy now
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductDetailsCom;
