<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-info"
    data-toggle="modal"
    data-target="#exampleModal"
  >
    <i class="fas fa-pencil-alt"></i> Edit
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
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
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
          <Datepicker v-model="picked" />
          <p>{{ theDate }}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
          <button
            type="button"
            class="btn btn-success"
            data-dismiss="modal"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Datepicker from "vue3-datepicker";
import { ref } from "vue";

export default {
  emits: ["gettingDate"],
  components: {
    Datepicker,
  },
  data() {
    return {
      picked: ref(new Date()),
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    theDate() {
      let date = new Date(this.picked);
      let monthInd = date.getMonth();
      let month = this.months.find((_, i) => {
        return monthInd == i;
      });
      let year = date.getFullYear();
      let day = date.getDate();

      return day + " " + month + " " + year;
    },
  },
  methods: {
    save() {
      let lastUpdate = this.theDate;
      this.$store.dispatch("updateDate", lastUpdate);
    },
  },
};
</script>