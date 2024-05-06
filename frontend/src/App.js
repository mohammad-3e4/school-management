import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./BaseFiles/Layout";
import AdminDashboard from "./DashBoard/AdminDashboard/AdminDashboard";
import NotFound from "../src/pages/NotFound";
import AdminLogin from "../src/pages/AdminLogin";
import ForgotPassword from "../src/pages/ForgotPassword";
import ResetPassword from "../src/pages/ResetPassword";
import AddStudent from "../src/Component/student/AddStudent";
import AddStaff from "./Component/staff/AddStaff";
import AllStudents from "./Component/student/AllStudents";
import AllStaff from "./Component/staff/AllStaff";
import Details from "./Component/student/Details";
import PrivateRoute from "./BaseFiles/PrivateRoutes";

import TeacherDetails from "./Component/staff/Details";
import Profile from "./Component/staff/Profile.js";
import AssignTeacher from "./Component/staff/AssignTeacher";
import CreateClass from "./Component/Classes/CreateClass";
import EditClass from "./Component/Classes/EditClass";
import Attendance from "./Component/student/Attendance";
import MyAttendance from "./DashBoard/StudentDashboard/Attendance.js";
import StaffAttendance from "./Component/staff/Attendance";
import Marks from "./Component/marks/Marks";
import StudentDashboard from "./DashBoard/StudentDashboard/StudentDashboard";
import ParentDashboard from "./DashBoard/ParentDashboard/ParentDashboard";
import MarksDetail from "./Component/marks/MarksDetail";
import Termone from "./Component/reportcards/Termone";
import Termtwo from "./Component/reportcards/Termtwo";
import Secondary from "./Component/reportcards/Secondary";
import SenSecondary from "./Component/reportcards/SenSecondary";
import Fees from "./Component/Account/Fees/Fees";
import CreateFees from "./Component/Account/Fees/CreateFees";
import CreateFeeStructure from "./Component/Account/Fees/CreateFeeStructure.js";
import FeeStructure from "./Component/Account/Fees/FeeStructure.js";
import FeesDetails from "./Component/Account/Fees/FeesDetails.js";
import Salaries from "./Component/Account/salarybox/Salaries.js";
import CreateSalary from "./Component/Account/salarybox/CreateSalary.js";
import PaySalary from "./Component/Account/salarybox/PaySalary.js";
import AllBooks from "./Component/Library/AllBooks";
import AddBooks from "./Component/Library/AddBooks";
import IssuedBooks from "./Component/Library/IssuedBooks";
import IssuedForm from "./Component/Library/IssuedForm";
import UploadPrimaryMarks from "./Component/marks/forms/UploadMarksPri.js";
import { useDispatch, useSelector } from "react-redux";
import UploadMaxMarks from "./Component/marks/forms/UploadMaxMarks.js";
import MarksDetailNine from "./Component/marks/MarksDetailNine.js";
import MarksDetailEleven from "./Component/marks/MarksDetaileleven.js";
import UploadScholastic from "./Component/marks/forms/UploadCoScholastic.js";
function App() {
  const {user} = useSelector((state)=>state.user)
  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route
            path={`/admin/dashboard`}
            element={
              <Layout>
                <AdminDashboard />
              </Layout>
            }
          />
          <Route
            path="/user/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
    
          <Route
            path="/issued/form"
            element={
              <Layout>
                <IssuedForm />
              </Layout>
            }
          />
          <Route
            path="/issued/books"
            element={
              <Layout>
                <IssuedBooks />
              </Layout>
            }
          />
          <Route
            path="/all/books"
            element={
              <Layout>
                <AllBooks />
              </Layout>
            }
          />
          <Route
            path="/add/books"
            element={
              <Layout>
                <AddBooks />
              </Layout>
            }
          />
          <Route
            path="/student/dashboard/"
            element={
              <Layout>
                <StudentDashboard />
              </Layout>
            }
          />
          {/* <Route
            path="/parent/dashboard/"
            element={
              <Layout>
                <ParentDashboard />
              </Layout>
            }
          /> */}
          <Route
            path="/student/create"
            element={
              <Layout>
                <AddStudent />
              </Layout>
            }
          />
          <Route
            path="/staff/create"
            element={
              <Layout>
                <AddStaff />
              </Layout>
            }
          />
          <Route
            path="/all/students"
            element={
              <Layout>
                <AllStudents />
              </Layout>
            }
          />
          <Route
            path="/all/staff"
            element={
              <Layout>
                <AllStaff />
              </Layout>
            }
          />
          <Route
            path="/student/details/:id"
            element={
              <Layout>
                <Details />
              </Layout>
            }
          />
          <Route
            path="/staff/details/:id"
            element={
              <Layout>
                <TeacherDetails />
              </Layout>
            }
          />
          <Route
            path="/teacher/assign"
            element={
              <Layout>
                <AssignTeacher />
              </Layout>
            }
          />
          <Route
            path="/class/create"
            element={
              <Layout>
                <CreateClass />
              </Layout>
            }
          />
          <Route
            path="/class/edit"
            element={
              <Layout>
                <EditClass />
              </Layout>
            }
          />
          <Route
            path="/students/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />
          <Route
            path="/staff/attendance"
            element={
              <Layout>
                <StaffAttendance />
              </Layout>
            }
          />
          <Route
            path="/fees/details/:id"
            element={
              <Layout>
                <FeesDetails />
              </Layout>
            }
          />
         <Route
            path="/marks"
            element={
              <Layout>
                <Marks />
              </Layout>
            }
          />{" "}
          <Route
            path="/marks/details/:id"
            element={
              <Layout>
                <MarksDetail />
              </Layout>
            }
          />
           <Route
            path="/upload/scholastic"
            element={
              <Layout>
                <UploadScholastic />
              </Layout>
            }
          />
      
          <Route
            path="/marks/details/ninth/:id"
            element={
              <Layout>
                <MarksDetailNine />
              </Layout>
            }
          />
           <Route
            path="/marks/details/eleven/:id"
            element={
              <Layout>
                <MarksDetailEleven />
              </Layout>
            }
          />
          <Route
            path="/fees/entries"
            element={
              <Layout>
                <Fees />
              </Layout>
            }
          />
          <Route
            path="/salary/box"
            element={
              <Layout>
                <Salaries />
              </Layout>
            }
          />
          <Route
            path="/createfees"
            element={
              <Layout>
                <CreateFees />
              </Layout>
            }
          />
          <Route
            path="/salary/create"
            element={
              <Layout>
                <CreateSalary />
              </Layout>
            }
          />
          <Route
            path="/salary/pay"
            element={
              <Layout>
                <PaySalary />
              </Layout>
            }
          />
           <Route
            path="/upload/marks"
            element={
              <Layout>
                <UploadPrimaryMarks />
              </Layout>
            }
          />
            <Route
            path="/upload/marks"
            element={
              <Layout>
                <UploadPrimaryMarks />
              </Layout>
            }
          />
          <Route
            path="/upload/maxmarks"
            element={
              <Layout>
                <UploadMaxMarks />
              </Layout>
            }
          />  <Route
          path="/createfee/structure"
          element={
            <Layout>
              <CreateFeeStructure />
            </Layout>
          }
        />
          <Route
            path="/fees/structure"
            element={
              <Layout>
                <FeeStructure />
              </Layout>
            }
          /> <Route
          path="/my/attendance"
          element={
            <Layout>
              <MyAttendance />
            </Layout>
          }
        />
         <Route
          path="/my/issued/books"
          element={
            <Layout>
              <IssuedBooks />
            </Layout>
          }
        />
         <Route
          path='/my/marks/:id'
          element={
            <Layout>
         <MarksDetail />
            </Layout>
          }
        /> <Route
        path="/my/fees/:id"
        element={
          <Layout>
            <FeesDetails />
          </Layout>
        }
      />
          
          <Route path="/reportcard1/:id" element={<Termone />} />
          <Route path="/reportcard2/:id" element={<Termtwo />} />
          <Route path="/secondary/:id" element={<Secondary />} />
          <Route path="/sensecondary/:id" element={<SenSecondary />} />
        </Route>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
