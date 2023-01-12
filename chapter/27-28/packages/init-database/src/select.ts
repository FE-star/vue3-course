/* eslint-disable no-console */
import { queryDatabaseSQL } from './util';
// import selectDemo from './sql/select_demo.sql?raw';
// import selectDemo from './sql/select_material_log.sql?raw';

const selectDemo =
  '\n' +
  '    SELECT\n' +
  '      m.id AS id,\n' +
  '      u.username AS username,\n' +
  '      m.material_name AS material_name,\n' +
  '      m.snapshot_version AS snapshot_version,\n' +
  '      m.create_time AS time\n' +
  '    FROM (\n' +
  '      SELECT \n' +
  '        ms.id AS id,\n' +
  '        mi.name AS material_name,\n' +
  '        ms.user_uuid AS user_uuid,\n' +
  '        mi.current_version AS current_version,\n' +
  '        ms.version AS snapshot_version,\n' +
  '        ms.create_time AS create_time\n' +
  '      FROM \n' +
  '        material_snapshot as ms\n' +
  '      LEFT JOIN material_info AS mi ON mi.uuid = ms.material_uuid\n' +
  '    ) AS m\n' +
  '    LEFT JOIN user_info AS u ON u.uuid = m.user_uuid\n' +
  // "    ORDER BY id DESC LIMIT '2', '5';  \n" +
  '    ORDER BY id DESC LIMIT 2, 5;  \n' +
  '  ';
async function main() {
  const data = await queryDatabaseSQL(selectDemo, []);
  console.log('data ===', data);
}

main();
