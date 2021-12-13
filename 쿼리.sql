SELECT 
`Board`.*, `BoardFiles`.`id` AS `BoardFiles.id`, 
`BoardFiles`.`saveName` AS `BoardFiles.saveName` 
FROM (
	SELECT `Board`.`id`, `Board`.`title`, `Board`.`writer`, `Board`.`content`, `Board`.`createdAt`, `Board`.`updatedAt`, `Board`.`deletedAt`, `Board`.`user_id`, `Board`.`binit_id` 
	FROM `board` AS `Board` 
	WHERE (`Board`.`deletedAt` IS NULL AND (`Board`.`binit_id` = 1)) 
	ORDER BY `Board`.`id` DESC LIMIT 0, 5
) AS `Board` 
LEFT OUTER JOIN `boardfile` AS `BoardFiles` ON `Board`.`id` = `BoardFiles`.`board_id` 
AND (`BoardFiles`.`deletedAt` IS NULL) 
ORDER BY `Board`.`id` DESC;


SELECT 
	COUNT(DISTINCT(ip)), 
	COUNT(DISTINCT(board_id))
FROM boardcounter;

SELECT * from boardfile ORDER BY id DESC; 


SELECT 
`Product`.*, `ProductFiles`.`id` AS `ProductFiles.id`, `ProductFiles`.`saveName` AS `ProductFiles.saveName`, `ProductFiles`.`fileType` AS `ProductFiles.fileType` 
FROM (
	SELECT `Product`.`id`, `Product`.`title`, `Product`.`priceOrigin`, `Product`.`priceSale`, `Product`.`amount`, `Product`.`status`, `Product`.`summary`, `Product`.`content`, `Product`.`readCounter`, `Product`.`createdAt`, `Product`.`updatedAt`, `Product`.`deletedAt` 
	FROM `product` AS `Product` 
	WHERE `Product`.`deletedAt` IS NULL 
	ORDER BY `Product`.`id` DESC LIMIT 0, 10) AS `Product` 
LEFT OUTER JOIN `productfile` AS `ProductFiles` 
ON `Product`.`id` = `ProductFiles`.`prd_id` 
AND (`ProductFiles`.`deletedAt` IS NULL) 
ORDER BY `Product`.`id` DESC, `ProductFiles`.`id` ASC;



SELECT `Product`.*, `ProductFiles`.`id` AS `ProductFiles.id`, `ProductFiles`.`saveName` AS `ProductFiles.saveName`, `ProductFiles`.`fileType` AS `ProductFiles.fileType`, `ProductFiles`.`fieldNum` AS `ProductFiles.fieldNum` FROM (SELECT `Product`.`id`, `Product`.`title`, `Product`.`priceOrigin`, `Product`.`priceSale`, `Product`.`amount`, `Product`.`status`, `Product`.`summary`, `Product`.`content`, `Product`.`readCounter`, `Product`.`createdAt`, `Product`.`updatedAt`, `Product`.`deletedAt` FROM `product` AS `Product` WHERE `Product`.`deletedAt` IS NULL ORDER BY 
`Product`.`id` DESC LIMIT 0, 10) AS `Product` LEFT OUTER JOIN `productfile` AS `ProductFiles` ON `Product`.`id` = `ProductFiles`.`prd_id` AND (`ProductFiles`.`deletedAt` IS NULL) ORDER BY `Product`.`id` DESC, `ProductFiles`.`fileType` ASC, `ProductFiles`.`fieldNum` ASC;


SELECT `Cate`.`id`, `Cate`.`createdAt`, `Cate`.`updatedAt`, `Cate`.`deletedAt`, `catets`.`id` AS `Products.id`, `Products`.`title` AS `Products.title`, `Products`.`priceOrigin` AS `Products.priceOrigin`, `Products`.`priceSale` AS `Products.priceSale`, `Products`.`amount` AS `Products.amount`, `Products`.`status` AS `Products.status`, `Products`.`summary` AS `Products.summary`, `Products`.`readCounter` AS `Products.readCounter`, `Products->cate_product`.`createdAt` AS `Products.cate_product.createdAt`, `Products->cate_product`.`updatedAt` AS `Products.cate_product.updatedAt`, `Products->cate_product`.`cate_id` AS `Products.cate_product.cate_id`, `Products->cate_product`.`prd_id` AS `Products.cate_product.prd_id`, `Products->ProductFiles`.`id` AS `Products.ProductFiles.id`, `Products->ProductFiles`.`saveName` AS `Products.ProductFiles.saveName`, `Products->ProductFiles`.`fileType` AS `Products.ProductFiles.fileType`, `Products->ProductFiles`.`fieldNum` AS `Products.ProductFiles.fieldNum` FROM `cate` AS `Cate` INNER JOIN ( `cate_product` AS `Products->cate_product` INNER JOIN `product` AS `Products` ON `Products`.`id` = `Products->cate_product`.`prd_id`) ON `Cate`.`id` = `Products->cate_product`.`cate_id` AND (`Products`.`deletedAt` IS NULL AND (`Products`.`status` = '2')) LEFT OUTER JOIN `productfile` AS `Products->ProductFiles` 
ON `Products`.`id` = `Products->ProductFiles`.`prd_id` AND (`Products->ProductFiles`.`deletedAt` IS NULL) WHERE (`Cate`.`deletedAt` IS NULL AND (`Cate`.`id` = 'j1_22' OR `Cate`.`id` = 'j1_23' OR `Cate`.`id` = 'j1_24' OR `Cate`.`id` = 'j1_25'));

SELECT * FROM cate_product WHERE cate_id='j1_11';

SELECT COUNT(id) FROM product;

SELECT * FROM product ORDER BY id DESC;

DELETE FROM product WHERE id > 1000;
