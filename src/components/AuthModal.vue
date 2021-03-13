<template>
  <div>
    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-info font-weight-bold"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      {{ signupOrLogin }}
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
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" class="form-text text-muted"
                  >Only Abeer Can Login</small
                >
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  v-model="password"
                />
              </div>
              <div v-if="isSigningUp" class="form-group">
                <label for="confirmPassword1">Confirm Password</label>
                <input
                  type="password"
                  class="form-control border"
                  :class="{ 'border-danger': isNotConfirm }"
                  id="confirmPassword1"
                  v-model="confirmPassword"
                />
                <small
                  id="emailHelp"
                  v-if="isNotConfirm"
                  class="form-text text-muted"
                  >Password doesn't match</small
                >
              </div>
              <!-- <div class="form-group form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Check me out</label
                >
              </div> -->
              <button
                type="submit"
                class="btn btn-primary"
                data-dismiss="modal"
                @click="authenticate"
              >
                {{ signupOrLogin }}
              </button>
            </form>
            <!--  -->
          </div>
          <!-- <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div> -->
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
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    ...mapGetters(["isSigningUp"]),
    signupOrLogin() {
      if (this.isSigningUp) {
        return "Signup";
      } else {
        return "Login";
      }
    },
    isNotConfirm() {
      if (this.password !== this.confirmPassword) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    authenticate() {
      const dataObj = {
        email: this.email,
        password: this.password,
      };

      if (this.isSigningUp) {
        this.$store.dispatch("signedUp", dataObj);
      } else {
        this.$store.dispatch("loggedIn", dataObj);
      }
    },
  },
};
</script>