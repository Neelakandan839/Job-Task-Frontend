import { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import "./App.css";

import Welcome, { ErrorPage } from "./components/Welcome";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Applications from "./components/Applications";
import CreateJobs from "./components/recruiter/AddJobs";
import MyJobs from "./components/recruiter/MyJobs";
import JobApplications from "./components/recruiter/JobApplications";
import AcceptedApplicants from "./components/recruiter/AcceptedApplicants";
import MessagePopup from "./folder/MessagePopup";


const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });
  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Routes>
              <Route exact path="/" element={<Welcome />} />

              <Route exact path="/login" element={<Login />} />

              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/logout" element={<Logout />} />

              <Route exact path="/home" element={<Home />} />

              <Route exact path="/applications" element={<Applications />} />

              <Route exact path="/addjobs" element={<CreateJobs />} />

              <Route exact path="/myjobs" element={<MyJobs />} />

              <Route exact path="/job/applications/:jobId" element={<JobApplications />} />

              <Route exact path="/employees" element={<AcceptedApplicants />} />

              <Route element={<ErrorPage />} />

            </Routes>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

export default App;