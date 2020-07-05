# Neu : Neumorphism Styles Generator

Welcome to Neu. This is a small library which lets you generate Neumorphism styles for your JS application, just with the input of a color.
The only required parameter for Neu is hue, which defines which color should everything be based on.
<br>
To initialize the generator:
<pre>
var neuStyler= Neu();
</pre>
The other parameters are:
<ul>
    <li>Background Color: This would override the hue sent. The hue would be selected based on this.</li>
    <li>Text Color: This would override the text color determined by the hue.</li>
    <li>Primary Color: This would override the primary color determined by the hue.</li>
    <li>Contrast: The contrast between the light and dark shade used in elements.</li>
    <li>Border Radius: The border radius for elements.</li>
</ul>

 ## Currently Supported styles:
 Note: The following code examples are for directly using in core HTML, CSS, JS websites. For React components, use neu-components.
 <ul>
  <li><b>Body</b>: This sets the overall styles in document.body. To use this, 
    <pre>document.body.style = neuStyles.body();</pre>
  </li>
  <li><b>Outset Element</b>: This sets the styles for any elements that define a block in the web page. To use this,
    <pre>document.getElementById("block").style = neuStyles.outset(2)</pre>
    The parameter to this function is the level of the element.
    Also add padding to this element as required so that it is rendered properly. (Recommended padding : 40px)
  </li>
  <li><b>Inset Element</b>: This sets styles for any inset elements. This is mainly used for user inputs such as text areas.
    <pre>document.getElementById("input").style = neuStyles.inset(2)</pre>
    The parameter to this function is the level of the element.
  </li>
  <li><b>Button</b>: This sets styles for a button. This has 3 functions in it:
     <ul>
       <li>Style : Used for normal state styles</li>
       <li>Hover : Used for hover styles</li>
       <li>Active: Used for active styles</li>
    </ul>
    This can be used as required in your js code.
    A suggested function which can add all 3 styles together:
    <pre>
     function addButtonStyles(selector,parameters){
                document.querySelector(selector).style=neuStyles.button(parameters).style();
                document.querySelector(selector).onmouseenter=()=>{
                    document.getElementById(selector).style = neuStyles.button(parameters).hover();
                }
                document.querySelector(selector).onmouseleave=()=>{
                    document.getElementById(selector).style = neuStyles.button(parameters).style();
                }
                document.querySelector(selector).onmousedown=()=>{
                    document.getElementById(selector).style = neuStyles.button(parameters).active();
                }
                document.querySelector(selector).onmouseup=()=>{
                    document.getElementById(selector).style = neuStyles.button(parameters).style();
                }
            }
    </pre>
    Again, this would be lighter if neu-components is used.
  </li>
 </ul>
  
