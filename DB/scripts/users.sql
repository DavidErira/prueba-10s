--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'deem', '123456', 'admin'),
(3, 'david', '0000', 'admin'),
(4, 'david2', '0000', 'admin'),
(5, 'david3', '0000', 'admin'),
(6, 'deem2', '123456', 'visitor'),
(8, 'deem4', '123456', 'admin'),
(10, 'deem85', '13456', 'visitor'),
(11, 'nuevouser', '123', 'visitor');

