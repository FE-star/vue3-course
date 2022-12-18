SELECT 
  u.username AS username,
  m.version AS version
FROM 
  material_snapshot AS m
LEFT JOIN user_info AS u ON m.user_uuid = u.uuid;

