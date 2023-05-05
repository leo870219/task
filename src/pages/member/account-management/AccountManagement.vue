<template>
    <div class="account-management">
        <div class="container">
            <nav class="row navbar navbar-light bg-light">
                <div class="d-flex flex-column flex-sm-row align-items-sm-center align-items-start">
                    <div class="col-12 col-sm-5 me-sm-2">
                        <input class="form-control" type="text" ref="search" v-model.trim="searchInputValue"
                            aria-label="Search">
                    </div>
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="filterHandler">搜尋</button>
                </div>
            </nav>
            <ul class="list-group mt-4 row">
                <DataListItem v-for="item in visibleList" 
                    :key="item.id" 
                    :data="item" 
                    @open-edit-modal="openEditModal"
                    @open-delete-modal="openDeleteModal">
                    <p> {{ item.email }}</p>
                </DataListItem>
            </ul>
            <Pagination 
                v-show="pageList.length > 0" 
                :page-list-length="pageList.length" 
                :pagination-size="paginationSize" 
                :current-page="currentPage"
                @set-current-page=setCurrentPage >
            </Pagination>
            <Modal 
                :title="account.editModal.title" 
                :button-text-submit="account.editModal.submit" 
                :button-text-cancel="account.editModal.cancel"
                :show="editModalShow" 
                @close-handler="editCancelHandler" 
                @submit-handler="editSubmitHandler">
                <FormField v-for="field in editData.form" 
                    :show-error-message="showEditErrorMessage" 
                    :field-data="field"
                    @input="field.value = $event">
                </FormField>
            </Modal>
            <Modal 
                :show="deleteModalShow" 
                :title="common.modal.title" 
                :button-text-submit="common.modal.submit"
                :button-text-cancel="common.modal.cancel" 
                @close-handler="deleteCancelHandler" 
                @submit-handler="deleteSubmitHandler">
                <p>{{ common.modal.checkMessage }}</p>
            </Modal>
        </div>
    </div>
</template>

<script>
// resource
import common from '@/static/member/common'
import account from '@/static/member/account'
// class
import { ValidationField } from '@/common/field'
import { RequiredValidation, EmailFormatValidation, MinLengthValidation, PasswordFormatValidation } from '@/common/validations'
// mixins
import { editFormMixin, deleteFormMixin } from '@/mixins/member/form'
import { listMixin } from '@/mixins/member/list'
// components
import DataListItem from '@/components/member/DataListItem'
import FormField from '@/components/common/FormField'
import Modal from '@/components/member/Modal'
import Pagination from '@/components/member/Pagination.vue'
// error message
const errorRequired = account.validations['required']
const errorEmailFormat = account.validations['emailFormat']
const errorMinLength = account.validations['min'].replace('{min}', '8')
const errorPasswordFormat = account.validations['passwordFormat']
// validation instance
const requiredValidation = new RequiredValidation(errorRequired)
const emailFormatValidation = new EmailFormatValidation(errorEmailFormat, /^\w+@\w+\.com$/)
const minLengthValidation = new MinLengthValidation(errorMinLength, 8)
const passwordFormatValidation = new PasswordFormatValidation(errorPasswordFormat, /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/)

export default {
    name: 'AccountManagement',
    mixins: [editFormMixin, deleteFormMixin,listMixin],
    components: {
        Modal,
        FormField,
        DataListItem,
        Pagination
    },
    data() {
        return {
            common,
            account,
            currentPage: 1,
            pageSize: 10,
            paginationSize: 3,
            filterString: '',
            searchInputValue: '',
            editModalShow: false,
            editData: {
                id: '',
                form: {
                    email: new ValidationField(account.form.email.label, 'email', account.form.email.placeholder, [requiredValidation, emailFormatValidation]),
                    password: new ValidationField(account.form.password.label, 'text', account.form.password.placeholder, [requiredValidation, minLengthValidation, passwordFormatValidation]),
                }
            },
            editActionName: 'account/updateAccount',
            showEditErrorMessage: false,
            deleteModalShow: false,
            deleteDataID: '',
            deleteActionName: 'account/deleteAccount',
        }
    },
    methods: {
        filterHandler() {
            this.filterString = this.searchInputValue
            this.currentPage = 1
        },
    },
    computed: {
        list() {
            return this.$store.state.account.list.filter(item => {
                return item.email.indexOf(this.filterString) !== -1
            })
        },
    }
}
</script>