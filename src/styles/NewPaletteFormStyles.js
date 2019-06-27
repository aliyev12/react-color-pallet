import variables from "../variables";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: variables.drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: variables.drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    width: '100%',
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    height: `calc(100vh - 64px)`,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -variables.drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%",
    display: "flex"
  },
  button: {
    width: "49%",
    "&:first-child": {
      marginRight: "auto"
    }
  }
}));

export default useStyles;
