<template>
  <div>
    <div class="modal" :class="{ 'active': show }">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary">{{ title }}</h5>
            <button type="button" class="close" @click="emitCloseModal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="emitSubmitModal">{{ buttonTextSubmit }}</button>
            <button type="button" class="btn btn-secondary" @click="emitCloseModal">{{ buttonTextCancel }}</button>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    show: Boolean,
    title: String,
    buttonTextSubmit: String,
    buttonTextCancel: String,
  },
  methods: {
    emitCloseModal() {
      this.$emit('close-handler')
    },
    emitSubmitModal() {
      this.$emit('submit-handler')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  //prevent view shake
  left: calc(100vw - 100%);
  display: block;
  visibility: hidden;
  opacity: 0;
  transition: .5s ease;
  transform: translateY(-10%);

  &+.overlay {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: transparent;
    visibility: hidden;
    transition: background-color .3s;
  }

  &.active {
    position: fixed;
    visibility: visible;
    opacity: 1;
    transform: translateY(0);

    &+.overlay {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: rgba(128, 128, 128, 0.58);
      visibility: visible;
      transition: background-color .5s;
    }
  }

  button.close {
    border: none;
    background-color: transparent;
    font-size: 20px;
  }
}</style>
