import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 justify-center items-center">
      <TextField required label="Username" variant="outlined" />
      <TextField required label="Password" variant="outlined" />
      <Button variant="contained">Login</Button>
    </form>
  );
}
