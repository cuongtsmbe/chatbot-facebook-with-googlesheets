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
(1, '321365132', 'dhas654322df984asdsheet', 'data1', 'A2:A', 'D2:D', 'A', 'D', 'tokenaslkdalksdasdasdasdasd', 1),
(2, '321654132151321', 'sheetnamecong51321651', 'banhang', 'B2:B', 'F2:F', 'B', 'H', '', 1);