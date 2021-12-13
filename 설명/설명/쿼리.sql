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




