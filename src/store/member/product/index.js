import axios from 'axios'

const modules = {
    namespaced: true,
    state: () => ({
      list: [],
    }),
    mutations: {
      setProductList(state, data) {
        state.list = data;
      },
    },
    actions: {
      async getProductList({ commit }) {
        try {
          const res = await axios.get("http://localhost:3000/productList");
          if (res.status === 200) {
            commit("setProductList", res.data);
          }
        } catch (e) {
          console.log(e);
        }
      },
      async addProduct({ dispatch }, data) {
        try {
          const res = await axios.post("http://localhost:3000/productList", data);
          if (res.status === 201) {
            dispatch("getProductList");
          }
        } catch (e) {
          console.log(e);
        }
      },
      async updateProduct({ dispatch }, data) {
        try {
          const res = await axios.put(
            `http://localhost:3000/productList/${data.id}`,
            data
          );
          if (res.status === 200) {
            dispatch("getProductList");
          }
        } catch (e) {
          console.log(e);
        }
      },
      async deleteProduct({ dispatch }, id) {
        try {
          const res = await axios.delete(
            `http://localhost:3000/productList/${id}`
          );
          if (res.status === 200) {
            dispatch("getProductList");
          }
        } catch (e) {
          console.log(e);
        }
      },
      async changeProductOrder({ dispatch }, [currentData, targetData]) {
        try {
          const res1 = await axios.put(
            `http://localhost:3000/productList/${currentData.id}`,
            {
              name: targetData.name,
              price: targetData.price,
              material: targetData.material,
            }
          );
          const res2 = await axios.put(
            `http://localhost:3000/productList/${targetData.id}`,
            {
              name: currentData.name,
              price: currentData.price,
              material: currentData.material,
            }
          );
          if (res1.status === 200 && res2.status === 200) {
            dispatch("getProductList");
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };

  export default modules;