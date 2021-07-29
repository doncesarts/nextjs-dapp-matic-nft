import { create } from "ipfs-http-client";
const client = create({url:process.env.NEXT_PUBLIC_IPFS_API});

const uploadFileMetadata = ({
  name,
  description,
  image
}: any) => {
  const metadata = JSON.stringify({
    name,
    description,
    image,
  });
  return client.add(metadata);
};

const uploadFile = async (file: any) => {
  let added = await client.add(file, {
    progress: (prog) => console.log(`received: ${prog}`),
  });
  return `${process.env.NEXT_PUBLIC_IPFS_URI}${added.path}`;
};

export const uploadFileWithMetadata = async (file: any, metadata: any) => {
  //   Upload file and get image URI
  const fileUrl = await uploadFile(file);
  // Upload metadata
  const added = await uploadFileMetadata({ ...metadata, image: fileUrl });
  return `${process.env.NEXT_PUBLIC_IPFS_URI}${added.path}`;
};
