
<template>
<div id="invoice">
  <h1>My Harvest Timesheet as an Invoice</h1>
  <header class="wrapper" v-if="accountInfo !== null">
    <div>
      {{ accountInfo.first_name }} {{ accountInfo.last_name }}<br />
      {{ accountInfo.email }}
    </div>
    <div style="text-align: center">
      HOW DO I GET<br />MY CAT PIC HERE?
    </div>
  </header>
  <section class="wrapper">
    <table v-if="lineItems !== null">
      <thead>
        <tr>
          <th>Labor ID</th>
          <th>Description</th>
          <th>Hours</th>
          <th>Rate</th>
          <th>Labor Total</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in getLineItems" v-bind:key="index">
        <td>{{ item.id }}</td>
        <td>Slaving away for <strong>{{ item.project.name }}</strong> on {{ item.spent_date }}</td>
        <td>{{ item.hours }} hours</td>
        <td>${{ item.rate }}</td>
        <td>${{ item.total }}</td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <th colspan="4">Grand Total</th>
          <th>${{ getGrandTotal }}</th>
        </tr>
      </tfoot>
    </table>
  </section>
  <div class="floatingFooter" v-if="!isDownload">
    <div class="dataRow">
      <div class="dataRow__item">
        <label>Hourly Rate</label>
        <input v-model="hourlyRate">
      </div>
      <div class="dataRow__item">
        <label>Date From</label>
        <input v-model="dateFrom">
      </div>
      <div class="dataRow__item">
        <label>Date To</label>
        <input v-model="dateTo">
      </div>
      <div class="dataRow__item">
        <button class="butt" v-on:click="fetchLineItems()">Update</button>
        <a v-bind:href="getDownloadLink" target="_blank" class="butt">Download</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable no-unused-vars */

import dotenv from 'dotenv'
import moment from 'moment'
import numeral from 'numeral'

export default {
  name: 'Dashboard',
  data () {
    return {
      dateFrom: moment().subtract(14, 'days').format('YYYY-MM-DD'),
      dateTo: moment().format('YYYY-MM-DD'),
      hourlyRate: 90,
      accountInfo: null,
      lineItems: null,
      grandTotal: 0,
      isDownload: false
    }
  },
  async mounted () {
    const queryParams = this.$route.query
    const { token, scope } = this.$store.getters.tokenInfo

    if (queryParams.download) {
      this.dateFrom = queryParams.from
      this.dateTo = queryParams.to
      this.hourlyRate = queryParams.rate
      this.isDownload = true
    }

    // console.log(this.$store.getters.tokenInfo)

    let response

    response = await fetch(`${process.env.VUE_APP_HARVEST_LAMBDA}/harvest?accessToken=${token}&scope=${scope}&type=accountInfo`)
    if (response && response.status === 200) {
      const data = await response.json()
      this.accountInfo = data.user
      // console.log(data.user)
    }

    response = await fetch(`${process.env.VUE_APP_HARVEST_LAMBDA}/harvest?accessToken=${token}&scope=${scope}&type=timeEntriesList&from=${this.dateFrom}&to=${this.dateTo}`)
    if (response && response.status === 200) {
      const data = await response.json()
      this.lineItems = data.time_entries
      // console.log(data.time_entries)
    }
  },
  computed: {
    getLineItems () {
      let items = []
      if (this.lineItems) {
        items = this.lineItems.map(itm => {
          itm.spent_date = moment(itm.spent_date, 'YYYY-MM-DD').format('LL')
          itm.rate = numeral(this.hourlyRate).format('0,0.00')
          itm.total = numeral(itm.hours * this.hourlyRate).format('0,0.00')
          return itm
        })
      }
      return items
    },
    getGrandTotal () {
      let grandTotal = 0
      if (this.lineItems) {
        this.lineItems.forEach(itm => {
          grandTotal += (itm.hours * this.hourlyRate)
        })
      }
      return numeral(grandTotal).format('0,0.00')
    },
    getDownloadLink () {
      const { token, scope } = this.$store.getters.tokenInfo

      return `${process.env.VUE_APP_DOWNLOAD_LAMBDA}/invoice-download?token=${token}&scope=${scope}&from=${this.dateFrom}&to=${this.dateTo}&rate=${this.hourlyRate}`
    }
  },
  methods: {
    async fetchLineItems () {
      const { token, scope } = this.$store.getters.tokenInfo

      const response = await fetch(`${process.env.VUE_APP_HARVEST_LAMBDA}/harvest?accessToken=${token}&scope=${scope}&type=timeEntriesList&from=${this.dateFrom}&to=${this.dateTo}`)
      if (response && response.status === 200) {
        const data = await response.json()
        this.lineItems = data.time_entries
      }
    }
  }
}
</script>

<style lang="scss">
  .wrapper {
    margin: 0 auto;
    width: 100%;
    max-width: 1000px;

    @media screen and (max-width: 800px) {
      padding: 0 2rem;
    }
  }

  #invoice {
    text-align: left;
    padding-bottom: 100px;

    * {
      box-sizing: border-box;
    }

    h1 {
      text-align: center;
    }

    header {
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
    }
  }
  .dataRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__item {
      width: 20%;

      &:last-child {
        width: 25%;

        a {
          margin-left: .5rem;
        }
      }

      label {
        display: block;
        font-size: .85rem;
        margin-bottom: 3px;
      }
      input {
        display: block;
        width: 100%;
        padding: 10px;
        font-size: .85rem;
        border: 1px solid #CCC;
        background: #FAFAFA;
        outline: none;
        border-radius: 4px;

        &:focus {
          background: #FFF;
        }
      }
    }
  }
  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 10px;
    }

    tbody td {
      text-align: center;

      &:nth-child(2) {
        text-align: left;
      }
    }

    tfoot {
      tr {
        background: #424242;
        color: #FFF;
      }
      th:first-child {
        text-align: right;
      }
    }
  }

  table, th, td {
    border: 1px solid black;
  }

  .floatingFooter {
    position: fixed;
    bottom: 0; left: 0;
    width: 100%;
    padding: 10px;
    background: #EFEFEF;
    border-top: 1px solid #CCC;
  }

  .butt {
    padding: 6px 15px;
    border-radius: 4px;
    font-size: 1.25rem;
    border: 0;
    background: #333;
    color: #FFF;
    text-decoration: none;
  }
</style>
