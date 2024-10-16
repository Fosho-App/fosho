'use client'

import { useState } from "react";
import createProfile from "../actions/createProfile";
import { useCreateProfile } from "../hooks/useCreateProfile";
import { bebas, inter } from "../ui/fonts";
import Logo from "../ui/logo";
import ProfileForm from "../ui/profile/form";
import { WalletButtonTop } from "../ui/wallet-button";
import { IoMdFastforward } from "react-icons/io";
import { useRouter } from "next/navigation";

export type ProfileData = {
  name: string | null,
  twitter: string | null,
  telegram: string | null,
  aboutMe: string | null
}

export default function Profile() {
  const {mutate} = useCreateProfile()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>({
    name: null,
    twitter: null,
    telegram: null,
    aboutMe: null
  });

  async function updateProfile() {
    console.log(profile)
  }

  function continueToEvents() {
    router.push("/community/events");
  }

  return (
    <div className={`${inter.className} max-w-[480px] m-auto`}>
      <div className="flex justify-between m-2 items-center">
        <Logo />
        <WalletButtonTop />
      </div>
      <div className="my-4 flex items-center gap-2" onClick={continueToEvents}>
        Continue to Events <IoMdFastforward />
      </div>
      <h2 className={`${bebas.className} text-center text-xl mt-2`}>Update Profile</h2>
      <ProfileForm profile={profile} setProfile={setProfile} updateProfile={updateProfile} />
    </div>
  )
}