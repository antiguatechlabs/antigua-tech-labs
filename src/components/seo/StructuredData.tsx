import Script from 'next/script';

interface StructuredDataProps {
  data: Record<string, unknown> | Record<string, unknown>[];
  idPrefix?: string;
}

export default function StructuredData({ data, idPrefix = 'structured-data' }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <Script
          key={index}
          id={`${idPrefix}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item),
          }}
        />
      ))}
    </>
  );
}
