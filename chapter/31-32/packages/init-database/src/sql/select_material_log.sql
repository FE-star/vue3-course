SELECT 
  u.username AS username,
  m.material_name AS material_name,
  m.snapshot_version AS snapshot_version,
  m.create_time AS time
FROM (
  SELECT 
    mi.name AS material_name,
    ms.user_uuid AS user_uuid,
    mi.current_version AS current_version,
    ms.version AS snapshot_version,
    ms.create_time AS create_time
  FROM 
    material_snapshot as ms
  LEFT JOIN material_info AS mi ON mi.uuid = ms.material_uuid
) AS m
LEFT JOIN user_info AS u ON u.uuid = m.user_uuid;