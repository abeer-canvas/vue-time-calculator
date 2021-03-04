<template>
  <div class="row">
    <!-- Calculate Time blocks -->
    <div class="cal-blocks col-6 bg-warning">
      <p class="input-text">Insert time-blocks:</p>
      <textarea
        class="block-input d-block rounded w-100 p-2"
        rows="5"
        v-model="timeInput"
      ></textarea>
      <button
        class="btn btn-success btn-calculate mt-2 w-100"
        @click="calButton"
      >
        CALCULATE
      </button>

      <div class="alert alert-info mt-5" role="alert">
        <strong>Target: 8 hours/day</strong>
      </div>

      <!-- Result -->
      <div class="card shadow-sm">
        <div
          class="card-header alert alert-secondary h4 text-center"
          :class="{
            'alert-danger': isNotFulfilled,
            'alert-success': isFulfilled,
          }"
        >
          TOTAL TIME
        </div>
        <div class="card-body">
          <h3
            class="card-title text-center"
            :class="{ green: isFulfilled, red: isNotFulfilled }"
          >
            {{ showTotal }}
          </h3>
          <h5
            class="card-title text-center"
            :class="{ green: isFulfilled, red: isNotFulfilled }"
          >
            {{ showMessage }}
          </h5>
        </div>
      </div>
      <button type="button" class="btn btn-outline-success mt-2 w-100">
        Send to Average
      </button>
    </div>

    <!-- Calculate average time -->
    <div class="cal-avg col-6 bg-warning">
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      timeInput: "",
      hourRegex: /^[0-9]{1,2}/gi,
      minuteRegex: /[0-9]{1,2}(?=[ap]m)/gi,
      ampmRegex: /[ap]m/gi,
      totalBlockMinutes: 0,
    };
  },
  computed: {
    ...mapGetters(["getTimeBlocksArray", "hours", "minutes", "getTargetHours"]),
    isFulfilled() {
      if (this.hours >= this.getTargetHours) {
        return true;
      } else {
        return false;
      }
    },
    isNotFulfilled() {
      if (this.hours < this.getTargetHours && this.minutes !== 0) {
        return true;
      } else {
        return false;
      }
    },
    showTotal() {
      let hh = this.hours.toString().padStart(2, "0");
      let mm = this.minutes.toString().padStart(2, "0");

      if (hh !== 0 || mm !== 0) {
        return hh + ":" + mm;
      } else {
        return "00:00";
      }
    },
    showMessage() {
      if (this.hours === 0 && this.minutes === 0) {
        return "Calculate Time Blocks";
      }

      let message = this.isNotFulfilled
        ? "Target Not Fulfilled"
        : "Target Fulfilled";

      return message;
    },
  },
  methods: {
    ...mapActions([
      "insertTimeInput",
      "defaultSetting",
      "gatheringTimeBlocks",
      "gatheringExtraMin",
      "sumTotalExtraMin",
      "addTotalBlockMin",
      "addSubtractExtraMin",
      "totalTime",
    ]),
    calButton() {
      this.insertTimeInput(this.timeInput);
      this.defaultSetting();
      this.gatheringTimeBlocks();
      this.gatheringExtraMin();
      this.sumTotalExtraMin();
      this.getTotalBlockMinutes();
      this.addTotalBlockMin(this.totalBlockMinutes);
      this.addSubtractExtraMin();
      this.totalTime();

      this.timeInput = "";
    },
    getTotalBlockMinutes() {
      this.totalBlockMinutes = 0;
      if (this.getTimeBlocksArray) {
        this.getTimeBlocksArray.forEach((block) => {
          let times = [];
          const regex = /[0-9]{1,2}:[0-9]{1,2}[ap]m/gi;
          times = block.match(regex);
          this.totalBlockMinutes += this.minuteMinus(times);
        });
      }
    },
    minuteMinus(timeArr) {
      // Changes below
      // For first element
      const getHour1 = Number(timeArr[0].match(this.hourRegex).join(""));

      const minute1 = Number(timeArr[0].match(this.minuteRegex).join(""));
      const ampm1 = timeArr[0].match(this.ampmRegex).join("");
      const hour1 = this.get24FormatHours(getHour1, ampm1);
      let firstMins = this.getTotalMin(hour1, minute1);

      // For second element
      const getHour2 = Number(timeArr[1].match(this.hourRegex).join(""));

      const minute2 = Number(timeArr[1].match(this.minuteRegex).join(""));
      const ampm2 = timeArr[1].match(this.ampmRegex).join("");
      const hour2 = this.get24FormatHours(getHour2, ampm2);
      let secondMins = this.getTotalMin(hour2, minute2, ampm1, ampm2);

      if (
        ampm1 === ampm2 &&
        (hour1 > hour2 || (hour1 === hour2 && minute1 > minute2))
      ) {
        let VarExceptionalSum = this.exceptionalSum(
          hour1,
          hour2,
          minute1,
          minute2
        ); //need
        return VarExceptionalSum;
      } else {
        return Number(secondMins - firstMins);
      }
    },
    get24FormatHours(hh, apm) {
      if (hh < 12 && apm === "pm") {
        return hh + 12;
      } else if (hh === 12 && apm === "am") {
        return 0;
      } else {
        return hh;
      }
    },
    getTotalMin(hour, minute, ampm1 = undefined, ampm2 = undefined) {
      if (ampm1 && ampm2) {
        if (ampm1 === "pm" && ampm2 === "am") {
          hour += 24;
        }
      }
      return hour * 60 + minute;
    },
    exceptionalSum(h1, h2, m1, m2) {
      let diffMins = 0;

      const exFirstMins = h1 * 60 + m1;
      const exSecondMins = h2 * 60 + m2;
      diffMins = exFirstMins - exSecondMins;

      const finalDiffMins = 24 * 60 - diffMins;
      return Number(finalDiffMins);
    },
  },
};
</script>

<style scoped>
.input-text {
  font-size: 20px;
}
.btn-calculate {
  font-family: "Concert One", cursive;
  font-size: 24px;
  font-weight: 200;
}
.card-header {
  font-family: "Concert One", cursive;
}
.block-input {
  font-family: "Roboto", sans-serif;
  font-size: 20px;
}

.red {
  color: red;
}
.green {
  color: green;
}
</style>