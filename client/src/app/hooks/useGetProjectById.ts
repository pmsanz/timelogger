import { useEffect, useState } from "react";
import { Project } from "../types/project";
import { fetchProjectById } from "../api/projects";

export const useGetProjectById = (projectId: string | undefined) => {
  const [loadingProject, setLoading] = useState<boolean>(false);

  const [project, setProject] = useState<Project | null>(null);

  const projectIdCasted = Number(projectId);

  useEffect(() => {
    if (projectIdCasted) {
      setLoading(true);
      fetchProjectById(projectIdCasted).then((data) => {
        setProject(data);
        setLoading(false);
      });
    }
  }, [projectIdCasted]);

  const updateProjectState = (key: keyof Project, value: string) => {
    setProject((prev) => ({ ...prev!, [key]: value }));
  };

  return { loadingProject, project, updateProjectState };
};
