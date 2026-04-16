import Image from 'next/image';

interface ArticleHeroImageProps {
  src?: string;
  alt: string;
}

export default function ArticleHeroImage({ src, alt }: ArticleHeroImageProps) {
  if (!src) return null;

  return (
    <div className="article-hero-image">
      <Image
        src={src}
        alt={alt}
        width={900}
        height={506}
        sizes="(max-width: 768px) 100vw, 900px"
        priority
      />
    </div>
  );
}
