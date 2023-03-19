import React, { useEffect, useState } from "react";
// import "./styles.css";
function ThemeSwitch({p}) {
    let setTheme
    if(p){
        setTheme = p.setTheme

    }
    const [toggleTheme, setToggleTheme] = useState(
        () => JSON.parse(localStorage.getItem("toggleTheme")) || "dark-theme"
    );
    useEffect(() => {
        localStorage.setItem("toggleTheme", JSON.stringify(toggleTheme));
        setToggleTheme(toggleTheme)
        if(setTheme){
            setTheme(toggleTheme)
        }
        document.body.classList.add(toggleTheme);
        return () => {
            document.body.classList.remove(toggleTheme);
        };
    }, [toggleTheme]);

// todo
    return (
        <div className="theme-switch"
            onClick={() => toggleTheme === "dark-theme" ? setToggleTheme("dark-theme")+setTheme("dark-theme") : setToggleTheme("dark-theme")+setTheme("dark-theme")
            }
        >
            {toggleTheme === "dark-theme" ? <i className="ri-moon-line" style={{marginRight:'unset'}}></i> : <i className="ri-sun-line" style={{marginRight:'unset'}}></i>}
        </div>
    );
}

export default ThemeSwitch;
