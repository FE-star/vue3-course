CREATE TABLE  IF NOT EXISTS `page_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `uuid` varchar(128) NOT NULL UNIQUE COMMENT '页面UUID', 
  `name` varchar(128) NOT NULL UNIQUE COMMENT '页面名称（字母和数字）', 
  `current_version` varchar(64) NOT NULL COMMENT '当前版本', 
  `layout` json COMMENT '布局互数据（JSON数据格式）', 
  `info` json COMMENT '描述（JSON数据格式）', 
  `extend` json COMMENT '扩展数据（JSON数据格式）', 
  `status` int(2) NOT NULL COMMENT '状态，0为删除，1为正常状态', 
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `modify_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;