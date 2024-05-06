import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { FiMenu } from "react-icons/fi";
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudentBold, PiExam } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { LiaSchoolSolid } from "react-icons/lia";
import { BiLibrary } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const SidebarMenu = ({ toggleSidebar }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [companyNameVisible, setCompanyNameVisible] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [isMobile, setIsMobile] = useState(false);
  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
    setCompanyNameVisible(!collapsed);
    toggleSidebar();
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`sidebar-wrapper ${
        collapsed && isMobile ? "collapsed" : ""
      } fixed h-full overflow-y-auto z-10`}
    >
      <Sidebar
        collapsed={collapsed}
        width="20"
        className="tracking-widest font-sans text-xs text-gray-600 max-2xl:w-[250px]"
      >
        <div className="sidebar-header">
          {isMobile && (
            <div
              className="toggle-btn-mobile p-2"
              onClick={handleToggleCollapse}
            >
              <FiMenu />
            </div>
          )}
          {(!isMobile || (isMobile && !collapsed)) && (
            <div
              className={`company-name ${
                companyNameVisible ? "hidden" : ""
              } py-2`}
            >
              Skyway Technologies
            </div>
          )}
          {!isMobile && (
            <div className="toggle-btn p-2" onClick={handleToggleCollapse}>
              <FiMenu />
            </div>
          )}
        </div>
        {(!isMobile || (isMobile && !collapsed)) && (
          <Menu
            className="bg-[#233459] text-gray-100"
            iconShape="square"
            menuItemStyles={{
              button: {
                backgroundColor: "#233459",
                "&:hover": {
                  backgroundColor: "#3469a1",
                },
              },
            }}
          >
            {(user && user.role === "admin") || user.role == "teacher" ? (
              <Link to={`/admin/dashboard`}>
                <MenuItem
                  icon={<MdOutlineDashboard className="text-yellow-600" />}
                >
                  {" "}
                  Admin
                </MenuItem>
              </Link>
            ) : (
              <>
                {/* <SubMenu
                  label="Dashboard"
                  icon={<MdOutlineDashboard className="text-yellow-600" />}
                > */}
                <Link to={`/student/dashboard`}>
                  <MenuItem
                    icon={<MdOutlineDashboard className="text-yellow-600" />}
                  >
                    Student
                  </MenuItem>
                </Link>
                {/* <Link to={`/dashboard/parent`}>
                    <MenuItem>Parent</MenuItem>
                  </Link> */}
                {/* </SubMenu> */}
              </>
            )}
            <hr />
            {user.role === "admin" ? (
              <>
                <SubMenu
                  label="Student"
                  icon={<PiStudentBold className="text-yellow-600" />}
                >
                  <Link to={`/all/students`}>
                    <MenuItem>All Students</MenuItem>
                  </Link>

                  <Link to="/student/create">
                    <MenuItem>Admin Form</MenuItem>
                  </Link>
                  {/* <MenuItem>Student Promotion</MenuItem> */}
                </SubMenu>
                <hr />
                <SubMenu
                  label="Teacher"
                  icon={<GiTeacher className="text-yellow-600" />}
                >
                  <Link to={`/all/staff`}>
                    <MenuItem>All Staff</MenuItem>
                  </Link>
                  <Link to={`/teacher/assign`}>
                    <MenuItem>Assign Teacher</MenuItem>
                  </Link>
                  <Link to={`/staff/create`}>
                    <MenuItem>Add Teacher</MenuItem>
                  </Link>
                </SubMenu>
                <hr />

                <SubMenu
                  label="Classes"
                  icon={<LiaSchoolSolid className="text-yellow-600" />}
                >
                  <Link to="/class/edit">
                    <MenuItem>Edit Class</MenuItem>
                  </Link>
                  <Link to="/class/create">
                    <MenuItem>Create Class</MenuItem>
                  </Link>
                </SubMenu>
                <hr />
              </>
            ) : user.role === "teacher" ? (
              <>
                <SubMenu
                  label="Student"
                  icon={<PiStudentBold className="text-yellow-600" />}
                >
                  <Link to={`/all/students`}>
                    <MenuItem>All Students</MenuItem>
                  </Link>
                  <MenuItem>Student Promotion</MenuItem>
                </SubMenu>
                <hr />
              </>
            ) : null}

            {user.role === "admin" ? (
              <>
                <SubMenu
                  label="Attendance"
                  icon={<LiaSchoolSolid className="text-yellow-600" />}
                >
                  <Link to="/students/attendance">
                    <MenuItem>Students Attendance</MenuItem>
                  </Link>
                  <Link to="/staff/attendance">
                    <MenuItem>Staff Attendance</MenuItem>
                  </Link>
                </SubMenu>
                <hr />
                <SubMenu
                  label="Library"
                  icon={<BiLibrary className="text-yellow-600" />}
                >
                  <Link to="/all/books">
                    <MenuItem>All Books</MenuItem>
                  </Link>
                  <Link to="/issued/form">
                    <MenuItem>Issue Book</MenuItem>
                  </Link>
                  <Link to="/issued/books">
                    <MenuItem>Issued Book Detail</MenuItem>
                  </Link>
                  <Link to="/add/books">
                    <MenuItem>Add New Book</MenuItem>
                  </Link>
                </SubMenu>
                <hr />
                <hr />
                <SubMenu
                  label="Result"
                  icon={<PiExam className="text-yellow-600" />}
                >
                  <Link to="/marks">
                    <MenuItem>Marks Detail</MenuItem>
                  </Link>
                  <Link to="/upload/marks">
                    {" "}
                    <MenuItem>Upload Marks</MenuItem>{" "}
                  </Link>
                  <Link to="/upload/maxmarks">
                    {" "}
                    <MenuItem>Upload Max Marks</MenuItem>{" "}
                  </Link>
                  <Link to="/upload/scholastic">
                    {" "}
                    <MenuItem>Upload scholastic </MenuItem>{" "}
                  </Link>
                </SubMenu>
                <hr />{" "}
              </>
            ) : user.role=="teacher" ?(
              <>
              <SubMenu
                label="Attendance"
                icon={<LiaSchoolSolid className="text-yellow-600" />}
              >
                <Link to="/students/attendance">
                  <MenuItem>Students Attendance</MenuItem>
                </Link>
                <Link to="/staff/attendance">
                  <MenuItem>Staff Attendance</MenuItem>
                </Link>
              </SubMenu>
              <hr />
      
              <SubMenu
                label="Result"
                icon={<PiExam className="text-yellow-600" />}
              >
                <Link to="/marks">
                  <MenuItem>Marks Detail</MenuItem>
                </Link>
                <Link to="/upload/marks">
                  {" "}
                  <MenuItem>Upload Marks</MenuItem>{" "}
                </Link>
              </SubMenu>
              <hr />{" "}
            </>
            ): (
              <>
                <Link to="/my/attendance">
                  <MenuItem
                    icon={<LiaSchoolSolid className="text-yellow-600" />}
                  >
                    Students Attendance
                  </MenuItem>
                </Link>
                <hr />
                <Link to="/my/issued/book">
                  <MenuItem icon={<BiLibrary className="text-yellow-600" />}>
                    Issue Book
                  </MenuItem>
                </Link>
                <hr />
                <Link to={`/my/marks/${user?.student_id}`}>
                  <MenuItem icon={<PiExam className="text-yellow-600" />}>
                    Marks Detail
                  </MenuItem>
                </Link>
                <hr />
                <hr />
                <Link to={`/my/fees/${user?.student_id}`}>
                  <MenuItem icon={<BiLibrary className="text-yellow-600" />}>
                    My Fees
                  </MenuItem>
                </Link>
                <hr />{" "}
              </>
            )}
            {user.role === "admin" && (
              <SubMenu
                label="Accounts"
                icon={<BiLibrary className="text-yellow-600" />}
              >
                <Link to="/fees/entries">
                  <MenuItem>Fees Collection</MenuItem>
                </Link>
                <Link to="/createfees">
                  <MenuItem>Create Student Payment</MenuItem>
                </Link>
                <Link to="/createfee/structure">
                  <MenuItem>Create Fees Structure</MenuItem>
                </Link>
                <Link to="/salary/box">
                  <MenuItem>Salary Box</MenuItem>
                </Link>
                <Link to="/salary/create">
                  <MenuItem>Create Salary Structure</MenuItem>
                </Link>
                <Link to="/salary/pay">
                  <MenuItem>pay Salary</MenuItem>
                </Link>
              </SubMenu>
            )}
            <hr />

            <SubMenu
              label="Demo - 1"
              disabled
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />
            <hr />

            <SubMenu
              label="Demo - 2"
              disabled
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />
            <hr />

            <SubMenu
              label="Demo -3"
              disabled
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />

            <SubMenu
              label="Demo - 4"
              disabled
              icon={<BiLibrary className="text-yellow-600" />}
            >
              <Link to="/fees/entries">
                <MenuItem>Fees Collection</MenuItem>
              </Link>
              <Link to="/createfees">
                <MenuItem>Create Student Payment</MenuItem>
              </Link>
              <Link to="/createfee/structure">
                <MenuItem>Create Fees Structure</MenuItem>
              </Link>
              <Link to="/salary/box">
                <MenuItem>Salary Box</MenuItem>
              </Link>
              <Link to="/salary/create">
                <MenuItem>Create Salary Structure</MenuItem>
              </Link>
              <Link to="/salary/pay">
                <MenuItem>pay Salary</MenuItem>
              </Link>
            </SubMenu>
            <hr />
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default SidebarMenu;
