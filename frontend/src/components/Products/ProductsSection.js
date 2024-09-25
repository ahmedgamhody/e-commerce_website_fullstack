import {
  Box,
  Container,
  IconButton,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import Rating from "@mui/material/Rating";
import Dialog from "@mui/material/Dialog";
import ProductDetailsCom from "./ProductDetailsCom";
import CloseIcon from "@mui/icons-material/Close";
import { useGetproductByNameQuery } from "../../RTK/products";
import { AnimatePresence, motion } from "framer-motion";
function ProductsSection() {
  const [pattern, setPattern] = useState("products?populate=*");
  const [product, setProduct] = useState({});
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const isExtraSmallScreen = useMediaQuery("(max-width:680px)");
  const [alignment, setAlignment] = React.useState("all");
  //
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      let query = "products?populate=*";

      if (newAlignment === "men" || newAlignment === "women") {
        query += `&filters[productCategory][$eq]=${newAlignment}`;
      }
      setPattern(query);
    }
  };
  //
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { data, error, isLoading } = useGetproductByNameQuery(pattern);
  //
  console.log("BASE URL:", process.env.REACT_APP_BASE_URL);

  //
  return (
    <Container sx={{ py: 8 }}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={isSmallScreen ? "center" : "space-between"}
        flexWrap={"wrap"}
        gap={3}
      >
        <Box sx={{ textAlign: isSmallScreen ? "center" : "left" }}>
          <Typography variant="h6">Selected Products</Typography>
          <Typography fontWeight={300} variant="body1">
            All our new arrivals in an exclusive brand selection
          </Typography>
        </Box>

        <ToggleButtonGroup
          value={alignment}
          color="error"
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{
            ".Mui-selected": {
              border: "1px solid rgba(233, 69, 96, 0.5) !important",
              color: "#e94560",
              backgroundColor: "initial",
            },
          }}
        >
          <ToggleButton
            sx={{ color: theme.palette.text.primary }}
            value="all"
            aria-label="left aligned"
            className="myButton"
          >
            All Products
          </ToggleButton>
          <ToggleButton
            value="men"
            sx={{ mx: "16px !important", color: theme.palette.text.primary }}
            aria-label="centered"
            className="myButton"
          >
            MEN category
          </ToggleButton>
          <ToggleButton
            value="women"
            sx={{ color: theme.palette.text.primary }}
            aria-label="right aligned"
            className="myButton"
          >
            Women category
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      <Stack
        mt={6}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={isExtraSmallScreen ? "center" : "space-between"}
        rowGap={3}
      >
        {isLoading &&
          Array.from({ length: 9 }).map((_, index) => {
            return (
              <Skeleton
                key={index}
                variant="rectangular"
                width={335}
                height={450}
              />
            );
          })}
        <AnimatePresence>
          {!isLoading &&
            data &&
            data.data &&
            data.data.map((item, index) => {
              const productImg = item.attributes.productImg;
              const productImgData =
                productImg && productImg.data && productImg.data.length > 0
                  ? productImg.data[0]
                  : null;
              const imgUrl = productImgData
                ? `${process.env.REACT_APP_BASE_URL}${productImgData.attributes.url}`
                : "default-image-url.jpg";

              return (
                <Card
                  key={item.id}
                  component={motion.div}
                  layout
                  animate={{ opacity: 1, scale: 1 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 50 }}
                  sx={{
                    bgcolor: theme.palette.mode === "dark" && "black",
                    maxWidth: 335,
                    cursor: "pointer",
                    "&:hover .MuiCardMedia-root": {
                      transform: "scale(1.04) ",
                      transition: "transform 0.25s ",
                    },
                  }}
                >
                  <CardMedia
                    sx={{ height: 280 }}
                    image={imgUrl}
                    title={item.attributes.productTitle}
                  />
                  <CardContent sx={{ height: 180 }}>
                    <Stack
                      direction={"row"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Typography
                        gutterBottom
                        variant="h6"
                        m={"0"}
                        component="div"
                      >
                        {item.attributes.productTitle}
                      </Typography>
                      <Typography
                        color={theme.palette.success.main}
                        variant="subtitle1"
                        component="p"
                        fontWeight={"bold"}
                      >
                        ${item.attributes.productPrice}
                      </Typography>
                    </Stack>
                    <Typography
                      sx={{ my: 2 }}
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.attributes.productDescription}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      onClick={() => {
                        handleClickOpen();
                        setProduct(item.attributes);
                      }}
                      sx={{ textTransform: "capitalize" }}
                      size="large"
                    >
                      <AddShoppingCartOutlinedIcon
                        sx={{ mr: 1 }}
                        fontSize="small"
                      />
                      add to cart
                    </Button>
                    <Rating
                      precision={0.1}
                      name="read-only"
                      value={item.attributes.productRating}
                      readOnly
                    />
                  </CardActions>
                </Card>
              );
            })}
        </AnimatePresence>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{ ".MuiPaper-root": { minWidth: { xs: "95%", md: "800px" } } }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              transition: "0.3s",
              "&:hover": { color: "red", rotate: "90deg" },
            }}
          >
            <CloseIcon />
          </IconButton>
          <ProductDetailsCom pro={product} />
        </Dialog>
      </Stack>
    </Container>
  );
}

export default ProductsSection;
