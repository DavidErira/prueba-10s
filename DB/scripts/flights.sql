
--
-- Estructura de tabla para la tabla `flights`
--

CREATE TABLE `flights` (
  `time` varchar(100) NOT NULL,
  `oridest` varchar(50) NOT NULL,
  `id` varchar(50) NOT NULL,
  `remarks` varchar(50) NOT NULL,
  `gate` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `flights`
--

INSERT INTO `flights` (`time`, `oridest`, `id`, `remarks`, `gate`, `type`) VALUES
('19:00', 'cali', '123', 'comentario', 'a1', 'arrival'),
('11:12', 'Bogota', '1002', 'comment', 'b2', 'departure'),
('99:10', 'Pasto', '1000', 'no hay coment', 'b2', 'arrival'),
('22:20', 'Pasto', '100005', '', 'b8', 'departure');
COMMIT;

