import { create } from "ipfs-http-client";
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
const client = create(`${process.env.NEXT_PUBLIC_IPFS_API}`);

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
