<template>
  <div id="bol-main" :class="{ startPdf: startPdf }">
    <form id="form">
      <div id="invHeader">
        <div id="headLeft">
          <h1>Bill of Lading</h1>
          <div>
            <p>Ship From:</p>
            <p>
              <textarea id="shipper" v-model="ladingBillBean.shippingAddress"></textarea>
            </p>
            <div style="border: none; float: left; width: 300px">
              <span>SID#:</span>
              <input
                :style="{ fontSize: '0.83em' }"
                type="text"
                id="sid"
                v-model="ladingBillBean.sid"
              />
            </div>
            <div style="border: none; float: left">
              <input
                type="checkbox"
                id="fobOne"
                :checked="ladingBillBean.isFromFob === 1"
                @change="($event) => {
                  ladingBillBean.isFromFob = ($event.target as HTMLInputElement).checked ? 1 : 0;
                }"
              />
              <span>FOB</span>
            </div>
            <div style="border: none; padding: 0; margin: 0" class="clear"><!--empty--></div>
          </div>
          <div>
            <div style="border: none; float: left; width: 185px">
              <p>Ship To:</p>
              <p></p>
            </div>
            <div style="border: none; float: left">
              <span>Location No:</span>
              <input type="text" size="6" id="locNo" v-model="ladingBillBean.locationNo" />
            </div>
            <div style="border: none" class="clear"><!--empty--></div>
            <textarea id="shipTo" v-model="ladingBillBean.shipToAddress"></textarea>
            <div style="border: none; float: left; width: 300px">
              <span>CID#:</span>
              <input type="text" id="cid" v-model="ladingBillBean.cid" />
            </div>
            <div style="border: none; float: left">
              <input
                type="checkbox"
                id="fobTwo"
                :checked="ladingBillBean.isToFob === 1"
                :value="1"
                @change="($event) => {
                  ladingBillBean.isToFob = ($event.target as HTMLInputElement).checked ? 1 : 0;
                }"
              />
              <span>FOB</span>
            </div>
            <div style="border: none; padding: 0; margin: 0" class="clear"><!--empty--></div>
          </div>
          <div>
            <p>Third Party Freight Charges - Bill To:</p>
            <textarea id="thirdPty" v-model="ladingBillBean.thirdPartyBillTo"></textarea>
          </div>
        </div>
        <!--end headLeft-->
        <div id="headRight">
          <div class="inlineSpan border">
            <span>Date:</span>
            <span class="fullWidth">
              &nbsp;
              <input type="text" id="date" v-model="ladingBillBean.billTime" />
            </span>
          </div>
          <div class="inlineSpan border">
            <span>Bill of Lading No:</span>
            <span class="fullWidth">
              &nbsp;
              <input type="text" id="BOL" v-model="ladingBillBean.referenceCode" />
            </span>
            <div class="barcode">
              <span>
                BARCODE SPACE
                <span></span>
              </span>
            </div>
          </div>
          <div class="inlineSpan border">
            <div>
              <span>Carrier Name:</span>
              <span class="fullWidth">
                &nbsp;
                <input type="text" id="carrier" v-model="ladingBillBean.carrierName" />
              </span>
            </div>
            <div>
              <span>Trailer No:</span>
              <span class="fullWidth">
                &nbsp;
                <input type="text" id="trailer" v-model="ladingBillBean.trailerNo" />
              </span>
            </div>
            <div>
              <span>Seal Number(s):</span>
              <span class="fullWidth">
                &nbsp;
                <input type="text" id="seal" v-model="ladingBillBean.sealNumber" />
              </span>
            </div>
          </div>
          <div class="inlineSpan border">
            <div>
              <span>SCAC:</span>
              <span class="fullWidth">
                &nbsp;
                <input type="text" id="SCAC" v-model="ladingBillBean.scac" />
              </span>
            </div>
            <div>
              <span>Pro No:</span>
              <span class="fullWidth">
                &nbsp;
                <input type="text" id="ProNo" v-model="ladingBillBean.proNo" />
              </span>
            </div>
            <div class="barcode">
              <span>
                BARCODE SPACE
                <span></span>
              </span>
            </div>
          </div>
          <div class="border">
            <p style="padding-bottom: 6px">
              Freight Charge Terms (prepaid unless marked otherwise)
            </p>
            <input
              type="checkbox"
              id="pre"
              key="pre"
              :checked="ladingBillBean.freightChargeTerms === 'Prepaid'"
              @change="
                (e) => {
                  if ((e.target as HTMLInputElement).checked) {
                    ladingBillBean.freightChargeTerms = 'Prepaid';
                  }
                }
              "
            />
            <span>Prepaid</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              id="col"
              key="col"
              :checked="ladingBillBean.freightChargeTerms === 'Collect'"
              @change="
                (e) => {
                  if ((e.target as HTMLInputElement).checked) {
                    ladingBillBean.freightChargeTerms = 'Collect';
                  }
                }
              "
            />
            <span>Collect</span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input
              type="checkbox"
              id="third"
              key="third"
              :checked="ladingBillBean.freightChargeTerms === '3rd Party'"
              @change="
                (e) => {
                  if((e.target as HTMLInputElement).checked) {
                    ladingBillBean.freightChargeTerms = '3rd Party';
                  }
                }
              "
            />
            <span>3rd Party</span>
          </div>
          <div class="border">
            <input
              type="checkbox"
              id="masterBOL"
              :checked="ladingBillBean.materBol === 1"
              @change="(e) => {
                ladingBillBean.materBol = (e.target as HTMLInputElement).checked ? 1 : 0;
              }"
            />
            <span>Master BOL: w/attached underlying BOLs</span>
          </div>
        </div>
        <!--end headRight"-->
        <div class="clear"><!--empty--></div>
        <div id="inst">
          <p>Special Instructions:</p>
          <textarea id="notes" v-model="ladingBillBean.specialInstructions"></textarea>
        </div>
      </div>
      <!--end invHeader-->
      <div id="invTable">
        <table id="items">
          <thead>
            <tr>
              <th class="tableBanner" colspan="5">Customer Order Information</th>
            </tr>
            <tr>
              <th>Customer Order No.</th>
              <th># Pkgs.</th>
              <th>Weight</th>
              <th>Pallet/Slip (Y/N)</th>
              <th>Additional Shipper Info</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_, i) in 8" :key="i">
              <td style="width: 135px">
                <input
                  type="text"
                  :value="ladingBillBean.orderInfoList![i]?.orderCode"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.orderInfoList![i]) {
                          ladingBillBean.orderInfoList![i] = {};
                        }
                        ladingBillBean.orderInfoList![i].orderCode = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  class="pkgs"
                  :value="ladingBillBean.orderInfoList![i]?.totalBoxCount"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.orderInfoList![i]) {
                          ladingBillBean.orderInfoList![i] = {};
                        }
                        ladingBillBean.orderInfoList![i].totalBoxCount = Number(($event.target! as HTMLInputElement).value) || 0;
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  class="wght"
                  :value="ladingBillBean.orderInfoList![i]?.totalWeight"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.orderInfoList![i]) {
                          ladingBillBean.orderInfoList![i] = {};
                        }
                        ladingBillBean.orderInfoList![i].totalWeight = Number(($event.target! as HTMLInputElement).value) || 0;
                      }
                    "
                />
              </td>
              <td style="width: 55px">
                <input
                  type="text"
                  :value="ladingBillBean.orderInfoList![i]?.palletType"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.orderInfoList![i]) {
                          ladingBillBean.orderInfoList![i] = {};
                        }
                        ladingBillBean.orderInfoList![i].palletType = Number(($event.target! as HTMLInputElement).value) || 'Pallet';
                      }
                    "
                />
              </td>
              <td>
                <input
                  type="text"
                  :value="ladingBillBean.orderInfoList![i]?.additionalInfo"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.orderInfoList![i]) {
                          ladingBillBean.orderInfoList![i] = {};
                        }
                        ladingBillBean.orderInfoList![i].additionalInfo = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr class="totals">
              <td>Totals</td>
              <td>
                <div id="total-pkgs">{{ ladingBillBean.totalBoxCount }}</div>
              </td>
              <td>
                <div id="total-wght">{{ ladingBillBean.totalOrderWeight }}</div>
              </td>
              <td class="blocked" colspan="2"></td>
            </tr>
          </tfoot>
        </table>
        <table id="carrier">
          <thead>
            <tr>
              <th class="tableBanner" colspan="9">Carrier Information</th>
            </tr>
            <tr>
              <th colspan="2">Handling Unit</th>
              <th colspan="2">Package</th>
              <td class="blank" colspan="2"></td>
              <th>Commodity Description</th>
              <th colspan="2">LTL Only</th>
            </tr>
            <tr>
              <th>QTY</th>
              <th>TYPE</th>
              <th>QTY</th>
              <th>TYPE</th>
              <th>Weight</th>
              <th>H.M. (X)</th>
              <th style="font-size: max(12px, 0.65em); font-weight: normal">
                Commodities requiring special or additional care or attention in handling or stowing
                must be so marked and packaged as to ensure safe transportation with ordinary care.
                <p><strong>See Section 2(e) of MNMFC Item 360</strong></p>
              </th>
              <th>NMFC No.</th>
              <th>Class</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(_, i) in 8" :key="i">
              <td style="width: 45px">
                <input
                  type="text"
                  class="qtyA"
                  :value="ladingBillBean.carrierInfoList![i]?.palletCount"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].palletCount = Number(($event.target! as HTMLInputElement).value) || 0;
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.palletType"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].palletType = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  class="qtyB"
                  :value="ladingBillBean.carrierInfoList![i]?.packageCount"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].packageCount = Number(($event.target! as HTMLInputElement).value) || 0;
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.packageType"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].packageType = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  class="carWght"
                  :value="ladingBillBean.carrierInfoList![i]?.weight"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].weight = Number(($event.target! as HTMLInputElement).value) || 0;
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.hmx"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].hmx = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td>
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.description"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].description = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.nmfcNo"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].nmfcNo = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
              <td style="width: 45px">
                <input
                  type="text"
                  :value="ladingBillBean.carrierInfoList![i]?.ltlClass"
                  @input="
                      ($event) => {
                        if (!ladingBillBean.carrierInfoList![i]) {
                          ladingBillBean.carrierInfoList![i] = {};
                        }
                        ladingBillBean.carrierInfoList![i].ltlClass = ($event.target! as HTMLInputElement).value || '';
                      }
                    "
                />
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="totals">
              <td>
                <div id="handling-qty">{{ ladingBillBean.totalPalletNumber }}</div>
              </td>
              <td class="blocked"></td>
              <td>
                <div id="package-qty">{{ ladingBillBean.totalPackages }}</div>
              </td>
              <td class="blocked"></td>
              <td>
                <div id="carrier-weight">{{ ladingBillBean.totalPalletWeight }}</div>
              </td>
              <td class="blocked"></td>
              <td>Totals</td>
              <td class="blocked"></td>
              <td class="blocked"></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <!--end invTable-->
      <div id="ftrBox">
        <div class="ftr left two-col" style="height: 74px">
          <p style="margin-bottom: 6px">
            Where the rate is dependent on value, shippers are required to state specifically in
            writing the agreed or declared value of the property as follows:
          </p>
          <p style="margin-bottom: 6px">
            "The agreed or declared value of the property is specifically stated by the shipper to
            be not exceeding
          </p>
          <input type="text" id="valueOne" />
          <span>FOB</span>
          <input type="text" id="valueTwo" />
          ."
        </div>
        <div class="ftr left two-col" style="height: 74px; font-size: 1em">
          <p style="padding: 6px 0">
            <strong>COD Amt. $</strong>
            <input type="text" id="COD" v-model="ladingBillBean.codAmount" />
          </p>
          <p>
            <strong>Fee Terms:</strong>
            <span>
              <input
                type="checkbox"
                id="collect"
                :checked="ladingBillBean.feeTerms === 'Collect'"
                @change="
                  ($event) => {
                    if (($event.target as HTMLInputElement).checked) {
                      ladingBillBean.feeTerms = 'Collect';
                    }
                  }
                "
              />
              Collect
            </span>
            <input
              type="checkbox"
              id="prepaid"
              :checked="ladingBillBean.feeTerms === 'Prepaid'"
              @change="
                ($event) => {
                  if (($event.target as HTMLInputElement).checked) {
                    ladingBillBean.feeTerms = 'Prepaid';
                  }
                }
              "
            />
            <span>Prepaid</span>
          </p>
          <p>
            <input
              type="checkbox"
              id="checkOK"
              :checked="ladingBillBean.feeTerms === 'Customer Check Acceptable'"
              @change="
                ($event) => {
                  if (($event.target as HTMLInputElement).checked) {
                    ladingBillBean.feeTerms = 'Customer Check Acceptable';
                  }
                }
              "
            />
            <span>Customer Check Acceptable</span>
          </p>
        </div>
        <div class="clear"><!--empty--></div>
        <div class="ftr" style="height: 19px">
          <p>
            <strong>
              NOTE: Liability Limitation for loss or damage in this shipment may be applicable. See
              49 U.S.C. - 14706(c)(1)(A) and (B).
            </strong>
          </p>
        </div>
        <div class="ftr left two-col" style="height: 54px">
          <p>
            RECEIVED, subject to individually determined rates or contracts that have been agreed
            upon in writing between the carrier and shipper, if applicable, otherwise to the rates,
            classifications and rules that have been established by the carrier and are available to
            the shipper, on request, and to all applicable state and federal regulations.
          </p>
        </div>
        <div class="ftr left two-col" style="height: 54px">
          <p>
            The carrier shall not make delivery of this shipment without payment of freight and all
            other lawful charges.
          </p>
          <div class="left" style="margin-top: 16px">Shipper Signature</div>
          <div
            class="left"
            style="width: 200px; height: 24px; border-bottom: 1px solid black"
          ></div>
          <div class="clear"><!--empty--></div>
        </div>
        <div class="clear"><!--empty--></div>
        <div class="ftr left" style="height: 94px; width: 246px; font-size: max(12px, 0.65em)">
          <p>
            This is to certify that the above named materials are properly classified, packaged,
            marked and labeled, and are in proper condition for transportation according to the
            applicable regulations of the DOT.
          </p>

          <div class="left" style="width: 150px; margin-right: 10px">
            <div style="width: 150px; height: 36px; border-bottom: 1px solid black"></div>
            <p>Shipper Signature</p>
          </div>
          <div class="left">
            <div style="width: 75px; height: 36px; border-bottom: 1px solid black"></div>
            <p>Date</p>
          </div>
        </div>
        <div class="ftr left" style="height: 94px; width: 266px">
          <div class="left" style="width: 88px">
            <p><strong>Trailer Loaded</strong></p>
            <p>
              <input
                type="checkbox"
                id="loadedByShip"
                :checked="ladingBillBean.tranletLoaded === 'By Shipper'"
                @change="(e) => {
                if ((e.target as HTMLInputElement).checked) {
                  ladingBillBean.tranletLoaded = 'By Shipper';
                }
              }"
              />
              By Shipper
            </p>
            <p>
              <input
                type="checkbox"
                id="loadedByDrive"
                :checked="ladingBillBean.tranletLoaded === 'By Driver'"
                @change="(e) => {
                  if ((e.target as HTMLInputElement).checked) {
                    ladingBillBean.tranletLoaded = 'By Driver';
                  }
                }"
              />
              By Driver
            </p>
          </div>
          <div class="left">
            <p><strong>Freight Counted</strong></p>
            <p>
              <input
                type="checkbox"
                id="countedByShip"
                :checked="ladingBillBean.freightCounted === 'By Shipper'"
                @change="
                  ($event) => {
                    if (($event.target as HTMLInputElement).checked) {
                      ladingBillBean.freightCounted = 'By Shipper';
                    }
                  }"
              />
              By Shipper
            </p>
            <p>
              <input
                type="checkbox"
                id="countedByDriveOne"
                :checked="ladingBillBean.freightCounted === 'By Driver/pallets said to contain'"
                @change="
                  ($event) => {
                    if (($event.target as HTMLInputElement).checked) {
                      ladingBillBean.freightCounted = 'By Driver/pallets said to contain';
                    }
                  }"
              />
              By Driver/pallets said to contain
            </p>
            <p>
              <input
                type="checkbox"
                id="countedByDriveTwo"
                :checked="ladingBillBean.freightCounted === 'By Driver/Pieces'"
                @change="
                  ($event) => {
                    if (($event.target as HTMLInputElement).checked) {
                      ladingBillBean.freightCounted = 'By Driver/Pieces';
                    }
                  }"
              />
              By Driver/Pieces
            </p>
          </div>
          <div class="clear"><!--empty--></div>
        </div>
        <div class="ftr left" style="height: 94px; width: 285px; font-size: max(12px, 0.65em)">
          <p>
            Carrier acknowledges receipt of packages and required placards. Carrier certifies
            emergency response information was made available and/or carrier has the DOT emergency
            response guidebook or equivalent documentation in the vehicle. Property described above
            is received in good order, except as noted.
          </p>
          <div class="left" style="width: 150px; margin-right: 10px">
            <div style="width: 150px; height: 30px; border-bottom: 1px solid black"></div>
            <p>Carrier Signature</p>
          </div>
          <div class="left">
            <div style="width: 75px; height: 30px; border-bottom: 1px solid black"></div>
            <p>Pickup Date</p>
          </div>
        </div>
        <div class="clear"><!--empty--></div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import type { BolLadingBillBean } from '@/api/erp/data-contracts';

  defineProps<{
    ladingBillBean: BolLadingBillBean;
    startPdf: boolean;
  }>();

  /**
   * 初始化数据
   */
</script>

<style lang="scss" scoped>
  #bol-main {
    padding: 32px;
    width: 800px;
    background: #fff;
    border: 1px solid #808080;
    font-size: 16px;
    line-height: 1;
    box-sizing: content-box;
    &.startPdf {
      border: none;
      padding: 0;
      transform: scale(0.9);
      input,
      textarea {
        border: none;
        background: #fff;
      }
    }
  }
  #headLeft {
    float: left;
    width: 400px;
    border-bottom: 1px solid #ccc;
  }

  #headLeft h1 {
    font-size: 2em;
    font-weight: bold;
    padding-bottom: 16px;
    color: #000;
    margin: 0;
    display: inline-block;
  }

  #headRight h1 {
    font-size: 2em;
    font-weight: bold;
    padding-bottom: 16px;
    color: #000;
  }

  #headLeft p,
  #headRight p,
  #headRight span,
  #inst {
    font-weight: bold;
    font-size: max(0.85em, 12px);
    margin-bottom: 0;
  }

  #headLeft div {
    padding: 4px;
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  #headLeft textarea {
    font-size: max(0.85em, 12px);
    text-align: left;
    width: 100%;
    height: 50px;
  }

  #headRight {
    margin-top: 21px;
    float: left;
    width: 400px;
    border-top: 1px solid #ccc;
  }

  #headRight .border {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 4px;
  }

  #headRight .inlineSpan span {
    display: table-cell;
    white-space: nowrap;
  }

  #headRight .barcode {
    padding: 10px 0px;
    color: #ccc;
    font-size: 1.5em;
    font-weight: bold;
  }

  #headRight .barcode span {
    display: block;
    width: 100%;
    text-align: center;
  }

  #headRight .fullWidth,
  #headRight .fullWidth input {
    width: 100%;
  }

  #headRight input[type='textarea'] {
    margin-bottom: 8px;
    width: 100%;
    display: block;
  }

  #headRight input[type='text'] {
    margin-bottom: 4px;
  }

  #inst {
    padding: 4px;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  #inst textarea {
    text-align: left;
    width: 100%;
    height: 25px;
  }
  form p,
  form span {
    font-size: max(0.85em, 12px);
    padding: 0;
    margin: 0;
  }
  input,
  textarea {
    line-height: 12px;
    height: 14px;
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    font-family: Arial, Helvetica, sans-serif;
  }
  textarea {
    display: block;
    background: #e3fafa;
    resize: none;
  }
  input {
    background: #e3fafa;
    font-size: 0.83em;
  }
  input:hover,
  textarea:hover {
    background: #ffffcc;
  }
  input:focus,
  textarea:focus {
    border: 1px solid #666;
  }
  table {
    width: 800px;
    font-size: max(12px, 0.9em);
  }
  table {
    border-collapse: collapse;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }

  table td,
  table th {
    padding: 1px;
    border: 1px solid #ccc;
  }

  table th {
    text-align: center;
    font-weight: bold;
    font-size: max(12px, 0.75em);
  }

  table .tableBanner {
    color: white;
    background: black;
  }

  table tr td input {
    width: 100%;
  }

  table tr td textarea {
    margin-top: -16px;
    width: 100%;
    height: 24px;
    font-size: 1em;
  }

  .totals {
    font-weight: bold;
  }

  .blocked {
    background: #ccc;
  }

  #ftrBox {
    border-right: 1px solid #ccc;
    border-top: 2px solid black;
  }

  #ftrBox input[type='checkbox'] {
    margin: 4px;
  }

  #ftrBox input[type='text'] {
    border-bottom: 1px solid black;
  }

  .ftr {
    font-size: max(12px, 0.7em);
    padding: 4px;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
  }

  .two-col {
    width: 399px;
  }
  .left {
    float: left;
  }

  .right {
    float: right;
  }
  .clear {
    clear: both;
  }
</style>
