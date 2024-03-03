import Legal from "../components/HR/pages/Calendar/Legal";
import Special from "../components/HR/pages/Calendar/Special";
import TotalDuty from "../components/HR/pages/Calendar/TotalDuty";
import PagIbig from "../components/HR/pages/Contribution/Pagibig";
import Philhealth from "../components/HR/pages/Contribution/Philhealth";
import SSS from "../components/HR/pages/Contribution/SSS";
import Dashboard from "../components/HR/pages/Dashboard/Dashboard";
import CreateDepartment from "../components/HR/pages/Department/CreateDepartment";
import EmployeeDetails from "../components/HR/pages/Employee/EmployeeDetails";
import ListOfEmployee from "../components/HR/pages/Employee/ListOfEmployee";
import RegisterEmployee from "../components/HR/pages/Employee/RegisterEmployee";
import Activity from "../components/HR/pages/Logs/Activity";
import SalaryPeriod from "../components/HR/pages/Salary/SalaryPeriod";


const HumanResourceRoutes = [
    {path: "/hr/dashboard", exact: true, name: "hr", component: Dashboard},
    {path: "/hr/logs", exact: true, name: "logs", component: Activity},
    {path: "/hr/contribution/pagibig", exact: true, name: "pagibig", component: PagIbig},
    {path: "/hr/contribution/philhealth", exact: true, name: "philhealth", component: Philhealth},
    {path: "/hr/contribution/sss", exact: true, name: "sss", component: SSS},
    {path: "/hr/holiday/legal", exact: true, name: "legal", component: Legal},
    {path: "/hr/holiday/special", exact: true, name: "special", component: Special},
    {path: "/hr/calendar/salary", exact: true, name: "salary", component: SalaryPeriod},
    {path: "/hr/calendar/days", exact: true, name: "days", component: TotalDuty},
    {path: "/hr/employee/add", exact: true, name: "register", component: RegisterEmployee},
    {path: "/hr/employee/list", exact: true, name: "list", component: ListOfEmployee},
    {path: "/hr/employee/details/refid=:id", exact: true, name: "details", component: EmployeeDetails},
    {path: "/hr/department", exact: true, name: "department", component: CreateDepartment},
];

export default HumanResourceRoutes;