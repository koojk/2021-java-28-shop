# 무한다중카테고리 (Nested Model)

```
/* 샘플테이블 만들기 */

CREATE TABLE cate (

id INT AUTO_INCREMENT PRIMARY KEY,
id VARCHAR(20) NOT NULL,
lft INT NOT NULL,
rgt INT NOT NULL
);

INSERT INTO cate VALUES(1,'ELECTRONICS',1,20),(2,'TELEVISIONS',2,9),(3,'TUBE',3,4),(4,'LCD',5,6),(5,'PLASMA',7,8),(6,'PORTABLE ELECTRONICS',10,19),(7,'MP3 PLAYERS',11,14),(8,'FLASH',12,13),(9,'CD PLAYERS',15,16),(10,'2 WAY RADIOS',17,18);

CREATE TABLE product (

product_id INT AUTO_INCREMENT PRIMARY KEY,
id VARCHAR(40),
id INT NOT NULL
);

INSERT INTO product(id, id) VALUES('20" TV',3),('36" TV',3),('Super-LCD 42"',4),('Ultra-Plasma 62"',5),('Value Plasma 38"',5),('Power-MP3 5gb',7),('Super-Player 1gb',8),('Porta CD',9),('CD To go!',9),('Family Talk 360',10);

/* 테이블 보기 */
SELECT * FROM cate ORDER BY id;

/* 모든 카테고리 명 가져오기 */
SELECT node.*
FROM cate AS node CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt AND parent.id = '2'
ORDER BY node.lft;

/* 최종 카테고리 가져오기 */
SELECT * FROM cate WHERE rgt = lft + 1;

/* 단일 경로 가져오기 - 상위 */
SELECT parent.*
FROM cate AS node CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt AND node.id = '16'
ORDER BY parent.lft;

/* Depth 가져오기 */
SELECT node.*,  (COUNT(parent.id) - 1) AS depth
FROM cate AS node CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt
GROUP BY node.id ORDER BY node.lft;

/* Depth 가져오기, 상품의 카테고리 정리와 더불어 */
SELECT node.*,  (COUNT(parent.id) - 1) AS depth, rel.idx
FROM
cate AS node CROSS JOIN
cate AS parent LEFT JOIN
cate_rel AS rel
WHERE node.lft BETWEEN parent.lft AND parent.rgt
GROUP BY node.id ORDER BY node.lft;

/* SUB 의 Depth 가져오기 */
SELECT node.*, (COUNT(parent.id) - (sub_tree.depth + 1)) AS depth
FROM cate AS node
CROSS JOIN cate AS parent
CROSS JOIN cate AS sub_parent
CROSS JOIN (
SELECT node.id, (COUNT(parent.id) - 1) AS depth
FROM cate AS node CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft
AND parent.rgt
AND node.id = '6'
GROUP BY node.id ORDER BY node.lft
)AS sub_tree
WHERE node.lft BETWEEN parent.lft
AND parent.rgt
AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
AND sub_parent.id = sub_tree.id
GROUP BY node.id ORDER BY node.lft;

/* SUB 의 Depth 가져오기2 - 원하는 Depth 까지 가져오기 */
SELECT node.*, (COUNT(parent.id) - (sub_tree.depth + 1)) AS depth
FROM
cate AS node
CROSS JOIN cate AS parent
CROSS JOIN cate AS sub_parent
CROSS JOIN (
SELECT node.id, (COUNT(parent.id) - 1) AS depth
FROM
cate AS node
CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft
AND parent.rgt
AND node.id = '6'
GROUP BY node.id
ORDER BY node.lft ) AS sub_tree
WHERE
node.lft BETWEEN parent.lft AND parent.rgt
AND node.lft BETWEEN sub_parent.lft AND sub_parent.rgt
AND sub_parent.id = sub_tree.id
GROUP BY node.id HAVING depth <= 1
ORDER BY node.lft;

/* 카테고리별 상품 갯수 가져오기 */
SELECT parent.*, COUNT(product.num)
FROM cate AS node
CROSS JOIN cate AS parent
CROSS JOIN product AS product
WHERE node.lft BETWEEN parent.lft AND parent.rgt
AND node.id = product.cate
GROUP BY parent.id ORDER BY node.lft;

/* 카테고리 추가 */
LOCK TABLE cate WRITE;

SELECT @myRight := rgt FROM cate
WHERE id = '2';

UPDATE cate SET rgt = rgt + 2 WHERE rgt > @myRight;
UPDATE cate SET lft = lft + 2 WHERE lft > @myRight;

INSERT INTO cate(id, lft, rgt, pid) VALUES('GAME CONSOLES', @myRight + 1, @myRight + 2, 2);

UNLOCK TABLES;

/* 카테고리 추가2 */
LOCK TABLE cate WRITE;

SELECT @myLeft := lft FROM cate

WHERE IDENTIFIED = '10';

UPDATE cate SET rgt = rgt + 2 WHERE rgt > @myLeft;
UPDATE cate SET lft = lft + 2 WHERE lft > @myLeft;

INSERT INTO cate(id, lft, rgt, pId) VALUES('FRS', @myLeft + 1, @myLeft + 2, 10);

UNLOCK TABLES;

/* 카테고리 삭제 */
LOCK TABLE cate WRITE;

SELECT @myLeft := lft, @myRight := rgt, @myWidth := rgt - lft + 1
FROM cate
WHERE id = '7';

DELETE FROM cate WHERE lft BETWEEN @myLeft AND @myRight;

UPDATE cate SET rgt = rgt - @myWidth WHERE rgt > @myRight;
UPDATE cate SET lft = lft - @myWidth WHERE lft > @myRight;

UNLOCK TABLES;

/* 카테고리 이동 Prev */
LOCK TABLE cate WRITE;

SELECT @myLeft := lft, @myRight := rgt, @myWidth := rgt - lft + 1 FROM cate WHERE id = '7';

UPDATE FROM cate WHERE lft BETWEEN @myLeft AND @myRight;

UPDATE cate SET rgt = rgt - @myWidth WHERE rgt > @myRight;
UPDATE cate SET lft = lft - @myWidth WHERE lft > @myRight;

UNLOCK TABLES;

/* 모든 카테고리 명 가져오기 */
SELECT node.*
FROM cate AS node CROSS JOIN cate AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt AND parent.id = '1'
ORDER BY node.lft;

/* 계층구조로 보기 */
SELECT CONCAT( REPEAT('     ', COUNT(parent.cname) - 1), node.cname) AS name, node.*
FROM cate AS node,
        cate AS parent
WHERE node.lft BETWEEN parent.lft AND parent.rgt
GROUP BY node.id
ORDER BY node.lft;
```
