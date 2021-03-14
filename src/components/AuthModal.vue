<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-info font-weight-bold"
      data-toggle="modal"
      data-target="#exampleModal"
      v-if="!isLoggedIn"
    >
      Login
    </button>
    <button v-else class="btn btn-info font-weight-bold" @click="logout">
      Logout
    </button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ signupOrLogin }}
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <!--  -->
            <form>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control border"
                  :class="{ 'border-danger': !passwordMatched }"
                  id="exampleInputPassword1"
                  v-model="modalPassword"
                />
              </div>
              <p v-if="!passwordMatched">Password is not Valid</p>
              <button
                type="submit"
                class="btn btn-info font-weight-bold"
                data-dismiss="modal"
                @click="authenticate"
                :disabled="!passwordMatched"
              >
                Login
              </button>
            </form>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      modalPassword: "",
    };
  },
  computed: {
    ...mapGetters(["password", "passCode"]),
    isLoggedIn() {
      if (this.password === this.passCode) {
        return true;
      } else {
        return false;
      }
    },
    passwordMatched() {
      if (this.modalPassword === this.passCode) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    authenticate() {
      console.log(this.modalPassword);
      this.$store.dispatch("loggedIn", this.modalPassword);
    },
    logout() {
      this.$store.dispatch("loggedOut");
    },
  },
};
</script>