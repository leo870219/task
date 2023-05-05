<template>
  <nav class="page-tab pt-3">
    <ul class="pagination justify-content-center align-items-stretch">
      <li class="page-item">
        <button class="page-link btn-outline-succes" 
          @click="pagePrevHandler"
          :disabled="currentPage === 1">
          &#060;&#060;
        </button>
      </li>
      <li v-for="item in paginationVisibleList" 
        class="page-item" 
        :class="{ 'active': item === currentPage }">
        <button class="page-link" @click="pageTo(item)">{{ item }}</button>
      </li>
      <li class="page-item">
        <button class="page-link btn-outline-succes" 
          @click="pageNextHandler"
          :disabled="currentPage === pageListLength">
          &#062;&#062;
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    paginationSize: Number,
    pageListLength:Number
  },
  methods: {
    pagePrevHandler() {
        this.$emit('set-current-page', this.currentPage - 1)
    },
    pageNextHandler() {
        this.$emit('set-current-page', this.currentPage + 1)
    },
    pageTo(page) {
      if (page > 0 && page <= this.pageListLength) {
        this.$emit('set-current-page', page)
      }
    },
    existPagination(val) {
      return val <= this.pageListLength ? val : ''
    },
  },
  computed: {
    paginationVisibleList() {
      // ex:Math.ceil(currentPage:4 / paginationSize:3) = currentTab:2
      const currentTab = Math.ceil(this.currentPage / this.paginationSize)
      const list = []
      for (let i = this.paginationSize - 1; i >= 0; i--) {
        list.push(this.existPagination(currentTab * this.paginationSize - i))
      }
      return list
    },
  },

}
</script>

<style lang="scss" scoped>
.page-tab {
  height: auto;

  .pagination {
    max-width: 100%;

    >.page-item {
      height: 30px;

      >.page-link {
        height: 100%;
        font-size: 12px;
        transition: .3s;
        padding: 5px;
        &:focus{
          box-shadow: unset;
        }
      }

      &:not(:last-child):not(:first-child) {
        >.page-link {
          width: 30px;
        }
      }

      &:last-child,
      :first-child {
        &:disabled {
          cursor: unset;
          background-color: #fff;
          opacity: .3;
        }
      }
    }
  }
}
</style>
