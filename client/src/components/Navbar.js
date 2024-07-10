import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [projects, setProjects] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch projects when component mounts or refresh is triggered
  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  // Fetch projects from API
  const fetchProjects = () => {
    axios
      .get("http://localhost:9000/projects")
      .then((res) => {
        setProjects(res.data);
        setRefresh(false); // Reset refresh state after fetching projects
      })
      .catch((error) => {
        toast.error("Failed to fetch projects");
      });
  };

  // Handle project added event
  const handleProjectAdded = useCallback(() => {
    setRefresh(true); // Trigger refresh when a new project is added
  }, []);

  // Handle project deleted event
  const handleProjectDeleted = useCallback(() => {
    setRefresh(true); // Trigger refresh when a project is deleted
  }, []);

  // Set up event listeners for project events
  useEffect(() => {
    document.addEventListener("projectAdded", handleProjectAdded);
    document.addEventListener("projectDeleted", handleProjectDeleted);

    return () => {
      document.removeEventListener("projectAdded", handleProjectAdded);
      document.removeEventListener("projectDeleted", handleProjectDeleted);
    };
  }, [handleProjectAdded, handleProjectDeleted]);

  return (
    <div className='bg-white shadow h-14 flex items-center justify-between px-4'>
      <ul className='flex space-x-4'>
        {projects.map((project) => (
          <li key={project._id}>
            <a
              href={`#${project.title}`}
              className='text-gray-600 cursor-not-allowed'
              tabIndex='-1'
            >
              {project.title}
            </a>
          </li>
        ))}
      </ul>
      <div className='ml-auto flex items-center'>
        <span className='bg-blue-500 text-white px-3 py-1 rounded-full'>
          {projects.length} Projects
        </span>
      </div>
    </div>
  );
};

export default Navbar;
