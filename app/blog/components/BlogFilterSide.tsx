import React from "react";

const FilterSide: React.FC = () => {
  return (
   <div>
      <h2 className="text-lg font-bold mb-4">Filter by</h2>

      {/* Filtros por Industry */}
      <div className="mb-4">
        <h3 className="font-semibold">Industry</h3>
        <ul className="list-none space-y-2">
          <li>
            <input type="checkbox" id="iot" className="mr-2" />
            <label htmlFor="iot">Internet of Things</label>
          </li>
          <li>
            <input type="checkbox" id="manufacturing" className="mr-2" />
            <label htmlFor="manufacturing">Manufacturing</label>
          </li>
          <li>
            <input type="checkbox" id="security" className="mr-2" />
            <label htmlFor="security">IT and Security</label>
          </li>
          <li>
            <input type="checkbox" id="healthcare" className="mr-2" />
            <label htmlFor="healthcare">Healthcare</label>
          </li>
        </ul>
      </div>

      {/* Filtros por Application */}
      <div className="mb-4">
        <h3 className="font-semibold">Application</h3>
        <ul className="list-none space-y-2">
          <li>
            <input type="checkbox" id="remote-management" className="mr-2" />
            <label htmlFor="remote-management">Remote Management</label>
          </li>
          <li>
            <input type="checkbox" id="automation" className="mr-2" />
            <label htmlFor="automation">Automation</label>
          </li>
          <li>
            <input type="checkbox" id="asset-tracking" className="mr-2" />
            <label htmlFor="asset-tracking">Asset Tracking</label>
          </li>
          <li>
            <input type="checkbox" id="sustainability" className="mr-2" />
            <label htmlFor="sustainability">Sustainability</label>
          </li>
        </ul>
      </div>

      {/* Filtros por Technology */}
      <div className="mb-4">
        <h3 className="font-semibold">Technology</h3>
        <ul className="list-none space-y-2">
          <li>
            <input type="checkbox" id="connectivity" className="mr-2" />
            <label htmlFor="connectivity">Connectivity</label>
          </li>
          <li>
            <input type="checkbox" id="data-analytics" className="mr-2" />
            <label htmlFor="data-analytics">Data Analytics</label>
          </li>
          <li>
            <input type="checkbox" id="ai" className="mr-2" />
            <label htmlFor="ai">Artificial Intelligence</label>
          </li>
          <li>
            <input type="checkbox" id="cybersecurity" className="mr-2" />
            <label htmlFor="cybersecurity">Cybersecurity</label>
          </li>
        </ul>
      </div>
      </div>
  );
};

export default FilterSide;
