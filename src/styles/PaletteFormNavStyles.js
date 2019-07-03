import variables from "../variables";
import sizes from "./sizes";

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${variables.drawerWidth}px)`,
    marginLeft: variables.drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  navBtns: {
    marginRight: "1rem",
    display: "flex",
    width: "fit-content",
    "& a": {
      textDecoration: "none",
      marginRight: "1rem"
    }
  },
  button: {
    margin: "0 0.5rem"
  },
  goBackBtn: {
    width: "fit-content",
    whiteSpace: "nowrap",
    [sizes.down("xxs")]: {
      transform: "scale(0.5) translateX(31px)",
      marginRight: "0"
    }
  },
  saveBtn: {
    [sizes.down("xxs")]: {
      transform: "scale(0.5) translateX(-48px)"
    }
  },
  createAPalette: {
    [sizes.down("xxs")]: {
      fontSize: "1rem !important"
    }
  }
});

export default styles;
