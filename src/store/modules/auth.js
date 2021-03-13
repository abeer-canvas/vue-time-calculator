export default {
  state() {
    return {
      token: null,
      expiresIn: null,
      uid: null,
      isSigningUp: true
    };
  },
  mutations: {
    SAVE_ID(state, payload) {
      state.isSigningUp = false
      state.token = payload.token;
      state.expiresIn = payload.expiresIn

      console.log(state.isSigningUp);
    }
  },
  actions: {
    signedUp(context, payload) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZI-pmOYT5yd-8RNEAi_fcir9p6PTPHKo', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Signup failed')
        }
      }).then(function (data) {
        context.commit('SAVE_ID', {
          uid: data.localId,
          token: data.token,
          expiresIn: data.expiresIn
        });
      });
    },
    loggedIn(context, payload) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZI-pmOYT5yd-8RNEAi_fcir9p6PTPHKo', {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }).then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw Error('Signup failed')
        }
      }).then(function (data) {
        context.commit('SAVE_ID', {
          uid: data.localId,
          token: data.token,
          expiresIn: data.expiresIn
        });
      });
    },
    logout(context) {
      context.commit('SAVE_ID', {
        uid: null,
        token: null,
        expiresIn: null
      });
    },
  },
  getters: {
    isSigningUp(state) {
      return state.isSigningUp;
    },
    token(state) {
      return state.token;
    },
    expiresIn(state) {
      return state.expiresIn;
    }
  }
}