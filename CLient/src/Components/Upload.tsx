
import React from 'react'
import { IKContext, IKUpload } from 'imagekitio-react'
import { toast } from 'react-toastify'

type UploadProps = {
  onUploadSuccess: (url: string) => void
}

const Upload = ({ onUploadSuccess }: UploadProps) => {

  const authenticator = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/blogs/upload-auth`
    )

    if (!response.ok) {
      throw new Error('Authentication failed')
    }

    return await response.json()
  }
  const onSuccess = () => {
    toast.success('Imge uploaded successfully')
  }

  const onError= (err) => {
    console.log(err)
    toast.error('Image upload failed')
    

  }
  return (
    <IKContext
      publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="blog-image"
        useUniqueFileName={true}
        onSuccess={(response: { url: string }) => {
          console.log('Uploaded:', response)
          onUploadSuccess(response.url)
        }}
        onError={(error: unknown) => {
          console.error('Upload failed:', error)
        }}
      />
    </IKContext>
  )
}

export default Upload
