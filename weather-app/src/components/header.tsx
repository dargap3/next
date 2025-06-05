import { BiCurrentLocation } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSunny } from "react-icons/io";

import { cn } from "@/utils/cn";

export const Header = () => {
  return (
    <header className="flex justify-between items-center flex-wrap sticky top-0 shadow-sm bg-white px-3 min-h-20 text-[var(--secondary-arcanine)]">
      <div className="flex items-center mr-5 text-3xl">
        <h1 className="mr-1 font-bold">Weather App</h1>
        <IoIosSunny className=" text-[var(--accent-arcanine)]" />
      </div>

      <nav className="flex justify-evenly sm:justify-evenly flex-row-reverse items-center flex-wrap text-2xl gap-1 w-full md:w-3/5">
        <section className=" flex items-center text-2xl">
          <FaLocationDot className="text-[var(--accent-arcanine)]" />
          <p className="text-sm">Location</p>
        </section>

        <form className={cn("flex items-center h-8 xs:w-3/4 text-sm")}>
          <input
            type="search"
            placeholder="Search location..."
            className="xs:flex-1 p-2 border border-[var(--primary-castform)] h-full rounded-l-md focus:outline-none focus:border:blue-500 "
          />
          <button className="text-[var(--primary-castform)] bg-[var(--secondary-castform)] rounded-r-md h-full cursor-pointer hover:opacity-85">
            <FaSearch className="m-2" />
          </button>
        </form>

        <BiCurrentLocation className="cursor-pointer hover:opacity-70" />
      </nav>
    </header>
  );
};
