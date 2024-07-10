import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AddProjectModal from "./AddProjectModal";

const ProjectDropdown = ({ id, navigate }) => {
  const [isModalOpen, setModalState] = useState(false);

  const handleDelete = async () => {
    try {
      const data = await axios.delete(`http://localhost:9000/project/${id}`);
      if (data.data.deletedCount > 0) {
        toast.success("Record deleted successfully");
        navigate("/");
        const customEvent = new CustomEvent("projectUpdate");
        document.dispatchEvent(customEvent);
      } else {
        toast.error("Record is already deleted");
      }
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const closeModal = () => {
    setModalState(false);
  };

  return (
    <>
      <div className='flex space-x-2'>
        <button
          onClick={() => setModalState(true)}
          className='transition-colors duration-75 flex w-full items-center rounded-md px-2.5 py-2 text-sm space-x-2.5 text-slate-500 hover:bg-indigo-500 hover:text-gray-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            width={15}
            viewBox='0 0 512 512'
          >
            <path d='M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7.8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z' />
          </svg>
          <h2 className='leading-none text-sm '>Edit</h2>
        </button>
        <button
          onClick={handleDelete}
          className='transition-colors duration-75 flex w-full items-center rounded-md px-2.5 py-2 text-sm space-x-2 text-slate-500 hover:bg-red-500 hover:text-gray-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            width={17}
            viewBox='0 0 24 24'
            strokeWidth={2.5}
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12.562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
            />
          </svg>
          <h2 className='leading-none text-sm '>Delete</h2>
        </button>
      </div>
      <AddProjectModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        edit={true}
        id={id}
      />
    </>
  );
};

export default ProjectDropdown;
