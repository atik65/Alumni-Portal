import Script from "next/script";

const JsonLd = ({ data }) => (
  <Script
    id={data["@id"]}
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
