<template>
  <li class="list-group-item d-md-flex align-items-center justify-content-between">
    <slot></slot>
    <div class="btn-container d-flex align-items-center justify-content-between flex-wrap">
      <slot name="button"></slot>
      <div class="edit-and-delete-button">
        <button type="button" class="btn btn-primary btn-sm me-2" @click="emitOpenEditModal(data)">
          編輯
        </button>
        <button type="button" class="btn btn-primary btn-sm" @click="emitOpenDeleteModal(data.id)">
          刪除
        </button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'DataListItem',
  props: {
    data: Object,
  },
  methods: {
    emitOpenEditModal(data) {
      this.$emit('open-edit-modal', data)
    },
    emitOpenDeleteModal(id) {
      this.$emit('open-delete-modal', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  text-align: left;
  width: 100%;

  >p {
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
  }

  >.btn-container {
    flex-shrink: 0;

    button {
      @media screen and (max-width: 768px) {
        margin-top: 20px;
      }
    }
  }
}
</style>
