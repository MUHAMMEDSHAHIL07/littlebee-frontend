import * as Yup from 'yup';

export const PaymentValidation = Yup.object({
  name: Yup.string().required('Cardholder name is required'),
  cardNumber: Yup.string()
    .matches(/^\d+$/, "Card number must be 16 digits")
    .length(16, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Enter MM/YY format")
    .required("Expiry date is required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be 3 digits")
    .required("CVV is required"),
});
