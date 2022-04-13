import { useEffect, useState } from "react";

const _localStorage = globalThis.localStorage ?? {};

export default function useLocalData(key: string, base = {}) {
  const [data, setData] = useState(
    _localStorage[key] ? JSON.parse(_localStorage[key]) : base
  );
  useEffect(() => {
    _localStorage[key] = JSON.stringify(data);
  }, [data]);
  return [data, setData];
}
