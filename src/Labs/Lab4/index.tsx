//2.2 Handling User Events
import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";

//2.3 Managing Component State
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariable from "./DateStateVariable";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";

//2.4 Managing Application State
import ReduxExamples from "./ReduxExamples";

export default function Lab4() {
  //passing functions
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4" className="container">
      <h2>Lab 4</h2><br />
      <ClickEvent/>
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariable />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />

      <ReduxExamples/>
    </div>
  );
}