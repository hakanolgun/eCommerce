import * as yup from "yup";

const validations = yup.object().shape({
  email: yup
    .string()
    .email("Geçerli bir email giriniz")
    .required("Zorunlu alan."),
  password: yup.string().min(5, "Parolanız min 5 char olmalı").required(),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Parolalar uyuşmuyor."),
});

export default validations;
