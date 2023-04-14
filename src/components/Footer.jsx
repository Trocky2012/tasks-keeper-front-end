import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>By Thiago Trolle Cavalheiro / Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
