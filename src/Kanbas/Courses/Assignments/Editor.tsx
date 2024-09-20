export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h2>Assignment Name</h2>
      
      <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignment Link to the Kanbas application Links to all relevant source code repositories.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="Percentage">Percentage</option>
              <option value="Numeric">Numeric</option>
            </select>
          </td>
        </tr>

        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="Online">Online</option>
              <option value="In Class">In Class</option>
            </select>
          </td>
        </tr>
        <br />

        <tr>
          <td>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-submission-type">Online Entry Option</label><br />
            <input type="checkbox" name="check-online-Options" id="wd-text-entry"/>
            <label htmlFor="wd-text-entry">Text Entry</label><br/>

            <input type="checkbox" name="check-online-Options" id="wd-website-url"/>
            <label htmlFor="wd-website-url">Website URL</label><br/>

            <input type="checkbox" name="check-online-Options" id="wd-media-recordings"/>
            <label htmlFor="wd-media-recordings">Media Recordings</label><br/>

            <input type="checkbox" name="check-online-Options" id="wd-student-annotation"/>
            <label htmlFor="wd-student-annotation">Student Annotation</label><br/>

            <input type="checkbox" name="check-online-Options" id="wd-file-upload"/>
            <label htmlFor="wd-file-upload">File Uploads</label>
          </td>
        </tr>
        <br />

        <tr>
          <td align="right" valign="top">
            <label>Assign</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label><br />
            <input id="wd-assign-to" value={"Everyone"} />
          </td>
        </tr>
        <br />

        <tr>
          <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-due-date">Due</label><br />
            <input type="date" id="wd-due-date" value="05-20-2024"/>
          </td>
        </tr>
        <br />

        <tr>
          <td></td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-from">Available from</label><br />
            <input type="date" id="wd-available-from" value="05-06-2024"/>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-available-until">Until</label><br />
            <input type="date" id="wd-available-until" value="05-20-2024"/>
          </td>
        </tr>
        <br />
      </table>

      <hr />
      <table>
        <tr>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td>
            <button>Cancel</button> <button>Save</button>
          </td>
        </tr>

      </table>
    </div>
);}