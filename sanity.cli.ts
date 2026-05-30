import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineCliConfig({
  api: { projectId, dataset },
  // Nombre del estudio publicado (ej. https://un-jardin.sanity.studio)
  studioHost: "un-jardin-original",
  deployment: { autoUpdates: true },
});
