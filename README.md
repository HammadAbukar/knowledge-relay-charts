### This is a small web based SPA to show some details and analytics of different stocks.

### Visit the link for the live preview https://jim-smith1.github.io/knowledge-relay-charts/

### Technical Details 
  This app is using following technologies (please check the [package.json file](https://github.com/jim-smith1/knowledge-relay-charts/blob/main/package.json#L16) for the current versions )
  - React
  - Chart JS
  - SCSS
  - Polygon Public Api for data

### Application Structure
  * Main idea is to maintain all the styles in a separate modularize, SCSS based, Design system to keep them seprate from components behavior logic and keep both DS and React components reusable and maintainable. *
  - /src/components folder contains all the React components for the application
  - /src/assets have 2 folders
    - /icons for the images or icons
    - /styles for all the scss code for our Design system
  - /services have all the functionality to interact with internal/third party Apis
