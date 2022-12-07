console.log('Contentscript injected');

// Get the value of the euros in the Budget-to-Beat div regardless of reload
const euroVal = document.querySelector(
    '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > div:nth-child(3) > p:nth-child(3)'
).innerHTML
console.log("Value = " + euroVal)

// Create the element ot be injected, giving it a class and adding text
var injectedElement = document.createElement('div');
injectedElement.className = 'injectedElement';
const injectedText = document.createTextNode(`Budget-to-Beat: ${euroVal}`);
injectedElement.appendChild(injectedText);

// Function that sets styles
function css(element, style) {
    for (const property in style) {
        element.style[property] = style[property];
    }        
}

// Apply inline styles to injected element
css(injectedElement, {
    'background-color': '#11117d',
    'color': 'white',
    'float': 'right',
    'margin-top': '8px',
    'font-size': '18px',
    'padding': '8px',
    'border-radius': '5px',
    'position': 'relative'
});


// Initializes style element for pseudo styles in the head of the document and append to head
const pseudoStyles = document.createElement('style');
pseudoStyles.innerHTML = `
    .injectedElement:hover {
        background-color: white!important;
        border: #11117d 1px solid!important;
        color: #11117d!important;
        cursor: pointer; 
    }

    .injectedElement:hover::after {
        content: "Click me for more info!";
        font-size: 12px;
        color: red;
        text-align: center;
        display: block;
    }
`
const head = document.querySelector('head')
head.appendChild(pseudoStyles);

// Initialize parent element as a variable and attach new element to it
const parentElement = document.querySelector(
  '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > h1',
);
parentElement.appendChild(injectedElement);
