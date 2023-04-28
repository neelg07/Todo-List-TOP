import MenuBar from "./modules/MenuBar"
/**Primary Module
 * imports other modules as needed to implement app functionality
 */

// On first page load
// Add event listeners to Menu items
// Render 'All Tasks' Page
window.addEventListener('load', () => {
    MenuBar.addOnClicks();
    MenuBar.miscellaneous[0].click();
});