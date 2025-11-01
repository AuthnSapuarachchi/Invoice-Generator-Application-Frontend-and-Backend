import logo from "./logo.png";
import logoMain from "./LogoMain.png";
import template01 from "./template01.png";
import template02 from "./template02.png";
import template03 from "./template03.png";
import template04 from "./template04.png";
import template05 from "./template05.png";
import upload_area from "./upload_area.png";

export const assets = {
  logoMain,
  logo,
  template01,
  template02,
  template03,
  template04,
  template05,
  upload_area,
};

export const invoiceTemplates = [
  { id: "template1", label: "Template 1", image: assets.template01 },
  { id: "template2", label: "Template 2", image: assets.template02 },
  { id: "template3", label: "Template 3", image: assets.template03 },
  { id: "template4", label: "Template 4", image: assets.template04 },
  { id: "template5", label: "Template 5", image: assets.template05 },
];

// assets.js - Resume template configurations

export const templates = [
  { id: "template01", label: "Template01", image: assets.template01 },
  { id: "template02", label: "Template02", image: assets.template02 },
  { id: "template03", label: "Template03", image: assets.template03 },
  { id: "template04", label: "Template04", image: assets.template04 },
  { id: "template05", label: "Template05", image: assets.template05 },
];

// Detailed template configurations with styling options
export const templateStyles = {
  template01: {
    id: "template1",
    name: "Classic",
    primaryColor: "#2c3e50",
    secondaryColor: "#34495e",
    fontFamily: "Times New Roman, serif",
    layout: "single-column",
  },
  template02: {
    id: "template02",
    name: "Modern",
    primaryColor: "#3498db",
    secondaryColor: "#2980b9",
    fontFamily: "Arial, sans-serif",
    layout: "two-column",
  },
  template03: {
    id: "template03",
    name: "Professional",
    primaryColor: "#2c3e50",
    secondaryColor: "#7f8c8d",
    fontFamily: "Helvetica, sans-serif",
    layout: "single-column",
  },
  template04: {
    id: "template4",
    name: "Creative",
    primaryColor: "#e74c3c",
    secondaryColor: "#c0392b",
    fontFamily: "Georgia, serif",
    layout: "two-column",
  },
  template05: {
    id: "template5",
    name: "Minimalist",
    primaryColor: "#95a5a6",
    secondaryColor: "#7f8c8d",
    fontFamily: "Arial, sans-serif",
    layout: "single-column",
  },
};
