import { FormEvent } from "react";
import { inter } from "../fonts";
import { DefaultButton } from "../buttons";
import { ProfileData } from "@/app/profile/page";

function FormElement(
  {elementId, placeholder, label, handleChange} :
  {elementId: string, placeholder: string, label: string, handleChange: (t: string, v: string) => void}
) {
  return (
    <div className="mb-4">
      <label htmlFor={elementId} className={`${inter.className} font-bold text-sm`}>{label}</label><br />
      <input 
        type="text" 
        id={elementId}
        onChange={e => handleChange(elementId, e.target.value)}
        className="bg-[#222222] border-[1px] border-[#414141] rounded-md w-full
        placeholder:text-[#9A9A9A] py-[2px] placeholder:font-sans placeholder:text-xs placeholder:pl-2
        max-w-[480px]"
        placeholder={placeholder}
      />
    </div>
  )
}

export default function ProfileForm({
  profile, setProfile, updateProfile
}: {
  profile: ProfileData,
  setProfile: (v: ProfileData) => void,
  updateProfile: () => void
}) {

  function handleChange(type: string, newValue: string) {
    setProfile({...profile, [type]: newValue})
  }

  return (
    <form className="m-2 flex flex-col">
      <FormElement handleChange={handleChange} elementId="name" placeholder="Full Name" label="Name"/>
      <FormElement handleChange={handleChange} elementId="twitter" placeholder="@Handle" label="Twitter (X)"/>
      <FormElement handleChange={handleChange} elementId="telegram" placeholder="@Handle" label="Telegram"/>
      <FormElement handleChange={handleChange} elementId="aboutMe" placeholder="Tell us about yourself" label="About Me"/>
      <div className="w-4/6 text-center m-auto mt-2">
        <DefaultButton onClick={updateProfile}>Update Profile</DefaultButton>
      </div>
    </form>
  )
}