import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "5ey8kiya",
    dataset: "production",
  },
  studioHost: "dragonflower",
  deployment: {
    appId: "j12xpzlyqrs2hggylev6yo49",
  },
  autoUpdates: true,
});
