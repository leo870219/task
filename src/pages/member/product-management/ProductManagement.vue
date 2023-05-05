<template>
    <div class="product-management container">
        <div class="container">
            <ul class="list-group mt-4 row">
                <DataListItem v-for="item in visibleList" :key="item.id" 
                    :data="item" 
                    @open-edit-modal="openEditModal"
                    @open-delete-modal="openDeleteModal">
                    <div class="info-container d-flex justify-content-between">
                        <p> {{ item.name }}</p>
                        <p> ${{ item.price }}</p>
                    </div>
                </DataListItem>
            </ul>
            <Pagination 
                v-show="pageList.length > 0"
                :page-list-length="pageList.length"
                :pagination-size="paginationSize" 
                :current-page="currentPage"
                @set-current-page=setCurrentPage>
            </Pagination>

            <Modal 
                :title="product.editModal.title" 
                :button-text-submit="product.editModal.submit" 
                :button-text-cancel="product.editModal.cancel"
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
import product from '@/static/member/product'
// class
import { Field,ValidationField } from '@/common/field'
import { NumericValidation, RequiredValidation } from '@/common/validations'
// mixins
import { editFormMixin,deleteFormMixin } from '@/mixins/member/form'
import { listMixin } from '@/mixins/member/list'
// components
import DataListItem from '@/components/member/DataListItem'
import FormField from '@/components/common/FormField'
import Modal from '@/components/member/Modal'
import Pagination from '@/components/member/Pagination.vue'
// error message
const errorRequired = product.validations['required']
const errorNumeric = product.validations['numeric']
// validation instance
const requiredValidation = new RequiredValidation(errorRequired)
const numericValidation = new NumericValidation(errorNumeric)

export default {
    name: 'ProductManagement',
    mixins: [editFormMixin,deleteFormMixin,listMixin],
    components: {
        DataListItem,
        Modal,
        FormField,
        Pagination
    },
    data() {
        return {
            product,
            common,
            currentPage: 1,
            pageSize: 10,
            paginationSize: 3,
            editModalShow: false,
            editData: {
                id: '',
                form: {
                    name: new ValidationField(product.form.name.label, 'text', product.form.name.placeholder, [requiredValidation]),
                    price: new ValidationField(product.form.price.label, 'text', product.form.price.placeholder, [requiredValidation, numericValidation]),
                    material: new Field(product.form.material.label, 'text', product.form.material.placeholder),
                }
            },
            editActionName:'product/updateProduct',
            showEditErrorMessage: false,
            deleteModalShow: false,
            deleteDataID: '',
            deleteActionName:'product/deleteProduct',
        }
    },
    computed: {
        list() {
            return this.$store.state.product.list
        },
    },
}
</script>