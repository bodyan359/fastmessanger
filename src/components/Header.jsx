import React from "react";

const Header = React.forwardRef(({ username }, ref) => {
  return (
    <div ref={ref} className="Header">
      {/* <img alt="logo" src="https://web.telegram.org/img/logo_share.png" /> */}
      <h2> Welcome {username || "Anonymous"}</h2>
    </div>
  );
});

export default Header;
