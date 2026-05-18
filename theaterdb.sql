-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 14, 2026 at 05:29 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `theaterdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `halls`
--

CREATE TABLE `halls` (
  `hall_id` int(11) NOT NULL,
  `theatre_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `capacity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `halls`
--

INSERT INTO `halls` (`hall_id`, `theatre_id`, `name`, `capacity`) VALUES
(2, 5, 'Αρχαία Σκηνή Επιδαύρου', 20),
(3, 6, 'Κεντρικό Διάζωμα Ηρωδείου', 10),
(4, 7, 'Θέατρο Διονύσου - Ορχήστρα', 50);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `reservation_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `showtime_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('CONFIRMED','CANCELLED') DEFAULT 'CONFIRMED',
  `reserved_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`reservation_id`, `user_id`, `showtime_id`, `total_amount`, `status`, `reserved_at`) VALUES
(8, 4, 3, 25.00, 'CONFIRMED', '2026-05-14 13:08:47'),
(9, 11, 8, 60.00, 'CONFIRMED', '2026-05-14 14:19:58'),
(10, 2, 3, 25.00, 'CANCELLED', '2026-05-14 15:16:32');

-- --------------------------------------------------------

--
-- Table structure for table `reservation_seats`
--

CREATE TABLE `reservation_seats` (
  `reservation_id` int(11) NOT NULL,
  `seat_id` int(11) NOT NULL,
  `seat_price` decimal(10,2) NOT NULL,
  `showtime_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservation_seats`
--

INSERT INTO `reservation_seats` (`reservation_id`, `seat_id`, `seat_price`, `showtime_id`) VALUES
(8, 7, 25.00, 3),
(9, 21, 30.00, 8),
(9, 22, 30.00, 8);

-- --------------------------------------------------------

--
-- Table structure for table `seats`
--

CREATE TABLE `seats` (
  `seat_id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL,
  `row_label` varchar(5) NOT NULL,
  `seat_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seats`
--

INSERT INTO `seats` (`seat_id`, `hall_id`, `row_label`, `seat_number`) VALUES
(6, 2, 'A', 1),
(7, 2, 'A', 2),
(8, 2, 'A', 3),
(9, 2, 'A', 4),
(10, 2, 'A', 5),
(11, 2, 'B', 1),
(12, 2, 'B', 2),
(13, 2, 'B', 3),
(14, 2, 'B', 4),
(15, 2, 'B', 5),
(16, 3, 'A', 1),
(17, 3, 'A', 2),
(18, 3, 'A', 3),
(19, 3, 'A', 4),
(20, 3, 'A', 5),
(21, 3, 'B', 1),
(22, 3, 'B', 2),
(23, 3, 'B', 3),
(24, 3, 'B', 4),
(25, 3, 'B', 5),
(26, 4, 'A', 1),
(27, 4, 'A', 2),
(28, 4, 'A', 3),
(29, 4, 'A', 4),
(30, 4, 'A', 5),
(31, 4, 'B', 1),
(32, 4, 'B', 2),
(33, 4, 'B', 3),
(34, 4, 'B', 4),
(35, 4, 'B', 5),
(56, 2, 'C', 1),
(57, 2, 'C', 2),
(58, 2, 'C', 3),
(59, 2, 'C', 4),
(60, 2, 'C', 5),
(61, 2, 'D', 1),
(62, 2, 'D', 2),
(63, 2, 'D', 3),
(64, 2, 'D', 4),
(65, 2, 'D', 5),
(66, 4, 'C', 1),
(67, 4, 'C', 2),
(68, 4, 'C', 3),
(69, 4, 'C', 4),
(70, 4, 'C', 5),
(71, 4, 'D', 1),
(72, 4, 'D', 2),
(73, 4, 'D', 3),
(74, 4, 'D', 4),
(75, 4, 'D', 5),
(76, 4, 'E', 1),
(77, 4, 'E', 2),
(78, 4, 'E', 3),
(79, 4, 'E', 4),
(80, 4, 'E', 5),
(81, 4, 'F', 1),
(82, 4, 'F', 2),
(83, 4, 'F', 3),
(84, 4, 'F', 4),
(85, 4, 'F', 5),
(86, 4, 'G', 1),
(87, 4, 'G', 2),
(88, 4, 'G', 3),
(89, 4, 'G', 4),
(90, 4, 'G', 5),
(91, 4, 'H', 1),
(92, 4, 'H', 2),
(93, 4, 'H', 3),
(94, 4, 'H', 4),
(95, 4, 'H', 5),
(96, 4, 'I', 1),
(97, 4, 'I', 2),
(98, 4, 'I', 3),
(99, 4, 'I', 4),
(100, 4, 'I', 5),
(101, 4, 'J', 1),
(102, 4, 'J', 2),
(103, 4, 'J', 3),
(104, 4, 'J', 4),
(105, 4, 'J', 5);

-- --------------------------------------------------------

--
-- Table structure for table `shows`
--

CREATE TABLE `shows` (
  `show_id` int(11) NOT NULL,
  `theatre_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `duration_minutes` int(11) NOT NULL,
  `age_rating` varchar(10) DEFAULT 'K',
  `status` enum('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `shows`
--

INSERT INTO `shows` (`show_id`, `theatre_id`, `title`, `description`, `duration_minutes`, `age_rating`, `status`) VALUES
(17, 5, 'Λυσιστράτη', 'Η κορυφαία αντιπολεμική κωμωδία του Αριστοφάνη.', 90, '12+', 'ACTIVE'),
(18, 5, 'Όρνιθες', 'Δύο Αθηναίοι ιδρύουν την πολιτεία των πουλιών ανάμεσα σε ουρανό και γη.', 100, 'K', 'ACTIVE'),
(19, 5, 'Βάτραχοι', 'Ο Διόνυσος κατεβαίνει στον Άδη για να φέρει πίσω έναν μεγάλο τραγικό.', 95, 'K', 'ACTIVE'),
(20, 6, 'Εκκλησιάζουσες', 'Οι γυναίκες της Αθήνας μεταμφιέζονται σε άνδρες και παίρνουν την εξουσία.', 85, '12+', 'ACTIVE'),
(21, 6, 'Πλούτος', 'Η τελευταία σωζόμενη κωμωδία του Αριστοφάνη για την κοινωνική αδικία.', 80, 'K', 'ACTIVE'),
(22, 6, 'Οιδίπους Τύραννος', 'Η τραγωδία του Σοφοκλή για την αναπόδραστη μοίρα.', 110, '15+', 'ACTIVE'),
(23, 6, 'Αντιγόνη', 'Η σύγκρουση του θείου νόμου με την κρατική εξουσία.', 105, '12+', 'ACTIVE'),
(24, 6, 'Ηλέκτρα', 'Το δράμα της εκδίκησης για τον φόνο του Αγαμέμνονα.', 100, '15+', 'ACTIVE'),
(25, 6, 'Μήδεια', 'Η συγκλονιστική τραγωδία του Ευριπίδη για την προδομένη σύζυγο.', 95, '15+', 'ACTIVE'),
(26, 7, 'Βάκχες', 'Η σύγκρουση της λογικής με το ένστικτο και τη λατρεία του Διονύσου.', 110, '16+', 'ACTIVE'),
(27, 7, 'Ιφιγένεια εν Αυλίδι', 'Η θυσία μιας κόρης για το συμφέρον του ελληνικού στόλου.', 100, '12+', 'ACTIVE'),
(28, 7, 'Εκάβη', 'Ο θρήνος και η εκδίκηση της βασίλισσας της Τροίας.', 90, '15+', 'ACTIVE'),
(29, 7, 'Προμηθεύς Δεσμώτης', 'Η τιμωρία του Τιτάνα που χάρισε τη φωτιά στους ανθρώπους.', 85, 'K', 'ACTIVE'),
(30, 7, 'Επτά επί Θήβας', 'Η αδελφοκτόνος σύγκρουση των γιων του Οιδίποδα.', 90, '15+', 'ACTIVE'),
(31, 7, 'Πέρσες', 'Η μοναδική σωζόμενη τραγωδία που βασίζεται σε ιστορικά γεγονότα.', 80, '12+', 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `showtimes`
--

CREATE TABLE `showtimes` (
  `showtime_id` int(11) NOT NULL,
  `show_id` int(11) NOT NULL,
  `hall_id` int(11) NOT NULL,
  `start_time` datetime NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `status` enum('ACTIVE','CANCELLED') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `showtimes`
--

INSERT INTO `showtimes` (`showtime_id`, `show_id`, `hall_id`, `start_time`, `base_price`, `status`) VALUES
(2, 17, 2, '2026-07-10 21:00:00', 25.00, 'ACTIVE'),
(3, 17, 2, '2026-07-11 21:00:00', 25.00, 'ACTIVE'),
(4, 18, 2, '2026-07-15 21:00:00', 20.00, 'ACTIVE'),
(5, 18, 2, '2026-07-16 21:00:00', 20.00, 'ACTIVE'),
(6, 19, 2, '2026-07-20 21:00:00', 18.00, 'ACTIVE'),
(7, 19, 2, '2026-07-21 21:00:00', 18.00, 'ACTIVE'),
(8, 20, 3, '2026-08-01 21:00:00', 30.00, 'ACTIVE'),
(9, 20, 3, '2026-08-02 21:00:00', 30.00, 'ACTIVE'),
(10, 21, 3, '2026-08-05 21:00:00', 22.00, 'ACTIVE'),
(11, 21, 3, '2026-08-06 21:00:00', 22.00, 'ACTIVE'),
(12, 22, 3, '2026-08-10 21:00:00', 35.00, 'ACTIVE'),
(13, 22, 3, '2026-08-11 21:00:00', 35.00, 'ACTIVE'),
(14, 23, 3, '2026-08-15 21:00:00', 28.00, 'ACTIVE'),
(15, 23, 3, '2026-08-16 21:00:00', 28.00, 'ACTIVE'),
(16, 24, 3, '2026-08-20 21:00:00', 25.00, 'ACTIVE'),
(17, 24, 3, '2026-08-21 21:00:00', 25.00, 'ACTIVE'),
(18, 25, 3, '2026-08-25 21:00:00', 30.00, 'ACTIVE'),
(19, 25, 3, '2026-08-26 21:00:00', 30.00, 'ACTIVE'),
(20, 26, 4, '2026-09-01 21:00:00', 20.00, 'ACTIVE'),
(21, 26, 4, '2026-09-02 21:00:00', 20.00, 'ACTIVE'),
(22, 27, 4, '2026-09-05 21:00:00', 15.00, 'ACTIVE'),
(23, 27, 4, '2026-09-06 21:00:00', 15.00, 'ACTIVE'),
(24, 28, 4, '2026-09-10 21:00:00', 15.00, 'ACTIVE'),
(25, 28, 4, '2026-09-11 21:00:00', 15.00, 'ACTIVE'),
(26, 29, 4, '2026-09-15 21:00:00', 18.00, 'ACTIVE'),
(27, 29, 4, '2026-09-16 21:00:00', 18.00, 'ACTIVE'),
(28, 30, 4, '2026-09-20 21:00:00', 20.00, 'ACTIVE'),
(29, 30, 4, '2026-09-21 21:00:00', 20.00, 'ACTIVE'),
(30, 31, 4, '2026-09-25 21:00:00', 25.00, 'ACTIVE'),
(31, 31, 4, '2026-09-26 21:00:00', 25.00, 'ACTIVE');

-- --------------------------------------------------------

--
-- Table structure for table `theatres`
--

CREATE TABLE `theatres` (
  `theatre_id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `location` varchar(150) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theatres`
--

INSERT INTO `theatres` (`theatre_id`, `name`, `location`, `description`) VALUES
(5, 'Αρχαίο Θέατρο Επιδαύρου', 'Επίδαυρος, Αργολίδα', 'Το τελειότερο αρχαίο ελληνικό θέατρο από άποψη ακουστικής.'),
(6, 'Ωδείο Ηρώδου Αττικού', 'Αθήνα, Ακρόπολη', 'Το εμβληματικό ρωμαϊκό ωδείο στη νότια κλιτύ της Ακρόπολης.'),
(7, 'Αρχαίο Θέατρο Διονύσου', 'Αθήνα, Πλάκα', 'Ο χώρος όπου γεννήθηκε το αρχαίο δράμα.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `email` varchar(190) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password_hash`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Κωνσταντίνος', 'kon@test.com', '$2b$10$knZeH4DFqG5gX6F54xzhHu1ELV6MQ4viOBNVwvhfBy1g04C6HKF5S', 'USER', '2026-05-13 23:18:45', '2026-05-13 23:18:45'),
(2, 'Alexis', 'a', '$2b$10$SzAWWVeAJsSXCq/DnUFvguIZuBnJ8lebF8axnz3pe.cUm4qlqDpFq', 'ADMIN', '2026-05-13 23:45:52', '2026-05-14 00:31:59'),
(3, 'add', 'b', '$2b$10$RaSsxbDD0SuwNT3pmAOcqOz/SnnkfPxPBhSraUvfN8h/g6Snatbsi', 'USER', '2026-05-13 23:55:11', '2026-05-13 23:55:11'),
(4, 'φφφφ', 'c', '$2b$10$xGN4ZLNr.bWOvbOjIqzPi.SSmNmUEWflnNDZYgzpdJ0JnkEIZ0qo2', 'USER', '2026-05-14 00:17:39', '2026-05-14 00:17:39'),
(7, 'dsffs', 'a@a.a', '$2b$10$//Ke72dOCEmINOyiQH1Cw.risjkrsQzSlMVGyHbHqNLOVDrDSj35O', 'USER', '2026-05-14 00:17:58', '2026-05-14 00:17:58'),
(8, 'δφξκδκδ', 'abc@abc.com', '$2b$10$XYZ0Kdx3VfpvSZEmfNq2oOf4Ojn5eMQ19ycjurb6Wtj35oQEV3fxq', 'USER', '2026-05-14 00:21:34', '2026-05-14 00:21:34'),
(10, 'b', 'b@b', '$2b$10$4Lh7HN.AdXbRyZeTvpQUg.ik9ac.9DOel9fX.G6nG0VtQ4Rvmkh0u', 'USER', '2026-05-14 10:53:06', '2026-05-14 10:53:06'),
(11, 'q', 'q', '$2b$10$6hk50QtUbb0FRYaTBPxKDu8P4V1v96bn3dhYR93cWjMNNWLjrPSgi', 'USER', '2026-05-14 14:19:36', '2026-05-14 14:19:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `halls`
--
ALTER TABLE `halls`
  ADD PRIMARY KEY (`hall_id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`reservation_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Indexes for table `reservation_seats`
--
ALTER TABLE `reservation_seats`
  ADD PRIMARY KEY (`reservation_id`,`seat_id`),
  ADD KEY `seat_id` (`seat_id`),
  ADD KEY `showtime_id` (`showtime_id`);

--
-- Indexes for table `seats`
--
ALTER TABLE `seats`
  ADD PRIMARY KEY (`seat_id`),
  ADD KEY `hall_id` (`hall_id`);

--
-- Indexes for table `shows`
--
ALTER TABLE `shows`
  ADD PRIMARY KEY (`show_id`),
  ADD KEY `theatre_id` (`theatre_id`);

--
-- Indexes for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD PRIMARY KEY (`showtime_id`),
  ADD KEY `show_id` (`show_id`),
  ADD KEY `hall_id` (`hall_id`);

--
-- Indexes for table `theatres`
--
ALTER TABLE `theatres`
  ADD PRIMARY KEY (`theatre_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `halls`
--
ALTER TABLE `halls`
  MODIFY `hall_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `reservation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `seats`
--
ALTER TABLE `seats`
  MODIFY `seat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `shows`
--
ALTER TABLE `shows`
  MODIFY `show_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `showtimes`
--
ALTER TABLE `showtimes`
  MODIFY `showtime_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `theatres`
--
ALTER TABLE `theatres`
  MODIFY `theatre_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `halls`
--
ALTER TABLE `halls`
  ADD CONSTRAINT `halls_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_ibfk_2` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`) ON DELETE CASCADE;

--
-- Constraints for table `reservation_seats`
--
ALTER TABLE `reservation_seats`
  ADD CONSTRAINT `reservation_seats_ibfk_1` FOREIGN KEY (`reservation_id`) REFERENCES `reservations` (`reservation_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_seats_ibfk_2` FOREIGN KEY (`seat_id`) REFERENCES `seats` (`seat_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservation_seats_ibfk_3` FOREIGN KEY (`showtime_id`) REFERENCES `showtimes` (`showtime_id`) ON DELETE CASCADE;

--
-- Constraints for table `seats`
--
ALTER TABLE `seats`
  ADD CONSTRAINT `seats_ibfk_1` FOREIGN KEY (`hall_id`) REFERENCES `halls` (`hall_id`) ON DELETE CASCADE;

--
-- Constraints for table `shows`
--
ALTER TABLE `shows`
  ADD CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`theatre_id`) REFERENCES `theatres` (`theatre_id`) ON DELETE CASCADE;

--
-- Constraints for table `showtimes`
--
ALTER TABLE `showtimes`
  ADD CONSTRAINT `showtimes_ibfk_1` FOREIGN KEY (`show_id`) REFERENCES `shows` (`show_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `showtimes_ibfk_2` FOREIGN KEY (`hall_id`) REFERENCES `halls` (`hall_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
