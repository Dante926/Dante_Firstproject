/*
Navicat MySQL Data Transfer

Source Server         : bin
Source Server Version : 50549
Source Host           : localhost:3306
Source Database       : company-system

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2024-07-17 11:59:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` varchar(2000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` int(2) DEFAULT NULL,
  `cover` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isPublish` int(2) DEFAULT NULL,
  `editTime` datetime DEFAULT NULL,
  `username` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `un_id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('20', '超级管理员发布的新闻...', '<p>1.&nbsp;&nbsp;&nbsp;&nbsp;测试新闻列表是否正常运行</p><p>2.&nbsp;&nbsp;&nbsp;&nbsp;测试已发布新闻是否正常运行</p><p>3.&nbsp; &nbsp; 测试编辑新闻是否正常运行</p><p>4.&nbsp; &nbsp; 测试完毕...</p>', '1', '/newsuploads/8ea82c37023db74d417576dc12727a83', '1', '2024-07-16 15:46:34', 'admin942');
INSERT INTO `news` VALUES ('21', '测试用户admintest1发布的新闻', '<p>测试用户admintest1发布的新闻1</p>', '1', '/newsuploads/097a286840c70b7f98fb5269b0c83f5d', '1', '2024-07-14 20:44:29', 'admintest1');
INSERT INTO `news` VALUES ('22', '测试编辑时', '<p>测试编辑时间变更受到的影响 2024/7/16</p>', '2', '/newsuploads/494a4da25223b725be8c8869ebcbc1d0', '1', '2024-07-16 11:55:54', 'admin942');
INSERT INTO `news` VALUES ('24', '测试编辑时间', '<p>2024-7-16 11：50</p>', '1', '/newsuploads/2c4799d3785869d237351e0c1ea6e557', '1', '2024-07-16 11:51:38', 'admin942');
INSERT INTO `news` VALUES ('25', '最新发布的新闻', '<p>最新发布新闻的新闻内容</p>', '2', '/newsuploads/9daafb6e7865e99fe492d09fcf4fc517', '1', '2024-07-16 15:40:54', 'admin942');
INSERT INTO `news` VALUES ('26', '测试loadsh功能的通知公告', '<p>测试loadsh功能的通知公告</p>', '3', '/newsuploads/d77b668db103f85c0ed4c16b808db852', '1', '2024-07-16 16:07:30', 'admin942');
INSERT INTO `news` VALUES ('28', '欧洲杯-奥亚萨瓦尔绝杀 西班牙2-1英格兰夺冠', '<img src=\"https://k.sinaimg.cn/n/sports/transform/241/w650h391/20240715/0766-976617b0706d90a090c2b69f54f1a0e4.png/w700d1q75cms.jpg?by=cms_fixed_width\" alt=\"\"/><br/><p>　　</p><p>7月15日，欧洲杯决赛，西班牙2-1战胜英格兰夺冠，队史第四次夺得欧洲杯。</p><p>　　第47分钟，亚马尔助攻威廉斯破门。</p><p><img src=\"https://n.sinaimg.cn/sports/transform/618/w400h218/20240715/b810-gife3b9feab5b3b0641b21d8a453e1cb423.gif\" alt=\"\"/></p><p>　　第73分钟，沃特金斯回敲，帕尔默低射破门。</p><p><img src=\"https://n.sinaimg.cn/sports/transform/522/w339h183/20240715/2c4c-gif6ab267428ccdf32a8c4efd93afcc0b91.gif\" alt=\"\"/></p><p>　　第87分钟，库库雷利亚助攻奥亚萨瓦尔绝杀。</p><p><img src=\"https://n.sinaimg.cn/sports/transform/618/w400h218/20240715/5e23-gif772d63104ef0238c0c980d4c48215a8e.gif\" alt=\"\"/></p><p>　　西班牙：23-乌奈-西蒙/2-卡瓦哈尔、3-勒诺尔芒（83‘4-纳乔）、14-拉波尔特、24-库库雷利亚/16-罗德里（46’18-祖比门迪）、8-法比安-鲁伊斯/19-亚马尔（89‘6-梅里诺）、10-奥尔莫、17-尼科-威廉斯/7-莫拉塔（68’21-奥亚萨瓦尔）</p><p>　　英格兰：1-皮克福德/2-沃克、5-斯通斯、6-格伊、3-卢克-肖/26-梅努（70‘24-帕尔默）、4-赖斯/7-萨卡、11-福登（89’17-伊万-托尼）、10-贝林厄姆/9-凯恩（61‘19-沃特金斯）</p>', '3', '/newsuploads/cd7f6e50e1442c145b6f5d1a9ccb0db8', '1', '2024-07-17 11:39:54', 'admin942');

-- ----------------------------
-- Table structure for `product`
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `introduction` varchar(1000) DEFAULT NULL,
  `detail` varchar(1000) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `editTime` datetime DEFAULT NULL,
  `username` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `un` (`id`,`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('2', '添加产品测试1', '添加产品测试1', '添加产品测试1', '/productuploads/0418ad30ff75b3ed8d09358da1f308ac', '2024-07-12 16:37:32', 'admin942');
INSERT INTO `product` VALUES ('5', '产品测试2', '产品测试2', '产品测试2', '/productuploads/0fe402475089a3a75d886936232643e8', '2024-07-12 17:07:06', 'admin942');
INSERT INTO `product` VALUES ('6', '产品编辑测试3', '产品编辑测试3', '产品编辑测试2', '/productuploads/4e8c2321ee6fa932843d011d5f0fc2fc', '2024-07-12 18:01:47', 'admin942');
INSERT INTO `product` VALUES ('7', '111', '111', '111', '/productuploads/482b96db6c26ad9be6c21304c072699f', '2024-07-14 11:19:29', 'admin942');
INSERT INTO `product` VALUES ('8', '雅戈尔（YOUNGOR）短袖衬衫男素色DP免烫衬衫全棉面料舒适透气抗皱易打理新品 GSDP10171IFA浅蓝色 41', '由雅戈尔官方旗舰店从 浙江宁波市 发货, 并提供售后服务. 现在下单，承诺7月19日24:00前发货，预计7月21日24:00前送达', '品牌： 雅戈尔（YOUNGOR）\r\n商品名称：雅戈尔（YOUNGOR）短袖衬衫男素色DP免烫衬衫全棉面料舒适透气抗皱易打理新品 GSDP10171IFA浅蓝色 41商品编号：45763781333店铺： 雅戈尔官方旗舰店货号：GSDP10171IFA材质：棉100%版型：标准型适用季节：夏季上市时间：2023年春季领型：常规适用人群：青年厚度：常规袖长：短袖图案：纯色适用场景：职场风格：通勤风通勤风：商务休闲\r\n\r\n\r\n\r\n\r\n\r\n\r\n', '/productuploads/a6e547ab5f4524cb46b1c81bcd5c1d6d', '2024-07-17 11:07:55', 'admin942');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识',
  `username` varchar(45) NOT NULL COMMENT '用户登录名',
  `password` varchar(45) NOT NULL COMMENT '用户登录密码',
  `gender` int(2) NOT NULL,
  `role` int(2) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '用户状态(是一个布尔值)\r\n0 表示用户状态正常\r\n1 表示用户被禁用',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Unique` (`id`) USING BTREE,
  UNIQUE KEY `un_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin942', '123456', '1', '1', '', '超级管理员,超级管理员不需要头像....', '0');
INSERT INTO `user` VALUES ('14', 'admintest1', '123456', '2', '2', '/avataruploads/e853ece8b8618a88b237ab4b737c88d0', '测试用户one', '0');
INSERT INTO `user` VALUES ('15', 'admintest2', '123456', '0', '2', '/avataruploads/cd126c0e5975c79eea3f10b4ac40612c', '测试用户2', '0');
INSERT INTO `user` VALUES ('17', 'admintest3', '12345678', '0', '2', '/avataruploads/3266208405ab92d9bcf3f31c1dcd1d42', '我是测试用户3', '0');
INSERT INTO `user` VALUES ('18', 'admintest4', '123456', '0', '1', '/avataruploads/d72550139de00cea0c54ed3e07f7fbd3', '爱答不理', '0');
INSERT INTO `user` VALUES ('20', 'admintest7', '12345678', '2', '2', '/avataruploads/b70259b1fc5fe4805aded23971756c2f', '我是用户测试员admintest7', '0');
