import {
  Box,
  Container,
  Grid,
  useTheme,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useForm } from "react-hook-form";
import axios from "axios";
import { basUrlForLogin } from "../Apis/Apis";
import { AuthUser } from "../context/CurrentUser";
import React, { useContext } from "react";
import LoadingSubmit from "./Loading";
function RegisterPage() {
  const [open, setOpen] = React.useState(false);
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
  const [err, setErr] = React.useState(false);
  const user = useContext(AuthUser);
  const nav = useNavigate();
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (formData) => {
    setLoading(true);
    axios
      .post(`${basUrlForLogin}/register`, formData)
      .then((response) => {
        setErr(false);
        user.setUser(response.data.user);
        handleClick();

        setTimeout(() => {
          nav("/");
        }, 3000);
      })
      .catch((error) => {
        setErr(true);
        console.log("An error occurred:", error.response);
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
        height: "70vh",
        width: "95%",
        my: 5,
        p: "0 !important",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
        color: "black",
        backgroundColor: theme.palette.mainBackground.main,
        overflow: "hidden",
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
          {`Welcome  ${user.user.username}`}
        </Alert>
      </Snackbar>
      <Grid container alignItems={"center"}>
        {useMediaQuery("(min-width:900px)") && (
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              overflow: "hidden",
              borderTopLeftRadius: "12px",
              borderBottomLeftRadius: "12px",
            }}
          >
            <img
              src={require("../Assets/undraw_empty_cart_co35.png")}
              style={{
                width: "90%",
                height: "auto",
                objectFit: "cover",
              }}
              alt="Illustration"
            />
          </Grid>
        )}

        <Grid item xs={12} md={6}>
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
              Register
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                width: "80%",
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label="Name"
                variant="standard"
                fullWidth={true}
                type="text"
                {...register("username", { required: true, minLength: 3 })}
                error={Boolean(errors.username)}
                helperText={
                  errors.username
                    ? errors.username.type === "minLength"
                      ? "Minimum 3 characters required"
                      : "This field is required"
                    : ""
                }
                sx={{ ".MuiInputBase-input": { padding: 1 } }}
              />
              <TextField
                label="Email"
                variant="standard"
                fullWidth={true}
                type="email"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.com$/,
                    message: "Invalid email format, must be ...@...com",
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email ? errors.email.message : ""}
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
                Register
              </Button>
              <Typography
                color={theme.palette.text.primary}
                textAlign={"center"}
                variant="p"
              >
                or
                <Button component={Link} to="/login" variant="text">
                  login
                </Button>
              </Typography>
            </Box>
            {err && (
              <Alert severity="error" sx={{ width: "90%" }}>
                Email or Username are already taken
              </Alert>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterPage;
