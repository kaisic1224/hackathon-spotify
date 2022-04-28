import { Dispatch, SetStateAction, useState } from "react";

const LoadMore = ({
  endpoint,
  setFn
}: {
  endpoint: string;
  setFn: Dispatch<SetStateAction<any>>;
}) => {
  const [offset, setOffset] = useState(0);
  return <div>Load More...</div>;
};
export default LoadMore;
