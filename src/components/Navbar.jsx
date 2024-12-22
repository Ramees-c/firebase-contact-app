import React from "react";

function Navbar() {
  return (
    <div className="my-4 flex h-[60px] rounded-lg bg-white items-center justify-center gap-2 text-xl font-medium">
      <img src="./firebase.svg" alt="logo" />
      <h1>Firebase Contact App</h1>
    </div>
  );
}

export default Navbar;
