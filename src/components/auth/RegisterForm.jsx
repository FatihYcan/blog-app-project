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

export const registerSchema = object({
  username: string().max(20, "Kullanıcı adı 10 karakterden az olmalıdır."),
  firstName: string().max(20, "İsim 20 karakterden az olmalıdır."),
  lastName: string().max(20, "Soyisim 30 karakterden az olmalıdır."),
  email: string()
    .email("Lütfen geçerli bir email giriniz.")
    .required("Email zorunludur"),
  image: string().url("Geçerli bir URL giriniz."),
  bio: string(),
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

const RegisterForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
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
              label="UserName"
              name="username"
              id="userName"
              type="text"
              variant="outlined"
              required
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && Boolean(errors.username)}
              helperText={errors.username}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="FirstName"
              name="firstName"
              id="firstName"
              type="text"
              variant="outlined"
              required
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={errors.firstName}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="LastName"
              name="lastName"
              id="lastName"
              type="text"
              variant="outlined"
              required
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={errors.lastName}
            />
          </FormControl>
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
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={values.image}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.image && Boolean(errors.image)}
              helperText={errors.image}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Bio"
              name="bio"
              id="bio"
              type="text"
              variant="outlined"
              value={values.bio}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.bio && Boolean(errors.bio)}
              helperText={errors.bio}
            />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField
              label="Password"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
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
            SIGN UP
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default RegisterForm;
