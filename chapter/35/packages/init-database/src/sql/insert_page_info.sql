INSERT INTO page_info
  (uuid, name, current_version, status, layout, info, extend )
VALUES 
  (
    '20001000-aaaa-bbbb-cccc-ddddeeee0001',
    '测试页面001',
    '1.2.0',
    1,
    '{"layout": {"rows": [{"uuid": "912f6e92-6b89-475e-9a75-e191cede57ea", "columns": [{"name": "首屏广告", "uuid": "d04eaef5-328b-48f7-9484-ae3bb95bbbd8", "width": 1000}]}, {"uuid": "0fdbe663-51d8-4038-9d0d-bdeed0c6eb71", "columns": [{"name": "促销商品", "uuid": "26148a93-e66a-4448-b6a4-4bddbce9ae4f", "width": 1000}]}, {"uuid": "7a3dbfa7-29ca-4765-bd58-7a91abda7721", "columns": [{"name": "其它广告位1", "uuid": "2be63a53-8a16-43ba-8640-a1ab24bdbae3", "width": 600}, {"uuid": "0184e8ed-7df4-4742-9bb4-b8dfa1a0aca7", "width": 400}]}], "width": 1000}, "moduleMap": {"26148a93-e66a-4448-b6a4-4bddbce9ae4f": {"materialData": {}, "materialName": "@my/material-product-list", "materialVersion": "0.9.0"}, "2be63a53-8a16-43ba-8640-a1ab24bdbae3": {"materialData": {}, "materialName": "@my/material-banner-slides", "materialVersion": "0.9.0"}, "d04eaef5-328b-48f7-9484-ae3bb95bbbd8": {"materialData": {}, "materialName": "@my/material-banner-slides", "materialVersion": "0.9.0"}}}',
    '{}',
    '{}'
  )
;
