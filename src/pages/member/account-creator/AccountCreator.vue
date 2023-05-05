<template>
    <div class="account-creator">
        <div class="container">
            <FormField v-for="field in addData.form" class="row" 
                :show-error-message="showAddErrorMessage" 
                :field-data="field"
                label-class="col-sm-3  p-0" 
                input-class="col-sm-9" 
                @input="field.value = $event">
            </FormField>
            <div class="row my-3">
                <button class="btn btn-outline-primary btn-sm" @click="addSubmitHandler">送出</button>
            </div>
        </div>
    </div>
</template>

<script>
// resource
import account from '@/static/member/account'
// class
import { ValidationField } from '@/common/field'
import { RequiredValidation, EmailFormatValidation, MinLengthValidation, PasswordFormatValidation, PasswordConfirmValidation } from '@/common/validations'
// mixins
import { addFormMixin } from '@/mixins/member/form'
// components
import FormField from '@/components/common/FormField'
// error message
const errorRequired = account.validations['required']
const errorEmailFormat = account.validations['emailFormat']
const errorMinLength = account.validations['min'].replace('{min}', '8')
const errorPasswordFormat = account.validations['passwordFormat']
const errorPasswordConfirm = account.validations['passwordConfirm']
// validation instance
const requiredValidation = new RequiredValidation(errorRequired)
const emailFormatValidation = new EmailFormatValidation(errorEmailFormat, /^\w+@\w+\.com$/)
const minLengthValidation = new MinLengthValidation(errorMinLength, 8)
const passwordFormatValidation = new PasswordFormatValidation(errorPasswordFormat, /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)
const passwordConfirmValidation = new PasswordConfirmValidation(errorPasswordConfirm)

export default {
    name: 'AccountCreator',
    mixins:[addFormMixin],
    components: {
        FormField
    },
    data() {
        return {
            addData: {
                form: {
                    email: new ValidationField(account.form.email.label, 'email', account.form.email.placeholder, [requiredValidation, emailFormatValidation]),
                    password: new ValidationField(account.form.password.label, 'password', account.form.password.placeholder, [requiredValidation, minLengthValidation, passwordFormatValidation]),
                    passwordConfirm: new ValidationField(account.form.passwordConfirm.label, 'password', account.form.passwordConfirm.placeholder, [requiredValidation, minLengthValidation, passwordFormatValidation, passwordConfirmValidation]),
                }
            },
            addActionName: 'account/addAccount',
            showAddErrorMessage: false
        }
    },
    watch: {
        'addData.form.password.value': function (newVal) {
            // 讓passwordConfirmValidation可以拿新的password去驗證
            passwordConfirmValidation.password = newVal
        }
    }
}
</script>
  