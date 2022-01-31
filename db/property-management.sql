/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : property-management

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 31/01/2022 20:32:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` int(0) NOT NULL COMMENT '1：超管 2：管理员',
  `is_del` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES (1, '123@com', '马化腾', '670b14728ad9902aecba32e22fa4f6bd', 1, 0);
INSERT INTO `admin` VALUES (2, '456@qq.com', '马云', '670b14728ad9902aecba32e22fa4f6bd', 2, 0);
INSERT INTO `admin` VALUES (3, '789@qq.com', '雷军', 'eabd8ce9404507aa8c22714d3f5eada9', 1, 0);
INSERT INTO `admin` VALUES (4, '987@qq.com', '李彦宏', '670b14728ad9902aecba32e22fa4f6bd', 2, 0);
INSERT INTO `admin` VALUES (5, '654@qq.com', '王兴', '670b14728ad9902aecba32e22fa4f6bd', 1, 0);
INSERT INTO `admin` VALUES (6, '321@qq.com', '张一鸣', '670b14728ad9902aecba32e22fa4f6bd', 2, 0);

-- ----------------------------
-- Table structure for building
-- ----------------------------
DROP TABLE IF EXISTS `building`;
CREATE TABLE `building`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_del` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of building
-- ----------------------------
INSERT INTO `building` VALUES (1, '1', 0);
INSERT INTO `building` VALUES (2, '2', 0);
INSERT INTO `building` VALUES (3, '3', 0);
INSERT INTO `building` VALUES (4, '4', 0);
INSERT INTO `building` VALUES (5, '5', 0);
INSERT INTO `building` VALUES (6, '6', 1);

-- ----------------------------
-- Table structure for message_board
-- ----------------------------
DROP TABLE IF EXISTS `message_board`;
CREATE TABLE `message_board`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NOT NULL,
  `type` int(0) NOT NULL COMMENT '1：建议 2：投诉 3：表扬',
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message_board
-- ----------------------------
INSERT INTO `message_board` VALUES (1, '爱你', 1, 1);
INSERT INTO `message_board` VALUES (2, '新英雄太难玩了', 200, 2);
INSERT INTO `message_board` VALUES (3, 'qweqweqweqwewq', 200, 1);
INSERT INTO `message_board` VALUES (4, '3w234432asddas', 200, 1);
INSERT INTO `message_board` VALUES (5, 'dsadasd', 200, 3);

-- ----------------------------
-- Table structure for notice
-- ----------------------------
DROP TABLE IF EXISTS `notice`;
CREATE TABLE `notice`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `show` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notice
-- ----------------------------
INSERT INTO `notice` VALUES (1, '公告1', 0);
INSERT INTO `notice` VALUES (2, '公告2', 1);
INSERT INTO `notice` VALUES (3, '这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告这是个长公告', 0);
INSERT INTO `notice` VALUES (24, '创建测试公告', 1);

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user_id` int(0) NOT NULL,
  `status` int(0) NOT NULL COMMENT '1：待接单 2：待处理 3：已结单',
  `create_time` bigint(0) NOT NULL,
  `deal_time` bigint(0) NULL DEFAULT NULL,
  `complete_time` bigint(0) NULL DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (1, '工单1', '这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1这是工单1', 200, 3, 1643633416000, 1643634286966, 1643634290272);
INSERT INTO `order` VALUES (2, '工单2', '工单22222', 203, 3, 1643633636793, 1643633646793, 1643634258740);
INSERT INTO `order` VALUES (3, 'title', 'asdhjjkashdasjkdh', 200, 2, 1643633699993, 1643633780583, NULL);

-- ----------------------------
-- Table structure for parking
-- ----------------------------
DROP TABLE IF EXISTS `parking`;
CREATE TABLE `parking`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `car_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `parking_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `is_del` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of parking
-- ----------------------------
INSERT INTO `parking` VALUES (1, '津E63636', 200, 'A001', 0);
INSERT INTO `parking` VALUES (2, '津E22222', 201, 'A002', 0);
INSERT INTO `parking` VALUES (3, NULL, NULL, 'A003', 0);
INSERT INTO `parking` VALUES (4, NULL, NULL, 'A004', 0);
INSERT INTO `parking` VALUES (5, NULL, NULL, 'A005', 0);

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `unit_id` int(0) NOT NULL,
  `is_del` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES (1, '101', 1, 0);
INSERT INTO `room` VALUES (2, '102', 1, 0);
INSERT INTO `room` VALUES (3, '101', 2, 0);
INSERT INTO `room` VALUES (4, '102', 2, 0);
INSERT INTO `room` VALUES (5, '101', 5, 0);
INSERT INTO `room` VALUES (6, '101', 3, 0);
INSERT INTO `room` VALUES (7, '101', 11, 0);
INSERT INTO `room` VALUES (8, '101', 12, 0);
INSERT INTO `room` VALUES (9, '103', 2, 0);
INSERT INTO `room` VALUES (10, '101', 8, 0);

-- ----------------------------
-- Table structure for unit
-- ----------------------------
DROP TABLE IF EXISTS `unit`;
CREATE TABLE `unit`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `num` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `building_id` int(0) NOT NULL,
  `is_del` tinyint(0) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of unit
-- ----------------------------
INSERT INTO `unit` VALUES (1, '1', 1, 0);
INSERT INTO `unit` VALUES (2, '2', 1, 0);
INSERT INTO `unit` VALUES (3, '1', 2, 0);
INSERT INTO `unit` VALUES (4, '2', 2, 0);
INSERT INTO `unit` VALUES (5, '3', 1, 0);
INSERT INTO `unit` VALUES (6, '4', 1, 0);
INSERT INTO `unit` VALUES (7, '5', 1, 0);
INSERT INTO `unit` VALUES (8, '6', 1, 0);
INSERT INTO `unit` VALUES (9, '7', 1, 0);
INSERT INTO `unit` VALUES (10, '1', 6, 1);
INSERT INTO `unit` VALUES (11, '1', 5, 1);
INSERT INTO `unit` VALUES (12, '2', 5, 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phoneNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 204 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'hvkdxt', '/public/4qawsi1643633228579微信图片_20220131204657.jpg', '13333333333');
INSERT INTO `user` VALUES (2, '2d8kqg', '', '14444444444');
INSERT INTO `user` VALUES (200, '王五', '/public/eeq4jd1643633225475微信图片_20220131204106.jpg', '15555555555');
INSERT INTO `user` VALUES (201, 'x3btcc', '/public/bvkvyr1643633223072微信图片_20220131204631.jpg', '16666666666');
INSERT INTO `user` VALUES (202, 'nju9sv', '', '17777777777');
INSERT INTO `user` VALUES (203, '张三', '', '18888888888');

-- ----------------------------
-- Table structure for user_room
-- ----------------------------
DROP TABLE IF EXISTS `user_room`;
CREATE TABLE `user_room`  (
  `_id` int(0) NOT NULL AUTO_INCREMENT,
  `user_id` int(0) NOT NULL,
  `room_id` int(0) NOT NULL,
  PRIMARY KEY (`_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_room
-- ----------------------------
INSERT INTO `user_room` VALUES (1, 1, 1);
INSERT INTO `user_room` VALUES (3, 2, 2);
INSERT INTO `user_room` VALUES (5, 200, 4);
INSERT INTO `user_room` VALUES (6, 2, 3);
INSERT INTO `user_room` VALUES (7, 200, 5);
INSERT INTO `user_room` VALUES (10, 201, 7);
INSERT INTO `user_room` VALUES (11, 203, 10);

SET FOREIGN_KEY_CHECKS = 1;
