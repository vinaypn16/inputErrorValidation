class InputFieldValidationMessage{

  inputErrorValidationHandling(){

    $(window).load(handleInputValidationFocus);
    $('form').on('submit',handleInputValidationFocus);
    $('.nonFormSubmitButton').on('keydown',handleInputValidationFocus);

    function handleInputValidationFocus(e){
      setTimeout(() => {
        let errorSpans = null;
        let isFirstElementFocussed = false;

        //  If it's a form - select error spans only within the form, else if it's not a form - select all error spans in the page.
        if(e.target.tagName != undefined && e.target.tagName.toLowerCase() == "form"){
          errorSpans = e.target.querySelectorAll(".error:not([style='display: none;'])");
        }else{
          errorSpans = $(".error:not([style='display: none;'])");
        }

        //  For all the error spans, if it has some error message, get its previous input/select/textarea field, put aria-label and focus it.
        //  Adds aria-label to all the fields but focuses ONLY to the first error field.
        for (let i = 0; i < errorSpans.length; i++) {
          if (errorSpans[i].innerText.trim().length > 0) {
            let eachErrorSpan = errorSpans[i];
            let matchedInputFieldForTheError = inputHunter(errorSpans[i]);
            if (matchedInputFieldForTheError !== null && matchedInputFieldForTheError !== undefined) {
              matchedInputFieldForTheError.setAttribute("aria-label", eachErrorSpan.innerText);
              if (isFirstElementFocussed == false) {
                matchedInputFieldForTheError.focus();
                isFirstElementFocussed = true;
              }
            }
            // break;
          }
        }
      }, 1000);
    }

    /**
     * Working:
     * 1. If the passed element is not null, get its previous element.
     * 2. If the previous element is null, get parent node of element and repeat the same.
     * 3. If the previous element is not null, if it's a div or span (or anything else if required), dig through it and find the input field.
     *    If input field is not found in the div/span, repeat the same steps for that previous element.
     * 4. If the previous element is a select/input/textarea (or anything else if required) directly return that, else repeat the same function for that previous element.
     * 5. If the previous element is undefined or null, go to its parent and then repeat the same steps.
     */
    function inputHunter(element) {
      // 1.
      if(element !== null && element !== undefined){
        let previousElement = element.previousElementSibling;
        if (previousElement !== null && previousElement !== undefined) {
          // 3.
          if (previousElement.tagName != undefined && (previousElement.tagName.toLowerCase() == "div" || previousElement.tagName.toLowerCase() == "span")) {
            let theInputField = divResearcher(previousElement);
            if (theInputField == null) {
              let theInputField = inputHunter(previousElement);
              return theInputField;
            } else {
              return theInputField;
            }
          }
          // 4.
          else if (previousElement.tagName != undefined && previousElement.getAttribute("hidden") == null && previousElement.getAttribute("disabled") == null && previousElement.getAttribute("type") != "hidden"){
              if(previousElement.tagName.toLowerCase() == "select"|| previousElement.tagName.toLowerCase() == "input" || previousElement.tagName.toLowerCase() == "textarea"){
                return previousElement;
              }else{
                let theInputField = inputHunter(previousElement);
                return theInputField;
              }
            }
          // 5.
          else {
            let theInputField = inputHunter(previousElement);
            return theInputField;
          }
        }
        // 2.
        else {
          let theInputField = inputHunter(element.parentNode);
          return theInputField;
        }
      }
    }

    /**
     * This either returns the input/select/textarea element or it returns null..
     * Working:
     * 1. Get ALL the elements under the passed argument. Converts it into an array.
     * 2. Loop via the array from the bottom and look for "input/select/textarea" element.
     * 3. If found, return that and break, else keep looping until array ends and return null.
     */
    function divResearcher(element) {
      // 1.
      let listOfAllInnerElements = element.getElementsByTagName("*");
      let listOfAllInnerElementsAsArray = Array.prototype.slice.call(listOfAllInnerElements);
      let theInputField = null;
      // 2.
      for (let i = listOfAllInnerElementsAsArray.length - 1; i >= 0; i--) {

        if(listOfAllInnerElementsAsArray[i] != undefined && listOfAllInnerElementsAsArray[i] != null && listOfAllInnerElementsAsArray[i].getAttribute("hidden") == null && listOfAllInnerElementsAsArray[i].getAttribute("disabled") == null && listOfAllInnerElementsAsArray[i].getAttribute("type") != "hidden"){
          if(listOfAllInnerElementsAsArray[i].tagName.toLowerCase() == "select" || listOfAllInnerElementsAsArray[i].tagName.toLowerCase() == "input" || listOfAllInnerElementsAsArray[i].tagName.toLowerCase() == "textarea"){
            theInputField = listOfAllInnerElementsAsArray[i];
            break;
          }
        }else {
          continue;
        }

      }
      // 3.
      return theInputField;
    }
  
  }

}   //  class end.