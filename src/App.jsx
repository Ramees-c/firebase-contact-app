import Navbar from "./components/Navbar";

import { FiSearch } from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai";

function App() {
  return (
    <div className="max-w-[370px] mx-auto">
      <Navbar />
      <div className="flex gap-2">
      <div className="flex relative items-center flex-grow">
        <FiSearch className="ml-1 text-3xl text-white absolute" />
        <input
          type="text"
          className="h-10 flex-grow rounded-md border border-white bg-transparent text-white pl-9"
        />
      </div>
      <AiFillPlusCircle className="text-5xl text-white cursor-pointer" />
      </div>
    </div>
  );
}

export default App;
