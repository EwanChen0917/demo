/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** CommonResp */
export interface CommonResp {
  code?: string;
  enMessage?: string;
  message?: string;
  result?: object;
  traceId?: string;
}

/** GtmPlBean */
export interface GtmPlBean {
  /** GTM品线编码 */
  gtmPlCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** GTM助理名称 */
  listAssistantName?: string[];
  /** GTM经理名称 */
  listGtmName?: string[];
  /** GTM品线名称 */
  name?: string;
}

/** GtmPlDetailReq */
export interface GtmPlDetailReq {
  /** 品线编码 */
  gtmPlCode?: string;
  /** 品线名称 */
  name?: string;
}

/** GtmPlDetailResp */
export interface GtmPlDetailResp {
  /** 品线编码 */
  gtmPlCode?: string;
  /**
   * id
   * @format int64
   */
  id?: number;
  /** 品线名称 */
  name?: string;
}

/** GtmPlListResp */
export interface GtmPlListResp {
  code?: string;
  gtmPlList?: GtmPlBean[];
  message?: string;
  /**
   * 总页数
   * @format int64
   */
  pages?: number;
  /**
   * 总数
   * @format int64
   */
  total?: number;
}

/** RelationGtmMemberDetailReq */
export interface RelationGtmMemberDetailReq {
  /** gtm品线编码 */
  gtmPlCode?: string;
  /** gtm经理用户编码 */
  listMemberCode?: string[];
}

/** RelationGtmMemberDetailResp */
export interface RelationGtmMemberDetailResp {
  /** gtm品线编码 */
  gtmPlCode?: string;
  /** gtm经理用户编码 */
  listMemberCode?: string[];
}
