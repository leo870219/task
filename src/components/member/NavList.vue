<template>
  <div class="container">
    <a class="row py-2" v-if="type === 'feature'" href="#" @click.prevent="signOut">{{ title }}</a>
    <router-link class="row py-2" v-else :to="path">{{ title }}</router-link>
    <div class="nav flex-column nav-pills row" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <router-link class="nav-link col-12" v-for="item in categories" :to="item.path">{{ item.title }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavList',
  props: {
    title: String,
    type: String,
    path: {
      default: '',
      type: String
    },
    categories: Array,
  },
  methods: {
    signOut() {
      this.$store.commit('setUserIsLogin', false)
      this.$cookies.remove('user', 'email')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  a {
    text-decoration: none;
    color: #007bff;
  }

  .nav-pills {
    text-align: left;

    >a {
      padding: 10px 0 10px 20px;
      display: inline-block;
      width: 100%;
      height: 100%;
      transition: .3s ease;
      background-color: transparent;

      &.router-link-exact-active {
        color: #fff;
        background-color: #007bff;
      }
    }
  }
}
</style>
