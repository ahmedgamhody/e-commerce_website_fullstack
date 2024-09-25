import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { clearCart, removeFromCart } from "../RTK/slices/CartSlice";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AnimatePresence, motion } from "framer-motion";
function CartPage() {
  const [productsFormCart, setProductsFormCart] = useState([]);
  const cartState = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isExtraSmallScreen = useMediaQuery("(max-width:680px)");
  console.log(cartState);
  const totalPrice = cartState.reduce((acc, pro) => {
    acc += pro.productPrice * pro.quantity;
    return acc;
  }, 0);

  useEffect(() => {
    setProductsFormCart(cartState);
  }, [cartState]);
  const theme = useTheme();
  return (
    <Box py={3}>
      <Container>
        <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
          Cart
        </Typography>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={1}
        >
          <Button
            sx={{
              backgroundColor: theme.palette.warning.light,
              textTransform: "capitalize",
            }}
            variant="contained"
            onClick={() => {
              dispatch(clearCart());
            }}
          >
            Clear All Cart
          </Button>
          <Box display={"flex"} alignItems={"center"}>
            <Typography fontWeight={"bold"} variant="body1">
              Total Price :
            </Typography>
            <Typography
              color={theme.palette.primary.main}
              fontWeight={"bold"}
              variant="h6"
            >
              {totalPrice.toFixed(2)}$
            </Typography>
          </Box>
        </Stack>
        {cartState.length === 0 && (
          <Typography
            component={motion.div}
            color={theme.palette.primary.main}
            textAlign={"center"}
            variant="h4"
            mt={7}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            Sorry cart is empty ......
          </Typography>
        )}
        <Stack
          mt={6}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={isExtraSmallScreen ? "center" : "space-between"}
          rowGap={3}
        >
          <AnimatePresence>
            {productsFormCart.length > 0 &&
              productsFormCart.map((item, index) => {
                return (
                  <Card
                    key={index}
                    component={motion.div}
                    layout
                    animate={{ opacity: 1, scale: 1 }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.04 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 50,
                    }}
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
                      image={`http://localhost:1337${item.productImg.data[0].attributes.url}`}
                      title={item.productTitle}
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
                          {item.productTitle}
                        </Typography>
                        <Typography
                          color={theme.palette.success.main}
                          variant="subtitle1"
                          component="p"
                          fontWeight={"bold"}
                        >
                          ${item.productPrice}
                        </Typography>
                      </Stack>
                      <Typography
                        sx={{ my: 2 }}
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.productDescription}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between" }}>
                      <Button
                        onClick={() => {
                          dispatch(removeFromCart(item));
                        }}
                        color="error"
                        sx={{ textTransform: "capitalize" }}
                        size="large"
                        variant="outlined"
                      >
                        <DeleteOutlineOutlinedIcon
                          sx={{ mr: 1 }}
                          fontSize="small"
                        />
                        Remove From Cart
                      </Button>

                      <Box display={"flex"} alignItems={"center"}>
                        <Typography fontWeight={"bold"} variant="body1">
                          Quantity :
                        </Typography>
                        <Typography
                          color={theme.palette.primary.main}
                          fontWeight={"bold"}
                          variant="body1"
                        >
                          {item.quantity}
                        </Typography>
                      </Box>
                    </CardActions>
                  </Card>
                );
              })}
          </AnimatePresence>
        </Stack>
      </Container>
    </Box>
  );
}

export default CartPage;
