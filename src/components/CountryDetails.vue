<template>
  <div class="col-md-3 my-3">
    <div class="card cursor-pointer h-100" @click="goToDetails">
      <el-image class="flag" :src="_.get(country, 'flag')" fit="cover"></el-image>
      <div class="card-body">
        <div class="card-title h5 font-weight-bold h6 mb-2">{{ _.get(country, 'name') || 'N/A' }}</div>
        <div class="card-text">
          <div class="font-size-sm">
            <span class="font-weight-bold pr-2">Population:</span>{{ _.get(country, 'population') ? $_numberWithCommas(country.population) : 'N/A' }}
          </div>
          <div class="font-size-sm"><span class="font-weight-bold pr-2">Region:</span>{{ _.get(country, 'region') || 'N/A' }}</div>
          <div class="font-size-sm"><span class="font-weight-bold pr-2">Capital:</span>{{ _.get(country, 'capital') || 'N/A' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['country'],
  methods: {
    goToDetails() {
      this.$router.push({ path: '/view', query: Object.assign({}, this.$route.query, { name: _.get(this.country, 'name') }) })
    },
  },
}
</script>
