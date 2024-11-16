# Firebase Cloud Functions Project

This project is a Firebase Cloud Functions application using Express.js. It includes endpoints for managing user data and drawings.


## Setup

### Prerequisites

- Node.js (version 18)
- Firebase CLI

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/bpn182/konva-backend.git
    cd konva-backend/functions
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Initialize Firebase Admin SDK:

    Create a file named `admin.ts` in the `firebase` directory and initialize the Firebase Admin SDK:

    ```typescript
    import * as admin from "firebase-admin";

    admin.initializeApp();

    export const db = admin.firestore();
    ```

4. Set up Firebase project:

    ```sh
    firebase use --add
    ```

## Usage

### Running Locally

To run the Firebase Emulator Suite locally:

```sh
firebase emulators:start