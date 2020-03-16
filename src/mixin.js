import Vue from "vue";

Vue.prototype.$_numberWithCommas = (x, decimalPoint = 0) => {
  x = x || 0;
  return x.toLocaleString(undefined, { minimumFractionDigits: decimalPoint });
};
