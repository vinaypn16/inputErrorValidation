FAQ:

What this code does?
    In short - Makes the input error validations ADA compliant(partially). In other words, making the input error validations to be easily perceived by the disabled(visually impaired) users.
    Long story:
        During any input validation, if there is any validation error(s), this code does the following:
        -   grabs each error and selects its corresponding previous input field,
        -   takes the error message and adds it as an *aria-label* attribute to the input field,
        -   puts the focus to the first element with the error message and reads it out - so the screen reader reads out the error messages for the visually impaired user - goal achieved.

When is this useful?
    -   This blocks of code is useful when there is a input element/select/textarea or any such input elements that you need to validate and is followed by an element which is used to dislpay the validation error.
        *Hey! This can be done by just selecting the first element with the error message and then selecting its previousElementSibling to get the input element.* - Yes, read the next point.
    -   But this is extremely useful when the above two elements are not siblings of eachother.

        <div class="parent">
            <div class="one">
                <h1>Lorem, ipsum.</h1>
                <ul>
                    <li>
                        <input type="text" name="uname" placeholder="username!">    //  the input element.
                    </li>
                </ul>
            </div>
            <div class="two">
                <ul>
                    <li>45</li>
                    <li>98</li>
                    <li>23</li>
                </ul>
            </div>
            <span class="error">oh my gawd!! enter username please..</span>     //  the validation message.
        </div>

        "oh my gawd!! enter username please.." <- this message gets added to that input element as - <input type="text" name="uname" placeholder="username!" aria-label="oh my gawd!! enter username please..">

What are the requirements?
    -   "input", "select", "textarea" elements. Either within a form or floating around in the page(which ever suits your needs).
    -   An element with a class which is used to display the error validation message to the user. Usually a <span> is used.
        I have used the class named "error" here. Make yourself comfortable with any name.
    -   A screen reader such as *ChromeVox* or any other inbuilt screen readers.
    -   Some form of working audio output device(earphones, speakers, whatever..).

Note: Change the class names, elements, attributes or anything to meet your needs.
Note to self: Change this file to a MD file.
