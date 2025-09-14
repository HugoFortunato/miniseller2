# Mini Seller Console

## Overview

The Mini Seller Console is a lightweight application designed to manage and convert leads into opportunities. Built with React and Tailwind CSS, it leverages a feature-based architecture to ensure scalability and maintainability.

## Feature-Based Architecture

This project uses a feature-based architecture, organizing code by feature rather than by type. This approach offers several benefits:

- **Scalability**: As the application grows, new features can be added with minimal impact on existing code.
- **Maintainability**: Grouping related files together makes it easier to understand and modify features.
- **Isolation**: Each feature is self-contained, reducing dependencies and potential conflicts.

## Project Structure

- **src/components**: Contains React components organized by feature.
- **src/hooks**: Custom hooks for managing state and business logic.
- **src/data**: Local JSON files for simulating backend data.
- **src/types**: TypeScript interfaces and types for type safety.

## Styling with Tailwind CSS

Tailwind CSS is used for styling to provide a utility-first approach, making it easy to create responsive and modern designs. Additionally, components from the Shadcn library are utilized to replace native inputs and cards, enhancing the UI consistency and aesthetics.

## Testing and Scalability

To ensure quality and maintainability, the project includes unit tests built with Jest and React Testing Library. As the application scales, additional tests can be written to cover new features and edge cases.

For global state management, the project could be extended by creating a dedicated store/ folder to organize state slices, enabling better separation of concerns and supporting more complex workflows.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd miniseller2
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Project

To start the development server, run:

```bash
npm run dev
```

This will launch the application at `http://localhost:5173/`.

### Running Tests

To execute the test suite, use:

```bash
npm test
```

This will run all unit tests and display the results in the terminal.

## Additional Notes

- The project uses Vite for fast development and build processes.
- Jest and React Testing Library are used for testing components and hooks.
- TypeScript is employed throughout the project to ensure type safety and improve code quality.
