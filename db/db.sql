CREATE TABLE `dasa`.`laboratory` ( 
    `id` INT NOT NULL AUTO_INCREMENT 
    , `name` VARCHAR(50) NOT NULL 
    , `address` VARCHAR(100) NOT NULL 
    , `status` CHAR(1) NOT NULL 
    , PRIMARY KEY (`id`)
);

CREATE TABLE `dasa`.`exam_type` ( 
    `id` INT NOT NULL AUTO_INCREMENT 
    , `name` VARCHAR(50) NOT NULL 
    , `status` CHAR(1) NOT NULL 
    , PRIMARY KEY (`id`)
);
INSERT INTO `dasa`.`exam_type` VALUES (1, 'Análise clinica', '1'), (2, 'Imagem', '1');

CREATE TABLE `dasa`.`exam` ( 
    `id` INT NOT NULL AUTO_INCREMENT 
    , `name` VARCHAR(50) NOT NULL 
    , `type` INT NOT NULL 
    , `status` CHAR(1) NOT NULL 
    , PRIMARY KEY (`id`)
    , FOREIGN KEY (`type`) REFERENCES `exam_type`(`id`)
);




