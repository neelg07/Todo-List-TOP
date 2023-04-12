import MenuBar from "./modules/MenuBar"
/**Primary Module
 * imports other modules as needed to implement app functionality
 */

// On first page load
// Add event listeners to Menu items
window.addEventListener('load', () => {
    MenuBar.addOnClicks();
});