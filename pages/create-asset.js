/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* pages/create-asset.js */
import { useState } from "react";
import { useRouter } from "next/router";
import { useCreateMarketItem } from "../hooks/hooks";
import { uploadFileWithMetadata } from "../hooks/useIPFS";
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
  const handleOnChangeFile = (e) =>{
    if(event.target.files.length > 0){
     setFileMetadata({
       file: event.target.files[0], 
       url: URL.createObjectURL(event.target.files[0])
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
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        {formInput.validationMessage && <EmptyPageMessage title={formInput.validationMessage} />}
        <input
          placeholder="Asset Name"
          className="mt-8 border rounded p-4"
          onChange={(e) => setFormInput({ ...formInput, name: e.target.value })}
        />
        <textarea
          placeholder="Asset Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, description: e.target.value })
          }
        />
        <input
          placeholder="Asset Price in Eth"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            setFormInput({ ...formInput, price: e.target.value })
          }
        />
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={handleOnChangeFile}
        />
        {fileMetadata.url && <img className="rounded mt-4" width="350" src={fileMetadata.url} />}
        <button
          onClick={handleCreateMarketItem}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create Digital Asset
        </button>
      </div>
    </div>
  );
}
