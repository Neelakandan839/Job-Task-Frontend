import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { SetPopupContext } from "../../App";
import apiList from "../../folder/apiList";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
}));

const JobTile = (props) => {
  const classes = useStyles();
  const navigate = useNavigate()
  // eslint-disable-next-line
  const { job, getData } = props;
  // eslint-disable-next-line
  const [jobDetails, setJobDetails] = useState(job);

  console.log(jobDetails);

  const postedOn = new Date(job.dateOfPosting);

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{job.title}</Typography>
          </Grid>
          <Grid item>Role : {job.jobType}</Grid>
          <Grid item>Salary : &#8377; {job.salary} per month</Grid>
          <Grid item>
            Duration :{" "}
            {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
          </Grid>
          <Grid item>Date Of Posting: {postedOn.toLocaleDateString()}</Grid>
          <Grid item>Number of Applicants: {job.maxApplicants}</Grid>
          <Grid item>
            Remaining Number of Positions:{" "}
            {job.maxPositions - job.acceptedCandidates}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Button
              variant="contained"
              style={{ background: 'green' }}
              className={classes.statusBlock}
              onClick={() => navigate(`/job/applications/${job._id}`)}
            >
              View Candidates
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const MyJobs = (props) => {
  const [jobs, setJobs] = useState([]);
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    axios
      .get(apiList.jobs, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h4" style={{ borderBottom: '4px red solid', marginBottom: '10px' }}>MY JOBS</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs
          direction="column"
          alignItems="stretch"
          justify="center"
        >
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return <JobTile job={job} getData={getData} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MyJobs;