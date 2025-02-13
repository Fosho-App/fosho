import { bigShouldersText, inter } from "../fonts";

export default function EventHeader() {
  return (
    <div className="flex items-center gap-4 mt-4">
      <div className="">
        <img src="/images/islanddao-logo-2.png" width={250}/>
      </div>
      <div className="flex flex-col gap-1 text-white">
        <h1 className={`${bigShouldersText.className} text-3xl font-bold uppercase`}>Island Dao</h1>
        <p className={`${inter.className} text-xs mr-12 font-normal`}>
          IslandDAO will be hosted at a massive villa near the beachfront that we have converted into...
        </p>
      </div>
    </div>
  )
}