import Logs from "../components/Users/pages/Activilty/Logs";
import DTRData from "../components/Users/pages/DTR/DTRData";
import Dashboard from "../components/Users/pages/Dashboard/Dashboard";
import Inbox from "../components/Users/pages/Message/Inbox";
import Payslip from "../components/Users/pages/Payroll/Payslip";
import Profile from "../components/Users/pages/Profile/Profile";
import Leave from "../components/Users/pages/Reports/Leave";
import Resign from "../components/Users/pages/Reports/Resign";
import Sick from "../components/Users/pages/Reports/Sick";
import ScheduleData from "../components/Users/pages/Schedule/ScheduleData";

const EmployeeRoutes = [
    {path: "/employee/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: "/employee/profile", exact: true, name: "Profile", component: Profile},
    {path: "/employee/logs", exact: true, name: "Logs", component: Logs},
    {path: "/employee/attendance/dtr", exact: true, name: "DTR", component: DTRData},
    {path: "/employee/attendance/schedule", exact: true, name: "Schedule", component: ScheduleData},
    {path: "/employee/request/sick", exact: true, name: "Sick", component: Sick},
    {path: "/employee/request/leave", exact: true, name: "Leave", component: Leave},
    {path: "/employee/request/resign", exact: true, name: "Resign", component: Resign},
    {path: "/employee/payslip/payroll", exact: true, name: "Payroll", component: Payslip},
    {path: "/employee/message/inbox", exact: true, name: "Inbox", component: Inbox},
];

export default EmployeeRoutes;