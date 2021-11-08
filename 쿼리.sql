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







