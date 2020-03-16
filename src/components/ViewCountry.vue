<template>
  <div class="container layout">
    <div class="mb-4">
      <el-button class="shadow-sm" @click="goBack"><i class="fas fa-arrow-left pr-2"></i>Back</el-button>
    </div>
    <div class="row no-gutters pt-4 d-flex align-items-center justify-content-between">
      <div class="col-md-5 mr-md-4" v-loading="loading">
        <el-image :src="_.get(countryData, 'flag')" fit="fill" v-if="!loading"></el-image>
      </div>
      <div class="col pl-md-4">
        <div class="h4 font-weight-bold mb-4">
          {{ _.get(countryData, 'name') }}
        </div>
        <div class="row">
          <div class="col-md mb-4 mb-md-0">
            <div v-if="_.get(countryData, 'nativeName')">
              <span class="font-weight-bold pr-2">Native Name:</span>
              {{ _.get(countryData, 'nativeName') }}
            </div>
            <div>
              <span class="font-weight-bold pr-2">Population:</span>
              {{ _.get(countryData, 'population') ? $_numberWithCommas(countryData.population) : '-' }}
            </div>
            <div>
              <span class="font-weight-bold pr-2">Region:</span>
              {{ _.get(countryData, 'region') || '-' }}
            </div>
            <div class=""><span class="font-weight-bold pr-2">Sub Region:</span>{{ _.get(countryData, 'subregion') }}</div>
            <div class=""><span class="font-weight-bold pr-2">Capital:</span>{{ _.get(countryData, 'capital') }}</div>
          </div>
          <div class="col-md">
            <div>
              <span class="font-weight-bold pr-2">Top Level Domain:</span>
              {{ _.get(countryData, ['topLevelDomain', 0]) || '-' }}
            </div>
            <div>
              <span class="font-weight-bold pr-2">Currencies:</span>
              {{ _.get(countryData, ['currencies', 0, 'name']) || '-' }}
            </div>
            <div>
              <span class="font-weight-bold pr-2">Language:</span>
              {{ _.get(countryData, 'languages') ? splitLanguages : '-' }}
            </div>
          </div>
          <div class="col-12 mt-4 row no-gutters">
            <div class="font-weight-bold my-auto pr-4">Border Countries:</div>
            <div v-show="_.isEmpty(borders)">N/A</div>
            <div v-for="(item, idx) in borders" :key="idx">
              <div class="py-1 px-2 mr-2 border rounded font-size-sm">
                {{ _.get(item, 'name') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ViewCountry',
  data() {
    return {
      countryData: {},
      loading: false,
      borders: [],
    }
  },
  mounted() {
    this.getCountryDetails()
  },
  computed: {
    splitLanguages() {
      const languages = _.map(this.countryData.languages, 'name')
      return _.join(languages, ', ')
    },
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    async getBorder(code) {
      try {
        const { data } = await this.$axios({
          url: `https://restcountries.eu/rest/v2/alpha/${code}`,
          method: 'GET',
        })
        this.borders.push(data)
      } catch (error) {}
    },
    async getCountryDetails() {
      this.loading = true
      try {
        const { data } = await this.$axios({
          url: `https://restcountries.eu/rest/v2/name/${this.$route.query.name}`,
          method: 'GET',
        })
        this.countryData = _.first(data)
        _.forEach(this.countryData.borders, item => {
          this.getBorder(item)
        })
        this.loading = false
      } catch (error) {}
    },
  },
}
</script>
