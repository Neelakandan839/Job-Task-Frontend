import { AppBar, Toolbar, Typography, Button, } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import isAuth, { userType } from "../folder/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <AppBar style={{background:'green'}} position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '30px' }} className={classes.title}>
          JOBS
        </Typography>
        {isAuth() ? (
          userType() === "recruiter" ? (
            <>
              <Button color="inherit"  ><Link to='/home' style={{ textDecoration: "none", color: "white" }}>
                Home
              </Link></Button>
              <Button color="inherit" ><Link to='/addjobs' style={{ textDecoration: "none", color: "white" }}>
                Add Job</Link></Button>
              <Button color="inherit" >
                <Link to='/myjobs' style={{ textDecoration: "none", color: "white" }}>
                  posted jobs</Link>
              </Button>
              <Button color="inherit" >
                <Link to='/logout' style={{ textDecoration: "none", color: "white" }}>
                  Logout</Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" >
                <Link to='/home' style={{ textDecoration: "none", color: "white" }}>
                  Home
                </Link>
              </Button>
              <Button
                color="inherit"

              >
                <Link to='/applications' style={{ textDecoration: "none", color: "white" }}>
                  Jobs Status</Link>
              </Button>
              <Button color="inherit" >
                <Link to='/logout' style={{ textDecoration: "none", color: "white" }}>
                  Logout</Link>

              </Button>
            </>
          )
        ) : (
          <>
            <Button color="inherit">
              <Link to='/login' style={{ textDecoration: "none", color: "white" }}>Login</Link>
            </Button>
            <Button color="inherit">
              <Link to='/signup' style={{ textDecoration: "none", color: "white" }}>Signup</Link>
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;