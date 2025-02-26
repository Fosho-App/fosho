import { BiTrophy } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineLocalActivity } from "react-icons/md";
import { PiSquaresFourBold } from "react-icons/pi";

export default function FooterNav({selectedOption}: {selectedOption: number}) {
  const menuOptions = [0,1,2,3,4]

  return (
    <div className="fixed bottom-0 left-0 h-12 bg-background-main 
      w-full flex items-center justify-evenly text-white text-3xl"
    >
      {menuOptions.map((option) => (
        <span 
          key={option}
          className={`${option === selectedOption ? 'opacity-100' : 'opacity-30'} cursor-pointer`}
        >
          {
            option === 0 ?
              <a href="/community"><PiSquaresFourBold /></a> :
            option === 1 ?
              <MdOutlineLocalActivity /> :
            option === 2 ?
              <a href="/leaderboard"><BiTrophy /></a> :
            option === 3 ?
              <a href="/rewards"><IoDiamondOutline /></a> :
              <a href="/profile"><FaUser className="text-2xl"/></a>
          }
        </span>
      ))}
    </div>
  )
}