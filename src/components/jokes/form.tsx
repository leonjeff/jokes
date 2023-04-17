import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

export interface FormProps {
  Body?: string;
  Title?: string;
  Views?: number;
  Author?: string;
  CreatedAt?: string;
  Joke?: string;
  handlerChange: any;
  sendData: any;
  deleteData?: any;
  isEdit: boolean;
}

const JokeForm = ({
  Title,
  Body,
  Views,
  Joke,
  CreatedAt,
  Author,
  handlerChange,
  sendData,
  deleteData,
  isEdit,
}: FormProps) => {
  return (
    <Grid
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      noValidate
      autoComplete="off"
    >
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Title</FormHelperText>
          <TextField
            value={Title}
            onChange={(e) => {
              handlerChange("Title", e.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Author</FormHelperText>
          <TextField
            value={Author}
            onChange={(e) => {
              handlerChange("Author", e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Views</FormHelperText>
          <TextField
            value={Views}
            onChange={(e) => {
              handlerChange("Views", parseInt(e.target.value));
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 2, width: "50%" }} variant="outlined">
          <FormHelperText>Created At</FormHelperText>
          <TextField
            value={CreatedAt}
            onChange={(e) => {
              handlerChange("CreatedAt", e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "100%" }} variant="outlined">
          <FormHelperText>Body</FormHelperText>
          <TextField
            value={Body}
            onChange={(e) => {
              handlerChange("Body", e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item sx={{ display: "flex", flexDirection: "row" }}>
        <FormControl sx={{ m: 2, width: "100%" }} variant="outlined">
          <FormHelperText>Joke</FormHelperText>
          <TextField
            value={Joke}
            onChange={(e) => {
              handlerChange("Joke", e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <FormControl sx={{ m: 5, width: "10%" }} variant="outlined">
          <Button variant="contained" onClick={sendData}>
            Save
          </Button>
        </FormControl>
        {isEdit && (
          <FormControl sx={{ m: 5, width: "10%" }} variant="outlined">
            <Button
              variant="contained"
              style={{ background: "red" }}
              onClick={deleteData}
            >
              Delete
            </Button>
          </FormControl>
        )}
      </Grid>
    </Grid>
  );
};

export { JokeForm };

//gene