import { DefaultButton } from "@/app/ui/buttons";
import Event from "@/app/ui/event";
import { bebas } from "@/app/ui/fonts";

export default function Commitments() {
  return (
    <div className="max-w-[720px] m-auto">
      <div className="w-full p-4 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="">LOGO</div>
          <div className="mr-4">WALLET</div>
        </div>
        <div className="flex justify-between items-center">
          <h2 className={`${bebas.className} text-2xl`}>Commitments</h2>
          <DefaultButton>Claim Rewards</DefaultButton>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#1F1F1F] py-1 px-4 rounded-lg cursor-pointer">
            Upcoming 
            <span className="ml-2 rounded-full bg-red-600 py-1 px-2 text-xs text-white">7</span>
          </div>
          <div className="text-secondary-color py-1 px-4 rounded-lg cursor-pointer">
            Completed 
            <span className="bg-[#1F1F1F] ml-2 rounded-full py-1 px-2 text-xs text-white">34</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Event />
          <Event />
          <Event />
        </div>
      </div>
      <div className="fixed bottom-0 h-12 bg-background-main w-full md:w-[720px] flex items-center justify-evenly">
        <div className="">Tab 1</div>
        <div className="">Tab 2</div>
      </div>
    </div>
  )
}