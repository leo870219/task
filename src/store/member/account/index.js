import axios from 'axios'

const modules = {
    namespaced: true,
    state: () => ({
      list: [],
    }),
    mutations: {
      setAccountList(state, data) {
        state.list = data;
      },
    },
    actions: {
      async getAccountList({ commit }) {
        try {
          const res = await axios.get("https://task-api-vercel-six.vercel.app/accountList");
          if (res.status === 200) {
            commit("setAccountList", res.data);
          }
        } catch (e) {
          console.log(e);
        }
      },
      async addAccount({ dispatch }, data) {
        try {
          const res = await axios.post("https://task-api-vercel-six.vercel.app/accountList", data);
          if (res.status === 201) {
            dispatch("getAccountList");
          }
        } catch (e) {
          console.log(e);
        }
      },
      async updateAccount({ dispatch }, data) {
        try {
          const res = await axios.put(
            `https://task-api-vercel-six.vercel.app/accountList/${data.id}`,
            data
          );
          if (res.status === 200) {
            dispatch("getAccountList");
          }
        } catch (e) {
          console.log(e);
        }
      },
      async deleteAccount({ dispatch }, id) {
        try {
          const res = await axios.delete(
            `https://task-api-vercel-six.vercel.app/accountList/${id}`
          );
          if (res.status === 200) {
            dispatch("getAccountList");
          }
        } catch (e) {
          console.log(e);
        }
      },
    },
  };

  export default modules;