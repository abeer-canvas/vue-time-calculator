<template>
  <div class="auth-alert alert alert-info">
    <div>
      <auth-modal class="d-inline"></auth-modal>
      <span class="ml-2 font-weight-bold">for ABEER</span>
    </div>
  </div>
  <button
    type="button"
    class="btn btn-outline-secondary w-100 mb-2 font-weight-bold"
    @click="openAvgInput"
  >
    {{
      isHidden ? "Calculate Multiple Coding Times" : "Add A Single Coding Time"
    }}
  </button>
  <bulk-input-4-avg class="mb-2" :hidden="isHidden"></bulk-input-4-avg>

  <div :hidden="!isHidden">
    <div class="alert alert-info text-center h5" role="alert">
      Add Total Time of A Day
    </div>

    <div class="card-view alert text-center" role="alert">
      <div class="mt-2 mb-3">
        <!-- Hours Range -->
        <div class="d-inline">
          <input
            type="number"
            class="avg-hh rounded"
            v-model="dayHour"
            placeholder="hh"
          /><strong class="h2"> : </strong>
        </div>

        <!-- Minutes Range -->
        <div class="d-inline">
          <input
            type="number"
            class="avg-mm rounded"
            v-model="dayMinute"
            placeholder="mm"
          />
        </div>
      </div>

      <button class="btn btn-success mb-2" @click="addToAvg">
        Add To Average
      </button>
    </div>
  </div>

  <!-- Adding Date -->
  <div class="alert alert-info h5">
    Last added on <strong class="mr-2">"{{ lastUpdate }}"</strong>
    <date-edit-modal @gettingDate="updateDate(payload)"></date-edit-modal>
  </div>

  <!-- Show Average -->
  <div class="pt-3">
    <div class="h4 text-center">THE AVERAGE</div>
    <div class="card-body">
      <h3
        class="card-title text-center"
        :class="{ red: isNotConsistent, green: isConsistent }"
      >
        {{ showAvgTime }}
      </h3>
      <h5 class="card-title text-center">{{ showMessage }}</h5>
    </div>
  </div>
  <div
    class="alert font-weight-bold"
    :class="{ 'alert-danger': !isDateUpdated, 'alert-success': isDateUpdated }"
    role="alert"
  >
    {{ dateUpdateMessage }}
  </div>
</template>

<script>
import BulkInput4Avg from "./BulkInput4Avg.vue";
import DateEditModal from "../modals/DateEditModal.vue";
import AuthModal from "./AuthModal.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    BulkInput4Avg,
    DateEditModal,
    AuthModal,
  },
  data() {
    return {
      isHidden: true,
      dayHour: null,
      dayMinute: null,
      singleMinutes: 0,
      dateUpdated: false,
      placeDate: null,
    };
  },
  computed: {
    ...mapGetters([
      "min4Avg",
      "hr4Avg",
      "targetAvgTime",
      "lastUpdate",
      "isDateUpdated",
      "password",
      "passCode",
    ]),
    dateUpdateMessage() {
      let message = this.isDateUpdated
        ? `You updated the last addition date`
        : `You didn't update the last addition date`;
      return message;
    },
    showAvgTime() {
      let hh = this.hr4Avg.toString().padStart(2, "0");
      let mm = this.min4Avg.toString().padStart(2, "0");

      return hh + ":" + mm;
    },
    notCalculated() {
      let hour = this.hr4Avg;
      let minute = this.min4Avg;

      if (hour === 0 && minute === 0) {
        return true;
      }

      return false;
    },
    isConsistent() {
      let hour = this.hr4Avg;

      if (hour >= this.targetAvgTime) {
        return true;
      } else {
        return false;
      }
    },
    isNotConsistent() {
      let hour = this.hr4Avg;

      if (hour < this.targetAvgTime && !this.notCalculated) {
        return true;
      } else {
        return false;
      }
    },
    showMessage() {
      if (this.isNotConsistent) {
        return "Below The Target 🚩";
      } else if (this.isConsistent) {
        return "Consistent 🏆✨";
      } else {
        return "You didn't Calculate Yet!";
      }
    },
  },
  methods: {
    updateDate(payload) {
      this.placeDate = payload;
    },
    openAvgInput() {
      this.isHidden = !this.isHidden;
    },
    addToAvg() {
      if (this.password === this.passCode) {
        this.dateUpdated = false;
        let totalMin = Number(this.dayHour) * 60 + Number(this.dayMinute);
        this.$store.dispatch("singleTimeAdding", totalMin);
        this.$store.dispatch("getAvg");
        this.$store.dispatch("timeAdded");
        // this.$store.dispatch("doUpdateDate");

        this.dayHour = null;
        this.dayMinute = null;
      } else {
        alert("Abeer is not logged in");
      }
    },
  },
  created() {
    this.$store.dispatch("timeFetching");
  },
};
</script>

<style scoped>
h1 {
  color: black;
}
.card-view {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
}
.avg-hh,
.avg-mm {
  outline: none;
  border: none;
  width: 65px;
  font-size: 22px;
  padding: 1px 3px 1px 3px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
}
.red {
  color: red;
}
.green {
  color: rgb(5, 160, 5);
}
</style>