import React from 'react'
import { IKContext, IKUpload } from 'imagekitio-react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '@clerk/react'



const Upload = () => {
  const { getToken } = useAuth()

  const authenticator = async () => {
    const token = await getToken()

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/blogs/upload-auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.data
  }

  const onSuccess = (response: { url: string }) => {
    toast.success('Image uploaded successfully')
    console.log('Uploaded:', response)
    
  }

  const onError = (error: unknown) => {
    console.error('ImageKit upload error:', error)
    toast.error('Image upload failed')
  }

  return (
    <IKContext
      publicKey={import.meta.env.VITE_IMAGEKIT_PUBLICKEY}
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="blog-image"
        useUniqueFileName={true}
        onSuccess={onSuccess}
        onError={onError}
      />
    </IKContext>
  )
}

export default Upload