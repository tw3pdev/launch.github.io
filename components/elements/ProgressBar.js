import React from "react";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const ProgressBar = (props) => {
  const { softCap, hardCap, filled, showSoftCap, presaleType, status, premiumColor, premiumColor2 } = props;

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
    height: 20,
    width: '100%',
    backgroundColor: "#020518",
    borderRadius: 50,
    margin: '20px 0 10px',
    position: 'relative'
  }


  function fairLaunchPercent() {
    const percent = (filled / softCap) * 100
    if (percent < 5) {
      return 5
    } else if (percent <= 100) {
      return percent
    } else {
      const minus = Math.floor(percent / 100) * 100
      return percent - minus
    }
  }
  let fillerStyles = {
    height: '70%',
    width: `${(filled / hardCap) * 100 < 5 ? 5 : (filled / hardCap) * 100}%`,
    transition: 'width 1s ease-in-out',
    background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`,
    borderRadius: '20px',
    textAlign: 'right',
    position: 'relative'
  }
  if (presaleType == 1) {
    fillerStyles = {
      height: '70%',
      width: `${fairLaunchPercent()}%`,
      transition: 'width 1s ease-in-out',
      background: `linear-gradient(92.09deg, ${premiumColor2} -11.68%, ${premiumColor} 97.36%)`,
      borderRadius: '20px',
      textAlign: 'right',
      position: 'relative'
    }
  }



  const fullStyles = {
    height: '70%',
    width: `98%`,
    transition: 'width 1s ease-in-out',
    background: premiumColor,
    borderRadius: '20px',
    textAlign: 'right',
    position: 'absolute'
  }
  const flexStyles = {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    padding: '0px 3px'
  }
  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    zIndex:3,
    fontSize: '30px',
    bottom: '0',
    cursor: 'default'
  }
  let softCapStyles = {
    height: '100%',
    width: `${(softCap / hardCap) * 100}%`,
    transition: 'width 1s ease-in-out',
    background: 'unset',
    borderRadius: '20px',
    textAlign: 'right',
    position: 'relative'
  }
  if (presaleType == 1) {
    softCapStyles = {
      height: '100%',
      width: `50%`,
      transition: 'width 1s ease-in-out',
      background: 'unset',
      borderRadius: '20px',
      textAlign: 'right',
      position: 'relative'
    }
  }
  return (
    <div style={containerStyles}>
      <div style={flexStyles} >
        <div style={fillerStyles} className={status == 1 ? "progress-custom-bar active" : "progress-custom-bar"}></div>
        {presaleType == 1 && (
          (filled / softCap) * 100 >= 100 && (
            <div style={fullStyles}></div>
          )
        )}
      </div>
      {softCap ? showSoftCap && (
        <div style={softCapStyles}>
          {presaleType != 1 && (
            <WeToolTip className="custom-tooltip" title={`Soft Cap on ${softCap} BNB`} arrow>
              <span style={labelStyles}>|</span>
            </WeToolTip>

          )}

        </div>
      ) : ""}

    </div>
  );
};


export default ProgressBar;