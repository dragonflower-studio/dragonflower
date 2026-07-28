import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";

const SINGLETONS: { id: string; title: string }[] = [
  { id: "siteSettings", title: "Site settings" },
  { id: "homePage", title: "Home page" },
  { id: "aboutPage", title: "About page" },
  { id: "workPage", title: "Work page" },
  { id: "practicePage", title: "Practice page" },
  { id: "contactPage", title: "Contact page" },
  { id: "notFoundPage", title: "404 page" },
];

const ORDERABLE: { type: string; title: string }[] = [
  { type: "client", title: "Clients / Collaborators" },
  { type: "testimonial", title: "Testimonials" },
  { type: "project", title: "Projects" },
  { type: "practiceItem", title: "Practices" },
];

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items(
              SINGLETONS.map(({ id, title }) =>
                S.listItem()
                  .title(title)
                  .id(id)
                  .child(S.document().schemaType(id).documentId(id)),
              ),
            ),
        ),
      S.divider(),
      ...ORDERABLE.map(({ type, title }) =>
        orderableDocumentListDeskItem({ type, title, S, context }),
      ),
    ]);
