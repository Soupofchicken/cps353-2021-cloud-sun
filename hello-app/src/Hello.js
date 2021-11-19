import React, { useState } from "react";

/**
 * Component to display a Hello greeting message.
 */
function Hello() {
  /** Store a greeting. */
  let [greeting, setGreeting] = useState();

  /** Store the user's name, for a personalized greeting.
   * If it is empty, a generic greeting is shown.
   * Note: this is a "controlled component", and therefore must be
   * initialized (not left undefined). See
   * https://reactjs.org/docs/forms.html#controlled-components
   */
  let [name, setName] = useState("");

  /** Update "greeting" state with a greeting based on "name". */
  async function updateGreeting() {
    console.log("Hello:")
    const who = name ? name : "world";
    console.log(who);
    // const netUrl = "http://localhost:8080/" + who;
    const netUrl = "https://helloworld-vnxmg5ivtq-uc.a.run.app/" + who;
    console.log(netUrl);
    const result = await fetch(netUrl);
    const greetingJson = await result.json();
    console.log("greetingJson: "); //DBG
    console.log(greetingJson);     //DBG
    setGreeting(greetingJson);
  }


  React.useEffect(() => {
    updateGreeting();
  }, [name]);  // Auto-update greeting whenever name changes (as they type)


  /** Component to display a formatted greeting. */
  function FormattedGreeting() {
    if (greeting) {
      let text = greeting.text;
      let result = <p>{text}</p>;
      return(result);
    } else {
      return("");
    }
  }


  /** Update name state as field is updated (by user typing)
   */
  function handleChangeName(e) {
    setName(e.target.value);
    console.log("Changing name to: " + e.target.value);
  }

  /** Don't refresh the whole page if user hits "enter"
   */
  function handleSubmit(e) {
    e.preventDefault();
  }

  /** Return a formatted representation of the greeting,
   * with a text box and button for selecting a new name.
   */
  function chooser() {
    // React form and button:
    //   https://reactjs.org/docs/forms.html
    //   https://reactjs.org/docs/handling-events.html
    return (
      <div>
        <FormattedGreeting/>
        <form onSubmit={handleSubmit}>
          <label>Name:
            <input type="text" name="input" value={name}
                   onChange={handleChangeName}/>
          </label>
        </form>
      </div>
    );
  }

  return (chooser());
}

export default Hello;
