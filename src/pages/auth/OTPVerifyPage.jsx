import FormField from "@components/FormField";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const { control, handleSubmit } = useForm();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [verifyOTP, { data, isLoading, isError, isSuccess, error }] =
    useVerifyOTPMutation();

  console.log({ location });

  function onSubmit(formData) {
    console.log("formData", formData);
    verifyOTP({ email: location?.state?.email, otp: formData.otp });
  }

  console.log("data", data);

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ message: error?.data?.message, type: "error" }));
    }

    if (isSuccess) {
      dispatch(login(data));
      navigate("/");
    }
  }, [isError, dispatch, error, isSuccess, data, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold">
        Two-Step Verification 💬
      </p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="otp"
          label="Type your 6 digit security code"
          control={control}
          Component={OTPInput}
        />
        <Button variant="contained" type="submit">
          {isLoading && <CircularProgress size="16px" className="mr-1" />}
          Verify my account
        </Button>
      </form>
      <p className="mt-4">
        Didn&apos;t get the code? <Link to="/">Resend</Link>
      </p>
    </div>
  );
};
export default OTPVerifyPage;
