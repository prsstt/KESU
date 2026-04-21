# KESU - Professional Discord Message Manager

KESU is a high-performance, frameless Electron application designed for the precise management and eradication of Discord message history. Built for efficiency and security, it provides a unified workspace for auditing and clearing digital footprints across servers and private conversations.

## Core Features

- **Global Audit System:** Comprehensive real-time logging of all erasure actions for administrative review.
- **Multi-Target Purge:** Ability to select and queue multiple servers, specific channels, and direct messages for simultaneous processing.
- **Native Media Integration:** View images, play videos, and listen to audio attachments directly within the application using native playback interfaces.
- **Granular Message Selection:** Select specific individual messages within a conversation for targeted removal without wiping the entire history.
- **Intelligent Infinite Scroll:** Deep scanning of message history with reverse-loading capabilities to locate and preview specific footprints.
- **Automated Rate Limiting:** Dynamic delay algorithms and automatic handling of Discord API rate limits (HTTP 429) to ensure account stability.
- **Developer Workspace:** Integrated diagnostic console for real-time monitoring of API requests and system events.

## Installation

Operating Environment: Node.js 16.x or higher.

1. Clone or download the source repository.
2. Execute the dependency installation:
   ```bash
   npm install
   ```
3. Initialize the application:
   ```bash
   npm start
   ```

## Production Deployment

To generate a standalone Windows installer (.exe):
```bash
npm run build
```
The compiled artifacts will be located in the `dist` directory.

## Security and Compliance

KESU utilizes secure token interception via network header monitoring, ensuring that sensitive credentials never leave the local environment. Data persistence is handled via isolated local storage.

### Terms of Service Advisory
The use of automation on Discord user accounts is a violation of their Terms of Service (self-botting). Users assume full responsibility for any administrative actions taken by Discord against their accounts. This software is provided for educational and administrative purposes without warranty.

## License

Distributed under the MIT License. See LICENSE for more information.
