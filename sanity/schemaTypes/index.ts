import type { SchemaTypeDefinition } from "sanity";

import { figure } from "./objects/figure";
import { link } from "./objects/link";
import { brandLogo } from "./objects/brandLogo";
import { ctaBlock } from "./objects/ctaBlock";
import { transformPair, methodStep, approachItem, chapter } from "./objects/blocks";

import { client } from "./documents/client";
import { testimonial } from "./documents/testimonial";
import { project } from "./documents/project";
import { practiceItem } from "./documents/practiceItem";

import { siteSettings } from "./singletons/siteSettings";
import { homePage } from "./singletons/homePage";
import { aboutPage } from "./singletons/aboutPage";
import { workPage } from "./singletons/workPage";
import { practicePage } from "./singletons/practicePage";
import { contactPage } from "./singletons/contactPage";
import { notFoundPage } from "./singletons/notFoundPage";

export const schemaTypes: SchemaTypeDefinition[] = [
  figure,
  link,
  brandLogo,
  ctaBlock,
  transformPair,
  methodStep,
  approachItem,
  chapter,
  client,
  testimonial,
  project,
  practiceItem,
  siteSettings,
  homePage,
  aboutPage,
  workPage,
  practicePage,
  contactPage,
  notFoundPage,
];

export const SINGLETON_TYPES = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "workPage",
  "practicePage",
  "contactPage",
  "notFoundPage",
];
