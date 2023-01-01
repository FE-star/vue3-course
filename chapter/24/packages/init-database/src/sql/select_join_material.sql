SELECT 
  mi.name AS material_name,
  mi.current_version AS current_version,
  ms.version AS snapshot_version
FROM 
  material_snapshot as ms
LEFT JOIN material_info AS mi ON mi.uuid = ms.material_uuid;