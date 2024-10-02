export default function BootstrapForms() {
  return (
    <div>
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <div className="mb-3">
          <label htmlFor="input1" className="form-label">
            Email address</label>
          <input type="email" className="form-control"
            id="input1" placeholder="name@example.com"/>
        </div>
        <div className="mb-3">
          <label htmlFor="textarea1" className="form-label">
            Example textarea</label>
          <textarea className="form-control" id="textarea1" 
                    rows={3}></textarea>
        </div></div>

        <div id="wd-css-styling-dropdowns"> {/* Styling Dropdowns */}
          <h3>Dropdowns</h3>
          <select className="form-select">
            <option selected>Open this select menu</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>

        <div id="wd-css-styling-switches">
          <h3>Switches</h3>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" 
                  id="switch1" />
            <label className="form-check-label" htmlFor="switch1">
              Default switch checkbox input
            </label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox"
              id="switch2" checked />
            <label className="form-check-label" htmlFor="switch2">
              Checked switch checkbox input
            </label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox"
              id="switch3" disabled />
            <label className="form-check-label" htmlFor="switch3">
              Disabled switch checkbox input
            </label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox"
              id="switch4" checked disabled />
            <label className="form-check-label" htmlFor="switch4">
              Disabled checked switch checkbox input
            </label>
          </div>
        </div>

        <div id="wd-css-styling-range-and-sliders"> {/* Range and Sliders */}
          <h3>Range</h3>
          <label htmlFor="range1" className="form-label">
            Example range
          </label>
          <input type="range" className="form-range"
            min="0" max="5" step="0.5" id="range1" />
        </div>

      </div>
);}