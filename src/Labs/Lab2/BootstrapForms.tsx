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
      </div>
);}