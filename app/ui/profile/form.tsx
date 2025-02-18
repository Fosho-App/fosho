import { inter } from "../fonts";
import { DefaultButton } from "../buttons";
import { ProfileData } from "@/app/profile/page";

function FormElement(
  {elementId, placeholder, label, currentValue, handleChange} :
  {elementId: string, placeholder: string, label: string, currentValue: string | null, handleChange: (t: string, v: string) => void}
) {
  return (
    <div className="mb-4">
      <label htmlFor={elementId} className={`${inter.className} font-bold text-sm`}>{label}</label><br />
      <input 
        type="text" 
        id={elementId}
        value={currentValue ?? ""}
        onChange={e => handleChange(elementId, e.target.value)}
        className="bg-[#222222] border-[1px] border-[#414141] rounded-md w-full text-sm
        placeholder:text-[#9A9A9A] py-1 placeholder:font-sans placeholder:text-xs
        max-w-[480px] mt-1 pl-2"
        placeholder={placeholder}
      />
    </div>
  )
}

export default function ProfileForm({
  profile, isPending, setProfile, updateProfile
}: {
  profile: ProfileData,
  isPending: boolean
  setProfile: (v: ProfileData) => void,
  updateProfile: () => void,
}) {

  function handleChange(type: string, newValue: string) {
    setProfile({...profile, [type]: newValue})
  }

  return (
    <div className="m-1 flex flex-col">
      <FormElement 
        handleChange={handleChange} 
        elementId="name" placeholder="Full Name" label="Name" currentValue={profile.name} 
      />
      <FormElement 
        handleChange={handleChange} 
        elementId="twitter" placeholder="@Handle" label="Twitter (X)" currentValue={profile.twitter}
      />
      <FormElement 
        handleChange={handleChange} 
        elementId="telegram" placeholder="@Handle" label="Telegram" currentValue={profile.telegram}
      />
      <FormElement 
        handleChange={handleChange} 
        elementId="about" placeholder="One liner about yourself.." label="About Me" currentValue={profile.about}
      />
      <div className="w-4/6 text-center m-auto mt-2">
        <DefaultButton 
          onClick={updateProfile}
          disabled={isPending}
        >
          {isPending ? 'Updating' : 'Update Profile'}
        </DefaultButton>
      </div>
    </div>
  )
}