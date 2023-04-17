import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { JokeI } from "../../interfaces/joke";
import { JokeForm, FormProps } from "./form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Detail = () => {
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [message, setMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [joke, setJoke] = useState<JokeI>({
    Body: "",
    Title: "",
    Views: 0,
    Author: "",
    CreatedAt: "",
    Joke: "",
  });

  useEffect(() => {
    fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`)
      .then((response) => response.json())
      .then((data) => setJoke(data));
  }, [id]);

  const sendData = () => {
    fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
      method: "PUT",
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

  const deleteData = () => {
    fetch(`https://retoolapi.dev/zu9TVE/jokes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joke),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertSuccess(true);
        setMessage("Joke deleted successfully!");
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
      <h1>Joke Detail</h1>

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
        sendData={sendData}
        deleteData={deleteData}
        isEdit={true}
      />
    </Grid>
  );
};
export { Detail };
