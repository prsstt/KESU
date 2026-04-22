# KESU

> A professional, frameless Electron application for managing and erasing your Discord message history.

KESU is a powerful tool designed to give you full control over your digital footprint on Discord. It allows for seamless management and erasure of messages across servers and direct messages, all from a single, intuitive interface.

<!-- Add a screenshot or GIF of the application in action -->
<!-- ![KESU Application Screenshot](link-to-your-screenshot.png) -->

## Table of Contents

- [Features](#features)
- [Disclaimer](#disclaimer)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Building from Source](#building-from-source)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Global Audit Log**: Track and review a chronological history of all your erasure actions.
- **Multi-Target Selection**: Select multiple servers, channels, and direct messages simultaneously for a unified wipe session.
- **Deep Message Preview**: Reverse infinite scrolling allows you to preview your exact footprints in any selected channel before eradication.
- **Native Media Support**: View images, videos, and listen to audio files directly within the chat interface.
- **Advanced Message Selection**: Select individual messages from any conversation for targeted removal.
- **Developer Mode**: An advanced logging console is integrated directly into the workspace for real-time diagnostics.
- **Smart Rate Limiting**: Built-in delays and automatic handling of API rate limits ensure smooth, uninterrupted operation.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (LTS version is recommended)

## Installation

### From Releases (Recommended)

The easiest way to get started is to download the latest pre-built installer for your operating system from the project's [**Releases page**](https://github.com/prsstt/KESU/releases).

### From Source (For Developers)

If you prefer to build the application from source, follow these steps:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/sh0cky/KESU.git
    cd KESU
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the application**
    ```bash
    npm start
    ```

## Building from Source

To build a standalone installer for Windows, run the following command from the project root:
```bash
npm run build
```
The generated installer will be located in the dist directory.

## Security and Compliance

KESU utilizes secure token interception via network header monitoring, ensuring that sensitive credentials never leave the local environment. Data persistence is handled via isolated local storage.

## Liability Notice

_**The developers of KESU assume no responsibility for any consequences arising from the use of this software. Automating actions on user accounts may violates Discord's Terms of Service. Using this application is entirely at your own risk.**_

## License

Distributed under the MIT License. See LICENSE for more information.
