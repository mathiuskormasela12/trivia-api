-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 05, 2020 at 04:52 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trivia_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `question` text NOT NULL,
  `correct_answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `type`, `question`, `correct_answer`) VALUES
(4, 'boolean', 'Clefairy was intended to be Ash&#039;s starting Pok&eacute;mon in the pilot episode of the cartoon', 'true'),
(5, 'multiple', 'Which anime heavily features music from the genre &quot;Eurobeat&quot;?', 'Initial D'),
(6, 'multiple', 'Who was given the title &quot;Full Metal&quot; in the anime series &quot;Full Metal Alchemist&quot;?', 'Edward Elric'),
(7, 'boolean', 'Studio Ghibli is a Japanese animation studio responsible for the films &quot;Wolf Children&quot; and &quot;The Boy and the Beast&quot;.', 'False'),
(8, 'boolean', 'In Kill La Kill, the weapon of the main protagonist is a katana.', 'False'),
(9, 'multiple', 'What is the last name of Edward and Alphonse in the Fullmetal Alchemist series.', 'Elric'),
(10, 'multiple', 'In &quot;Inuyasha&quot;, what are the heros are looking to collect?', 'Jewel Shards'),
(11, 'multiple', 'What is the name of the corgi in Cowboy Bebop?', 'Einstein'),
(12, 'multiple', 'What is the name of the stuffed lion in Bleach?', 'Kon'),
(13, 'multiple', 'In &quot;Fairy Tail&quot;, what is the nickname of Natsu Dragneel?', 'The Salamander');

-- --------------------------------------------------------

--
-- Table structure for table `scores`
--

CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `total_scores` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `scores`
--

INSERT INTO `scores` (`id`, `total_scores`, `user_id`) VALUES
(1, 10, 4),
(2, 10, 5);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`) VALUES
(1, 'Admin Api', 'admin@gmail.com', '$2a$08$JGg38ZWcKqH9GKuVpvlKZOqNfCR9mBsxuaeiwoLY0Viv4o5060uRe', 'admin'),
(4, 'Rizki Ramadhan', 'rizki@gmail.com', '$2a$08$j07sgVeLTDoFjORg1zJ/8eGVwhRm2cGIFibU9EdU6nW2J8NQTFUii', 'user'),
(5, 'Mathius Kormasela', 'mathius12@gmail.com', '$2a$08$on6h.Bnc7kenlcfiTjLCjudaEMYTXmbG.gBFueyzyOqopVWtacSUu', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `users_answer`
--

CREATE TABLE `users_answer` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `answer` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users_answer`
--

INSERT INTO `users_answer` (`id`, `question_id`, `user_id`, `answer`) VALUES
(1, 13, 4, 'the salamander'),
(2, 13, 4, 'the salamander'),
(3, 13, 4, 'the salamander'),
(4, 13, 4, 'the salamander'),
(5, 13, 4, 'the salamander'),
(6, 13, 4, 'the salamander'),
(7, 13, 4, 'the salamander'),
(8, 13, 4, 'the salamander'),
(9, 13, 4, 'the salamander'),
(10, 13, 4, 'the salamander'),
(13, 4, 5, 'true'),
(14, 4, 5, 'true'),
(15, 4, 5, 'false'),
(16, 6, 4, 'Edward Elric');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scores`
--
ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users_answer`
--
ALTER TABLE `users_answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `scores`
--
ALTER TABLE `scores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_answer`
--
ALTER TABLE `users_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `scores`
--
ALTER TABLE `scores`
  ADD CONSTRAINT `scores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_answer`
--
ALTER TABLE `users_answer`
  ADD CONSTRAINT `users_answer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
