# KESU

Professional Discord Message Manager. A powerful, frameless Electron application designed to seamlessly manage and erase your Discord message history across servers and direct messages.

## Features

- **Global Audit Log:** Track and review a chronological history of all your erasure actions.
- **Multi-Target Selection:** Select multiple servers, channels, and direct messages simultaneously for a unified wipe session.
- **Deep Message Preview:** Reverse infinite scrolling allows you to preview your exact footprints in any selected channel before eradication.
- **Developer Mode:** Advanced logging console integrated directly into the workspace for real-time diagnostics.
- **Smart Rate Limiting:** Built-in delays and automatic handling of API rate limits (HTTP 429) ensure smooth and uninterrupted operation.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed.

1. Clone or download the repository.
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```

## Building Executables

To build a standalone `.exe` installer for Windows:
```bash
npm run build
```
The generated installer will be located in the `dist/` directory.

## Liability Notice

The developers of KESU assume no responsibility for any consequences arising from the use of this software. Automating actions on user accounts violates Discord's Terms of Service. Using this application is entirely at your own risk.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
