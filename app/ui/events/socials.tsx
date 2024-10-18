import { BsTwitterX } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="socials flex gap-4">
      <a href="https://x.com/islandDAO_DL">
        <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
          <BsTwitterX className="text-sm"/>
        </div>
      </a>
      <a href="https://t.me/+CLlS-6Q12ak4Mjhk">
      <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
        <FaTelegramPlane />
      </div>
      </a>
      <div className="bg-gradient-to-b from-[#F3FFF5] to-[#BDEBC4] rounded-full p-2">
        <img src="/images/islanddao-realms.png" width={16} height={16}/>
      </div>
    </div>
  )
}