'use client'

import { useEffect, useState } from "react";
import { inter } from "../ui/fonts";
import ProfileForm from "../ui/profile/form";
import { IoMdFastforward } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useGetProfileData } from "../hooks/useProfileData";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import MainNav from "../ui/navs/main-nav";
import { BebasH2Heading } from "../ui/heading";

export type ProfileData = {
  name: string | null,
  twitter: string | null,
  telegram: string | null,
  about: string | null
}

export default function Profile() {
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
    router.push("/communities");
  }

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
  }, [profileData])

  return (
    <div className={`${inter.className} max-w-[480px] m-auto`}>
      <MainNav />
      <div className="my-4 flex items-center gap-2 ml-2 text-lg cursor-pointer" onClick={continueToEvents}>
        Continue to Events <IoMdFastforward />
      </div>
      <BebasH2Heading title="Update Profile" />
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