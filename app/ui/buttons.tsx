import { ReactNode } from "react";

export function DefaultButton(
  {children, onClick, disabled}: 
  {children: ReactNode, disabled?: boolean, onClick?: () => void}) 
{
  return (
    <button className="
      bg-white rounded-3xl border-0 text-black 
      font-semibold text-sm px-6 py-2 cursor-pointer"
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
      font-semibold text-sm px-4 py-2 cursor-pointer"
    >
      {children}
    </div>
  )
}

export function GradientButton(
  {children, disabled, full, onClick} : 
  {children: ReactNode, disabled?: boolean, full?: boolean, onClick?: () => void}
) {
  return (
    <button className={`text-white bg-gradient-to-b from-[#73A584] to-[#062310] 
      rounded-2xl py-2 px-4 text-sm font-semibold ${full ? "w-full" : ""}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}