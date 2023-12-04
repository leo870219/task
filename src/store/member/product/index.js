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
          const res = await axios.get("https://task-api-vercel-six.vercel.app/productList");
          if (res.status === 200) {
            commit("setProductList", res.data);
          }
        } catch (e) {
          console.log(e);
        }
      },
      async addProduct({ dispatch }, data) {
        try {
          const res = await axios.post("https://task-api-vercel-six.vercel.app/productList", data);
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
            `https://task-api-vercel-six.vercel.app/productList/${data.id}`,
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
            `https://task-api-vercel-six.vercel.app/productList/${id}`
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
            `https://task-api-vercel-six.vercel.app/productList/${currentData.id}`,
            {
              name: targetData.name,
              price: targetData.price,
              material: targetData.material,
            }
          );
          const res2 = await axios.put(
            `https://task-api-vercel-six.vercel.app/productList/${targetData.id}`,
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