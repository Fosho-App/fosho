'use client'

import { useEffect, useState } from "react";
import { inter } from "../ui/fonts";
import ProfileForm from "../ui/profile/form";
import { useGetProfileData } from "../hooks/useProfileData";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import MainNav from "../ui/navs/main-nav";
import { BebasH2Heading } from "../ui/heading";
import FooterNav from "../ui/navs/footer-nav";

export type ProfileData = {
  name: string | null,
  twitter: string | null,
  telegram: string | null,
  about: string | null
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileData>({
    name: null,
    twitter: null,
    telegram: null,
    about: null
  });

  const {data: profileData} = useGetProfileData()
  const {mutateAsync, isPending, isError, error, isSuccess} = useUpdateProfile()

  async function updateProfile() {
    await mutateAsync(profile)
  }

  useEffect(() => {
    if (profileData) {
      setProfile(profileData)
    }
  }, [profileData])

  return (
    <div className={`${inter.className} max-w-[480px] m-2 mb-16`}>
      <MainNav />
      <BebasH2Heading title="Update Profile" />
      <ProfileForm 
        isPending={isPending} 
        profile={profile} 
        setProfile={setProfile} 
        updateProfile={updateProfile} 
      />
      {profileData === undefined && 
        <div className="text-sm my-2 text-center text-white">Fetching Profile...</div>
      }
      {isSuccess && 
        <div className="text-sm my-2 text-center text-green-500">Profile Updated!</div>
      }
      {
        isError && 
        <div className="text-sm my-2 text-center text-red-500">
          {error.message}
        </div>
      }
      <FooterNav selectedOption={4} />
    </div>
  )
}