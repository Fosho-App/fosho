import { EventData } from "@/app/community/events/create/page";
import { bebas } from "../fonts";
import {BN} from "@coral-xyz/anchor";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { TokenHoldingReturnType } from "@/app/hooks/useTokenHolding";
import { ellipsify } from "@/app/utils";

export default function CreateEventForm(
  {event, tokens, setEvent}: 
  {event: EventData, tokens: TokenHoldingReturnType[], setEvent: (e: EventData) => void}
) {

  function handleChange(type: string, newValue: string | BN | number) {
    setEvent({...event, [type]: newValue})
  }

  function handleDateChange(newValue: string, isDate: boolean, isEventDate: boolean) {
    if (isEventDate) {
      const currentDate = new Date(event.eventDate)
      const newDateString = isDate ?
        newValue + " " + currentDate.toTimeString().substring(0,8) :
        `${currentDate.getFullYear()}-${(new Date(currentDate).getMonth()+1).toString().padStart(2,"0")}-${currentDate.getDate()} ${newValue}`
  
      const newDate = Date.parse(newDateString)
      
      setEvent({...event, eventDate: newDate})

    } else {
      const currentDate = new Date(event.registrationDate)
      const newDateString = isDate ?
        newValue + " " + currentDate.toTimeString().substring(0,8) :
        `${currentDate.getFullYear()}-${(new Date(currentDate).getMonth()+1).toString().padStart(2,"0")}-${currentDate.getDate()} ${newValue}`

      const newDate = Date.parse(newDateString)

      setEvent({...event, registrationDate: newDate})
    }
  }
  
  return (
    <div className="">
      <div className="flex flex-col gap-[2px]">
        <label htmlFor="" className={`${bebas.className}`}>Event name</label>
        <input type="text" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
          value={event.name} onChange={e => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Commitment Fee</label>
        <input type="number" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
          placeholder="in SOL"
          value={event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} onChange={e => handleChange(
            "commitmentFee", new BN(Math.round(parseFloat(e.target.value)*LAMPORTS_PER_SOL)))}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Max # of Attendees</label>
          <input type="number" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={event.maxAttendees} onChange={e => handleChange("maxAttendees", parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reward Per User</label>
          <input type="text" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={event.rewardAmount.toString()} onChange={e => handleChange("rewardAmount", new BN(e.target.value))}
          />
          <select onChange={e => handleChange("rewardMint", e.target.value)}>
            <option disabled selected value={undefined}> -- select mint -- </option>
            {tokens.map(token => (
              <option value={token.mint} key={token.mint}>
                {ellipsify(token.mint, 6)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Date</label>
          <input type="date" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={`${new Date(event.eventDate).getFullYear()}-${(new Date(event.eventDate).getMonth()+1).toString().padStart(2,"0")}-${new Date(event.eventDate).getDate()}`} 
            onChange={(e) => handleDateChange(e.target.value, true, true)}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Time</label>
          <input type="time" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={new Date(event.eventDate).toTimeString().substring(0,8)} 
            onChange={(e) => handleDateChange(e.target.value, false, true)}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reg. Deadline Date</label>
          <input type="date" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={`${new Date(event.registrationDate).getFullYear()}-${(new Date(event.registrationDate).getMonth()+1).toString().padStart(2,"0")}-${new Date(event.registrationDate).getDate()}`} 
            onChange={(e) => handleDateChange(e.target.value, true, false)}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reg. Deadline Time</label>
          <input type="time" id="" className="p-1 border-[1px] border-light-green rounded-lg" 
            value={new Date(event.registrationDate).toTimeString().substring(0,8)} 
            onChange={(e) => handleDateChange(e.target.value, false, false)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Description</label>
        <textarea id="" className="p-1 border-[1px] border-light-green rounded-lg" 
          value={event.description} onChange={e => handleChange("description", e.target.value)}
        />
      </div>
    </div>
  )
}