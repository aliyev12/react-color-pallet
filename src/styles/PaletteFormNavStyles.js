import variables from "../variables";

const styles = theme => ({
  root: {
    display: "flex"
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
    whiteSpace: "nowrap"
  },
  saveBtn: {}
});

export default styles;
