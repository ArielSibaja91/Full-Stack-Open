import { useState, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";

const Toggable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  return (
    <Box sx={{ marginY: 2 }}>
      <Box style={hideWhenVisible} sx={{ marginBottom: 2 }}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </Box>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant="outlined" color="error">cancel</Button>
      </div>
    </Box>
  );
});

Toggable.displayName = "Toggable";
// This is necessary for the forwardRef to work properly.

export default Toggable;
