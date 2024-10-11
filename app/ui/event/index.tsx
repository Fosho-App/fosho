import { bebas, inter } from "../fonts";
import Image from "next/image";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function Event() {
  return (
    <div className={`${inter.className} w-full bg-background-main shadow-event p-4 rounded-lg`}>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="">
            <Image src="/images/islanddao-logo.png" width={32} height={32} alt="island-dao" />
          </div>
          <h3 className={bebas.className}>Island DAO</h3>
        </div>
        <MdOutlineCalendarMonth className="text-secondary-color text-xl" />
      </div>
      <p className="text-secondary-color text-sm mt-4">Wed, Oct. 18 2:00PM</p>
      <h3 className="text-white font-semibold">First Day Check-in &ldquo;tick&rdquo;</h3>
      <p className="text-secondary-color text-sm">Limit: 12/30 People</p>
      <div className="flex gap-2 mt-4">
      <div className="w-1/2 bg-[#1F1F1F] py-2 px-4 rounded-lg">
        <p className="text-sm text-secondary-color">Cost</p>
        <h4 className="text-white font-bold">0.005 SOL</h4>
      </div>
      <div className="w-1/2 bg-[#1F1F1F] py-2 px-4 rounded-lg">
        <p className="text-sm text-secondary-color">Reward</p>
        <h4 className="text-white font-bold">500 ISL</h4>
      </div>
      </div>
    </div>
  )
}