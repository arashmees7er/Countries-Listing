<template>
  <div class="container layout">
    <!-- Filter Bar -->
    <div class="d-flex align-items-center justify-content-between no-gutters">
      <div class="col-4 shadow-sm">
        <el-input placeholder="Search For A Country..." v-model="searchKeywords" @keydown.enter.native="searchCountry()">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div class="shadow-sm">
        <el-select v-model="filterRegion" placeholder="Filter By Region" @change="filterbyRegion()">
          <el-option v-for="(item, idx) in _.filter(regions, item => item)" :key="idx" :label="item" :value="item"></el-option>
        </el-select>
      </div>
    </div>
    <!-- Listing -->
    <div class="my-4" v-loading="loading">
      <div class="row">
        <country-details v-for="(country, index) in countryList" :country="country" :key="index" :countryList.sync="countryList" />
      </div>
    </div>
  </div>
</template>

<script>
import CountryDetails from './CountryDetails'
export default {
  name: 'Listing',
  components: { CountryDetails },
  data() {
    return {
      countryList: [],
      loading: false,
      regions: [],
      searchKeywords: '',
      filterRegion: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.loading = true
      setTimeout(async () => {
        try {
          const { data } = await this.$axios({
            url: 'https://restcountries.eu/rest/v2/all',
            method: 'GET',
          })
          this.countryList = data
          this.regions = _.uniq(_.map(data, 'region'))
          this.loading = false
        } catch (error) {}
      }, 1000)
    },
    async filterbyRegion() {
      this.loading = true
      setTimeout(async () => {
        try {
          const { data } = await this.$axios({
            url: `https://restcountries.eu/rest/v2/region/${this.filterRegion}`,
            method: 'GET',
          })
          this.countryList = data
          this.loading = false
        } catch (error) {}
      }, 1000)
    },
    async searchCountry() {
      if (!this.searchKeywords) this.fetchData()
      this.loading = true
      setTimeout(async () => {
        try {
          const { data } = await this.$axios({
            url: `https://restcountries.eu/rest/v2/name/${this.searchKeywords}`,
            method: 'GET',
          })
          this.countryList = data
          this.loading = false
        } catch (error) {}
      }, 1000)
    },
  },
}
</script>
