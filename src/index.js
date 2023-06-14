import messages_en from "./translations/en.json";
import messages_fr from "./translations/fr.json";
import IdpsMainMenu from './menu/IdpsMainMenu';
import PerfomancePage from "./pages/PerfomancePage";
import PerformancesPage from "./pages/PerformancesPage";
import PerformanceMonthPicker from "./pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "./pickers/PerformanceMonthPicker";
import indicator_report from "./reports/indicator_report";
import invoice_report from "./reports/invoice_report";
import reducer from "./reducer"

const ROUTE_IDPS_PERFORMANCE = "idps/performance";
const ROUTE_IDPS_PERFORMANCES = "idps/performances";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }, { key: "fr", messages: messages_fr }],
  "reducers": [{key: 'idps', reducer}],
  "reports": [
    { 
      key: 'indicator_report',
      component: indicator_report ,
      isValid: (values) => values.dateFrom && values.dateTo,
      getParams: (values) => ({
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
      })
    },
    { 
      key: 'invoice_report',
      component: invoice_report ,
      isValid: (values) => values.hflocation && values.dateFrom && values.dateTo,
      getParams: (values) => ({
        hflocation: values.hflocation.code,
        dateFrom: values.dateFrom,
        dateTo: values.dateTo,
      })
    }
  ],
  "refs": [
    { key: "idps.PerformanceMonthPicker", ref: PerformanceMonthPicker },
    { key: "idps.PerformanceYearPicker", ref: PerformanceYearPicker },

    { key: "idps.route.performance", ref: ROUTE_IDPS_PERFORMANCE },
    { key: "idps.route.performances", ref: ROUTE_IDPS_PERFORMANCES },
  ],
  "core.Router": [

    { path: ROUTE_IDPS_PERFORMANCE + "/:performance_id?", component: PerfomancePage },
    { path: "idps/performances", component: PerformancesPage },
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
