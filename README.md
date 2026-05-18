# theater-booking
A theater reservation system, built with react, aiming to offer a user friendly application for the audience.
# Theater Reservation App 🎭

A full-stack mobile application built with React Native (Expo) and Node.js/MySQL. It allows users to browse theaters, view shows, book specific seats dynamically, and manage their reservations.

## Features
* **User Authentication:** Register, login, and secure sessions using JWT.
* **Browse Shows:** View available theaters, shows, and dates.
* **Interactive Seat Booking:** Select the number of seats and view real-time availability.
* **Profile Management:** View active reservations, cancel bookings, or delete account.

## Prerequisites
To run this project locally, you will need:
* [Node.js](https://nodejs.org/) installed.
* [XAMPP](https://www.apachefriends.org/index.html) or any local MySQL server.
* [Expo Go](https://expo.dev/client) app installed on your iOS or Android device.
* Git installed (to clone the repository).

---

## 🚀 Installation & Setup Guide

### 1. Database Setup
1. Start **Apache** and **MySQL** from your XAMPP Control Panel.
2. Open phpMyAdmin (usually `http://localhost/phpmyadmin`).
3. Create a new database named `theaterdb`.
4. Import the `.sql` file included in this repository to create the tables and dummy data.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   cd backend

    Install the necessary dependencies:

    npm install

    Create a .env file in the backend folder and add your database, JWT, and IP configurations. Replace YOUR_IPv4_ADDRESS with your actual local network IP (e.g., 192.168.1.14):

    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=
    DB_NAME=theaterdb
    JWT_SECRET=your_super_secret_key_here
    BASE_IP=YOUR_IPv4_ADDRESS

    Start the server:

    npm start

    Note: Ensure your backend terminal shows the network IP. Keep this terminal open.

2. Frontend Setup

    Open a new terminal window and navigate to the frontend folder:

    cd frontend

    Install the necessary dependencies:

    npm install

    Configure the API connection by creating a .env file inside the frontend folder:

    # Replace YOUR_IPv4_ADDRESS with your actual local network IP
    EXPO_PUBLIC_API_URL=http://YOUR_IPv4_ADDRESS:3000/api

    Start the Expo app (using the -c flag to clear the cache and load the new environment variables):

    npx expo start -c

    Scan the QR code shown in the terminal using the Expo Go app on your phone (ensure your phone and computer are on the same Wi-Fi network).
