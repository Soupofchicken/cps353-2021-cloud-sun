import React, { useState } from "react";

/**
 * Component to display a Bible passage.
 */
function Passage() {
  /** Store a Bible passage, potentially multiple verses. */
  let [passage, setPassage] = useState();

  /** Store the user's specification of the passage to show.
   * If it is empty, the verse of the day is shown.
   */
  let [choice, setChoice] = useState("");  // Controlled component must
                                           // be initialized

  /** Update "passage" state with the scripture passage selected by "choice"
   */
  async function updatePassage() {
    // Bible API
    // documentation: https://labs.bible.org/api_web_service
    // rules: https://bible.org/copyright#cpyrt
    // example URL: https://labs.bible.org/api/?passage=John%203:16&type=json
    let reference = choice ? choice : "votd";
    console.log(reference);
    const netUrl = "https://labs.bible.org/api/?passage=" + reference
          + "&type=json";
    const result = await fetch(netUrl);
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    const passageJson = result.ok ? await result.json() : [{text: ""}];
    console.log("passageJson: "); //DBG
    console.log(passageJson);     //DBG
    setPassage(passageJson);
  }


  React.useEffect(() => {
    updatePassage();
  }, [choice]);  // Auto-update passage whenever choice changes (as they type)


  /** Return a printable string describing the scripture passage.
   * If passage is undefined, or its related fields are undefinedd,
   * return an empty string.
   * TODO: make it more general (only does first verse)
   */
  function getReference() {
    if (passage && passage[0].bookname) {
      let result = passage[0].bookname + " ";
      result += passage[0].chapter + ":";
      result += passage[0].verse;
      return(result);
    } else {
      return("");
    }
  }

  /** Component to display a formatted representation of the scripture passage,
   * including an appropriate reference.
   * If passage is undefined, return an empty string.
   * TODO: make it more general (only does first verse)
   * TODO: give error message if choice is not a valid reference
   */
  function FormattedPassage() {
    if (passage) {
      let text = passage[0].text;
      let result = <p>{text}<br/>{getReference()}</p>;
      return(result);
    } else {
      return("");
    }
  }


  /** Update choice state as field is updated (by user typing)
   */
  function handleChangeChoice(e) {
    setChoice(e.target.value);
    console.log("Changing choice to: " + e.target.value);
  }

  /** Don't refresh the whole page if user hits "enter"
   */
  function handleSubmit(e) {
    e.preventDefault();
  }

  /** Return a formatted representation of the scripture passage,
   * with a text box and button for selecting a new passage.
   */
  function chooser() {
    // React form and button:
    //   https://reactjs.org/docs/forms.html
    //   https://reactjs.org/docs/handling-events.html
    return (
      <div>
        <FormattedPassage/>
        <form onSubmit={handleSubmit}>
          <label>Passage:
          <input type="text" name="input" value={choice}
                 onChange={handleChangeChoice}/>
          </label>
        </form>
      </div>
    );
  }

  return (chooser());
}

export default Passage;
