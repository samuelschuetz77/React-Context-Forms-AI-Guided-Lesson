explain why React is the source of truth: 

    - name holds the name input's text.
    - email holds the email input's text.
    - course holds the selected course.

    The imput only stores what each state says

    Typing triggers onchange to fire which updates state, and react will rerender these
    compnonetns when it knows state has changed 

    It is useful for react to own state 




Reflection questions:
1. What makes an input controlled?

    To be a controlled input in React you must have a value set from REact State and onChange must update the state. 
    in an input that is controlled, the value prop is the only thing that changes, and in order to change react  must trigger a reset on the DOM value. 

2. Why do we prevent invalid form submissions?

    Because they wouldn't serve any useful purpose in our db if they are invalid!

3. What problem did Context solve in this application?

Context provides a way to pass data through the component tree without having to pass props down manually at every level. If we didn't have Context, many componenets would have to pass prop down to lower levels. This is known as prop drilling, and it should be avoided.


4. When would props be preferable to Context?

If lots of components next to eachother all need the same data

5. What did you add independently, and how did you test it?

I added a new field called study goal. If its less than 10 characters and gets an error:  "Describe your study goal in at least 10 characters." 

My study goal with this class is to make awesome web applications using mostly ai, dive into controversy about best architectures and build lightning fast applications! 

