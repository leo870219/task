<template>
    <div class="product-creator">
        <div class="container">
            <FormField v-for="field in addData.form" class="row" 
                :show-error-message="showAddErrorMessage"
                :field-data="field" 
                label-class="col-sm-3  p-0" 
                input-class="col-sm-9"
                @input="field.value = $event">
            </FormField>
            <div class="my-3 row">
                <button class="btn btn-outline-primary btn-sm" @click="addSubmitHandler">送出</button>
            </div>
            <ul class="list-group mt-2 row">
                <DataListItem v-for="item in visibleList" :key="item.id" 
                    :data="item" 
                    @open-edit-modal="openEditModal"
                    @open-delete-modal="openDeleteModal">
                    <template #button>
                        <div class="move-button">
                            <button type="button" class="btn btn-primary btn-sm me-1" @click="moveToPrev(item)">
                                &uarr;
                            </button>
                            <button type="button" class="btn btn-primary btn-sm me-3" @click="moveToNext(item)">
                                &darr;
                            </button>
                        </div>
                    </template>
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
        </div>

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
</template>

<script>
// resource
import common from '@/static/member/common'
import product from '@/static/member/product'
// class
import { Field,ValidationField } from '@/common/field'
import { NumericValidation, RequiredValidation } from '@/common/validations'
// mixins
import { addFormMixin, editFormMixin, deleteFormMixin } from '@/mixins/member/form'
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
    name: 'ProductCreator',
    mixins: [addFormMixin, editFormMixin, deleteFormMixin,listMixin],
    components: {
        FormField,
        DataListItem,
        Modal,
        Pagination
    },
    data() {
        return {
            product,
            common,
            currentPage: 1,
            pageSize: 10,
            paginationSize: 3,
            showAddErrorMessage: false,
            addData: {
                form: {
                    name: new ValidationField(product.form.name.label, 'text', product.form.name.placeholder, [requiredValidation]),
                    price: new ValidationField(product.form.price.label, 'text', product.form.price.placeholder, [requiredValidation, numericValidation]),
                    material: new Field(product.form.material.label, 'text', product.form.material.placeholder),
                }
            },
            addActionName: 'product/addProduct',
            editModalShow: false,
            editData: {
                id: '',
                form: {
                    name: new ValidationField(product.form.name.label, 'text', product.form.name.placeholder, [requiredValidation]),
                    price: new ValidationField(product.form.price.label, 'text', product.form.price.placeholder, [requiredValidation, numericValidation]),
                    material: new Field(product.form.material.label, 'text', product.form.material.placeholder),
                }
            },
            editActionName: 'product/updateProduct',
            showEditErrorMessage: false,
            deleteModalShow: false,
            deleteDataID: '',
            deleteActionName: 'product/deleteProduct',
        }
    },
    methods: {
        moveToPrev(data) {
            const currentIndex = this.list.indexOf(data)
            const targetIndex = currentIndex - 1
            if (targetIndex >= 0) {
                this.$store.dispatch('product/changeProductOrder', [data, this.list[targetIndex]])
            }
        },
        moveToNext(data) {
            const currentIndex = this.list.indexOf(data)
            const targetIndex = currentIndex + 1
            if (targetIndex < this.list.length) {
                this.$store.dispatch('product/changeProductOrder', [data, this.list[targetIndex]])
            }
        },
    },
    computed: {
        list() {
            return this.$store.state.product.list
        },
    }
}
</script>
  