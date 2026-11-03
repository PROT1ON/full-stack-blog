import { Copy, Link } from 'lucide-react'
import React, { useState } from 'react'

const CopyLinkButton = () => {
    const [copyLink,setCopyLink] = useState(false)
    const url = window.location.href

    const CopyLink = async() => {
        try {
            await navigator.clipboard.writeText(url)
            setCopyLink(true)
        } catch (error) {
            console.log('Link not copied',)
        }
    }
  return (
   <button 
          onClick={copyLink}
          className=    {`flex  gap-2 px-4 py-3 border-gray-300 border rounded-full  `}>
            <Link />
            {copyLink ? <Check size={18} /> : <Copy size={18} />}
      {copyLink ? "Copied!" : "Copy Link"}
          </button>
  )
}

export default CopyLinkButton