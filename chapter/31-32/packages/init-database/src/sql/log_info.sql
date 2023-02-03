CREATE TABLE  IF NOT EXISTS `log_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `type` char(64) NOT NULL COMMENT '日志类型，common | portal-front | portal-server | work-front | work-server', 
  `info` json COMMENT '描述（JSON数据格式）', 
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;