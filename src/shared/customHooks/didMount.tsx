import { useEffect, useState } from "react";

export default function useSkipFirstRender() {
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return [didMount, setDidMount];
}
