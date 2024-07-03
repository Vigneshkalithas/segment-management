# Segment Management Application

This React application allows users to save segment data with specified schemas. When a user clicks the "Save segment" button, a drawer appears from the right side, allowing the user to enter the segment name and select schemas. The application provides a form to add schemas dynamically and send the data to a server.

## Features

- **Save Segment Button**: Opens a drawer for segment input.
- **Drawer**: Contains input fields for segment name and schemas.
- **Schema Dropdown**: Allows selecting from predefined schema options.
- **Add Schema**: Adds selected schemas to the segment.
- **Remove Schema**: Removes selected schemas and makes them available for selection again.
- **Submit Data**: Sends segment data to a server.
- **Loading and Error Handling**: Displays a loading spinner during submission and handles errors.

## Requirements

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience.

## Getting Started

### Prerequisites

Ensure you have Node.js installed.

### Installation

1. Clone the repository:

   ```sh
   git clone <repository-url>

   ```

2. Navigate to the project directory:  

   ```sh
    cd testapp
    ```

    3.Install dependencies:  

   ```sh
    npm install
    ```

    4.Install dependencies:  

   ```sh
   npm install
    ```

### Running the Application

 1.Start the development server: 

   ```sh
  npm run dev

  ``` 
2. Open your browser and navigate to http://localhost:5173.





## Project Structure

- **src** : Contains the main application code.
- **App.js**: Main component with the form and logic for handling segment input.
- **App.css**: Styles for the application.
- **vite.config.js**: Configuration for Vite, including proxy setup.
 
## Code Overview

### App.js

- **State Management** : Manages the state for drawer visibility, segment name, selected schemas, available schemas, current schema, loading, and error states.
- **Handlers** :
 - **toggleDrawer** : Toggles the drawer visibility.
- **handleSegmentNameChange** : Updates the segment name state.
- **handleSchemaChange** : Updates the current schema state.
- **addSchema** : Adds the selected schema to the segment.
- **removeSchema** : Removes a schema from the segment.
- **saveSegment** : Sends the segment data to the server and handles loading and errors.
  
### App.css

- **Drawer Styles** : Styles for the drawer component, including open and close states.

## API Endpoint
The application sends data to a webhook URL. In this example, the URL is :
```sh
https://webhook.site/2febd075-0ef6-4bae-8d28-11d5ca8020f3
```


The data is sent in the following format :


```sh
{
  "segment_name": "example_segment_name",
  "schema": [
    { "first_name": "First Name" },
    { "last_name": "Last Name" }
  ]
}

```

## Error Handling

- **Validation** : Alerts the user if the segment name or schemas are not filled.
- **Loading State** : Displays a loading spinner during data submission.
- **Error State** : Displays an error message if the data submission fails.

## License
This project is licensed under the MIT License.