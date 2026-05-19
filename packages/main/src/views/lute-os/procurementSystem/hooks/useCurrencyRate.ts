import Decimal from 'decimal.js';
import { ref, type Ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { platformApi } from '@/api';
import type { DemandPurchaseAmountReq, PurchaseItemPriceBean } from '@/api/platform/data-contracts';
import type { ProductLineModel } from '../constant';

interface UseCurrencyRateOptions {
  productLines: Ref<ProductLineModel[]>;
  targetCurrency: Ref<string | null | undefined>;
  getCurrentTotalBudget: () => number | string | null | undefined;
  onTotalBudgetChange: (value: number | null) => void;
}

const currencyPrecisionMap: Record<string, number> = { USD: 2, CNY: 2, INR: 4, JPY: 0 };
const getPrecision = (currency: string) => currencyPrecisionMap[currency] ?? 2;

// const getDynamicPrecision = (rate: Decimal | number, base = 2): number => {
//   const n = typeof rate === 'number' ? rate : rate.toNumber();
//   if (n <= 0) return base;
//   if (n < 0.0001) return 6;
//   if (n < 0.001) return 5;
//   if (n < 0.01) return 4;
//   if (n < 0.1) return 3;
//   return base;
// };

export const useCurrencyRate = (options: UseCurrencyRateOptions) => {
  const isBudgetCalculating = ref(false);
  let rateErrorNotified = false;
  let budgetCalcToken = 0;
  const shouldSkipFirstCalculation = ref(true);
  let lastPayloadKey = '';

  const buildPayloadKey = (targetCurrency: string, list: PurchaseItemPriceBean[]) =>
    `${targetCurrency}|${JSON.stringify(list)}`;

  const toDecimal = (value: Decimal.Value | null | undefined) => {
    try {
      const decimal = new Decimal(value ?? 0);
      return decimal.isFinite() ? decimal : null;
    } catch {
      return null;
    }
  };
  const collectCurrencyTotals = () => {
    return options.productLines.value.reduce<PurchaseItemPriceBean[]>((acc, line) => {
      const currency = line.currency?.trim();
      if (!currency) return acc;
      const unitPrice = toDecimal(line.unitPrice);
      const quantity = toDecimal(line.quantity);
      if (!unitPrice || !quantity || unitPrice.isZero() || quantity.isZero()) return acc;
      const price = unitPrice.toDecimalPlaces(getPrecision(currency), Decimal.ROUND_HALF_UP);
      const num = quantity.toDecimalPlaces(4, Decimal.ROUND_HALF_UP);
      acc.push({
        currency,
        price: price.toNumber(),
        num: num.toNumber(),
      });
      return acc;
    }, []);
  };

  const computeTotalBudgetWithRate = async () => {
    if (shouldSkipFirstCalculation.value) {
      shouldSkipFirstCalculation.value = false;
      const currentBudget = options.getCurrentTotalBudget();
      if (currentBudget !== null && currentBudget !== undefined && `${currentBudget}` !== '') {
        return;
      }
    }

    const targetCurrency = options.targetCurrency.value || 'CNY';
    const priceList = collectCurrencyTotals();
    const payloadKey = buildPayloadKey(targetCurrency, priceList);

    if (payloadKey === lastPayloadKey) {
      return;
    }

    if (!priceList.length) {
      options.onTotalBudgetChange(null);
      lastPayloadKey = payloadKey;
      return;
    }

    rateErrorNotified = false;
    const token = ++budgetCalcToken;
    isBudgetCalculating.value = true;

    try {
      const payload: DemandPurchaseAmountReq = {
        currency: targetCurrency,
        priceList,
      };
      const response = await platformApi.platformDemandCalculateTotalAmount(payload);

      if (token !== budgetCalcToken) return;

      const amount = toDecimal(response?.totalAmount);
      if (!amount || amount.isZero()) {
        options.onTotalBudgetChange(null);
        return;
      }
      const normalized = amount
        .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
        .toNumber();
      options.onTotalBudgetChange(normalized);
      lastPayloadKey = payloadKey;
    } catch (error) {
      if (!rateErrorNotified) {
        ElMessage.error('计算预算失败，请稍后重试');
        rateErrorNotified = true;
      }
      console.error('Failed to calculate total amount', error);
      options.onTotalBudgetChange(null);
    } finally {
      isBudgetCalculating.value = false;
    }
  };

  const scheduleTotalBudgetUpdate = useDebounceFn(async () => {
    await computeTotalBudgetWithRate();
  }, 400);

  return {
    isBudgetCalculating,
    scheduleTotalBudgetUpdate,
    computeTotalBudgetWithRate,
  };
};
