import { useState } from "react";
import { JokeI } from "../../interfaces/joke";
import { JokeForm, FormProps } from "./form";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const NewJoke = () => {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [joke, setJoke] = useState<JokeI>({
    Body: "",
    Title: "",
    Views: 0,
    Author: "",
    CreatedAt: "",
    Joke: "",
  });

  const addNewJoke = () => {
    fetch("https://retoolapi.dev/zu9TVE/jokes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertSuccess(true);
        setMessage(
          "Joke edited successfully! You'll be redirected to jokes page"
        );
        setTimeout(() => {
          navigate("/jokes");
        }, 2000);
      })
      .catch((error) => {
        setAlertError(true);
        setMessage("Error: Something wrong happened!");
      });
  };

  return (
    <Grid>
      <h1>Add New Joke</h1>

      {alertSuccess && <Alert severity="success">{message}</Alert>}
      {alertError && <Alert severity="error">{message}</Alert>}
      <Link to="/jokes" className="add">
        View Jokes List
      </Link>
      <JokeForm
        Title={joke?.Title}
        Body={joke?.Body}
        Views={joke?.Views}
        Author={joke?.Author}
        CreatedAt={joke?.CreatedAt}
        Joke={joke?.Joke}
        handlerChange={<P extends keyof FormProps>(
          prop: P,
          value: FormProps[P]
        ) => {
          setJoke({ ...joke, [prop]: value });
        }}
        sendData={addNewJoke}
        isEdit={false}
      />
    </Grid>
  );
};
export { NewJoke };
