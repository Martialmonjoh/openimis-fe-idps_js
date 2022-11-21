import messages_en from "./translations/en.json";
import IdpsMainMenu from './menu/IdpsMainMenu';
import PerfomancePage from "./pages/PerfomancePage";

const DEFAULT_CONFIG = {
  "translations": [{ key: "en", messages: messages_en }],
  "core.Router": [
    { path: "idps/perfomances", component: PerfomancePage },
  ],
  "core.MainMenu": [IdpsMainMenu],
}

export const IdpsModule = (cfg) => {
  return { ...DEFAULT_CONFIG, ...cfg };
}