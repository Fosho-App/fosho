import { bebas, inter } from "../fonts";
import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function IslandDaoEvent() {
  return (
    <div className={`${inter.className} w-full flex gap-4 bg-gradient-to-b from-[#F3FFF5] to-[#C5F0CC] shadow-event p-4 rounded-lg`}>
      <div className="bg-gradient-to-b from-[#73A584] to-[#062310] h-auto w-[5px] rounded-l-lg"></div>
      <div className="w-full">
        <p className="text-light-green text-sm">Wed, Oct. 18 2:00PM</p>
        <h3 className="text-primary-green font-semibold">First Day Check-in &ldquo;tick&rdquo;</h3>
        <p className="text-light-green text-sm">Limit: 12/30 People</p>
        <div className="flex gap-2 mt-4">
        <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
          <p className="text-sm text-light-green">Cost</p>
          <h4 className="text-primary-green font-bold">0.005 SOL</h4>
        </div>
        <div className="w-1/2 bg-[#F3FFF5] py-2 px-4 rounded-lg">
          <p className="text-sm text-light-green">Reward</p>
          <h4 className="text-primary-green font-bold">500 ISL</h4>
        </div>
        </div>
      </div>
    </div>
  )
}