import {
  Box,
  Container,
  Grid,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm } from "react-hook-form";
import axios from "axios";
import { basUrlForLogin } from "../Apis/Apis";
import { useContext } from "react";
import { AuthUser } from "../context/CurrentUser";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LoadingSubmit from "./Loading";

function LoginPage() {
  const user = useContext(AuthUser);
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  //

  const onSubmit = (formData) => {
    setLoading(true);
    axios
      .post(`${basUrlForLogin}`, formData)
      .then((response) => {
        setErr(false);
        user.setUser(response.data.user);
        handleClick();

        setTimeout(() => {
          nav("/");
        }, 1500);
      })
      .catch((error) => {
        setErr(true);
        console.log("An error occurred:", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container
      className="card"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "95%",
        mt: 5,
        p: "0 !important",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        color: "black",
        backgroundColor: theme.palette.mainBackground.main,
      }}
    >
      {loading && <LoadingSubmit />}
      <Snackbar
        open={open}
        autoHideDuration={1000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {`Welcome Back ${user.user.username}`}
        </Alert>
      </Snackbar>
      <Grid container alignItems={"center"}>
        {useMediaQuery("(min-width:900px)") && (
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              display: "flex",
            }}
          >
            <img
              src={require("../Assets/login.png")}
              style={{
                maxWidth: "98%",
                height: "auto",
                borderTopLeftRadius: "12px",
                borderBottomLeftRadius: "12px",
              }}
              alt=""
            ></img>
          </Grid>
        )}

        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <Typography
              color={theme.palette.text.primary}
              variant="h3"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              LOGIN
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                width: "80%",
              }}
            >
              <TextField
                label="Email"
                variant="standard"
                fullWidth={true}
                type="email"
                {...register("identifier", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.com$/,
                    message: "Invalid email format, must be ...@...com",
                  },
                })}
                error={Boolean(errors.identifier)}
                helperText={errors.identifier ? errors.identifier.message : ""}
                sx={{ ".MuiInputBase-input": { padding: 1 } }}
              />
              <TextField
                label="Password"
                variant="standard"
                fullWidth={true}
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                error={Boolean(errors.password)}
                helperText={
                  errors.password
                    ? errors.password.type === "minLength"
                      ? "Minimum 6 characters required"
                      : "This field is required"
                    : ""
                }
                sx={{ ".MuiInputBase-input": { padding: 1 } }}
              />
              <Button disabled={!isValid} type="submit" variant="contained">
                Login
              </Button>
              <Typography
                color={theme.palette.text.primary}
                textAlign={"center"}
                variant="p"
              >
                or
                <Button component={Link} to="/register" variant="text">
                  register
                </Button>
              </Typography>
            </Box>
            {err && (
              <Alert severity="error" sx={{ width: "90%" }}>
                Invalid email or password
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginPage;
