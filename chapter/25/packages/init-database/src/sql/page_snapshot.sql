CREATE TABLE  IF NOT EXISTS `page_snapshot` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `version` varchar(64) NOT NULL COMMENT '快照版本', 
  `user_uuid` varchar(128) NOT NULL COMMENT '操作者的用户UUID', 
  `page_uuid` varchar(128) NOT NULL COMMENT '页面UUID', 
  `page_data` json COMMENT '页面快照数据（JSON数据格式）', 
  `extend` json COMMENT '扩展数据（JSON数据格式）', 
  `status` int(2) NOT NULL COMMENT '状态，0为删除，1为正常状态', 
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;