import React from "react";
import "./Header.css";

const Header = React.forwardRef(({ username }, ref) => {
  return (
    <div ref={ref} className="Header">
      {/* <img alt="logo" src="https://web.telegram.org/img/logo_share.png" /> */}
      <h2 className="welcome-text"> Welcome {username || "Anonymous"}</h2>
    </div>
  );
});

export default Header;
