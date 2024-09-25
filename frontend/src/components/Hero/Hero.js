import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./slider.css";
import image1 from "../../Assets/banner-15.jpg";
import image2 from "../../Assets/banner-25.jpg";
import DownHero from "./DownHero";
function Hero() {
  const theme = useTheme();
  const mySlider = [
    { text: "MEN", link: image1 },
    { text: "WOMEN", link: image2 },
  ];
  const checkPhoto = useMediaQuery("(min-width:600px)");
  const showMainImages = mySlider.map((item, index) => {
    return (
      <SwiperSlide className="SwiperSlideContainer" key={index}>
        {checkPhoto && <img src={item.link} alt="" />}{" "}
        <Box
          sx={{
            [theme.breakpoints.up("sm")]: {
              position: "absolute",
              left: "10%",
              textAlign: "left",
            },

            [theme.breakpoints.down("sm")]: {
              pt: 4,
              pb: 6,
            },
          }}
        >
          <Typography
            sx={{
              color: "#222",
            }}
            variant="h5"
          >
            LIFESTYLE COLLECTION
          </Typography>

          <Typography
            sx={{
              color: "#222",
              fontWeight: 500,
              my: 1,
            }}
            variant="h3"
          >
            {item.text}
          </Typography>

          <Stack
            sx={{
              justifyContent: { xs: "center", sm: "left" },
            }}
            direction={"row"}
            alignItems={"center"}
          >
            <Typography color={"#333"} mr={1} variant="h4">
              SALE UP TO
            </Typography>
            <Typography color={"#D23F57"} variant="h4">
              30% OFF
            </Typography>
          </Stack>
          <Typography
            sx={{
              color: "#000",
              fontWeight: 300,
              my: 1,
            }}
            variant="body1"
          >
            Get Free Shipping on orders over $99.00
          </Typography>

          <Button
            sx={{
              px: 5,
              py: 1,
              mt: 2,
              backgroundColor: "#222",
              boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
              color: "#fff",
              borderRadius: "1px",
              "&:hover": {
                bgcolor: "#151515",
                boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
              },
            }}
            variant="contained"
          >
            shop now
          </Button>
        </Box>
      </SwiperSlide>
    );
  });

  return (
    <Container
      sx={{
        mt: 2.5,
        p: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          loop={true}
          modules={[Pagination]}
          className="mySwiper"
        >
          {showMainImages}
        </Swiper>
        {useMediaQuery("(min-width:1200px)") && (
          <Box
            sx={{
              minWidth: "26.1%",
              gap: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ position: "relative" }}>
              <img
                width={"100%"}
                src={require("../../Assets/banner-17.jpg")}
                alt=""
              />
              <Stack
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 30,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#2B3445",
                    fontSize: "18px",
                  }}
                >
                  NEW ARRIVALS
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2B3445",
                    lineHeight: "16px",
                    mt: 1,
                  }}
                >
                  SUMMER
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2B3445",
                  }}
                >
                  SALE 20% OFF
                </Typography>

                <Link
                  sx={{
                    color: "#2B3445",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "0.2s",

                    "&:hover": {
                      color: "#D23F57",
                    },
                  }}
                  href="#"
                  underline="none"
                >
                  shop now
                  <ArrowForwardIcon sx={{ fontSize: "13px" }} />
                </Link>
              </Stack>
            </Box>
            <Box sx={{ position: "relative" }}>
              <img
                width={"100%"}
                src={require("../../Assets/banner-16.jpg")}
                alt=""
              />
              <Stack
                sx={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 31,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "#2B3445",
                    fontSize: "18px",
                    fontWeight: 300,
                  }}
                >
                  GAMING 4K
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#2B3445",
                    lineHeight: "16px",
                    mt: 1,
                  }}
                >
                  DESKTOPS &
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: "#2B3445",
                  }}
                >
                  LAPTOPS
                </Typography>

                <Link
                  sx={{
                    color: "#2B3445",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    transition: "0.2s",

                    "&:hover": {
                      color: "#D23F57",
                    },
                  }}
                  href="#"
                  underline="none"
                >
                  shop now
                  <ArrowForwardIcon sx={{ fontSize: "13px" }} />
                </Link>
              </Stack>
            </Box>
          </Box>
        )}
      </Box>

      <DownHero />
    </Container>
  );
}

export default Hero;
