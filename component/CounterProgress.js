import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const CounterProgress = ({start, end, status, current}) => {

  const WeToolTip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {

      color: theme.palette.common.black,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      top: "15px",
      maxWidth: 'none',
      color: "#00B2FF",
      fontSize: "15px",
      fontFamily: 'Sk-Modernist-Mono',
      backgroundColor: theme.palette.common.black,
    },
  }));
  const containerStyles = {
    height: 10,
    width: '100%',
    backgroundColor: "#020518",
    borderRadius: 50,
    position: 'relative'
  }
  
  let fillerStyles = {
    height: '60%',
    width: `${((current - start) / (end - start)) * 100 < 2 ? 2 : ((end - start) / (end - start)) * 100}%`,
    transition: 'width 1s ease-in-out',
    background: `linear-gradient(92.09deg, rgb(48, 215, 253) -11.68%, rgb(3, 107, 226) 97.36%)`,
    borderRadius: '20px',
    textAlign: 'right',
    position: 'relative'
  }




  const flexStyles = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: '0px 3px'
  }
  return (
    <div style={containerStyles}>
      <div style={flexStyles} >
        <div style={fillerStyles} className={status == 0 ? "progress-custom-bar active" : "progress-custom-bar"}></div>
      </div>

    </div>
  );
};


export default CounterProgress;