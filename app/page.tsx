import Logo from "./ui/logo";

import { DefaultButton, SecondaryButton } from "./ui/buttons";
import { bebas, inter } from "./ui/fonts";

export default function Home() {
  return (
    <div className="h-screen w-[480px]">
      <div className="w-[480px] h-[60%] relative inline-block overflow-hidden">
        <img src="./images/home.png" alt="" className="absolute block top-0 left-0"/>
      </div>
      <div className="mx-8 mt-4 flex flex-col gap-4 w-2/3">
        <Logo />
        <h2 className={`${bebas.className} text-3xl`}>
          Is your gateway to Solana,
          your gateway to Solana 
          adventure awaits.
        </h2>
      </div>
      <div className={`${inter.className} flex mx-8 mt-16 gap-4`}>
        <DefaultButton>Connect Wallet</DefaultButton>
        <SecondaryButton>Learn More</SecondaryButton>
      </div>
    </div>
  );
}
