/* eslint-disable no-console */
import { queryDatabaseSQL } from './util';
// import selectDemo from './sql/select_demo.sql?raw';
import selectDemo from './sql/select_material_log.sql?raw';

async function main() {
  const data = await queryDatabaseSQL(selectDemo, []);
  console.log('data ===', data);
}

main();
