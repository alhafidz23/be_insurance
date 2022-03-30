/*
 Navicat Premium Data Transfer

 Source Server         : localpg
 Source Server Type    : PostgreSQL
 Source Server Version : 110009
 Source Host           : localhost:5432
 Source Catalog        : aido
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 110009
 File Encoding         : 65001

 Date: 30/03/2022 23:03:46
*/


-- ----------------------------
-- Table structure for insurance
-- ----------------------------
DROP TABLE IF EXISTS "public"."insurance";
CREATE TABLE "public"."insurance" (
  "id" serial,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "active" int2,
  "created_at" timestamp(6) DEFAULT now(),
  "updated_at" timestamp(6)
)
;

-- ----------------------------
-- Records of insurance
-- ----------------------------
INSERT INTO "public"."insurance" VALUES (1, 'Lippo Insurance', 1, '2022-03-30 13:34:24', '2022-03-30 16:51:33');
INSERT INTO "public"."insurance" VALUES (2, 'Lippo General', 1, '2022-03-30 13:34:34', '2022-03-30 16:51:48');
INSERT INTO "public"."insurance" VALUES (5, 'Owlexa Healthcare', 1, '2022-03-30 14:04:06', '2022-03-30 16:52:02');
INSERT INTO "public"."insurance" VALUES (3, 'Medika Plaza', 1, '2022-03-30 13:50:27', '2022-03-30 22:35:03');
INSERT INTO "public"."insurance" VALUES (4, 'PT. Djarums', 1, '2022-03-30 13:55:12', '2022-03-30 22:38:37');
INSERT INTO "public"."insurance" VALUES (8, 'Mandiri AXA', 1, '2022-03-30 22:38:54.891599', '2022-03-30 22:39:20');

-- ----------------------------
-- Primary Key structure for table insurance
-- ----------------------------
ALTER TABLE "public"."insurance" ADD CONSTRAINT "insurance_pkey" PRIMARY KEY ("id");
