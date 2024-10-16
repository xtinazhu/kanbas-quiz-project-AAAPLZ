export default function TernaryOperator() {
  let numberVariable = 123, floatingPointNumber = 234.345;
  let true1 = true, false1 = false;
  let false2 = true1 && false1;
  let true2 = true1 || false1;
  let true3 = !false2;
  let true4 = numberVariable === 123; // always use === not ==
  let true5 = floatingPointNumber !== 321.432;
  let false3 = numberVariable < 100;
  let loggedIn = true;
  return(
    <div id="wd-ternary-operator">
       <h4>Logged In</h4>
       { loggedIn ? <p>Welcome</p> : <p>Please login</p> } <hr/>
    </div>
);}
