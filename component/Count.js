import { useEffect, useState } from "react";




export default function Count({start, end}) {
    const [daysr, setDaysr] = useState(0);
    const [hoursr, setHoursr] = useState(0);
    const [minutesr, setMinutesr] = useState("00");
    const [secondsr, setSecondsr] = useState("00");

    const getTimeUntil = (deadline, endtime) => {
        let target = new Date(deadline);
        target = new Date(
          target.getUTCFullYear(),
          target.getUTCMonth(),
          target.getUTCDate(),
          target.getUTCHours(),
          target.getUTCMinutes(),
          target.getUTCSeconds()
        );
        const now = new Date();
    
        var nowUTC = new Date(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours(),
          now.getUTCMinutes(),
          now.getUTCSeconds()
        );
        const time = Date.parse(target) - Date.parse(new Date(nowUTC));
    
        let Endtarget = new Date(endtime);
        Endtarget = new Date(
          Endtarget.getUTCFullYear(),
          Endtarget.getUTCMonth(),
          Endtarget.getUTCDate(),
          Endtarget.getUTCHours(),
          Endtarget.getUTCMinutes(),
          Endtarget.getUTCSeconds()
        );
        const differenceEnd = Date.parse(Endtarget) - Date.parse(new Date(nowUTC));
        if (time > 0) {
          const sec = Math.floor((time / 1000) % 60)
          const min = Math.floor((time / 1000 / 60) % 60)
          const hrs = Math.floor((time / (1000 * 60 * 60)) % 24)
          const dy = Math.floor(time / (1000 * 60 * 60 * 24))
          setSecondsr(sec >= 10 ? sec : "0" + sec);
          setMinutesr(min >= 10 ? min : "0" + min);
          setHoursr(hrs >= 10 ? hrs : "0" + hrs);
          setDaysr(dy >= 10 ? dy : "0" + dy);
        } else if (time < 0 && differenceEnd > 0) {
          const sec = Math.floor((differenceEnd / 1000) % 60)
          const min = Math.floor((differenceEnd / 1000 / 60) % 60)
          const hr = Math.floor((differenceEnd / (1000 * 60 * 60)) % 24)
          const dy = Math.floor(differenceEnd / (1000 * 60 * 60 * 24))
          setSecondsr(sec >= 10 ? sec : "0" + sec);
          setMinutesr(min >= 10 ? min : "0" + min);
          setHoursr(hr >= 10 ? hr : "0" + hr);
          setDaysr(dy >= 10 ? dy : "0" + dy);
        } else if (differenceEnd < 0) {
        }
      };
      setInterval(() => getTimeUntil(start, end), 1000);

    return (
        <>
         <div className="d-flex" style={{ placeContent: 'center', marginTop: '15px', gap: '10px' }}>
                            <div className="timer_x1 text-center">
                              <div className="d-flex flex-column">
                                <b>{daysr}</b>Days
                              </div>
                            </div>
                            <div className="timer_x1 text-center">
                              <div className="d-flex flex-column">
                                <b>{hoursr}</b>Hours
                              </div>
                            </div>
                            <div className="timer_x1 text-center">
                              <div className="d-flex flex-column">
                                <b>{minutesr}</b>Minutes
                              </div>
                            </div>
                            <div className="timer_x1 text-center">
                              <div className="d-flex flex-column">
                                <b>{secondsr}</b>Seconds
                              </div>
                            </div>
                          </div>
        </>
    )
}