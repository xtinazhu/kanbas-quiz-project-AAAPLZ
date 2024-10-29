import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import EventObject from "./EventObject";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";

export default function Lab4() {
  //passing functions
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab3">
      <h3>Lab 4</h3>
      <ClickEvent/>
      <PassingDataOnEvent />
      <PassingFunctions theFunction={sayHello} />
      <EventObject />
      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
    </div>
  );
}