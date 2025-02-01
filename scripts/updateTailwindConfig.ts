import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the current directory path using `import.meta.url`
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Define file paths (relative to where this script is located)
const tailwindCssPath = path.join(__dirname, '..', 'css', 'tailwind.css')
const configTsPath = path.join(__dirname, '..', 'tailwind.config.ts')

// Read the Tailwind CSS file content
const tailwindCssContent = fs.readFileSync(tailwindCssPath, 'utf-8')

// Define regex pattern to extract CSS variables
const colorsRegex = /--([a-zA-Z0-9-]+)\s*:\s*([^;]+);/g

// Function to create a map of CSS variables to their HSL values
function extractColorsFromCss() {
  const colorMap = new Map<string, string>()
  let match

  // Extract all CSS variables and their values
  while ((match = colorsRegex.exec(tailwindCssContent)) !== null) {
    const [, varName, hslValue] = match
    colorMap.set(varName, hslValue)
  }

  return colorMap
}

// Function to update the tailwind.config.ts with the correct color comments
function updateConfigWithColorComments() {
  const colorMap = extractColorsFromCss()

  let configContent = fs.readFileSync(configTsPath, 'utf-8')

  // Loop through each color entry in the config file and insert the comment
  colorMap.forEach((hslValue, varName) => {
    const regex = new RegExp(`(${varName}[^,]*)`, 'g')
    const comment = ` /* ${hslValue} */`

    // If the variable is found in the config, append the comment
    configContent = configContent.replace(regex, (match) => {
      // Add the comment right after the variable value
      return `${match}${comment}`
    })
  })

  // Write the updated content back to the config file
  fs.writeFileSync(configTsPath, configContent, 'utf-8')

  console.log('Updated tailwind.config.ts with new color comments.')
}

// Run the function
updateConfigWithColorComments()
