'use client'

import { useEffect, useState } from "react";
// import createProfile from "../actions/createProfile";
// import { useCreateProfile } from "../hooks/useCreateProfile";
import { bebas, inter } from "../ui/fonts";
import Logo from "../ui/logo";
import ProfileForm from "../ui/profile/form";
import { WalletButtonProfile } from "../ui/wallet-button";
import { IoMdFastforward } from "react-icons/io";
import { useRouter } from "next/navigation";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";
import { WalletContextState, useWallet } from "@solana/wallet-adapter-react";
import { useGetProfileData } from "../hooks/useProfileData";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export type ProfileData = {
  name: string | null,
  twitter: string | null,
  telegram: string | null,
  about: string | null
}

export default function Profile() {
  const wallet = useWallet()
  const router = useRouter()
  const [profile, setProfile] = useState<ProfileData>({
    name: null,
    twitter: null,
    telegram: null,
    about: null
  });

  const {data: profileData} = useGetProfileData()
  const {mutateAsync, isPending, isError, error} = useUpdateProfile()

  async function updateProfile() {
    await mutateAsync(profile)
  }

  function continueToEvents() {
    router.push("/community/events");
  }

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
  }, [profileData])

  return (
    <div className={`${inter.className} max-w-[480px] m-auto`}>
      <div className="flex justify-between m-2 items-center">
        <Logo />
        <WalletButtonProfile />
      </div>
      <div className="my-4 flex items-center gap-2 ml-2 text-lg cursor-pointer" onClick={continueToEvents}>
        Continue to Events <IoMdFastforward />
      </div>
      <h2 className={`${bebas.className} text-center text-xl mt-2`}>Update Profile</h2>
      <ProfileForm isPending={isPending} profile={profile} setProfile={setProfile} updateProfile={updateProfile} />
      {
        isError && 
        <div className="text-sm my-2 text-center text-red-500">
          {error.message}
        </div>
      }
    </div>
  )
}