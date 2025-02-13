import Logo from "../logo";
import { WalletButtonProfile } from "../wallet-button";

export default function MainNav() {
  return (
    <div className="flex justify-between items-center">
      <Logo />
      <WalletButtonProfile />
    </div>
  )
}