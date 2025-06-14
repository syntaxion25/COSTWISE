# CostWise - Smart Production Cost Calculator

CostWise is an intuitive web-based application designed to help businesses and individuals accurately estimate production costs. It allows users to input various cost components such as raw materials, labor, overheads, and miscellaneous expenses, providing a comprehensive breakdown and insights for cost optimization.

repo link: https://github.com/syntaxion25/COSTWISE

## Features

* **Categorized Cost Input:** Easily input costs for:

  * Raw Materials (Name, Quantity, Unit Cost)

  * Labor (Hours Worked, Hourly Rate)

  * Overheads (Expense Name, Quantity/Units, Cost)

  * Miscellaneous Costs (Single total input)

* **Real-time Cost Calculation:** Instantly see the total production cost updated as you input data.

* **Currency Selection:** Choose between Indian Rupee (₹), Euro (€), and US Dollar ($) for cost calculations.

* **Dynamic Cost Summary:** A clear breakdown of costs by category with percentages of the total.

* **Interactive Pie Chart:** Visualize your cost distribution with a responsive pie chart powered by Chart.js.

* **AI-Powered Insights (Mock):** Get mock suggestions for cost optimization, major cost drivers, and efficiency comments based on your input data. (Note: The current AI integration is a mock implementation; for real AI, a backend API would be required.)

* **Template Saving & Loading:** Save your current cost configurations as templates and load them later for quick analysis or reuse.

* **Dark Mode Toggle:** Switch between light and dark themes for comfortable viewing.

* **Responsive Design:** The application is designed to be user-friendly on various devices, from desktops to mobile phones.

## Project Structure

* `index.html`: The main HTML file containing the structure of the web application.

* `style.css`: Contains all the CSS rules for styling the application, including responsive design and dark mode.

* `app.js`: Contains the core JavaScript logic for:

  * Handling input additions/deletions for material, labor, and overheads.

  * Calculating and updating total costs and their breakdown.

  * Managing the dark mode toggle.

  * The `createPromptForAI` and `generateAIInsights` functions (currently a mock implementation).

  * Tab navigation logic.

* `piechart.js`: Dedicated JavaScript file for initializing and updating the Chart.js pie chart, including theme adjustments for dark mode.

* `saveTemplates.js`: Manages the saving, loading, and deletion of cost templates using browser's local storage (mock).

## How to Use

1. Simply open this URL in your browser, <https://cost-wise.onrender.com/>

2. **If not working then, Open `index.html`:** Simply open the `index.html` file in your web browser.

3. **Input Costs:** Navigate through the tabs (Raw Materials, Labour, Overheads, Miscellaneous) and enter your production cost data.

4. **View Summary:** The "Cost Summary" section will automatically update with the total cost and breakdown.

5. **Analyze with Chart:** Switch to the "Cost Chart" tab to see a visual representation of your cost distribution.

6. **Get AI Insights:** Click the "Calculate & Get AI Insights" button to receive (mock) suggestions for optimization.

7. **Save/Load Templates:** Use the "Save Current as Template" button to store your data or "Load" a previously saved template from the "Saved Templates" tab.

8. **Toggle Dark Mode:** Use the switch in the header to change the theme.

## Technologies Used

* HTML5

* CSS3

* JavaScript (ES6+)

* Chart.js (for interactive pie charts)

* Font Awesome (for icons)

## Installation (Local Setup)

To run this project locally, simply clone the repository and open the `index.html` file in your web browser.

git clone "https://github.com/syntaxion25/COSTWISE"

cd costwise

open index.html # or start index.html


## Future Enhancements

* **Real AI Integration:** Connect to a robust AI API (e.g., Gemini API, OpenAI GPT) for genuine and dynamic cost analysis and optimization recommendations.

* **Data Persistence:** Implement a backend database (e.g., Firestore, MongoDB) for more robust and secure storage of user data and templates, moving away from browser-based storage.

* **User Authentication:** Add user login/registration for personalized experiences and secure data storage.

* **Export Options:** Allow users to export cost summaries and charts to PDF or Excel formats.

* **Advanced Analytics:** Introduce more complex financial metrics, break-even analysis, and profitability projections.

* **Responsive Chart Sizing:** Implement more dynamic resizing for the chart canvas based on container size changes.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).

# Authors:

Syntaxion(team) - [github.com/syntaxion25](https://github.com/syntaxion25)

Arsh Kotwal - [github.com/Arsh-03](https://github.com/Arsh-03)

Maaz kole - [github.com/Maaz-code-hub](https://github.com/Maaz-code-hub)

Nikhil Balkrishna Jadhav - [github.com/Nikhil-Balkrishna-Jadhav](https://github.com/Nikhil-Balkrishna-Jadhav)

Taha Khan - [github.com/](https://github.com/)
