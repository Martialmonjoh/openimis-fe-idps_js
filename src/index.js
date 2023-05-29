import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import IdpsMainMenu from './menu/IdpsMainMenu';
import PerfomancePage from "./pages/PerfomancePage";
import PerformancesPage from "./pages/PerformancesPage";
import ReportsPage from "./pages/ReportsPage";
import PerformanceMonthPicker from "./pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "./pickers/PerformanceMonthPicker";
import EnrolledFamiliesReport from "./reports/EnrolledFamiliesReport";
import InsureeFamilyOverviewReport from "./reports/InsureeFamilyOverviewReport";
import reducer from "./reducer"

const ROUTE_IDPS_PERFORMANCE = "idps/performance";
const ROUTE_IDPS_PERFORMANCES = "idps/performances";
const ROUTE_IDPS_REPORTS = "idps/reports";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }, { key: "fr", messages: messages_fr }],
  "reducers": [{key: 'idps', reducer}],
  "reports": [

  ],
  "refs": [
    { key: "idps.PerformanceMonthPicker", ref: PerformanceMonthPicker },
    { key: "idps.PerformanceYearPicker", ref: PerformanceYearPicker },

    { key: "idps.route.performance", ref: ROUTE_IDPS_PERFORMANCE },
    { key: "idps.route.performances", ref: ROUTE_IDPS_PERFORMANCES },
    { key: "idps.route.reports", ref: ROUTE_IDPS_REPORTS },
  ],
  "core.Router": [

    { path: ROUTE_IDPS_PERFORMANCE + "/:performance_id?", component: PerfomancePage },
    { path: "idps/performances", component: PerformancesPage },
    { path: "idps/reports", component: ReportsPage },
  ],
  "core.MainMenu": [IdpsMainMenu],
}

export const IdpsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}

export {
  PerformanceMonthPicker,
  PerformanceYearPicker
};
