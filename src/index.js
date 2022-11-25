import messages_en from "./translations/en.json";
import IdpsMainMenu from './menu/IdpsMainMenu';
import PerfomancePage from "./pages/PerfomancePage";
import PerformanceMonthPicker from "./pickers/PerformanceMonthPicker";
import PerformanceYearPicker from "./pickers/PerformanceMonthPicker";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "refs": [
    { key: "idps.PerformanceMonthPicker", ref: PerformanceMonthPicker },
    { key: "idps.PerformanceYearPicker", ref: PerformanceYearPicker }
  ],
  "core.Router": [
    { path: "idps/perfomances", component: PerfomancePage },
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
