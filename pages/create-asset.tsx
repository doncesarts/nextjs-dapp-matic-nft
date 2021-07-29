/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* pages/create-asset.js */
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useCreateMarketItem } from "../hooks/hooks";
import { uploadFileWithMetadata } from "../hooks/useIPFS";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../components/EmptyPageMessage' was resolv... Remove this comment to see the full error message
import EmptyPageMessage from "../components/EmptyPageMessage";

export default function CreateAsset() {
  const [fileMetadata, setFileMetadata] = useState({url: null, file:null});
  const [formInput, setFormInput] = useState({
    price: "",
    name: "",
    description: "",
    validationMessage: "",
  });
  const { createMarketItem } = useCreateMarketItem();

  const router = useRouter();
  // handlers
  const handleOnChangeFile = (e: any) => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if((event.target as any).files.length > 0){
     setFileMetadata({
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    file: (event.target as any).files[0],
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    url: URL.createObjectURL((event.target as any).files[0])
});
    }
  }

  async function handleCreateMarketItem() {
    const { name, description, price } = formInput;
    if (!name || !description || !price || !fileMetadata.url) {
      setFormInput({
        ...formInput,
        validationMessage: "Provide all mandatory fields.",
      });
      return;
    }
    try {
          /* first, upload to IPFS */
      const url = await uploadFileWithMetadata(fileMetadata.file, { name, description})
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      await createMarketItem({url, price: formInput.price});
      router.push("/");
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }


  return (
    // @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message
    <div className="flex justify-center">
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      <div className="w-1/2 flex flex-col pb-12">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {formInput.validationMessage && <EmptyPageMessage title={formInput.validationMessage} />}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e: any) => setFormInput({ ...formInput, name: e.target.value })}
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e: any) => setFormInput({ ...formInput, description: e.target.value })
          }
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e: any) => setFormInput({ ...formInput, price: e.target.value })
          }
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={handleOnChangeFile}
        />
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        {fileMetadata.url && <img className="rounded mt-4" width="350" src={fileMetadata.url} />}
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        <button
          onClick={handleCreateMarketItem}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
        </button>
      {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
      </div>
    {/* @ts-expect-error ts-migrate(7026) FIXME: JSX element implicitly has type 'any' because no i... Remove this comment to see the full error message */}
    </div>
  );
}
