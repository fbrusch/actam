# Object Oriented Programming in Javascript, a super primer


Is there a way to standardize the creation of an object? Yes! We can define a so called _constructor_ which is a function like this:

```javascript
function Person(name) {
    this.name = name;
    this.greet = function() {console.log("Hi, I'm",this.name)}
}
```

After having defined a constructor, we can use it create a new object with the operator `new`:

```javascript

p = new Person("Francesco");

p.greet();

```

## DOM API

How can we interact, in Javascript, with the page that is rendering in a given moment?
Turns out the interface (or the Application Programming Interface, as it's nowadays called) of a page is structured with objects!

So we have that there is an object that represents the whole document (not surprisingly called `document`). `document` has properties that represent its subparts (`head` and `body`), every element has a `querySelector` method that lets us access elements contained in it, and so on. With this API, we can make pretty powerful things. Indeed, we can do _anything_ on the page (_anything_ that is possible by modifying html by hand, at least).

For instance, if we want to add a button, we can:

- Create a button object: the `document` object has a method `createElement` that creates an object of a given kind: `var button = document.createElement("button")`
- Add the button to the `body` element: `body.addChild(button)`
- Change the text on the button, through the `textContent` property of the `button` object: `button.textContent = "ciao"`
- Define an handler for the `click` event: `button.onclick = function() {alert("ciao")}`

Ok, try it, and then click yourself "ciao"!

## Example: let's build a button to play a note

Without ever touching a line of HTML, we can create, in our page, a button that, when clicked, plays a note.

In a console, first of all let's create a new `AudioContext` (is it clear now why we need the `new` operator? :))

```javascript
c = new AudioContext()`
```

Then we create our usual configuration of oscillator and gain nodes:

```javascript
o = c.createOscillator()
g = c.createGain()
o.connect(g)
g.gain.value = 0;
g.connect(c.destination);
o.start();
```

Then we define a function that modulates our `gain` to attack-decay shape our note:

```javascript
function play() {
    now = c.currentTime; 
    g.gain.linearRampToValueAtTime(1,now+0.5); 
    g.gain.linearRampToValueAtTime(0,now+1)
}
```

Ok, now we manipulate the DOM to add a button:

```javascript
button = document.createElement("button")
document.body.append(button)
button.textContent = "play"
button.onclick = play
```

We can of course gather all this code into a function, and generate as many play buttons as we want.

