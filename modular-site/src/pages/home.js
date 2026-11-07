import { comparisonSection, eventSection, heroSection, phoneSection, planSection, reviewSection, shortcutSection, storeSection } from "../components/home-sections.js";

export function homePage(data) {
  return `<main id="top">${heroSection()}${shortcutSection()}${phoneSection(data.phones)}${planSection(data.plans)}${comparisonSection()}${eventSection()}${storeSection(data.stores)}${reviewSection(data.reviews)}</main>`;
}
