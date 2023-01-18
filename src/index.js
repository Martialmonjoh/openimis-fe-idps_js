import messages_en from "./translations/en.json";
import IdpsMainMenu from './menu/IdpsMainMenu';
import PerfomancePage from "./pages/PerfomancePage";
import PerformancesPage from "./pages/PerformancesPage";
import PerformanceMonthPicker from "./pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "./pickers/PerformanceMonthPicker";

const ROUTE_IDPS_PERFORMANCE = "idps/performance";
const ROUTE_IDPS_PERFORMANCES = "idps/performances";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "refs": [
    { key: "idps.PerformanceMonthPicker", ref: PerformanceMonthPicker },
    { key: "idps.PerformanceYearPicker", ref: PerformanceYearPicker },

    { key: "idps.route.performance", ref: ROUTE_IDPS_PERFORMANCE },
    { key: "idps.route.performances", ref: ROUTE_IDPS_PERFORMANCES }
  ],
  "core.Router": [
    { path: "idps/performance", component: PerfomancePage },
    { path: "idps/performances", component: PerformancesPage }
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
