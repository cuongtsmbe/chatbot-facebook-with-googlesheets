CREATE DATABASE ggsheet;

use ggsheet;

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `fanpage_id` varchar(50) NOT NULL,
  `sheet_id` varchar(255) NOT NULL,
  `sheet_name` varchar(255) NOT NULL,
  `sdt_column` varchar(50) NOT NULL,
  `madon_column` varchar(50) NOT NULL,
  `start_column` varchar(50) NOT NULL,
  `end_column` varchar(50) NOT NULL,
  `key_fanpage` varchar(255) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


INSERT INTO `user` (`id`, `fanpage_id`, `sheet_id`, `sheet_name`, `sdt_column`, `madon_column`, `start_column`, `end_column`, `key_fanpage`, `status`) VALUES
(1, '104099862250569', '17KwoPtSv5mx77c0PFg8VGLzZfyajCo-SDNNBiC1ltuw', 'data1', 'D2:D', 'E2:E', 'A', 'E', 'EAAIg0JI8QGoBAP6PG87fclzWV9G3DqDngNEbfgfdwNF4UVsJoYtswKg9ENGrheTLa7tZBl4NcRKGwNoDf2WCwr0KnKTDvzibrZCaZB8Oc4o31UjIDRiBzJZAaYHxZAL9diCE90mqtHjzyEBs49a2eL3Q1e2xhYtKzAj4KL5cqaqSctbni9oQi', 1),
(2, '225038468945199', '100ebDMj7T8S3_sX9IftGdJ1AF7soH3OUYVVIfHKGDR4', 'banhang', 'G6:G', 'H6:H', 'D', 'H', 'EAAIg0JI8QGoBAN7hqeZCUZBMxtQyPjZCUZCuSlIPCqwDegQMhFyze5shKmM0mSZC8nXghSWjfyyhKw8kCTlDj31wIIQkBQBI54haaPJgTku95wrobH7I57wYtZAMW7Pgn1bKUmRlnSmNzAhPCdpDPzqAha0zabVJZBXQvFA4uK1d9MkqSDKMlVd', 1);




CREATE TABLE `admin` (
  `username` varchar(200) NOT NULL DEFAULT "admin",
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


--password : googlesheet

INSERT INTO `admin` (`username`, `password`) VALUES
('admin', 'b3938b3e1e6b41114b1738d13786202b56543396d6ae51e552acaa805e1863ab');

ALTER TABLE `admin`
  ADD PRIMARY KEY (`username`);
COMMIT;