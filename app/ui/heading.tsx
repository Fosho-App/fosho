import { bebas } from "./fonts";

export function BebasH2Heading({title}: {title: string}) {
  return (
    <h2 className={`${bebas.className} text-xl mt-2`}>{title}</h2>
  )
}