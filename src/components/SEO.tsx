import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
  type?: string;
  author?: string;
}

export const SEO = ({
  title,
  description,
  keywords = "Abenezer Tilahun, Software Engineer, Ethiopia, Addis Ababa, Full Stack Developer, React Developer, TypeScript, Web Developer",
  ogImage = "https://abeno.me/og-image.png",
  url = "https://abeno.me",
  type = "website",
  author = "Abenezer Tilahun"
}: SEOProps) => {
  const fullTitle = title.includes('Abenezer Tilahun') 
    ? title 
    : `${title} | Abenezer Tilahun - Software Engineer`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};
