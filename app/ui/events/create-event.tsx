import { EventData } from "@/app/community/[community]/events/create/page";
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

  function handleMintChange(newValue: string) {
    setEvent({
      ...event, 
      rewardMint: newValue, 
      rewardDecimal: tokens.find(token => token.mint === newValue)?.decimals ?? 0,
      rewardAmount: "0"
    })
  }

  function handleDateChange(
    newValue: string, 
    property: 'registrationEndsAt' | 'eventStartsAt' | 'eventEndsAt', 
    isDate: boolean
  ) {
    const currentDate = new Date(event[property as keyof EventData] as number)
    const newDateString = isDate ?
      newValue + " " + currentDate.toTimeString().substring(0,8) :
      `${currentDate.getFullYear()}-${(new Date(currentDate).getMonth()+1).toString().padStart(2,"0")}-${currentDate.getDate()} ${newValue}`

    const newDate = Date.parse(newDateString)
    
    const newEvent = {...event}
    newEvent[property] = newDate
    setEvent(newEvent)
  }

  return (
    <div className="">
      <div className="flex flex-col gap-[2px]">
        <label htmlFor="" className={`${bebas.className}`}>Event name</label>
        <input type="text" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
          value={event.name} onChange={e => handleChange("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Commitment Fee (in SOL)</label>
        <input type="number" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
          placeholder="in SOL"
          value={event.commitmentFee.toNumber()/LAMPORTS_PER_SOL} onChange={e => handleChange(
            "commitmentFee", new BN(Math.round(parseFloat(e.target.value)*LAMPORTS_PER_SOL)))}
        />
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Capacity (0 for no cap)</label>
          <input type="number" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={event.capacity} onChange={e => handleChange("capacity", parseInt(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reward Per User</label>
          <input type="number" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={event.rewardAmount} 
            onChange={e => handleChange("rewardAmount", e.target.value)}
            disabled={typeof event.rewardMint !== 'string'}
          />
          <select 
            onChange={e => handleMintChange(e.target.value)} 
            className="bg-[#222222]" defaultValue={undefined}
          >
            <option value={undefined}> -- select mint -- </option>
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
          <label htmlFor="" className={`${bebas.className}`}>Event Starts On</label>
          <input type="date" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={`${new Date(event.eventStartsAt).getFullYear()}-${(new Date(event.eventStartsAt).getMonth()+1).toString().padStart(2,"0")}-${new Date(event.eventStartsAt).getDate()}`} 
            onChange={(e) => handleDateChange(e.target.value, 'eventStartsAt', true)}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Event Starts At</label>
          <input type="time" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={new Date(event.eventStartsAt).toTimeString().substring(0,8)} 
            onChange={(e) => handleDateChange(e.target.value, 'eventStartsAt', false)}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Event Ends On</label>
          <input type="date" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={`${new Date(event.eventEndsAt).getFullYear()}-${(new Date(event.eventEndsAt).getMonth()+1).toString().padStart(2,"0")}-${new Date(event.eventEndsAt).getDate()}`} 
            onChange={(e) => handleDateChange(e.target.value, 'eventEndsAt', true)}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Event Ends At</label>
          <input type="time" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={new Date(event.eventEndsAt).toTimeString().substring(0,8)} 
            onChange={(e) => handleDateChange(e.target.value, 'eventEndsAt', false)}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reg. Deadline Date</label>
          <input type="date" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={`${new Date(event.registrationEndsAt).getFullYear()}-${(new Date(event.registrationEndsAt).getMonth()+1).toString().padStart(2,"0")}-${new Date(event.registrationEndsAt).getDate()}`} 
            onChange={(e) => handleDateChange(e.target.value, 'registrationEndsAt', true)}
          />
        </div>
        <div className="flex flex-col gap-[2px] w-1/2">
          <label htmlFor="" className={`${bebas.className}`}>Reg. Deadline Time</label>
          <input type="time" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
            value={new Date(event.registrationEndsAt).toTimeString().substring(0,8)} 
            onChange={(e) => handleDateChange(e.target.value, 'registrationEndsAt', false)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Attendees can cancel ticket upto</label>
        <select 
          onChange={e => handleChange('cancellationOverAt', parseInt(e.target.value))} 
          className="bg-[#222222] h-8 rounded-md border-[1px] border-[#414141]" defaultValue={undefined}
        >
          {[...Array(6).keys()].map(day => (
            <option value={day} key={day}>
              {day ? `${day} days before the event starts` : `the event starts`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Organizer</label>
        <input type="text" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
          value={event.organizer} onChange={e => handleChange("organizer", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Location</label>
        <input type="text" id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
          value={event.location} onChange={e => handleChange("location", e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-[2px] mt-2">
        <label htmlFor="" className={`${bebas.className}`}>Description</label>
        <textarea id="" className="p-1 bg-[#222222] border-[1px] border-[#414141] rounded-lg" 
          value={event.description} onChange={e => handleChange("description", e.target.value)}
        />
      </div>
    </div>
  )
}