import { ReactNode } from "react";
import { inter } from "./fonts";

export function DefaultButton(
  {children, onClick, disabled, full}: 
  {children: ReactNode, disabled?: boolean, full?: boolean, onClick?: () => void}) 
{
  return (
    <button className={`
      bg-white rounded-3xl border-0 text-black 
      font-semibold text-sm px-6 py-2 cursor-pointer ${full ? "w-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function VerifyButton(
  {children, onClick, color, disabled, full}: 
  {children: ReactNode, color: string, disabled?: boolean, full?: boolean, onClick?: () => void}
) 
{
  return (
    <button className={`
      ${color} rounded-3xl border-0 text-white 
      font-semibold text-sm px-6 py-2 cursor-pointer ${full ? "w-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export function SecondaryButton({children}: {children: ReactNode}) {
  return (
    <div className="
      bg-transparent rounded-3xl border-[1px] border-white 
      font-semibold text-sm px-4 py-2 cursor-pointer text-white"
    >
      {children}
    </div>
  )
}

export function EventButton(
  {children, onClick, disabled, selected }: 
  {children: ReactNode, selected: boolean, disabled?: boolean, onClick?: () => void}
) {
  return (
    <button className={`
      ${selected ? 'bg-background-second text-white' : 'bg-background-main text-[#818181]'} 
      rounded-md ${inter.className} text-sm py-1 px-4 cursor-pointer text-white`}
      onClick={onClick} disabled={disabled}
    >
      {children}
    </button>
  )
}

