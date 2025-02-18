import { bebas } from "./fonts";

export function BebasH2Heading({title}: {title: string}) {
  return (
    <h2 className={`${bebas.className} text-xl mt-4 text-center`}>{title}</h2>
  )
}