/**Primary Module
 * imports other modules as needed to implement app functionality
 */
import MenuBar from "./modules/MenuBar"

// On first page load
// Add event listeners to Menu items
window.addEventListener('load', () => {
    MenuBar.addOnClicks();
});