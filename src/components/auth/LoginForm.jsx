import React from "react";
import { FormControl, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Form } from "formik";
import { object, string } from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

export const loginSchema = object({
  email: string()
    .email("Lütfen geçerli bir email giriniz.")
    .required("Email zorunludur"),
  password: string()
    .required("Şifre zorunludur")
    .min(8, "Şifre en az 8 karakter olmalıdır")
    .max(20, "Şifre en fazla 20 karakter olmalıdır")
    .matches(/\d+/, "Şifre bir sayı içermelidir")
    .matches(/[a-z]/, "Şifre bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Şifre bir büyük harf içermelidir")
    .matches(
      /[!/[@$!%*?&]+/,
      "Şifre en az bir özel karakter (@$!%*?&) içermelidir"
    ),
});

const LoginForm = ({ values, handleChange, errors, touched, handleBlur }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Email Address"
              name="email"
              id="email"
              type="email"
              variant="outlined"
              required
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={errors.email}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              required
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginTop: "1rem" }}
          >
            SIGN IN
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default LoginForm;
