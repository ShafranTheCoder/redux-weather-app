import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";

import { connect } from "react-redux";
import { setCity } from "../../store/actions";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  button: {
    color: "white"
  }
});

const TemporaryDrawer = function(props) {
  const city = useSelector(state => state.currentCity);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {["Kiev", "Moscow", "Lviv", "Warsaw", "New York", "Berlin", "Helsinki", "Washington", "London", "Rivne"].map(
          (text, index) => (
            <ListItem button key={text} onClick={() => dispatch(setCity(text))}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
        <ListItem>Current City: {city}</ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" className={classes.button} onClick={toggleDrawer("left", true)}>
        Choose City
      </Button>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
};
const mapStateToProps = function(state) {
  return {
    currentCity: state.currentCity
  };
};

const mapDispatchToProps = {
  setCity
};

const enhancer = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default enhancer(TemporaryDrawer);
