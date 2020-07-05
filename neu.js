/**
 * THE GENERATOR.
 *
 * Supported parameters:
 *  1. Background Color: Specifies the background color to be used
 *  2. Contrast: Specifies the contrast. If not specified, it would be computed from the background.
 *  3. borderRadius: The border radius for elements.
 *
 * What it returns:
 * 1. Outset: Styles for outset elements
 * 2. Inset: Styles for inset elements
 */
function Neu(parameters = {}) {
  let hue = parameters.hue || 280;
  let backgroundColor = rgbToHex(...hslToRgb(hue / 360, 0.5, 0.9));
  if (parameters.backgroundColor) {
    let rgb = hexToRgb(parameters.backgroundColor);
    let hsl = rgbToHsl(...rgb);
    hue = hsl[0] * 360;
    backgroundColor = parameters.backgroundColor;
  }
  let textColor =
    parameters.textColor || rgbToHex(...hslToRgb(hue / 360, 0.4, 0.2));
  let primaryColor =
    parameters.primaryColor || rgbToHex(...hslToRgb(hue / 360, 1, 0.5));

  let shadeContrast = parameters.contrast || 0.1;
  let borderRadius = parameters.borderRadius || 20;

  function getLighterShade(baseColor) {
    let rgb = hexToRgb(baseColor);
    let hsl = rgbToHsl(...rgb);
    // hsl[1] = hsl[1] + shadeContrast*;
    hsl[2] = hsl[2] / (1 - shadeContrast);
    if (hsl[2] > 1) {
      hsl[2] = 1;
    }
    let newRgb = hslToRgb(...hsl);
    let newHex = rgbToHex(...newRgb);
    return newHex;
  }
  function getDarkerShade(baseColor) {
    let rgb = hexToRgb(baseColor);
    let hsl = rgbToHsl(...rgb);
    // hsl[1] = hsl[1] - shadeContrast*0.1;
    hsl[2] = hsl[2] * (1 - shadeContrast);
    let newRgb = hslToRgb(...hsl);
    let newHex = rgbToHex(...newRgb);
    return newHex;
  }

  function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? [
          parseInt(result[1], 16),
          parseInt(result[2], 16),
          parseInt(result[3], 16),
        ]
      : null;
  }

  function rgbToHsl(r, g, b) {
    r = r / 255;
    g = g / 255;
    b = b / 255;
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [h, s, l];
  }

  function hslToRgb(h, s, l) {
    var r, g, b;

    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      function hue2rgb(p, q, t) {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      }

      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }

    return [(r * 255).toFixed(0), (g * 255).toFixed(0), (b * 255).toFixed(0)];
  }
  function componentToHex(c) {
    c = parseInt(c);
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  let darkShade = getDarkerShade(backgroundColor);
  let lightShade = getLighterShade(backgroundColor);
  let eraserStyles = `
    appearance:none;
    -webkit-appearance: none;
    border:none;
    outline:none;    
`;
  let basics = {
    outset: function (level = 2) {
      return (
        eraserStyles +
        `       
                border-radius: ${borderRadius}px;
                box-shadow: ${level / 2}px ${
          level / 2
        }px ${level}px ${darkShade}E6, 
                -${level / 2}px -${level / 2}px ${level}px ${lightShade}E6, 
                ${level / 2}px -${level / 2}px ${level}px ${darkShade}33, 
                -${level / 2}px ${level / 2}px ${level}px ${darkShade}33, 
                inset -${level / 2}px -${
          level / 2
        }px ${level}px ${darkShade}88, 
                inset ${level / 2}px ${level / 2}px ${level}px ${lightShade}4D;
                background: linear-gradient(to bottom right, ${lightShade}aa, ${darkShade}aa);`
      );
    },
    inset: function (level = 2) {
      return (
        eraserStyles +
        `box-shadow: -${level/2}px -${level/2}px ${level}px ${darkShade}88, 
                ${level/2}px ${level/2}px ${level}px ${lightShade}4D, 
                inset ${level/2}px ${level/2}px ${level}px ${darkShade}E6, 
                inset -${level/2}px -${level/2}px ${level}px ${lightShade}E6, 
                inset ${level/2}px -${level/2}px ${level}px ${darkShade}33, 
                inset -${level/2}px ${level/2}px ${level}px ${darkShade}33;
                background-color:${backgroundColor};
                border-radius:${borderRadius}px;
        `
      );
    },
  };
  return {
    ...basics,
    body: () => `
            background-color:${backgroundColor};
            color:${textColor};
        `,

    button: ({ level, disabled, type }) => {
      level = level || 1;
      disabled = disabled || false;
      type = type || "secondary";
      return {
        style: () => {
          let basicStyles = basics.outset(level * 3);
          return `${basicStyles};
            padding:10px 50px;
            transition: all 0.2s;
            cursor: ${disabled ? "not-allowed" : "pointer"};
            color:${
              disabled
                ? darkShade
                : type === "primary"
                ? primaryColor
                : textColor
            };`;
        },
        hover: () => {
          let hoverStyles = basics.outset(level * 2);
          return `${hoverStyles}
            padding:10px 50px;
            transition: all 0.2s;
            cursor: ${disabled ? "not-allowed" : "pointer"};
            color:${
              disabled
                ? darkShade
                : type === "primary"
                ? primaryColor
                : textColor
            };
            `;
        },
        active: () => {
          let activeStyles = basics.outset(level);
          return `  ${activeStyles};
            padding:10px 50px;
            transition: all 0.2s;
            cursor: ${disabled ? "not-allowed" : "pointer"};
            color:${
              disabled
                ? darkShade
                : type === "primary"
                ? primaryColor
                : textColor
            };
            background-color:${darkShade}44;`;
        },
      };
    },
    dropdown:({level,disabled})=>{
        level = level || 1;
        disabled = disabled || false;
        return {
            style:()=>{
                let basicStyles = basics.inset(level);
                return `${basicStyles};
                  padding:10px 20px;
                  transition: all 0.2s;
                  cursor: ${disabled ? "not-allowed" : "pointer"};
                  color:${
                    disabled
                      ? darkShade
                      : textColor
                  };`;
            },
            hover:()=>{
                let hoverStyles = basics.inset(level*2);
                return `${hoverStyles};
                padding:10px 20px;
                transition: all 0.2s;
                cursor: ${disabled ? "not-allowed" : "pointer"};
                color:${
                  disabled
                    ? darkShade
                    : textColor
                };`;
            }
        }
    }
  };
}
module.exports = Neu;