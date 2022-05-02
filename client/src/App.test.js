import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import TableSelect from "./components/TableSelect/TableSelect";

import { render, fireEvent, screen } from "@testing-library/react";

const data = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },
];

const dataLarge = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },

  {
    name: "netsh.exe",
    device: "Targaryen",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe",
    status: "available",
  },

  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },

  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },

  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },

  {
    name: "uxtheme.dll",
    device: "Lanniester",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll",
    status: "available",
  },

  {
    name: "cryptbase.dll",
    device: "Martell",
    path: "\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll",
    status: "scheduled",
  },

  {
    name: "7za.exe",
    device: "Baratheon",
    path: "\\Device\\HarddiskVolume1\\temp\\7za.exe",
    status: "scheduled",
  },
];

const dataSmall = [
  {
    name: "smss.exe",
    device: "Stark",
    path: "\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe",
    status: "scheduled",
  },
];

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("renders larger data set", () => {
  render(<TableSelect tableData={dataLarge} />);
});

test("renders smaller data set", () => {
  render(<TableSelect tableData={dataSmall} />);
});

test("renders no data set", () => {
  const dataNone = [];
  render(<TableSelect tableData={dataNone} />);
});

test("initial render check select-all is false", () => {
  render(<TableSelect tableData={data} />);
  const selectAllElement = screen.getByTestId("select-all");
  expect(selectAllElement.checked).toBe(false);
});

test("if all items are checked select-all is checked", () => {
  render(<TableSelect tableData={data} />);
  const selectFirstItemsElement = screen.getByTestId("select-item-0");
  const selectSecondItemsElement = screen.getByTestId("select-item-1");
  const selectAllElement = screen.getByTestId("select-all");

  fireEvent.click(selectFirstItemsElement);
  fireEvent.click(selectSecondItemsElement);

  expect(selectAllElement.checked).toBe(true);
});

test("if one item checked check-all is indeterminate", () => {
  render(<TableSelect tableData={data} />);
  const selectFirstItemsElement = screen.getByTestId("select-item-0");
  const selectAllElement = screen.getByTestId("select-all");

  fireEvent.click(selectFirstItemsElement);

  expect(selectAllElement.checked).toBe(false);
  expect(selectAllElement.indeterminate).toBe(true);
});

test("if check-all selected select all checboxes", () => {
  render(<TableSelect tableData={data} />);
  const selectFirstItemsElement = screen.getByTestId("select-item-0");
  const selectSecondItemsElement = screen.getByTestId("select-item-1");
  const selectAllElement = screen.getByTestId("select-all");

  fireEvent.click(selectAllElement);

  expect(selectAllElement.checked).toBe(true);
  expect(selectFirstItemsElement.checked).toBe(true);
  expect(selectSecondItemsElement.checked).toBe(true);
  expect(selectAllElement.indeterminate).toBe(false);
});

test("cycles through all states of check-all", () => {
  render(<TableSelect tableData={data} />);
  const selectFirstItemsElement = screen.getByTestId("select-item-0");
  const selectSecondItemsElement = screen.getByTestId("select-item-1");
  const selectAllElement = screen.getByTestId("select-all");

  fireEvent.click(selectFirstItemsElement);
  expect(selectFirstItemsElement.checked).toBe(true);
  expect(selectAllElement.checked).toBe(false);
  expect(selectAllElement.indeterminate).toBe(true);

  fireEvent.click(selectSecondItemsElement);
  expect(selectAllElement.checked).toBe(true);
  expect(selectFirstItemsElement.checked).toBe(true);
  expect(selectSecondItemsElement.checked).toBe(true);
  expect(selectAllElement.indeterminate).toBe(false);

  fireEvent.click(selectFirstItemsElement);
  expect(selectFirstItemsElement.checked).toBe(false);
  expect(selectAllElement.checked).toBe(false);
  expect(selectAllElement.indeterminate).toBe(true);

  fireEvent.click(selectSecondItemsElement);
  expect(selectAllElement.indeterminate).toBe(false);
  expect(selectAllElement.checked).toBe(false);
  expect(selectFirstItemsElement.checked).toBe(false);
  expect(selectSecondItemsElement.checked).toBe(false);
});
