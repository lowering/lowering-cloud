/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50718
 Source Host           : localhost:3306
 Source Schema         : lowering-cloud

 Target Server Type    : MySQL
 Target Server Version : 50718
 File Encoding         : 65001

 Date: 15/12/2017 17:38:02
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authorities
-- ----------------------------
DROP TABLE IF EXISTS `authorities`;
CREATE TABLE `authorities`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `constant` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menu_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_ikxa8qrhp3ljvtsl99mewxpa2`(`constant`) USING BTREE,
  INDEX `FKcb7o24i8hgscbtcd9ci2oansm`(`menu_id`) USING BTREE,
  CONSTRAINT `FKcb7o24i8hgscbtcd9ci2oansm` FOREIGN KEY (`menu_id`) REFERENCES `lowering-cloud`.`menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authorities
-- ----------------------------
INSERT INTO `authorities` VALUES ('40288310604931e00160494d39a80010', 'SYS_USER_VIEW', '查询用户数据', b'1', '查询用户', '40288310604931e00160494480c50009');
INSERT INTO `authorities` VALUES ('40288310604931e00160494df42f0011', 'SYS_USER_SAVE', '添加用户数据', b'1', '添加用户', '40288310604931e00160494480c50009');
INSERT INTO `authorities` VALUES ('40288310604931e00160494e2e540012', 'SYS_USER_DELETE', '删除用户数据', b'1', '删除用户', '40288310604931e00160494480c50009');
INSERT INTO `authorities` VALUES ('40288310604931e00160494e89430013', 'SYS_USER_UPDATE', '更新用户数据', b'1', '更新用户', '40288310604931e00160494480c50009');
INSERT INTO `authorities` VALUES ('402883106049511101604952d0f30001', 'SYS_ROLE_VIEW', '查询角色数据', b'1', '查询角色', '40288310604931e0016049450c47000a');
INSERT INTO `authorities` VALUES ('40288310604951110160495314760002', 'SYS_ROLE_SAVE', '添加角色数据', b'1', '添加角色', '40288310604931e0016049450c47000a');
INSERT INTO `authorities` VALUES ('4028831060495111016049539cb10003', 'SYS_ROLE_DELETE', '删除角色数据', b'1', '删除角色', '40288310604931e0016049450c47000a');
INSERT INTO `authorities` VALUES ('402883106049511101604953ed9c0004', 'SYS_ROLE_UPDATE', '修改角色数据', b'1', '修改角色', '40288310604931e0016049450c47000a');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `constant` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `organization_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_hntj4iie4xtthgbgpp84sv3dg`(`constant`) USING BTREE,
  INDEX `FK69kdxq27lkb5p622ypc93tcr4`(`organization_id`) USING BTREE,
  CONSTRAINT `FK69kdxq27lkb5p622ypc93tcr4` FOREIGN KEY (`organization_id`) REFERENCES `lowering-cloud`.`organizations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES ('40288310604931e00160493560980002', 'beijing_group_dept', '北京研发部门', '研发部', '40288310604913950160491c12440000');
INSERT INTO `departments` VALUES ('40288310604931e001604935e0f70003', 'chengdu_group_dept', '成都研发部门', '研发部', '40288310604931e00160493360510000');
INSERT INTO `departments` VALUES ('40288310604931e00160493656f00004', 'xian_group_dept', '西安研发部门', '研发部', '40288310604931e00160493422740001');

-- ----------------------------
-- Table structure for employees
-- ----------------------------
DROP TABLE IF EXISTS `employees`;
CREATE TABLE `employees`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created` datetime(0) DEFAULT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `job` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `salary` double DEFAULT NULL,
  `updated` datetime(0) DEFAULT NULL,
  `department_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `manager` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FKgy4qe3dnqrm3ktd76sxp7n4c2`(`department_id`) USING BTREE,
  INDEX `FKiiyyor9uimxgm832hwl194ujr`(`manager`) USING BTREE,
  CONSTRAINT `FKgy4qe3dnqrm3ktd76sxp7n4c2` FOREIGN KEY (`department_id`) REFERENCES `lowering-cloud`.`departments` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKiiyyor9uimxgm832hwl194ujr` FOREIGN KEY (`manager`) REFERENCES `lowering-cloud`.`employees` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `employees` VALUES ('40288310604931e00160493e2d780005', '2017-12-12 13:41:55', 'Java 开发工程师', 'zhangsan@zhangsan.com', 'Java 开发工程师', '张三', '13800138000', 5000, NULL, '40288310604931e00160493560980002', NULL);
INSERT INTO `employees` VALUES ('40288310604931e00160494007b60006', '2017-12-12 13:43:52', 'Java 开发工程师', 'lisi@lisi.com', 'Java 开发工程师', '李四', '13800138000', 4000, NULL, '40288310604931e00160493560980002', '40288310604931e00160493e2d780005');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `href` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shown` bit(1) DEFAULT NULL,
  `target` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `parent` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `extension` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FKpbp7mhg7ttau66c6pry14t6xe`(`parent`) USING BTREE,
  CONSTRAINT `FKpbp7mhg7ttau66c6pry14t6xe` FOREIGN KEY (`parent`) REFERENCES `lowering-cloud`.`menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('40288310604931e00160494314770007', '提供个人的工作台', '/dashboard', '工作台', b'1', '_self', NULL, NULL);
INSERT INTO `menus` VALUES ('40288310604931e001604943ab9d0008', '提供系统相关设置', '/setting', '系统设置', b'1', '_self', NULL, '{\"layout\":\"setting\"}');
INSERT INTO `menus` VALUES ('40288310604931e00160494480c50009', '提供用户管理相关操作', '/setting/users', '用户管理', b'1', '_self', '40288310604931e001604943ab9d0008', '{\"component\":import(\"../models/users\")}');
INSERT INTO `menus` VALUES ('40288310604931e0016049450c47000a', '提供角色管理相关操作', '/setting/roles', '角色管理', b'1', '_self', '40288310604931e001604943ab9d0008', '{\"component\":import(\"../models/roles\")}');

-- ----------------------------
-- Table structure for organizations
-- ----------------------------
DROP TABLE IF EXISTS `organizations`;
CREATE TABLE `organizations`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `constant` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `parent` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_ric53uy31kwccpo3vb2cibmyu`(`constant`) USING BTREE,
  INDEX `FK6jwb78awec81c0431we1ll314`(`parent`) USING BTREE,
  CONSTRAINT `FK6jwb78awec81c0431we1ll314` FOREIGN KEY (`parent`) REFERENCES `lowering-cloud`.`organizations` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of organizations
-- ----------------------------
INSERT INTO `organizations` VALUES ('40288310604913950160491c12440000', 'beijing_group', '北京总部', '北京总部', NULL);
INSERT INTO `organizations` VALUES ('40288310604931e00160493360510000', 'chengdu_group', '成都分部', '成都分部', '40288310604913950160491c12440000');
INSERT INTO `organizations` VALUES ('40288310604931e00160493422740001', 'xian_group', '西安分部', '西安分部', '40288310604913950160491c12440000');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `constant` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `rolename` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_7idynx0yc90yvli59o9qkw30q`(`constant`) USING BTREE,
  UNIQUE INDEX `UK_jdhyvh8di85ai37phukfemdnx`(`rolename`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('40288310604931e001604948d476000c', 'ADMIN', '管理员角色', b'1', '管理员');
INSERT INTO `roles` VALUES ('40288310604931e0016049491764000d', 'DEMO', '演示角色', b'1', '演示');
INSERT INTO `roles` VALUES ('40288310604931e0016049496536000e', 'SYS', '系统管理员角色', b'1', '系统管理员');
INSERT INTO `roles` VALUES ('40288310604931e0016049499d5c000f', 'TEST', '测试角色', b'1', '测试');

-- ----------------------------
-- Table structure for roles_authorities
-- ----------------------------
DROP TABLE IF EXISTS `roles_authorities`;
CREATE TABLE `roles_authorities`  (
  `role_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `authority_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`role_id`, `authority_id`) USING BTREE,
  INDEX `FKt69njxcgfcto5wcrd9ocmb35h`(`authority_id`) USING BTREE,
  CONSTRAINT `FKq3iqpff34tgtkvnn545a648cb` FOREIGN KEY (`role_id`) REFERENCES `lowering-cloud`.`roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKt69njxcgfcto5wcrd9ocmb35h` FOREIGN KEY (`authority_id`) REFERENCES `lowering-cloud`.`authorities` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for roles_menus
-- ----------------------------
DROP TABLE IF EXISTS `roles_menus`;
CREATE TABLE `roles_menus`  (
  `role_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `menu_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `FKn9m8e2dg0ivyt09r9akk6aql4`(`menu_id`) USING BTREE,
  CONSTRAINT `FKho9k0fq8h9qhu130blstnc9fd` FOREIGN KEY (`role_id`) REFERENCES `lowering-cloud`.`roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKn9m8e2dg0ivyt09r9akk6aql4` FOREIGN KEY (`menu_id`) REFERENCES `lowering-cloud`.`menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `description` varchar(300) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `enabled` bit(1) DEFAULT NULL,
  `locked` bit(1) DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` int(11) DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `employee_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `UK_r43af9ap4edm43mmtq01oddj6`(`username`) USING BTREE,
  INDEX `FK6p2ib82uai0pj9yk1iassppgq`(`employee_id`) USING BTREE,
  CONSTRAINT `FK6p2ib82uai0pj9yk1iassppgq` FOREIGN KEY (`employee_id`) REFERENCES `lowering-cloud`.`employees` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('40288ae4603025050160305247e30000', NULL, 'lisi@lisi.com', b'1', b'0', 'lisi', 0, '李四', NULL);
INSERT INTO `users` VALUES ('40288ae4603025050160305263430001', NULL, 'zhangsan@zhangsan.com', b'1', b'0', 'zhangsan', 0, 'zhangsan', NULL);

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles`  (
  `user_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `role_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`) USING BTREE,
  INDEX `FKj6m8fwv7oqv74fcehir1a9ffy`(`role_id`) USING BTREE,
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `lowering-cloud`.`users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FKj6m8fwv7oqv74fcehir1a9ffy` FOREIGN KEY (`role_id`) REFERENCES `lowering-cloud`.`roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
