import Announcements from "../components/Admin/pages/Calendar/Announcements";
import PagIbig from "../components/Admin/pages/Contribution/PagIbig";
import Philhealth from "../components/Admin/pages/Contribution/Philhealth";
import SSS from "../components/Admin/pages/Contribution/SSS";
import TIN from "../components/Admin/pages/Contribution/TIN";
import Dashboard from "../components/Admin/pages/Dashboard/Dashboard";
import CreateData from "../components/Admin/pages/Department/CreateData";
import ListEmployee from "../components/Admin/pages/Employee/ListEmployee";
import RegisterEmployee from "../components/Admin/pages/Employee/RegisterEmployee";
import Legal from "../components/Admin/pages/Holidays/Legal";
import Special from "../components/Admin/pages/Holidays/Special";
import ActivityLogs from "../components/Admin/pages/Logs/ActivityLogs";
import CreateSchedule from "../components/Admin/pages/Schedule/CreateSchedule";
import NumberofDuty from "../components/Admin/pages/Schedule/NumberofDuty";
import SalaryPeriod from "../components/Admin/pages/Schedule/SalaryPeriod";
import ScheduleData from "../components/Admin/pages/Schedule/ScheduleData";
import WebConfig from "../components/Admin/pages/Settings/WebConfig";


const AdminRoutes = [
    {path: "/admin/dashboard", exact: true, name: "Dashboard", component: Dashboard},
    {path: "/admin/employee", exact: true, name: "Employee", component: RegisterEmployee},
    {path: "/admin/list", exact: true, name: "List", component: ListEmployee},
    {path: "/admin/department", exact: true, name: "Department", component: CreateData},
    {path: "/admin/logs", exact: true, name: "Logs", component: ActivityLogs},
    {path: "/admin/calendar/announcements", exact: true, name: "Announcement", component: Announcements},
    {path: "/admin/contribution/sss", exact: true, name: "SSS", component: SSS},
    {path: "/admin/contribution/philhealth", exact: true, name: "Philhealth", component: Philhealth},
    {path: "/admin/contribution/tin", exact: true, name: "Tin", component: TIN},
    {path: "/admin/contribution/pagibig", exact: true, name: "Pagibig", component: PagIbig},
    {path: "/admin/holiday/legal", exact: true, name: "Legal", component: Legal},
    {path: "/admin/holiday/special", exact: true, name: "Special", component: Special},
    {path: "/admin/calendar/create", exact: true, name: "Create", component: CreateSchedule},
    {path: "/admin/calendar/days", exact: true, name: "Number", component: NumberofDuty},
    {path: "/admin/calendar/salary", exact: true, name: "Salary", component: SalaryPeriod},
    {path: "/admin/calendar/schedule", exact: true, name: "Schedule", component: ScheduleData},
    {path: "/admin/settings/config", exact: true, name: "Config", component: WebConfig},
];

export default AdminRoutes;