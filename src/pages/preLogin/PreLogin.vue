<template>
  <div class="container rounded p-4">
    <form>
      <FormField v-for="field in form" 
        :show-error-message="showErrorMessage"
        :field-data="field"
        @input="field.value = $event">
      </FormField>
      <button type="submit" class="btn btn-primary" @click.prevent="login">Sign in</button>
    </form>
  </div>
</template>

<script>
// resource
import preLogin from '@/static/preLogin'
// class
import { RequiredValidation, EmailFormatValidation, MinLengthValidation, PasswordFormatValidation } from '@/common/validations'
import { ValidationField } from '@/common/field'
// components
import FormField from '@/components/common/FormField.vue'
// error message
const errorRequired = preLogin.validations['required']
const errorEmailFormat = preLogin.validations['emailFormat']
const errorMinLength = preLogin.validations['min'].replace('{min}', '8')
const errorPasswordFormat = preLogin.validations['passwordFormat']
// validation instance
const requiredValidation = new RequiredValidation(errorRequired)
const emailFormatValidation = new EmailFormatValidation(errorEmailFormat, /^\w+@\w+\.com$/)
const minLengthValidation = new MinLengthValidation(errorMinLength, 8)
const passwordFormatValidation = new PasswordFormatValidation(errorPasswordFormat, /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)

export default {
  name: 'PreLogin',
  components: {
    FormField
  },
  data() {
    return {
      preLogin,
      showErrorMessage: false,
      form: {
        email: new ValidationField(preLogin.form.email.label, 'text', preLogin.form.email.placeholder, [requiredValidation, emailFormatValidation]),
        password: new ValidationField(preLogin.form.password.label, 'password', preLogin.form.password.placeholder, [requiredValidation, minLengthValidation, passwordFormatValidation]),
      }
    }
  },
  methods: {
    login() {
      if (this.formValid) {
        this.$cookies.set('user', {
          email: this.form.email.value
        })
        this.$store.commit('setUserIsLogin', true)
        this.$router.push('/member')
      } else {
        this.showErrorMessage = true
      }
    }
  },
  computed: {
    formValid() {
      return Object.values(this.form).every(input => {
        return !input.errorMessage
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: left;
  border: 1px solid gray;
}

.form-group {

  &+.form-group,
  &+button {
    margin-top: 30px;
  }
}
</style>
