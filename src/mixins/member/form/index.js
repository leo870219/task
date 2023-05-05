// function
import { closeModalHandler, openModalHandler } from "@/common/modal";

const addFormMixin = {
  methods: {
    addSubmitHandler() {
      if (this.addDataFormValid) {
        const addData = {};
        for (let key of Object.keys(this.addData.form)) {
          // passwordConfirm只用於驗證，無需存取
          if(key !== 'passwordConfirm'){
            addData[key] = this.addData.form[key].value;
          }
        }
        this.$store.dispatch(this.addActionName, addData);
        for (let key of Object.keys(this.addData.form)) {
          this.addData.form[key].value = '';
        }
        this.showAddErrorMessage = false;
      } else {
        this.showAddErrorMessage = true;
      }
    },
  },
  computed: {
    addDataFormValid() {
      return Object.values(this.addData.form).every((input) => {
        return !input.errorMessage;
      });
    },
  },
};

const editFormMixin = {
  methods: {
    openEditModal(data) {
      this.editData.id = data.id;
      for (let key of Object.keys(this.editData.form)) {
        this.editData.form[key].value = data[key];
      }
      openModalHandler();
      this.editModalShow = true;
    },
    editCancelHandler() {
      closeModalHandler();
      this.editModalShow = false;
      this.showEditErrorMessage = false;
    },
    editSubmitHandler() {
      if (this.editDataFormValid) {
        // 減少不必要的request
        if (this.editDataNeedUpdate) {
          const updateData = {
            id: this.editData.id,
          };
          for (let key of Object.keys(this.editData.form)) {
            updateData[key] = this.editData.form[key].value;
          }
          this.$store.dispatch(this.editActionName, updateData);
        }
        closeModalHandler();
        this.editModalShow = false;
        this.showEditErrorMessage = false;
      } else {
        this.showEditErrorMessage = true;
      }
    },
  },
  computed: {
    editDataNeedUpdate() {
      if (this.editData.id) {
        const changeData = this.list.find((data) => {
          return data.id === this.editData.id;
        });
        const isChange = Object.keys(this.editData.form).some((key) => {
          return this.editData.form[key].value !== changeData[key];
        });
        return isChange;
      } else {
        return false;
      }
    },
    editDataFormValid() {
      return Object.values(this.editData.form).every((input) => {
        return !input.errorMessage;
      });
    },
  },
};

const deleteFormMixin = {
  methods: {
    openDeleteModal(id) {
      this.deleteDataID = id;
      openModalHandler();
      this.deleteModalShow = true;
    },
    deleteCancelHandler() {
      closeModalHandler();
      this.deleteModalShow = false;
    },
    deleteSubmitHandler() {
      this.$store.dispatch(this.deleteActionName, this.deleteDataID);
      closeModalHandler();
      this.deleteModalShow = false;
    },
  },
};

export { addFormMixin, editFormMixin, deleteFormMixin };
