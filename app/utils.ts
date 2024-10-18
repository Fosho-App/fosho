import { PublicKey } from "@solana/web3.js";

export function ellipsify(str: string, len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function removeZeros(numString: string) {
  const numArray = numString.split("").reverse()
  let run = true

  while (run) {
      if (numArray[0] === "0") {
          numArray.shift()
      } else {
          run = false
      }
  }

  return numArray.reverse().join("")
}


export const communityKey = new PublicKey("37DbFFh5pAZC9eUfDuWqE4eSi8YsjHcSa7WNFUAYCf3V")