import React from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

import QRCode from "../components/qrcode";

const DynamicQRCode = dynamic(
  () => (import("../components/qrcode") as any) as Promise<typeof QRCode>,
  { ssr: false }
);

const Page = () => {
  return (
    <Layout title="cache-image">
      {" "}
      <DynamicQRCode
        text={`someTextReadyToBeParseToQRCode`}
        options={{ width: 200 }}
        canvasProps={{
          style: { display: "block", margin: "left" },
        }}
      />
    </Layout>
  );
};

Page.getInitialProps = () => ({
  namespacesRequired: ["common"],
});

export default Page;
