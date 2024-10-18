'use client'

import { useParams } from "next/navigation"

export default function Profile() {
  const params = useParams()
  const community = params.community as string
  console.log(params)
  
  return (
    <div className="">
      Events by {community}
    </div>
  )
}