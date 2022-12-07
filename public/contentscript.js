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

// Initialize parent element as a variable and attach new element to it
const parentElement = document.querySelector(
    '#root > div > div > div.makeStyles-mainPanel-3 > div.makeStyles-scrollbars-5 > div:nth-child(1) > div > section > h1',
  );
  parentElement.appendChild(injectedElement);
  

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

// Create dropdown element and append text
var dropdownElement = document.createElement('div');
dropdownElement.className = 'dropdownElement';
const dropdownText = document.createTextNode(`
    Climate change dummy:
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna
    aliqua.
`)
dropdownElement.appendChild(dropdownText);

// Append hidden dropdown element to injected element
parentElement.insertBefore(dropdownElement, parentElement.firstChild);
css(dropdownElement, {
    'width': '197px',
    'font-size': '12px',
    'float': 'right',
    'border': '1px solid #1111fd',
    'border-radius': '4px',
    'display': 'none'
})


// Fucntion to show/hide the dropwdown
function showHideDropdown() {
    let classes = injectedElement.className;
    let classArr = classes.split(' ');
    if (!classArr.includes('shown')) {
        css(dropdownElement, {
            'width': '197px',
            'font-size': '12px',
            'float': 'right',
            'border': '1px solid #1111fd',
            'border-radius': '4px',
            'display': 'block'
        });
        injectedElement.classList.add('shown');
    } else {
        css(dropdownElement, {
            'width': '197px',
            'font-size': '12px',
            'float': 'right',
            'border': '1px solid #1111fd',
            'border-radius': '4px',
            'display': 'none'
        });
        injectedElement.classList.remove('shown');
    }
}

// Add click event listener to the injected element
injectedElement.addEventListener('click', showHideDropdown);
