import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type LoginPageProps = {
  isSignup: boolean;
};

export default function LoginPage({ isSignup }: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  console.log(username)
  console.log(password)

  let navigate = useNavigate();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      navigate("/products");
    }
  };

  return (
    <div className="h-[100vh] flex flex-col gap-10 justify-center items-center">
      <h1 className="text-4xl">{isSignup ? "Register Account" : "Login"}</h1>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          submitForm(e);
        }}
      >
        <TextField
          ref={usernameRef}
          required
          label="username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          ref={passwordRef}
          required
          label="password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          {isSignup ? "Register" : "Login"}{" "}
        </Button>
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
