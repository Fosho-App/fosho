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