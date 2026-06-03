import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = "a53z2c65";
const dataset = "production";

export default defineConfig({
  name: "raiz-floral",
  title: "Raíz Floral · Administración",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenido")
          .items([
            S.listItem()
              .title("Arreglos")
              .child(S.documentTypeList("arrangement").title("Arreglos")),
            S.listItem()
              .title("Categorías")
              .child(S.documentTypeList("category").title("Categorías")),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
