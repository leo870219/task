<template>
  <div class="member container">
    <div class="row">
      <nav class="col-sm-3 col-4">
        <NavList v-for="item in sidebar" 
          :title="item.title" 
          :categories="item.categories" 
          :type="item.type"
          :path="item.path">
        </NavList>
      </nav>
      <router-view class="col-sm-9 col-8" />
    </div>
  </div>
</template>

<script>
// resource
import common from '@/static/member/common'
// components
import NavList from '@/components/member/NavList'

export default {
  name: 'Member',
  components: {
    NavList
  },
  created() {
    this.$store.dispatch('account/getAccountList')
    this.$store.dispatch('product/getProductList')
  },
  data() {
    return {
      sidebar: common.sidebar
    }
  }
}
</script>

<style lang="scss">
.member {
  >.row {
    &>div {
      .list-group {
        min-height: 490px;

        @media screen and (max-width: 768px) {
          height: auto;
        }
      }
    }
        
    // 因多顯示price需不同樣式呈現
    &>div:not(.account-management) {
      .list-group {
        .info-container {
          flex-grow: 1;
          margin: -20px 20px 0 -20px;
          flex-wrap: wrap;

          @media screen and (max-width: 768px) {
            margin: -20px 0px 0 -20px;
          }

          p {
            margin: 20px 0 0 20px;
          }
        }
      }
    }
  }

  .btn.btn-outline-primary {
    width: auto;
  }
}
</style>
