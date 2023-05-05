const listMixin = {
  methods: {
    setCurrentPage(newCurrentPage) {
      this.currentPage = newCurrentPage;
    },
  },
  computed: {
    visibleList() {
      return this.pageList[this.currentPage - 1];
    },
    pageList() {
      const list = [];
      for (let i = 1; i <= Math.ceil(this.list.length / this.pageSize); i++) {
        const splitList = this.list.slice(
          i * this.pageSize - this.pageSize,
          i * this.pageSize
        );
        list.push(splitList);
      }
      return list;
    },
  },
};

export { listMixin };
