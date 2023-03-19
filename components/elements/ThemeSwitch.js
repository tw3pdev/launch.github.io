import React, { useEffect, useState } from "react";
// import "./styles.css";
function ThemeSwitch() {
    const [toggleTheme, setToggleTheme] = useState(
        () => JSON.parse(localStorage.getItem("toggleTheme")) || "dark-theme"
    );
    useEffect(() => {
        localStorage.setItem("toggleTheme", JSON.stringify(toggleTheme));
        document.body.classList.add(toggleTheme);
        return () => {
            document.body.classList.remove(toggleTheme);
        };
    }, [toggleTheme]);

    //todo
    return (
        <div className="theme-switch hidden-d"
            onClick={() => toggleTheme === "dark-theme" ? setToggleTheme("dark-theme") : setToggleTheme("dark-theme")
            }
        >
            {toggleTheme === "dar-theme" ? <i className="ri-moon-line"></i> : <i className="ri-sun-line"></i>}
        </div>
    );
}

export default ThemeSwitch;
