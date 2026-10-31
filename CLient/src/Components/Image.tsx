
import { Image as IKImage } from '@imagekit/react';
import { useState } from 'react';

interface ImageType {
  src: string,
  className ?: string
  w ?: string | undefined
  h?:string | undefined
  alt?: string
}



const Image = ({ src, className, w, h, alt }: ImageType) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <img
        src="https://ik.imagekit.io/Proton/Blog%20/noImage.png"
        className={className}
        width={w}
        height={h}
        alt={alt || "Image not available"}
      />
    );
  }

  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      src={src}
      className={className}
      width={w}
      height={h}
      alt={alt || "Picture"}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export default Image;
