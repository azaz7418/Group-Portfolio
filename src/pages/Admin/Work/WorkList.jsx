import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import { deleteProject, getAllProjects } from "../../../constants/userConstant";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineSmile, AiOutlineUsergroupAdd } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { Tooltip } from "antd";
import Swal from "sweetalert2";
import UpdateProject from "./UpdateProject";

const WorkList = () => {
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selected, setSelected] = useState("check");
  const { data: projectData } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });
  // console.log(projectData);

  const { mutate: deleteProjects, error: deleteError } = useMutation({
    mutationKey: ["deleteProject"],
    mutationFn: deleteProject,
    onSuccess: () => {
      // Invalidate the query on success to refresh data
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  if (deleteError) {
    return <div>error happen</div>;
  }
  const deleteProjectHandler = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProjects(id);
      }
    });
  };
  // console.log(editingProject, "azaz" )
  const editProjectHandler = (project) => {
    setEditingProject(project); // Opens the modal/form prefilled with user data
    setIsModalOpen(true);
    // console.log(editingProject);
  };

  return (
    <div>
      <Link to="/addWork">Add Work</Link>
      <div>
        <div className=" grid grid-cols-2 gap-y-8 mx-auto">
          {projectData?.data?.map((item, index) => {
            return (
              <div className=" group h-[250px] w-[80%] items-center   overflow-hidden" key={index}>
                <div className=" relative h-full w-full rounded-xl shadow-xl transition-all">
                  <div className=" absolute inset-0">
                    <img
                      className=" h-full w-full rounded-xl object-cover shadow-xl shadow-black/40"
                      src={item.image}
                      alt="item"
                    />
                  </div>
                  <div className=" absolute -bottom-[100%]  h-full w-full rounded-xl bg-[#27272c] opacity-95 p-3 text-start text-slate-200 group-hover:bottom-0 duration-500 flex flex-col ">
                    <div className="w-auto ">
                      <h1 className="text-lg bg-black font-semibold w-fit py-2 px-5 rounded-xl">{item.title}</h1>
                      <p className=" ml-5 my-2 text-xl font-bold">{item.description}</p>
                      <div>
                        <div>
                          <div className="flex items-center gap-4 p-4 rounded-lg">
                            <div className="flex items-center bg-black rounded-full p-2">
                              <Tooltip title="Edit">
                                <button
                                  className={`p-2 rounded-full ${selected === "x" ? "bg-gray-700" : ""}`}
                                  onClick={() => setSelected("x")}
                                >
                                  <CiEdit
                                    onClick={() => editProjectHandler(item)}
                                    className="text-white"
                                    size={30}
                                  />
                                </button>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <button
                                  className={`p-2 rounded-full ${selected === "smile" ? "bg-gray-700" : ""}`}
                                  onClick={() => setSelected("smile")}
                                >
                                  <MdDeleteOutline
                                    onClick={() => deleteProjectHandler(item._id)}
                                    className="text-white"
                                    size={30}
                                  />
                                </button>
                              </Tooltip>
                              <button
                                className={`p-2 rounded-full ${selected === "check" ? "bg-green-500" : ""}`}
                                onClick={() => setSelected("check")}
                              >
                                <AiOutlineCheck className="text-white" size={30} />
                              </button>
                            </div>
                            <Tooltip title={item.title}>
                              <button className="p-2 bg-black rounded-full">
                                <AiOutlineUsergroupAdd className="text-white" size={30} />
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {isModalOpen && <UpdateProject isModalOpen={isModalOpen} editData={editingProject} setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default WorkList;
