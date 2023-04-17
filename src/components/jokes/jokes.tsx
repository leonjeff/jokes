import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { JokeI } from "../../interfaces/joke";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";

export default function Jokes() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [jokes, setJokes] = useState<JokeI[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      fetch("https://retoolapi.dev/zu9TVE/jokes")
        .then((response) => response.json())
        .then((data) => setJokes(data));
    } else {
      navigate("/login");
    }
  }, [navigate, token]);

  var rowData = jokes?.map((joke) => ({
    id: joke.id,
    title: joke.Title,
    author: joke.Author,
    createdAt: joke.CreatedAt,
    views: joke.Views,
  }));

  const setColorViews = {
    "views-25": (params: any) => params.value <= 25,
    "views-50": (params: any) => params.value >= 26 && params.value <= 50,
    "views-75": (params: any) => params.value >= 51 && params.value <= 75,
    "views-100": (params: any) => params.value > 75,
  };

  const dateFormatter = (date: any) => {
    const dateFormatted = DateTime.fromISO(date).toFormat("dd MMM y");
    return dateFormatted;
  };

  const emailFormatter = (email: string) => {
    const atSignIndex = email.indexOf("@");
    const dotIndex = email.lastIndexOf(".");
    const domain = email.substring(atSignIndex + 1, dotIndex);
    const newEmail = email.replace(domain, "***");
    return newEmail;
  };

  const [columnDefs] = useState([
    {
      headerName: "Title",
      field: "id",
      flex: 1,
      resizable: true,
      cellRenderer: (params: any) => {
        return <a href={"/jokes/" + params.value}> {params.data.title} </a>;
      },
    },
    {
      headerName: "Author",
      field: "author",
      flex: 1,
      resizable: true,
      cellRenderer: (params: any) => {
        return emailFormatter(params.value);
      },
    },
    {
      headerName: "Created At",
      field: "createdAt",
      flex: 1,
      resizable: true,
      cellRenderer: (params: any) => {
        return dateFormatter(params.value);
      },
    },
    {
      headerName: "Views",
      field: "views",
      flex: 1,
      resizable: true,
      cellClassRules: setColorViews,
    },
  ]);

  const [gridApi, setGridApi] = useState<any>(5);

  const onPaginationPageSize = (pageSize: any) => {
    setGridApi(pageSize);
  };

  return (
    <>
      {token ? (
        <Grid
          className="ag-theme-alpine"
          sx={{ p: 3, paddingTop: "100px", height: "80vh", width: "100%" }}
        >
          {location.pathname === "/jokes" ? (
            <>
              <Link to="new" className="add">
                Add New Joke
              </Link>

              <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={gridApi}
              />
              <select
                onChange={(e) => {
                  onPaginationPageSize(e.target.value);
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </>
          ) : null}

          <Outlet />
        </Grid>
      ) : null}
    </>
  );
}
