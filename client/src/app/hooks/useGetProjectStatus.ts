import { useEffect, useState } from "react";
import { Status } from "../types/status";
import { fetchProjectStatus } from "../api/status";

export const useGetProjectStatus = () => {
  const [status, setStatus] = useState<Status[]>([]);

  useEffect(() => {
    async function loadStatus() {
      const data = await fetchProjectStatus();
      setStatus(data);
    }
    loadStatus();
  }, []);

  return { status };
};
