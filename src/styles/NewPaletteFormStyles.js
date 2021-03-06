import variables from "../variables";
import { makeStyles } from "@material-ui/core/styles";
/*
Warning: Material-UI: the key `drawer` provided to the classes property is not implemented in PaletteFormNav.
You can only override one of the following: root,hide,appBar,appBarShift,menuButton,navBtns,button,goBackBtn,saveBtn,createAPalette.
*/
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
    marginBottom: "11px",
    width: "100%",
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
    marginLeft: 0,
    paddingBottom: "20px"
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
