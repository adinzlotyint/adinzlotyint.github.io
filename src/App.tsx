import { useState } from "react";
import ConfigPanel from "./components/ConfigPanel/ConfigPanel";
import ContentContainer from "./components/ContentPanel/ContentContainer";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar/NavBar";
import {
  OptionalDataContext,
  TableDataContext,
  SelectsTemplateContext,
  OptionalData,
  TableData,
  SelectsTemplate,
} from "./hooks/Contexts";
import DefaultTemplate from "./configs/DefaultTemplate.json";

function App() {
  const [optionalData, setOptionalData] = useState<OptionalData>(() => {
    const storedOptionalData = localStorage.getItem("optionalData");
    return storedOptionalData ? JSON.parse(storedOptionalData) : [];
  });

  const [tableData, setTableData] = useState<TableData[]>(() => {
    const storedData = localStorage.getItem("tableData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [selectsTemplate, setSelectsTemplate] =
    useState<SelectsTemplate>(DefaultTemplate);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid 2xl:grid-rows-layout 2xl:grid-cols-[1fr_2fr] grid-rows-layout2 grid-cols-1 flex-grow">
        <div className="w-full 2xl:col-start-2 2xl:row-start-1 col-start-1 row-start-1">
          <NavBar />
        </div>
        <OptionalDataContext.Provider value={{ optionalData, setOptionalData }}>
          <TableDataContext.Provider value={{ tableData, setTableData }}>
            <SelectsTemplateContext.Provider
              value={{ selectsTemplate, setSelectsTemplate }}
            >
              <div className="w-full 2xl:col-start-1 2xl:col-end-2 2xl:row-start-1 2xl:row-end-4 col-start-1 row-start-2">
                <ConfigPanel />
              </div>
              <div className="w-full 2xl:col-start-2 2xl:row-start-2 2xl:row-end-4 col-start-1 row-start-3 flex flex-col h-full">
                <ContentContainer />
              </div>
            </SelectsTemplateContext.Provider>
          </TableDataContext.Provider>
        </OptionalDataContext.Provider>
      </div>
      <div className="w-full mt-8">
        <Footer />
      </div>
    </div>
  );
}

export default App;
