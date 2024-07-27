import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

type LoginPageProps = {
  isSignup: boolean;
};

export default function LoginPage({ isSignup }: LoginPageProps) {
  return (
    <div className="h-[100vh] flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl">{isSignup ? "Register Account" : "Login"}</h1>
      <form className="flex flex-col gap-3">
        <TextField required label="Username" variant="outlined" />
        <TextField required label="Password" variant="outlined" />
        <Button variant="contained">{isSignup ? "Register" : "Login"}</Button>
      </form>
      {isSignup ? (
        <p>
          Already have an account?{" "}
          <Link to="/" className="underline">
            Login
          </Link>
        </p>
      ) : (
        <p>
          Don't have an account?{" "}
          <Link to="signup" className="underline">
            Register
          </Link>
        </p>
      )}
    </div>
  );
}
